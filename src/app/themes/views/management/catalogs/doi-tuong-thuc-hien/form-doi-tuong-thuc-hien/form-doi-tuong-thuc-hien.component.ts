import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { ApiService } from '@core/data-services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { IDoiTuongThucHien } from '@themes/views/management/catalogs/_models/catalog.model';
import { ActionEnum } from '@core/constants/enum.constant';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from '@core/services/common/notification.service';
import { BaseCatalogFormComponent } from '../../_base/base-catalog-form.component';
import { takeUntil } from 'rxjs/operators';
import { FormUtil } from '@core/utils/form';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';

@Component({
    selector: 'app-form-doi-tuong-thuc-hien',
    templateUrl: './form-doi-tuong-thuc-hien.component.html',
    styleUrls: ['./form-doi-tuong-thuc-hien.component.scss'],
})
export class FormDoiTuongThucHienComponent extends BaseCatalogFormComponent<IDoiTuongThucHien> implements OnInit, OnDestroy {
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
        if (this.model) {
            // split id chuc vu
            if (this.model.dsChucVuId && this.model.dsChucVuId !== '') {
                // 1,2,4,5
                const arr = Array.from(this.model.dsChucVuId.split(','), Number);
                this.form.get('dsChucVu').setValue(arr);
            }
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
            // join id chuc vu
            const numOfItem = this.form.get('dsChucVu').value;
            if (numOfItem && numOfItem.length > 0) {
                this.form.get('dsChucVuId').setValue(numOfItem.join(','));
            }

            switch (this.action) {
                case ActionEnum.CREATE:
                    this.apiService
                        .post(UrlConstant.API.DM_DOI_TUONG_THUC_HIEN, this.form.value)
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
                        .put(UrlConstant.API.DM_DOI_TUONG_THUC_HIEN, this.form.value)
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
            doiTuongThucHienId: [0],
            ma: ['', Validators.required],
            ten: ['', Validators.required],
            stt: [null],
            isVisible: [true],
            ghiChu: [''],
            dsChucVuId: [''],
            dsChucVu: [[]],
        });
    }
}
