import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActionEnum } from '@core/constants/enum.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService, CustomTranslateService } from '@core/services/common';
import { FormUtil } from '@core/utils/form';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { takeUntil } from 'rxjs/operators';
import { BaseLaboratoryCatalogFormComponent } from '../../_base';
import { ITrangThaiKHCN } from '../../_models/ptn.model';

@Component({
    selector: 'app-form-trang-thai-khcn',
    templateUrl: './form-trang-thai-khcn.component.html',
    styleUrls: ['./form-trang-thai-khcn.component.scss'],
})
export class FormTrangThaiKhcnComponent extends BaseLaboratoryCatalogFormComponent<ITrangThaiKHCN> implements OnInit, OnDestroy {
    url = UrlConstant.API.DM_TRANG_THAI_KHCN;

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

    createForm() {
        this.form = this.formBuilder.group({
            id: [0],
            ma: ['', Validators.required],
            ten: ['', Validators.required],
            stt: [null],
            isVisible: [true],
            ghiChu: [''],
            cssClass: [''],
        });
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
                        .post(this.url, this.form.value)
                        .pipe(takeUntil(this.destroyed$))
                        .subscribe(res => {
                            this.notification.showSuccessMessage(this.translate.get('MES.CREATE_DONE'));
                            this.closeForm();
                        });
                    break;
                case ActionEnum.UPDATE:
                    this.apiService
                        .put(this.url, this.form.value)
                        .pipe(takeUntil(this.destroyed$))
                        .subscribe(res => {
                            this.notification.showSuccessMessage(this.translate.get('MES.UPDATE_DONE'));
                            this.closeForm();
                        });
                    break;
            }
        }
    }
}
