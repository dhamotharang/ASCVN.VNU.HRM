import { NotificationService } from '@core/services/common/notification.service';
import { FormBuilder, Validators } from '@angular/forms';
import { UrlConstant } from '@core/constants/url.constant';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '@core/data-services/api.service';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { INhanSuDaoTaoBoiDuong } from '@themes/views/management/human-resource/_models/nhan-su-dao-tao-boi-duong.model';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { FormUtil } from '@core/utils/form';
import { BaseHumanResourceFormComponent } from '@themes/views/management/human-resource/_base/base-human-resource-form.component';
import { takeUntil } from 'rxjs/operators';
import { DateUtil } from '@core/utils/date';
import { TrangThaiDuLieuEnum } from '@themes/views/management/human-resource/_models/human-resource.enum';
import { ActionEnum } from '@core/constants/enum.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { EmitEvent, EventBus, EventBusService } from '@core/services/common';

@Component({
    selector: 'app-form-nhan-su-dao-tao-boi-duong',
    templateUrl: './form-nhan-su-dao-tao-boi-duong.component.html',
    styleUrls: ['./form-nhan-su-dao-tao-boi-duong.component.scss'],
})
export class FormNhanSuDaoTaoBoiDuongComponent extends BaseHumanResourceFormComponent<INhanSuDaoTaoBoiDuong> implements OnInit, OnDestroy {
    constructor(
        private apiService: ApiService,
        private formBuilder: FormBuilder,
        private notification: NotificationService,
        private eventBus: EventBusService,
        protected window: WindowRef
    ) {
        super(window);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    disabledNgayKetThuc = (current: Date): boolean => {
        if (!this.form.get('ngayBatDau').value) {
            return;
        }
        // Can not select days before today and today
        return differenceInCalendarDays(current, new Date(this.form.get('ngayBatDau').value)) < 0;
    };

    disabledNgayBatDau = (current: Date): boolean => {
        if (!this.form.get('ngayKetThuc').value) {
            return;
        }
        // Can not select days before today and today
        return differenceInCalendarDays(current, new Date(this.form.get('ngayKetThuc').value)) > 0;
    };

    onSubmit() {
        if (this.form.invalid) {
            FormUtil.validateAllFormFields(this.form);
            return;
        }
        if (this.form.valid) {
            if (this.preModel && (Object.entries(this.form.value).toString() === Object.entries(this.preModel).toString())) {
                this.closeForm();
            } else {
                if (this.form.get('ngayBatDau').value) {
                    this.form.get('ngayBatDau').setValue(DateUtil.getFullDate(this.form.get('ngayBatDau').value));
                }
                if (this.form.get('ngayKetThuc').value) {
                    this.form.get('ngayKetThuc').setValue(DateUtil.getFullDate(this.form.get('ngayKetThuc').value));
                }
                if (this.form.get('ngayQuyetDinh').value) {
                    this.form.get('ngayQuyetDinh').setValue(DateUtil.getFullDate(this.form.get('ngayQuyetDinh').value));
                }

                this.apiUrl = UrlConstant.API.HRM_NS_DAO_TAO_BOI_DUONG;
                if (this.isPersonal) {
                    this.apiUrl += '/DeXuat';
                }
                this.apiService
                    .put(this.apiUrl, this.form.value)
                    .pipe(takeUntil(this.destroyed$))
                    .subscribe(() => {
                        this.notification.showSuccessMessage(
                            this.action === ActionEnum.CREATE ? MessageConstant.COMMON.MSG_CREATE_DONE : MessageConstant.COMMON.MSG_UPDATE_DONE
                        );
                        if (this.isPersonal) {
                            this.eventBus.emit(new EmitEvent(EventBus.DuyetTabThongTinNhanSu, true));
                        }
                        this.closeForm();
                    });
            }
        }
    }

    protected createForm() {
        this.form = this.formBuilder.group({
            id: [0],
            idNhanSu: [this.nhanSuId, Validators.required],
            donVi: ['', Validators.required],
            chuyenNganh: [''],
            ngayBatDau: [null],
            ngayKetThuc: [null],
            idChungChi: [null],
            idHinhThucDaoTao: [null],
            idQuocGia: [null],
            truongDaoTao: [''],
            soQuyetDinh: [''],
            xepLoaiVanBang: [''],
            ngayQuyetDinh: [null],
            idFileDinhKem: [null],
            ghiChu: [''],
            idTrangThaiDuLieu: [TrangThaiDuLieuEnum.SU_DUNG_CHINH],
        });
    }
}
