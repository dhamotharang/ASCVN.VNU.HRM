import { NotificationService } from '@core/services/common/notification.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActionEnum } from '@core/constants/enum.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '@core/data-services/api.service';
import { UtilService } from '@core/services/common/util.service';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { ISanPhamUngDung } from '@themes/views/management/scientific-background/_models/scientific-background.model';
import { takeUntil } from 'rxjs/operators';
import { BaseScientificBackgroundFormComponent } from '../../_base/base-scientific-background-form.component';
import { FormUtil } from '@core/utils/form';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';

@Component({
    selector: 'app-form-san-pham-ung-dung',
    templateUrl: './form-san-pham-ung-dung.component.html',
    styleUrls: ['./form-san-pham-ung-dung.component.scss'],
})
export class FormSanPhamUngDungComponent extends BaseScientificBackgroundFormComponent<ISanPhamUngDung> implements OnInit, OnDestroy {
    constructor(
        private apiService: ApiService,
        private formBuilder: FormBuilder,
        private util: UtilService,
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
            if (this.form.get('thoiGian').value) {
                this.form.get('thoiGian').setValue(this.util.convertFullDate(this.form.get('thoiGian').value));
            }
            switch (this.action) {
                case ActionEnum.CREATE:
                    this.apiService
                        .post(UrlConstant.API.LLKH_SAN_PHAM_UNG_DUNG, this.form.value)
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
                        .put(UrlConstant.API.LLKH_SAN_PHAM_UNG_DUNG, this.form.value)
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
            sanPham: ['', Validators.required],
            hinhThuc: [''],
            thoiGian: [null, Validators.required],
            quyMo: [''],
            congDung: [''],
            diaChiApDung: [''],
            noiUngDung: [null],
            idLinhVuc: [null],
            ghiChu: [''],
        });
    }
}
