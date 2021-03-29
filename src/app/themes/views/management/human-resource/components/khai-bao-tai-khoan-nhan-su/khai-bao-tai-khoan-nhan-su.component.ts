import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ActionEnum } from '@core/constants/enum.constant';
import { ApiService } from '@core/data-services/api.service';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { UrlConstant } from '@core/constants/url.constant';
import { takeUntil } from 'rxjs/operators';
import { NotificationService } from '@core/services/common/notification.service';
import { AppConfig } from '@core/config/app.config';
import { IResponseData } from '@core/models/common/response-data.model';
import { IFile, IFileList } from '@core/models/common/file.model';
import { CustomEmailValidator, PhoneNumberValidator, SpaceValidator } from '@core/helpers/validator.helper';
import { DropDownListEnum } from '@shared/containers/asc-select/asc-select.enum';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { DateUtil } from '@core/utils/date';
import { FormUtil } from '@core/utils/form';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { HRM_URL, TrangThaiDuLieuEnum } from '@themes/views/management/human-resource/_models/human-resource.enum';
import { FOLDER } from '@core/constants/app.constant';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import { EmitEvent, EventBus, EventBusService } from '@core/services/common';
import { AuthenticateService } from '@core/auth';
import { LocalStorageUtil } from '@core/utils/localstorage';

@Component({
    selector: 'app-khai-bao-tai-khoan-nhan-su',
    templateUrl: './khai-bao-tai-khoan-nhan-su.component.html',
    styleUrls: ['./khai-bao-tai-khoan-nhan-su.component.scss'],
    animations: [fadeInOnEnterAnimation(), fadeOutOnLeaveAnimation()],
})
export class KhaiBaoTaiKhoanNhanSuComponent implements OnInit, OnDestroy {
    @Input() model: any;
    @Input() action: ActionEnum;
    @Input() modelViTriTuyenDung: any;
    @Input() idCoQuan: number;

    form: FormGroup;
    isTuyenDung = false;
    dropdownListEnum = DropDownListEnum;
    uploadMediaUrl: string;
    file: IFile;

    private config = AppConfig.settings;
    private destroyed$ = new Subject();

    constructor(
        private apiService: ApiService,
        private formBuilder: FormBuilder,
        private authenticateService: AuthenticateService,
        private notification: NotificationService,
        private translate: CustomTranslateService,
        private eventBus: EventBusService,
        private windowRef: WindowRef
    ) {}

