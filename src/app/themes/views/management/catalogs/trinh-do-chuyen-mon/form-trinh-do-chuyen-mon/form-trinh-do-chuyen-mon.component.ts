import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { ApiService } from '@core/data-services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ITrinhDoChuyenMon } from '@themes/views/management/catalogs/_models/catalog.model';
import { ActionEnum } from '@core/constants/enum.constant';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from '@core/services/common/notification.service';
import { BaseCatalogFormComponent } from '@themes/views/management/catalogs/_base/base-catalog-form.component';
import { FormUtil } from '@core/utils/form';
import { takeUntil } from 'rxjs/operators';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';

@Component({
    selector: 'app-form-trinh-do-chuyen-mon',
    templateUrl: './form-trinh-do-chuyen-mon.component.html',
    styleUrls: ['./form-trinh-do-chuyen-mon.component.scss'],
})
export class FormTrinhDoChuyenMonComponent extends BaseCatalogFormComponent<ITrinhDoChuyenMon> implements OnInit, OnDestroy {
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
            FormUtil.validateAllFormFields(this.form);
            return;
        }
        if (this.form.valid) {
            switch (this.action) {
                case ActionEnum.CREATE:
                    this.apiService
                        .post(UrlConstant.API.DM_TRINH_DO_CHUYEN_MON, this.form.value)
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
                        .put(UrlConstant.API.DM_TRINH_DO_CHUYEN_MON, this.form.value)
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
            trinhDoChuyenMonId: [0],
            ma: ['', Validators.required],
            ten: ['', Validators.required],
            stt: [null],
            isVisible: [true],
            ghiChu: [''],
        });
    }
}
