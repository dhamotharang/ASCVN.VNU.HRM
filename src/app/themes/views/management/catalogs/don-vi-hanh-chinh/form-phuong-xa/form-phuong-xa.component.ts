import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActionEnum } from '@core/constants/enum.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { IPhuongXa } from '@themes/views/management/catalogs/_models/catalog.model';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import { NotificationService } from '@core/services/common/notification.service';
import { FormUtil } from '@core/utils/form';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { takeUntil } from 'rxjs/operators';
import { BaseCatalogFormComponent } from '../../_base/base-catalog-form.component';

@Component({
    selector: 'app-form-phuong-xa',
    templateUrl: './form-phuong-xa.component.html',
    styleUrls: ['./form-phuong-xa.component.scss'],
})
export class FormPhuongXaComponent extends BaseCatalogFormComponent<IPhuongXa> implements OnInit, OnDestroy {
    @Input() tinhThanhId: number;
    @Input() quanHuyenId: number;
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
        if (this.tinhThanhId && this.quanHuyenId) {
            this.form.get('tinhThanhId').setValue(this.tinhThanhId);
            this.form.get('quanHuyenId').setValue(this.quanHuyenId);
        }
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
                        .post(UrlConstant.API.DM_PHUONG_XA, this.form.value)
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
                        .put(UrlConstant.API.DM_PHUONG_XA, this.form.value)
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
            phuongXaId: [0],
            ma: ['', Validators.required],
            ten: ['', Validators.required],
            stt: [null],
            quanHuyenId: [null],
            tinhThanhId: [null],
            isVisible: [true],
            ghiChu: [''],
        });
    }
}
