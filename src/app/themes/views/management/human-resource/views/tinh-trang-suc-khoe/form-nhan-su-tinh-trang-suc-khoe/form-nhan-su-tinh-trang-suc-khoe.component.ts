import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService } from '@core/services/common/notification.service';
import { UrlConstant } from '@core/constants/url.constant';
import { takeUntil } from 'rxjs/operators';
import { INhanSuSucKhoe } from '@themes/views/management/human-resource/_models/nhan-su-suc-khoe.model';
import { BaseHumanResourceFormComponent } from '@themes/views/management/human-resource/_base/base-human-resource-form.component';
import { FormUtil } from '@core/utils/form';
import { TrangThaiDuLieuEnum } from '@themes/views/management/human-resource/_models/human-resource.enum';
import { CustomTranslateService, EmitEvent, EventBus, EventBusService } from '@core/services/common';

@Component({
    selector: 'app-form-nhan-su-tinh-trang-suc-khoe',
    templateUrl: './form-nhan-su-tinh-trang-suc-khoe.component.html',
    styleUrls: ['./form-nhan-su-tinh-trang-suc-khoe.component.scss'],
})
export class FormNhanSuTinhTrangSucKhoeComponent extends BaseHumanResourceFormComponent<INhanSuSucKhoe> implements OnInit, OnDestroy {
    constructor(
        private apiService: ApiService,
        private formBuilder: FormBuilder,
        private notification: NotificationService,
        private translate: CustomTranslateService,
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

    onSubmit() {
        if (this.form.invalid) {
            FormUtil.validateAllFormFields(this.form);
            return;
        } else {
            if (this.preModel && (Object.entries(this.form.value).toString() === Object.entries(this.preModel).toString())) {
                this.closeForm();
            } else {
                // call api
                this.apiUrl = UrlConstant.API.HRM_NS_SUC_KHOE;
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

    createForm() {
        this.form = this.formBuilder.group({
            id: [0],
            idNhanSu: [this.nhanSuId, Validators.required],
            idTinhTrangSucKhoe: [null, Validators.required],
            canNang: [null],
            chieuCao: [null],
            idNhomMau: [null],
            idFileDinhKem: [null],
            ghiChu: [''],
            idTrangThaiDuLieu: [TrangThaiDuLieuEnum.SU_DUNG_CHINH],
        });
    }
}
