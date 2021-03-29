import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { IThongTinDoanDang } from '@themes/views/management/human-resource/_models/thong-tin-doan-dang.model';
import { NotificationService } from '@core/services/common/notification.service';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { takeUntil } from 'rxjs/operators';
import { BaseHumanResourceFormComponent } from '@themes/views/management/human-resource/_base/base-human-resource-form.component';
import { FormUtil } from '@core/utils/form';
import { DateUtil } from '@core/utils/date';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { TrangThaiDuLieuEnum } from '@themes/views/management/human-resource/_models/human-resource.enum';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import { EmitEvent, EventBus, EventBusService } from '@core/services/common';

@Component({
    selector: 'app-form-nhan-su-doan-dang',
    templateUrl: './form-nhan-su-doan-dang.component.html',
    styleUrls: ['./form-nhan-su-doan-dang.component.scss'],
    animations: [fadeInOnEnterAnimation(), fadeOutOnLeaveAnimation()],
})
export class FormNhanSuDoanDangComponent extends BaseHumanResourceFormComponent<IThongTinDoanDang> implements OnInit, OnDestroy {
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
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    createForm() {
        this.form = this.formBuilder.group({
            id: [0],
            idNhanSu: [null, Validators.required],
            ngayVaoDoan: [null],
            noiKetNapDoan: [''],
            idChucVuDoan: [null],
            ngayVaoDang: [null],
            ngayChinhThucVaoDang: [null],
            noiKetNapDang: [''],
            idChucVuDang: [null],
            noiSinhHoatDangHienTai: [''],
            ngayNhapNgu: [null],
            ngayXuatNgu: [null],
            ngayThamGiaCachMang: [null],
            idQuanHam: [null],
            idChucVuCuuChienBinh: [null],
            isThuongBinh: [false],
            idLoaiThuongBinh: [null],
            soThuongTat: [''],
            hinhThucThuongTat: [''],
            idChucVuCongDoan: [null],
            ngayVaoCongDoan: [null],
            noiDung: [''],
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
                // convert fullDate()
                if (this.form.get('ngayVaoDoan').value) {
                    this.form.get('ngayVaoDoan').setValue(DateUtil.getFullDate(this.form.get('ngayVaoDoan').value));
                }

                if (this.form.get('ngayVaoDang').value) {
                    this.form.get('ngayVaoDang').setValue(DateUtil.getFullDate(this.form.get('ngayVaoDang').value));
                }

                if (this.form.get('ngayChinhThucVaoDang').value) {
                    this.form.get('ngayChinhThucVaoDang').setValue(DateUtil.getFullDate(this.form.get('ngayChinhThucVaoDang').value));
                }

                if (this.form.get('ngayNhapNgu').value) {
                    this.form.get('ngayNhapNgu').setValue(DateUtil.getFullDate(this.form.get('ngayNhapNgu').value));
                }

                if (this.form.get('ngayXuatNgu').value) {
                    this.form.get('ngayXuatNgu').setValue(DateUtil.getFullDate(this.form.get('ngayXuatNgu').value));
                }

                if (this.form.get('ngayVaoCongDoan').value) {
                    this.form.get('ngayVaoCongDoan').setValue(DateUtil.getFullDate(this.form.get('ngayVaoCongDoan').value));
                }

                if (this.form.get('ngayThamGiaCachMang').value) {
                    this.form.get('ngayThamGiaCachMang').setValue(DateUtil.getFullDate(this.form.get('ngayThamGiaCachMang').value));
                }

                // call api
                this.apiUrl = UrlConstant.API.HRM_NS_DOAN_DANG;
                if (this.isPersonal) {
                    this.apiUrl += '/DeXuat';
                }
                this.apiService
                    .put(this.apiUrl, this.form.value)
                    .pipe(takeUntil(this.destroyed$))
                    .subscribe(() => {
                        this.notification.showSuccessMessage(this.translate.get('MES.UPDATE_DONE'));
                        if (this.isPersonal) {
                            this.eventBus.emit(new EmitEvent(EventBus.DuyetTabThongTinNhanSu, true));
                        }
                        this.closeForm();
                    });
            }
        }
    }
}
