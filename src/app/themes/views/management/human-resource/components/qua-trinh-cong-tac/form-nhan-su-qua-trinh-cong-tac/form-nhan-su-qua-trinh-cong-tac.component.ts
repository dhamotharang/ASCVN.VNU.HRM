import { NotificationService } from '@core/services/common/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionEnum } from '@core/constants/enum.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '@core/data-services/api.service';
import { UtilService } from '@core/services/common/util.service';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { INhanSuQuaTrinhCongTac } from '@themes/views/management/human-resource/_models/qua-trinh-cong-tac.model';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { BaseHumanResourceFormComponent } from '@themes/views/management/human-resource/_base/base-human-resource-form.component';
import { FormUtil } from '@core/utils/form';
import { DateUtil } from '@core/utils/date';
import { takeUntil } from 'rxjs/operators';
import { TrangThaiDuLieuEnum } from '@themes/views/management/human-resource/_models/human-resource.enum';
import { EmitEvent, EventBus, EventBusService } from '@core/services/common';

@Component({
    selector: 'app-form-nhan-su-qua-trinh-cong-tac',
    templateUrl: './form-nhan-su-qua-trinh-cong-tac.component.html',
    styleUrls: ['./form-nhan-su-qua-trinh-cong-tac.component.scss'],
})
export class FormNhanSuQuaTrinhCongTacComponent
    extends BaseHumanResourceFormComponent<INhanSuQuaTrinhCongTac>
    implements OnInit, OnDestroy {
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
            // trigger validate all field
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

                this.apiUrl = UrlConstant.API.HRM_NS_QUA_TRINH_CONG_TAC;
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
            donViCongTac: ['', Validators.required],
            congViecDamNhan: ['', Validators.required],
            ngayBatDau: [null],
            ngayKetThuc: [null],
            soQuyetDinh: [''],
            tenChucVu: [''],
            tenChucDanh: [''],
            ngayQuyetDinh: [null],
            ghiChu: [''],
            idTrangThaiDuLieu: [TrangThaiDuLieuEnum.SU_DUNG_CHINH],
        });
    }
}
