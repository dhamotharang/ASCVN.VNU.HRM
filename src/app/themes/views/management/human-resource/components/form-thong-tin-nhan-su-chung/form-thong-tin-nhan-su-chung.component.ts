import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { CustomEmailValidator, NumberValidator, PhoneNumberValidator, SpaceValidator } from '@core/helpers/validator.helper';
import { INhanSuChiTiet } from '@themes/views/management/human-resource/_models/human-resource.model';
import { NotificationService } from '@core/services/common/notification.service';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { HinhThucTraLuongEnum, HRM_URL, TrangThaiDuLieuEnum } from '@themes/views/management/human-resource/_models/human-resource.enum';
import { FormUtil } from '@core/utils/form';
import { DateUtil } from '@core/utils/date';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import { DropDownListEnum } from '@shared/containers/asc-select';
import { IFile, IFileList, IResponseData } from '@core/models/common';
import { AppConfig } from '@core/config/app.config';
import { forkJoin, Subject } from 'rxjs';
import { FOLDER } from '@core/constants/app.constant';
import { BaseHumanResourceFormComponent } from '../../_base';
import { NzUploadChangeParam } from 'ng-zorro-antd';
import { LocalStorageUtil } from '@core/utils/localstorage';
import { EmitEvent, EventBus, EventBusService } from '@core/services/common';
import { ActionEnum } from '@core/constants/enum.constant';
import { IKeHoachDeXuat } from '@themes/views/management/recruitment/_models';
import { INgachCongChuc } from '@themes/views/management/catalogs/_models/catalog.model';

const fieldRequired = {
    soCMND: 'Số CMND',
    ngayCapCMND: 'Ngày cấp CMND',
    noiCapCMND: 'Nơi cấp CMND'
}

@Component({
    selector: 'app-form-thong-tin-nhan-su-chung',
    templateUrl: './form-thong-tin-nhan-su-chung.component.html',
    styleUrls: ['./form-thong-tin-nhan-su-chung.component.scss'],
    animations: [fadeInOnEnterAnimation(), fadeOutOnLeaveAnimation()],
})
export class FormThongTinNhanSuChungComponent extends BaseHumanResourceFormComponent<INhanSuChiTiet> implements OnInit, OnDestroy {

    @Input() modelViTriTuyenDung: IKeHoachDeXuat;
    @Input() idCoQuan: number;

    form: FormGroup;
    isTuyenDung = false;
    isUploadAvatar = false;
    dropdownListEnum = DropDownListEnum;
    hinhThucTraLuongEnum = HinhThucTraLuongEnum;
    listNgachCongChuc: INgachCongChuc[] = [];
    uploadMediaUrl: string;
    file: IFile;

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
        super.ngOnInit();
        if (this.model) {
            this.form.patchValue(this.model);
            this.form.get('ghiChu').setValue(this.model.ghiChuNhanSuChiTiet);
            if (this.model.idNhanSuChiTiet) {
                this.form.get('id').setValue(this.model.idNhanSuChiTiet);
            } else {
                this.form.get('idNhanSuChiTiet').setValue(0);
            }
            this.preModel = { ...this.form.value };

            // set path file
            this.file = {
                path: this.model.pathHinhNhanSu,
                fileId: this.model.idHinhNhanSu,
                size: 0,
            };
        }

        // init
        this.uploadMediaUrl = `${this.config.apiServer}/api/cmd/${this.config.version}/${UrlConstant.API.HRM_MEDIA}?FolderFunction=${FOLDER.HINH_DAI_DIEN}&FileSize=0`;
        if (this.modelViTriTuyenDung) {
            this.isTuyenDung = true;
            this.form.get('idViTriViecLam').setValue(this.modelViTriTuyenDung.idViTriViecLam);
            this.form.get('idKeHoachTuyenDung').setValue(this.modelViTriTuyenDung.idKeHoachTuyenDung);
            this.form.get('idCoQuan').setValue(this.idCoQuan);
        }

