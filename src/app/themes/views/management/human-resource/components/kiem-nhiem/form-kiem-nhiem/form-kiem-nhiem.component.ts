import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActionEnum } from '@core/constants/enum.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { INhanSuKiemNhiem } from '@themes/views/management/human-resource/_models/kiem-nhiem.model';
import { NotificationService } from '@core/services/common/notification.service';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { takeUntil } from 'rxjs/operators';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { BaseHumanResourceFormComponent } from '@themes/views/management/human-resource/_base/base-human-resource-form.component';
import { DateUtil } from '@core/utils/date';
import { FormUtil } from '@core/utils/form';
import { TrangThaiDuLieuEnum } from '@themes/views/management/human-resource/_models/human-resource.enum';
import { EmitEvent, EventBus, EventBusService } from '@core/services/common';

@Component({
    selector: 'app-form-kiem-nhiem',
    templateUrl: './form-kiem-nhiem.component.html',
    styleUrls: ['./form-kiem-nhiem.component.scss'],
})
export class FormKiemNhiemComponent extends BaseHumanResourceFormComponent<INhanSuKiemNhiem> implements OnInit, OnDestroy {
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

    ngOnDestroy() {
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
            // trigger validate all field
            FormUtil.validateAllFormFields(this.form);
            return;
        } else {
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
    
                this.form.get('idCoQuanKiemNhiem').setValue(Number.parseInt(this.form.get('idCoQuanKiemNhiem').value, 10));
    
                this.apiUrl = UrlConstant.API.HRM_NS_KIEM_NHIEM;
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

    createForm() {
        this.form = this.formBuilder.group({
            id: [0],
            idNhanSu: [this.nhanSuId, Validators.required],
            idCoQuanKiemNhiem: [null, Validators.required],
            idChucVuKiemNhiem: [null, Validators.required],
            ngayBatDau: [null],
            ngayKetThuc: [null],
            soQuyetDinh: [''],
            ngayQuyetDinh: [null],
            idFileDinhKem: [null],
            ghiChu: [''],
            idTrangThaiDuLieu: [TrangThaiDuLieuEnum.SU_DUNG_CHINH],
        });
    }
}
