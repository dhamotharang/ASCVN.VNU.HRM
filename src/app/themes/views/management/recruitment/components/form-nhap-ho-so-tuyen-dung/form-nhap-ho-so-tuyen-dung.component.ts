import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { CustomEmailValidator, NumberValidator, PhoneNumberValidator, SpaceValidator } from '@core/helpers/validator.helper';
import { INhanSuChiTiet } from '@themes/views/management/human-resource/_models/human-resource.model';
import { NotificationService } from '@core/services/common/notification.service';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { finalize, takeUntil } from 'rxjs/operators';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import {
    DuLieuNhanSuEnum,
    HinhThucTraLuongEnum,
    HRM_URL,
    TrangThaiDuLieuEnum,
} from '@themes/views/management/human-resource/_models/human-resource.enum';
import { FormUtil } from '@core/utils/form';
import { DateUtil } from '@core/utils/date';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import { DropDownListEnum } from '@shared/containers/asc-select';
import { IFile, IFileList, IResponseData } from '@core/models/common';
import { AppConfig } from '@core/config/app.config';
import { FOLDER } from '@core/constants/app.constant';
import { NzUploadChangeParam } from 'ng-zorro-antd';
import { LocalStorageUtil } from '@core/utils/localstorage';
import { EmitEvent, EventBus, EventBusService } from '@core/services/common';
import { IKeHoachDeXuat, INhanSuDeXuat } from '@themes/views/management/recruitment/_models';
import { BaseHumanResourceFormComponent } from '@themes/views/management/human-resource/_base';
import { ActionEnum } from '@core/constants/enum.constant';

@Component({
    selector: 'app-form-nhap-ho-so-tuyen-dung',
    templateUrl: './form-nhap-ho-so-tuyen-dung.component.html',
    styleUrls: ['./form-nhap-ho-so-tuyen-dung.component.scss'],
    animations: [fadeInOnEnterAnimation(), fadeOutOnLeaveAnimation()],
})
export class FormNhapHoSoTuyenDungComponent extends BaseHumanResourceFormComponent<INhanSuChiTiet> implements OnInit, OnDestroy {
    @Input() modelViTriTuyenDung: IKeHoachDeXuat;
    @Input() idCoQuan: number;
    @Input() action: ActionEnum;
    @Input() modelNhanSuDeXuat: INhanSuDeXuat;

    form: FormGroup;
    isTuyenDung = false;
    actionEnum = ActionEnum;
    dropdownListEnum = DropDownListEnum;
    hinhThucTraLuongEnum = HinhThucTraLuongEnum;
    uploadMediaUrl: string;
    file: IFile;
    isSaveAndCreateACL = false;

    private config = AppConfig.settings;

    constructor(
        private apiService: ApiService,
        private formBuilder: FormBuilder,
        private notification: NotificationService,
        private translate: CustomTranslateService,
        private eventBus: EventBusService,
        protected windowRef: WindowRef
    ) {
        super(windowRef);
    }

