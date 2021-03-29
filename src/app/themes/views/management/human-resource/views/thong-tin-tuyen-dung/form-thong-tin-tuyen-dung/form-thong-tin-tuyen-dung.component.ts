import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActionEnum } from '@core/constants/enum.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { INhanSuThongTinTuyenDung } from '@themes/views/management/human-resource/_models/thong-tin-tuyen-dung.model';
import { NotificationService } from '@core/services/common/notification.service';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { takeUntil } from 'rxjs/operators';
import { BaseHumanResourceFormComponent } from '@themes/views/management/human-resource/_base/base-human-resource-form.component';
import { FormUtil } from '@core/utils/form';
import { DateUtil } from '@core/utils/date';
import { HinhThucTraLuongEnum, TrangThaiDuLieuEnum } from '@themes/views/management/human-resource/_models/human-resource.enum';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import { EmitEvent, EventBus, EventBusService } from '@core/services/common';

@Component({
    selector: 'app-form-thong-tin-tuyen-dung',
    templateUrl: './form-thong-tin-tuyen-dung.component.html',
    styleUrls: ['./form-thong-tin-tuyen-dung.component.scss'],
})
export class FormThongTinTuyenDungComponent extends BaseHumanResourceFormComponent<INhanSuThongTinTuyenDung> implements OnInit, OnDestroy {
    userSelected = [];
    hinhThuTraLuongs = HinhThucTraLuongEnum;
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
        if (this.action === ActionEnum.UPDATE) {
            // set value
            if (this.model && this.model.idNguoiTuyenDung) {
                this.userSelected.push(this.model.idNguoiTuyenDung);
            }
            
        }
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    createForm() {
        this.form = this.formBuilder.group({
            id: [0],
            idNhanSu: [null, Validators.required],
            idNguonTuyenDung: [null],
            idNguoiTuyenDung: [null],
            idNhomViTriViecLam: [null],
            idViTriViecLam: [null],
            idKeHoachTuyenDung: [null],
            hinhThucTraLuong: [null],
            ngheNghiepTuyenDung: [''],
            coQuanTuyenDung: [''],
            ngayTuyenDung: [null],
            ngayNhanViec: [null],
            namVaoNganhGiaoDuc: [null],
            congViecDuocGiao: [''],
            soTruongCongTac: [''],
            ngayBatDauNN: [null],
            ngayBatDauDHQG: [null],
            viecLamLauNhat: [''],
            ghiChu: [''],
            idTrangThaiDuLieu: [TrangThaiDuLieuEnum.SU_DUNG_CHINH],
        });
    }

    onSubmit() {
        // set nhanSuId
        if (this.nhanSuId) {
            this.form.get('idNhanSu').setValue(this.nhanSuId);
        }

        if (this.form.invalid) {
            FormUtil.validateAllFormFields(this.form);
            return;
        } else {
            if (this.preModel && (Object.entries(this.form.value).toString() === Object.entries(this.preModel).toString())) {
                this.closeForm();
            } else {
                if (this.form.get('ngayTuyenDung').value) {
                    this.form.get('ngayTuyenDung').setValue(DateUtil.getFullDate(this.form.get('ngayTuyenDung').value));
                }

                if (this.form.get('ngayNhanViec').value) {
                    this.form.get('ngayNhanViec').setValue(DateUtil.getFullDate(this.form.get('ngayNhanViec').value));
                }

                if (this.form.get('ngayBatDauNN').value) {
                    this.form.get('ngayBatDauNN').setValue(DateUtil.getFullDate(this.form.get('ngayBatDauNN').value));
                }

                if (this.form.get('ngayBatDauDHQG').value) {
                    this.form.get('ngayBatDauDHQG').setValue(DateUtil.getFullDate(this.form.get('ngayBatDauDHQG').value));
                }

                // call api
                this.apiUrl = UrlConstant.API.HRM_NS_THONG_TIN_TUYEN_DUNG;
                if (this.isPersonal) {
                    this.apiUrl += '/DeXuat';
                }
                this.apiService
                    .put(this.apiUrl, this.form.value)
                    .pipe(takeUntil(this.destroyed$))
                    .subscribe(() => {
                        this.notification.showSuccessMessage(this.translate.get('MES.UPDATE_DONE'));
                        this.closeForm();
                        if (this.isPersonal) {
                            this.eventBus.emit(new EmitEvent(EventBus.DuyetTabThongTinNhanSu, true));
                        }
                    });
            }
        }
    }
}
