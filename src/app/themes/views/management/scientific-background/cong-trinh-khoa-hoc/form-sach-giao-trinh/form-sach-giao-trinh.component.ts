import { NotificationService } from '@core/services/common/notification.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActionEnum } from '@core/constants/enum.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '@core/data-services/api.service';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { ISachGiaoTrinh } from '@themes/views/management/scientific-background/_models/scientific-background.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormUtil } from '@core/utils/form';
import { BaseScientificBackgroundFormComponent } from '../../_base/base-scientific-background-form.component';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';

@Component({
    selector: 'app-form-sach-giao-trinh',
    templateUrl: './form-sach-giao-trinh.component.html',
    styleUrls: ['./form-sach-giao-trinh.component.scss'],
})
export class FormSachGiaoTrinhComponent extends BaseScientificBackgroundFormComponent<ISachGiaoTrinh> implements OnInit, OnDestroy {
    protected destroyed$ = new Subject();
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
                        .post(UrlConstant.API.LLKH_SACH_GIAO_TRINH, this.form.value)
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
                        .put(UrlConstant.API.LLKH_SACH_GIAO_TRINH, this.form.value)
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
            tacGia: ['', Validators.required],
            sach: ['', Validators.required],
            giaoTrinh: ['', Validators.required],
            idLinhVuc: [null],
            nhaXuatBan: [null],
            namXuatBan: [null, Validators.required],
            ghiChu: [''],
        });
    }
}