        this.loadNgachCongChucs();
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
            userName: [{ value: '', disabled: this.action === ActionEnum.UPDATE }, Validators.required],
            // userName: ['', Validators.required],
            maNhanSu: [''],
            hoDem: ['', Validators.required],
            ten: ['', Validators.required],
            tenGoiKhac: [''],
            idGioiTinh: [null, Validators.required],
            email: ['', [CustomEmailValidator, SpaceValidator]],
            soDienThoai: ['', [Validators.required, PhoneNumberValidator]],
            idLoaiNhanSu: [null],
            idCoQuan: [null, Validators.required],
            // idChucDanh: [null],
            idChucVu: [null],
            idHinhNhanSu: [null],
            idLoaiHopDong: [null],
            idtrangThaiNhanSu: [null],
            stt: [null],
            ngaySinh: [null, Validators.required],
            idLoaiNhanSuDanhGia: [null],
            idDoiTuongDanhGia: [null],
            idNgach: [null],
            idTrinhDoChuyenMon: [null],
            emailNoiBo: ['', [SpaceValidator]],
            // danh cho tuyen dung
            idViTriViecLam: [null],
            idKeHoachTuyenDung: [null],
            idChucDanhKhoaHoc: [null],
            idTrinhDoChinhTri: [null],
            hinhThucTraLuong: [HinhThucTraLuongEnum.CAP_LUONG],

            idNhanSuChiTiet: [0],
            // idNhanSu: [null, Validators.required],
            idNhanSu: [0],
            soCMND: ['', [Validators.required, NumberValidator]],
            ngayCapCMND: [null, Validators.required],
            noiCapCMND: ['', Validators.required],
            idQuocTich: [null],
            idDanToc: [null],
            idTonGiao: [null],
            idGiaDinhChinhSach: [null],
            noiSinh_IDTinh: [null],
            noiSinh_IDHuyen: [null],
            noiSinh_IDPhuongXa: [null],
            queQuan_IDQuocGia: [null],
            queQuan_SoNha: [''],
            queQuan_IDTinh: [null],
            queQuan_IDHuyen: [null],
            queQuan_IDPhuongXa: [null],
            hktT_IDQuocGia: [null],
            hktT_IDTinh: [null],
            hktT_IDHuyen: [null],
            hktT_IDPhuongXa: [null],
            hktT_SoNha: [''],
            dclL_IDTinh: [null],
            dclL_IDHuyen: [null],
            dclL_IDPhuongXa: [null],
            dclL_SoNha: [''],
            ghiChu: [''],
            hoChieu: [''],
            ngayCapHoChieu: [null],
            noiCapHoChieu: [''],
            noiSinh_IDQuocGia: [null],
            noiSinh_SoNha: [''],
            dclL_IDQuocGia: [null],
            dienThoaiNhaRieng: ['', [NumberValidator]],
            dienThoaiCoQuan: ['', [NumberValidator]],
            soBHXH: [''],
            idTinhTrangHonNhan: [null],
            idThanhPhanGiaDinh: [null],
            idFileDinhKem: [null],
            idTrangThaiDuLieu: [TrangThaiDuLieuEnum.SU_DUNG_CHINH],

