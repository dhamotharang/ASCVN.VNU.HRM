import { WindowRef } from '@progress/kendo-angular-dialog';
import { NotificationService } from '@core/services/common/notification.service';
import { UtilService } from '@core/services/common/util.service';
import { ApiService } from '@core/data-services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActionEnum } from '@core/constants/enum.constant';
import { INgoaiNgu } from '@themes/views/management/catalogs/_models/catalog.model';
import { UrlConstant } from '@core/constants/url.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormUtil } from '@core/utils/form';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BaseCatalogFormComponent } from '../../_base/base-catalog-form.component';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';

@Component({
    selector: 'app-form-ngoai-ngu',
    templateUrl: './form-ngoai-ngu.component.html',
    styleUrls: ['./form-ngoai-ngu.component.scss'],
})
export class FormNgoaiNguComponent extends BaseCatalogFormComponent<INgoaiNgu> implements OnInit, OnDestroy {
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
                        .post(UrlConstant.API.DM_NGOAI_NGU, this.form.value)
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
                        .put(UrlConstant.API.DM_NGOAI_NGU, this.form.value)
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
            ngoaiNguId: [0],
            ma: ['', Validators.required],
            ten: ['', Validators.required],
            stt: [null],
            isVisible: [true],
            ghiChu: [''],
        });
    }
}
