import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActionEnum } from '@core/constants/enum.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService, CustomTranslateService } from '@core/services/common';
import { FormUtil } from '@core/utils/form';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { BaseLaboratoryFormComponent } from '@themes/views/management/laboratory/_base';
import { takeUntil } from 'rxjs/operators';
import { ITinhTrangSanPham } from '../../_models/ptn.model';
@Component({
    selector: 'app-form-tinh-trang-san-pham',
    templateUrl: './form-tinh-trang-san-pham.component.html',
    styleUrls: ['./form-tinh-trang-san-pham.component.scss']
})
export class FormTinhTrangSanPhamComponent extends BaseLaboratoryFormComponent<ITinhTrangSanPham> implements OnInit, OnDestroy {
    constructor(
        protected apiService: ApiService,
        private formBuilder: FormBuilder,
        private notification: NotificationService,
        private translate: CustomTranslateService,
        protected window: WindowRef
    ) {
        super(window, null);
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
        });
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
                        .post(UrlConstant.API.DM_TINH_TRANG_SAN_PHAM, this.form.value)
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
                        .put(UrlConstant.API.DM_TINH_TRANG_SAN_PHAM, this.form.value)
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
}
