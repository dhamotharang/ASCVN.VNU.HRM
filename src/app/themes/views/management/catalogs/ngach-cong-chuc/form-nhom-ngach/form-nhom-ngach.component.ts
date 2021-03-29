import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActionEnum } from '@core/constants/enum.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { INhomNgach } from '@themes/views/management/catalogs/_models/catalog.model';
import { NotificationService } from '@core/services/common/notification.service';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { takeUntil } from 'rxjs/operators';
import { FormUtil } from '@core/utils/form';
import { BaseCatalogFormComponent } from '../../_base/base-catalog-form.component';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';

@Component({
    selector: 'app-form-nhom-ngach',
    templateUrl: './form-nhom-ngach.component.html',
    styleUrls: ['./form-nhom-ngach.component.scss'],
})
export class FormNhomNgachComponent extends BaseCatalogFormComponent<INhomNgach> implements OnInit, OnDestroy {
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
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    onSubmit() {
        if (this.form.invalid) {
            // trigger validate all field
            FormUtil.validateAllFormFields(this.form);
            return;
        }
        if (this.form.valid) {
            switch (this.action) {
                case ActionEnum.CREATE:
                    this.apiService
                        .post(UrlConstant.API.DM_NHOM_NGACH, this.form.value)
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
                        .put(UrlConstant.API.DM_NHOM_NGACH, this.form.value)
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
            nhomNgachId: [0],
            ma: ['', Validators.required],
            ten: ['', Validators.required],
            stt: [null],
            isVisible: [true],
            ghiChu: [''],
        });
    }
}