    ngOnInit() {
        this.createForm();
        if (this.modelNhanSuDeXuat) {
            this.form.get('hinhThucTraLuong').setValue(this.modelNhanSuDeXuat.hinhThucTraLuong);
            this.apiService
                .read(UrlConstant.API.HRM_NHAN_SU + '/ById', {
                    idNhanSu: this.modelNhanSuDeXuat.id,
                    manHinh: DuLieuNhanSuEnum.SU_DUNG_CHINH,
                })
                .pipe(takeUntil(this.destroyed$))
                .subscribe(res => {
                    if (res.result) {
                        this.model = res.result;
                        this.form.patchValue(this.model);
                        if (this.model.idNhanSu) {
                            this.form.get('id').setValue(this.model.idNhanSu);
                            this.form.get('idChiTiet').setValue(this.model.idNhanSuChiTiet);
                        } // set path file
                        this.file = {
                            path: this.model.pathHinhNhanSu,
                            fileId: this.model.idHinhNhanSu,
                            size: 0,
                        };
                        // init
                        this.uploadMediaUrl = `${this.config.apiServer}/api/cmd/${this.config.version}/${UrlConstant.API.HRM_MEDIA}?FolderFunction=${FOLDER.HINH_DAI_DIEN}&FileSize=0`;
                    }
                });
        }
        if (this.modelViTriTuyenDung) {
            this.isTuyenDung = true;
            this.form.get('idViTriViecLam').setValue(this.modelViTriTuyenDung.idViTriViecLam);
            this.form.get('idKeHoachTuyenDung').setValue(this.modelViTriTuyenDung.idKeHoachTuyenDung);
            this.form.get('idCoQuan').setValue(this.idCoQuan);
        }
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    disabledDate = (current: Date): boolean => {
        // Can not select days before today and today
        return differenceInCalendarDays(current, new Date()) > 0;
    };

    createForm() {
        this.form = this.formBuilder.group({
            id: [0],
            idChiTiet: [0],
            userName: ['', Validators.required],
            maNhanSu: [''],
            hoDem: ['', Validators.required],
            ten: ['', Validators.required],
            tenGoiKhac: [''],
            idGioiTinh: [null, Validators.required],
            email: ['', [CustomEmailValidator, SpaceValidator]],
            soDienThoai: ['', [Validators.required, PhoneNumberValidator]],
            idLoaiNhanSu: [null, Validators.required],
            idCoQuan: ['', Validators.required],
            idHinhNhanSu: [null],
            idtrangThaiNhanSu: [null],
            stt: [null],
            ngaySinh: [null, Validators.required],
            idLoaiNhanSuDanhGia: [null],
            idDoiTuongDanhGia: [null],

            // danh cho tuyen dung
            idViTriViecLam: [null],
            idKeHoachTuyenDung: [null],
            hinhThucTraLuong: [HinhThucTraLuongEnum.CAP_LUONG, Validators.required],

            idNhanSuChiTiet: [0],
            idNhanSu: [0],
            idQuocTich: [null],
            soCMND: ['', [Validators.required]],
            ngayCapCMND: [null, Validators.required],
            noiCapCMND: ['', Validators.required],
            noiSinh_IDTinh: [null],
            noiSinh_IDHuyen: [null],
            queQuan_IDTinh: [null],
            queQuan_IDHuyen: [null],
            hktT_IDTinh: [null],
            hktT_IDHuyen: [null],
            hktT_IDPhuongXa: [null],
            hktT_SoNha: [''],
            dclL_IDTinh: [null],
            dclL_IDHuyen: [null],
            dclL_IDPhuongXa: [null],
            dclL_SoNha: [''],
            dienThoaiNhaRieng: ['', [NumberValidator]],
            idFileDinhKem: [null],
            idTrangThaiDuLieu: [TrangThaiDuLieuEnum.SU_DUNG_CHINH],

            soSoLaoDong: [''],
            ngayCapSoLaoDong: [null],
            noiCapSoLaoDong: [''],

            isTapSu: [null],
        });
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
            if (this.form.get('ngayCapCMND').value) {
                this.form.get('ngayCapCMND').setValue(DateUtil.getFullDate(this.form.get('ngayCapCMND').value));
            }

            if (!this.isSaveAndCreateACL) {
                if (this.action === ActionEnum.CREATE) {
                    this.apiService
                        .post(UrlConstant.API.HRM_NHAN_SU + '/NhanSuLyLichV2', this.form.value)
                        .pipe(takeUntil(this.destroyed$))
                        .subscribe(res => {
                            this.notification.showSuccessMessage(this.translate.get('HR.MES.01'));
                            this.closeForm();
                        });
                } else {
                    this.apiService
                        .put(UrlConstant.API.HRM_NHAN_SU + '/NhanSuLyLichV2', this.form.value)
                        .pipe(takeUntil(this.destroyed$))
                        .subscribe(res => {
                            this.notification.showSuccessMessage(this.translate.get('HR.MES.16'));
                            this.closeForm();
                        });
                }
            } else {
                if (this.action === ActionEnum.CREATE) {
                    this.apiService
                        .post(UrlConstant.API.HRM_NHAN_SU + '/LyLichChiTietVaTaiKhoan', this.form.value)
                        .pipe(
                            takeUntil(this.destroyed$),
                            finalize(() => (this.isSaveAndCreateACL = false))
                        )
                        .subscribe(res => {
                            this.notification.showSuccessMessage(this.translate.get('HR.MES.01'));
                            this.closeForm();
                        });
                } else {
                    this.apiService
                        .put(UrlConstant.API.HRM_NHAN_SU + '/LyLichChiTietVaTaiKhoan', this.form.value)
                        .pipe(
                            takeUntil(this.destroyed$),
                            finalize(() => (this.isSaveAndCreateACL = false))
                        )
                        .subscribe(res => {
                            this.notification.showSuccessMessage(this.translate.get('HR.MES.16'));
                            this.closeForm();
                        });
                }
            }
        }
    }

    onSaveAndCreate() {
        this.isSaveAndCreateACL = true;
        this.form.get('userName').setValidators([Validators.required]);
        this.form.get('userName').updateValueAndValidity();
        this.onSubmit();
    }

    changeTinhThanh_Hktt(e) {
        this.form.get('hktT_IDPhuongXa').setValue(null);
        this.form.get('hktT_SoNha').setValue('');
    }
    changeQuanHuyen_Hktt(e) {
        this.form.get('hktT_SoNha').setValue('');
    }
    changeQuocGia_Dcll(e) {
        this.form.get('dclL_IDHuyen').setValue(null);
        this.form.get('dclL_IDPhuongXa').setValue(null);
        this.form.get('dclL_SoNha').setValue('');
    }
    changeTinhThanh_Dcll(e) {
        this.form.get('dclL_IDPhuongXa').setValue(null);
        this.form.get('dclL_SoNha').setValue('');
    }
    changeQuanHuyen_Dcll(e) {
        this.form.get('dclL_SoNha').setValue('');
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

    sendEvent() {
        // Sync Avatar
        this.apiService
            .put(UrlConstant.API.ACL_USER + '/SyncUserAvatar', {
                idDoiTuong: this.model.idNhanSu,
                avatar: this.file.path ? this.file.path : '',
            })
            .subscribe();

        // Cập nhật lại hình ảnh trên view
        this.eventBus.emit(
            new EmitEvent(EventBus.UpdateAvatarEnum, {
                avatarUrlFromResponse: this.file.path ? this.file.path : '',
                trangThai: true,
            })
        );

        const arrayUrl = location.pathname.split('/');
        if (arrayUrl.includes(HRM_URL.LY_LICH_NHAN_SU) && this.file && this.file.fileId) {
            // set local
            LocalStorageUtil.setAvatar(this.file.path ? this.file.path : '');
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
}
