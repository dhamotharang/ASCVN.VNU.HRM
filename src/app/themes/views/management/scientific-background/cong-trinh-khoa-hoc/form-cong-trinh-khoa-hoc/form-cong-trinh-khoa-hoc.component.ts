import { NotificationService } from '@core/services/common/notification.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActionEnum } from '@core/constants/enum.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '@core/data-services/api.service';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { ICongTrinhKhoaHoc } from '@themes/views/management/scientific-background/_models/scientific-background.model';
import { takeUntil } from 'rxjs/operators';
import { BaseScientificBackgroundFormComponent } from '../../_base/base-scientific-background-form.component';
import { FormUtil } from '@core/utils/form';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';

@Component({
    selector: 'app-form-cong-trinh-khoa-hoc',
    templateUrl: './form-cong-trinh-khoa-hoc.component.html',
    styleUrls: ['./form-cong-trinh-khoa-hoc.component.scss'],
})
export class FormCongTrinhKhoaHocComponent extends BaseScientificBackgroundFormComponent<ICongTrinhKhoaHoc> implements OnInit, OnDestroy {
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
                        .post(UrlConstant.API.LLKH_CONG_TRINH_KHOA_HOC, this.form.value)
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
                        .put(UrlConstant.API.LLKH_CONG_TRINH_KHOA_HOC, this.form.value)
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
            congTrinh: ['', Validators.required],
            namXuatBan: [null, Validators.required],
            idTapChi: [null],
            idHoiNghi: [null],
            idLinhVuc: [null],
            volume: [''],
            trangSo: [null],
            ghiChu: [''],
        });
    }
}
