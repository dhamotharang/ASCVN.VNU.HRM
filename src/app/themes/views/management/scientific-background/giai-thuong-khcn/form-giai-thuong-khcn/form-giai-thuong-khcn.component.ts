import { NotificationService } from '@core/services/common/notification.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActionEnum } from '@core/constants/enum.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '@core/data-services/api.service';
import { UtilService } from '@core/services/common/util.service';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { IGiaiThuongKhcn } from '@themes/views/management/scientific-background/_models/scientific-background.model';
import { takeUntil } from 'rxjs/operators';
import { BaseScientificBackgroundFormComponent } from '../../_base/base-scientific-background-form.component';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';

@Component({
    selector: 'app-form-giai-thuong-khcn',
    templateUrl: './form-giai-thuong-khcn.component.html',
    styleUrls: ['./form-giai-thuong-khcn.component.scss'],
})
export class FormGiaiThuongKhcnComponent extends BaseScientificBackgroundFormComponent<IGiaiThuongKhcn> implements OnInit, OnDestroy {
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
            this.util.validateAllFormFields(this.form);
            return;
        }
        if (this.form.get('namTangThuong').value === '') {
            this.form.get('namTangThuong').setValue(null);
        }
        if (this.form.valid) {
            switch (this.action) {
                case ActionEnum.CREATE:
                    this.apiService
                        .post(UrlConstant.API.LLKH_GIAI_THUONG_KHCN, this.form.value)
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
                        .put(UrlConstant.API.LLKH_GIAI_THUONG_KHCN, this.form.value)
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
            idLinhVuc: [null],
            sanPham: [''],
            hinhThucVaNoiDung: ['', Validators.required],
            noiDungGiaiThuong: ['', Validators.required],
            toChuc: [''],
            namTangThuong: [null],
            ghiChu: [''],
        });
    }
}