            soSoLaoDong: [''],
            ngayCapSoLaoDong: [null],
            noiCapSoLaoDong: [''],
            maNgach: ['']
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
            // this.showErrorMessage(this.form);
            return;
        } else {
            if (this.form.get('ngayCapCMND').value) {
                this.form.get('ngayCapCMND').setValue(DateUtil.getFullDate(this.form.get('ngayCapCMND').value));
            }

            if (this.form.get('ngayCapHoChieu').value) {
                this.form.get('ngayCapHoChieu').setValue(DateUtil.getFullDate(this.form.get('ngayCapHoChieu').value));
            }

            if (this.form.get('ngayCapSoLaoDong').value) {
                this.form.get('ngayCapSoLaoDong').setValue(DateUtil.getFullDate(this.form.get('ngayCapSoLaoDong').value));
            }

            // check thay doi object
            if (this.preModel && (Object.entries(this.form.value).toString() === Object.entries(this.preModel).toString())) {
                this.closeForm();
            } else {
                if (this.isTuyenDung) {
                    this.apiService
                        .post(UrlConstant.API.HRM_NHAN_SU + '/NhanSuLyLichV2', this.form.value)
                        .pipe(takeUntil(this.destroyed$))
                        .subscribe((res) => {
                            this.notification.showSuccessMessage(this.translate.get('HR.MES.01'));
                            this.closeForm();
                        });
                } else {
                    switch (this.action) {
                        case ActionEnum.CREATE:
                            this.apiService
                                .post(UrlConstant.API.HRM_NHAN_SU + '/CreateV2', this.form.value)
                                .pipe(takeUntil(this.destroyed$))
                                .subscribe((res) => {
                                    this.notification.showSuccessMessage(this.translate.get('MES.UPDATE_DONE'));
                                    this.closeForm();
                                });
                            break;
                        case ActionEnum.UPDATE:
                            this.apiService.put(UrlConstant.API.HRM_NHAN_SU + (this.isPersonal ? '/UpdateDeXuatV2' : '/UpdateV2'), this.form.value)
                                .pipe(takeUntil(this.destroyed$))
                                .subscribe(() => {
                                    this.notification.showSuccessMessage(this.translate.get('HR.MES.03'));
                                    this.closeForm();
                                    if (this.isUploadAvatar) {
                                        this.sendEvent();
                                    }
                                    this.eventBus.emit(new EmitEvent(EventBus.DuyetTabThongTinNhanSu, true));
                                });
                            break;
                    }
                }
            }
        }
    }

    // closeForm() {
    //     this.windowRef.close();
    // }

    showErrorMessage(form: FormGroup) {
        const messages = Object.keys(form.controls)
            .filter(field => form.get(field).errors && form.get(field).errors.required)
            .map(field => {
                const control = form.get(field);
                if (control.errors && control.errors.required) {
                    return `${fieldRequired[field]} không được bỏ trống`
                }
            }).join('<br/>');
        this.notification.showWarningMessage(messages);
    }

    changeQuocGia_QueQuan(e) {
        this.form.get('queQuan_IDHuyen').setValue(null);
        this.form.get('queQuan_IDPhuongXa').setValue(null);
        this.form.get('queQuan_SoNha').setValue('');
    }
    changeTinhThanh_QueQuan(e) {
        this.form.get('queQuan_IDPhuongXa').setValue(null);
        this.form.get('queQuan_SoNha').setValue('');
    }
    changeQuanHuyen_QueQuan(e) {
        this.form.get('queQuan_SoNha').setValue('');
    }
    changeQuocGia_NoiSinh(e) {
        this.form.get('noiSinh_IDHuyen').setValue(null);
        this.form.get('noiSinh_IDPhuongXa').setValue(null);
        this.form.get('noiSinh_SoNha').setValue('');
    }
    changeTinhThanh_NoiSinh(e) {
        this.form.get('noiSinh_IDPhuongXa').setValue(null);
        this.form.get('noiSinh_SoNha').setValue('');
    }
    changeQuanHuyen_NoiSinh(e) {
        this.form.get('noiSinh_SoNha').setValue('');
    }
    changeQuocGia_Hktt(e) {
        this.form.get('hktT_IDHuyen').setValue(null);
        this.form.get('hktT_IDPhuongXa').setValue(null);
        this.form.get('hktT_SoNha').setValue('');
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
            this.isUploadAvatar = true;
        } else if (info.file.status === 'error') {
            this.notification.showErrorMessage('Không cập nhật được hình ảnh, có lỗi xảy ra !');
        }
    }

    private loadNgachCongChucs() {
        this.apiService.read(`${UrlConstant.API.DM_NGACH_CONG_CHUC}/List`, {
            pageSize: 0,
            pageNumber: 0,
            sortCol: 'stt',
            sortByASC: true,
        })
            .pipe(
                map(res => {
                    if (res.result) {
                        return res.result.items;
                    }
                    return [];
                }),
                tap((res: INgachCongChuc[]) => {
                    this.listNgachCongChuc = res;
                })
            )
            .pipe(takeUntil(this.destroyed$))
            .subscribe();
    }

    onChangeNgach(e) {
        if (e && e > 0) {
            const itemSelect = this.listNgachCongChuc.find(x => x.ngachCongChucId === e);
            this.form.get('maNgach').setValue(itemSelect.ma);
        }else{
            this.form.get('maNgach').setValue('');
        }
    }
}
