import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { UtilService } from '@core/services/common/util.service';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { ApiService } from '@core/data-services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ILoaiNhanSu } from '@themes/views/management/catalogs/_models/catalog.model';
import { ActionEnum } from '@core/constants/enum.constant';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NotificationService } from '@core/services/common/notification.service';
import { BaseCatalogFormComponent } from '@themes/views/management/catalogs/_base/base-catalog-form.component';
import { FormUtil } from '@core/utils/form';
import { takeUntil } from 'rxjs/operators';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';

@Component({
    selector: 'app-form-loai-nhan-su',
    templateUrl: './form-loai-nhan-su.component.html',
    styleUrls: ['./form-loai-nhan-su.component.scss'],
})
export class FormLoaiNhanSuComponent extends BaseCatalogFormComponent<ILoaiNhanSu> implements OnInit, OnDestroy {
    constructor(
        private apiService: ApiService,
        private formBuilder: FormBuilder,
        private notification: NotificationService,
        private translate: CustomTranslateService,
        protected window: WindowRef
    ) {
        super(window);
    }

    ngOnInit() {
        super.ngOnInit();
        if (ActionEnum.UPDATE && this.model.loaiNhanSuId) {
            this.form.get('id').setValue(this.model.loaiNhanSuId);
        } 
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    onSubmit() {
        if (this.form.invalid) {
            FormUtil.validateAllFormFields(this.form);
            return;
        }
        if (this.form.valid) {
            switch (this.action) {
                case ActionEnum.CREATE:
                    this.apiService
                        .post(UrlConstant.API.DM_LOAI_NHAN_SU, this.form.value)
                        .pipe(takeUntil(this.destroyed$))
                        .subscribe(res => {
                            // show notification
                            this.notification.showSuccessMessage(this.translate.get('MES.CREATE_DONE'));
                            // close form
                            this.closeForm();
                        });
                    break;
                case ActionEnum.UPDATE:
                    this.apiService
                        .put(UrlConstant.API.DM_LOAI_NHAN_SU, this.form.value)
                        .pipe(takeUntil(this.destroyed$))
                        .subscribe(res => {
                            // show notification
                            this.notification.showSuccessMessage(this.translate.get('MES.UPDATE_DONE'));
                            // close form
                            this.closeForm();
                        });
                    break;
            }
        }
    }

    createForm() {
        this.form = this.formBuilder.group({
            id: [0],
            ma: ['', Validators.required],
            ten: ['', Validators.required],
            stt: [null],
            isVisible: [true],
            ghiChu: [''],
        });
    }
}
