import { ICoQuan } from '@themes/views/management/catalogs/_models/catalog.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActionEnum } from '@core/constants/enum.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService } from '@core/services/common/notification.service';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { CustomEmailValidator, PhoneNumberValidator } from '@core/helpers/validator.helper';
import { BaseCatalogFormComponent } from '@themes/views/management/catalogs/_base/base-catalog-form.component';
import { FormUtil } from '@core/utils/form';
import { takeUntil } from 'rxjs/operators';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';

@Component({
    selector: 'app-form-co-quan',
    templateUrl: './form-co-quan.component.html',
    styleUrls: ['./form-co-quan.component.scss'],
})
export class FormCoQuanComponent extends BaseCatalogFormComponent<ICoQuan> implements OnInit, OnDestroy {
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
                        .post(UrlConstant.API.DM_CO_QUAN, this.form.value)
                        .pipe(takeUntil(this.destroyed$))
                        .subscribe(() => {
                            // show notification
                            this.notification.showSuccessMessage(this.translate.get('MES.CREATE_DONE'));
                            // close form
                            this.closeForm();
                        });
                    break;
                case ActionEnum.UPDATE:
                    this.apiService
                        .put(UrlConstant.API.DM_CO_QUAN, this.form.value)
                        .pipe(takeUntil(this.destroyed$))
                        .subscribe(() => {
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
            coQuanId: [0],
            ma: ['', Validators.required],
            ten: ['', Validators.required],
            stt: [null],
            isVisible: [true],
            ghiChu: [''],
            tenVietTat: [''],
            diaChi: [''],
            soDienThoai: ['', PhoneNumberValidator],
            soFax: [''],
            emailLienHe: ['', CustomEmailValidator],
            khoiCoQuanId: [null, Validators.required],
            coQuanTrucThuocId: [0],
            nhanSuDaiDienId: [0],
        });
    }
}