    ngOnInit(): void {
        this.createFormGroup();
        if (this.model) {
            this.setFormValue(this.model);
        }
        // init
        this.uploadMediaUrl = `${this.config.apiServer}/api/cmd/${this.config.version}/${UrlConstant.API.HRM_MEDIA}?FolderFunction=${FOLDER.HINH_DAI_DIEN}&FileSize=0`;
        if (this.modelViTriTuyenDung) {
            this.isTuyenDung = true;
            this.form.get('idViTriViecLam').setValue(this.modelViTriTuyenDung.idViTriViecLam);
            this.form.get('idKeHoachTuyenDung').setValue(this.modelViTriTuyenDung.idKeHoachTuyenDung);
            this.form.get('idCoQuan').setValue(this.idCoQuan);
        }
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    disabledDate = (current: Date): boolean => {
        // Can not select days before today and today
        return differenceInCalendarDays(current, new Date()) > 0;
    };

    createFormGroup() {
        this.form = this.formBuilder.group({
            id: [0],
            userName: [''],
            maNhanSu: ['', Validators.required],
            hoDem: ['', Validators.required],
            ten: ['', Validators.required],
            tenGoiKhac: [''],
            idGioiTinh: [null, Validators.required],
            email: ['', [CustomEmailValidator, SpaceValidator]],
            soDienThoai: ['', [Validators.required, PhoneNumberValidator]],
            idLoaiNhanSu: ['', Validators.required],
            idCoQuan: ['', Validators.required],
            // idChucDanh: [null],
            idChucVu: [null],
            idHinhNhanSu: [null],
            idLoaiHopDong: [null, Validators.required],
            idtrangThaiNhanSu: [null],
            stt: [null],
            ngaySinh: [null, Validators.required],
            idLoaiNhanSuDanhGia: [null],
            idDoiTuongDanhGia: [null],
            idNgach: [null],
            idTrinhDoChuyenMon: [null],
            emailNoiBo: ['', [Validators.required, SpaceValidator]],
            // danh cho tuyen dung
            idViTriViecLam: [null],
            idKeHoachTuyenDung: [null],
            idTrangThaiDuLieu: [TrangThaiDuLieuEnum.SU_DUNG_CHINH],
            idChucDanhKhoaHoc: [null],
            idTrinhDoChinhTri: [null],
        });
    }

    setFormValue(model) {
        this.form.patchValue(model);
        this.form.patchValue({
            id: model.idNhanSu,
            ngaySinh: model.ngaySinh ? new Date(model.ngaySinh) : null,
        });

        // set path file
        this.file = {
            path: model.pathHinhNhanSu,
            fileId: model.idHinhNhanSu,
            size: model.sizeHinhNhanSu,
        };
    }

    onSubmit() {
        if (this.form.get('idCoQuan').value) {
            this.form.get('idCoQuan').setValue(Number.parseInt(this.form.get('idCoQuan').value, 10));
        }
        if (this.form.get('ngaySinh').value) {
            this.form.get('ngaySinh').setValue(DateUtil.getFullDate(this.form.get('ngaySinh').value));
        }
        if (this.form.invalid) {
            FormUtil.validateAllFormFields(this.form);
            return;
        } else {
            if (this.isTuyenDung) {
                const createLyLichTuyenDung$ = this.apiService
                    .post(UrlConstant.API.HRM_NHAN_SU + '/NhanSuLyLich', this.form.value)
                    .pipe(takeUntil(this.destroyed$));
                createLyLichTuyenDung$.subscribe(() => {
                    this.notification.showSuccessMessage(this.translate.get('HR.MES.01'));
                    this.closeForm(true);
                });
            } else {
                switch (this.action) {
                    case ActionEnum.CREATE:
                        this.apiService
                            .post(UrlConstant.API.HRM_NHAN_SU, this.form.value)
                            .pipe(takeUntil(this.destroyed$))
                            .subscribe(() => {
                                this.sendEvent();
                                this.notification.showSuccessMessage(this.translate.get('HR.MES.02'));
                                this.closeForm(true);
                            });
                        break;
                    case ActionEnum.UPDATE:
                        this.apiService
                            .put(UrlConstant.API.HRM_NHAN_SU, this.form.value)
                            .pipe(takeUntil(this.destroyed$))
                            .subscribe(() => {
                                this.sendEvent();
                                this.notification.showSuccessMessage(this.translate.get('HR.MES.03'));
                                this.closeForm(true);
                            });
                        break;
                }
            }
        }
    }

    sendEvent() {
        // Sync Avatar
        this.apiService
            .put(UrlConstant.API.ACL_USER + '/SyncUserAvatar', {
                idDoiTuong: this.model.idNhanSu,
                avatar: this.file.path,
            })
            .subscribe();

        // Cập nhật lại hình ảnh trên view
        this.eventBus.emit(
            new EmitEvent(EventBus.UpdateAvatarEnum, {
                avatarUrlFromResponse: this.file.path,
                trangThai: true,
            })
        );

        const arrayUrl = location.pathname.split('/');
        if (arrayUrl.includes(HRM_URL.LY_LICH_NHAN_SU) && this.file && this.file.fileId) {
            // set local
            LocalStorageUtil.setAvatar(this.file.path);
        }
    }

    handleChange(info: NzUploadChangeParam): void {
        if (info.file.status === 'done') {
            const response = info.file.response as IResponseData<IFileList>;
            this.file = response.result.files[0];

            // set form
            this.form.get('idHinhNhanSu').setValue(this.file.fileId);
        } else if (info.file.status === 'error') {
            this.notification.showErrorMessage('Không cập nhật được hình ảnh, có lỗi xảy ra !');
        }
    }

    closeForm(isLoad) {
        this.windowRef.close(isLoad);
    }
}
