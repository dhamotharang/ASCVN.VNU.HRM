import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActionEnum } from '@core/constants/enum.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { INhanSuChucDanhKhoaHoc } from '@themes/views/management/human-resource/_models/trinh-do.model';
import { NotificationService } from '@core/services/common/notification.service';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { takeUntil } from 'rxjs/operators';
import { DateUtil } from '@core/utils/date';
import { BaseHumanResourceFormComponent } from '@themes/views/management/human-resource/_base/base-human-resource-form.component';
import { FormUtil } from '@core/utils/form';
import { TrangThaiDuLieuEnum } from '@themes/views/management/human-resource/_models/human-resource.enum';
import { EmitEvent, EventBus, EventBusService } from '@core/services/common';

@Component({
    selector: 'app-form-chuc-danh-khoa-hoc',
    templateUrl: './form-chuc-danh-khoa-hoc.component.html',
    styleUrls: ['./form-chuc-danh-khoa-hoc.component.scss'],
})
export class FormChucDanhKhoaHocComponent extends BaseHumanResourceFormComponent<INhanSuChucDanhKhoaHoc> implements OnInit, OnDestroy {
    constructor(
        private apiService: ApiService,
        private formBuilder: FormBuilder,
        private notification: NotificationService,
        private eventBus: EventBusService,
        protected windowRef: WindowRef
    ) {
        super(windowRef);
    }

    ngOnInit() {
        super.ngOnInit();
        if (this.action === ActionEnum.UPDATE) {
            // set form value
            if (this.model.thang != null && this.model.nam != null) {
                this.form.get('namThang').setValue(DateUtil.convertMonthYearToDateTime(this.model.thang - 1, this.model.nam));
            }
            this.preModel = { ...this.form.value };
        }
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    createForm() {
        this.form = this.formBuilder.group({
            id: [0],
            idNhanSu: [null, Validators.required],
            idChucDanhKhoaHoc: [null, Validators.required],
            namThang: [null],
            nam: [null],
            thang: [null],
            noiCongNhan: [''],
            ghiChu: [''],
            idFileDinhKem: [null],
            idTrangThaiDuLieu: [TrangThaiDuLieuEnum.SU_DUNG_CHINH],
        });
    }

    onSubmit() {
        if (this.form.get('namThang').value) {
            const batDau = new Date(this.form.get('namThang').value);
            // set
            this.form.get('nam').setValue(batDau.getFullYear());
            this.form.get('thang').setValue(batDau.getMonth() + 1);
        }

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
                this.apiUrl = UrlConstant.API.HRM_NS_CHUC_DANH_KHOA_HOC;
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
}
