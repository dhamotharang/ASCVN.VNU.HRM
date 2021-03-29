import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService } from '@core/services/common';
import { FormUtil } from '@core/utils/form';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { INhanSuDeXuat } from '../../_models';

@Component({
    selector: 'app-form-cap-nhat-tai-khoan',
    templateUrl: './form-cap-nhat-tai-khoan.component.html',
    styleUrls: ['./form-cap-nhat-tai-khoan.component.scss'],
})
export class FormCapNhatTaiKhoanComponent implements OnInit, OnDestroy {
    @Input() model: INhanSuDeXuat;

    form: FormGroup;

    private destroyed$ = new Subject();
    constructor(
        private formBuilder: FormBuilder,
        private apiService: ApiService,
        private notificationService: NotificationService,
        private windowRef: WindowRef
    ) {}

    ngOnInit() {
        this.createForm();
        if (this.model) {
            this.form.patchValue(this.model);
        }
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    private createForm() {
        this.form = this.formBuilder.group({
            userName: [''],
            userNameNew: [''],
            password: [''],
            isPASS_CMND: [true],
        });
    }

    onSubmit() {
        if (!this.form.get('isPASS_CMND').value) {
            this.form.get('password').setValidators([Validators.required]);
            this.form.get('password').updateValueAndValidity();
        } else {
            this.form.get('password').clearValidators();
            this.form.get('password').updateValueAndValidity();
        }
        if (this.form.invalid) {
            FormUtil.validateAllFormFields(this.form);
            return;
        }
        /////
        const flagPassword = this.form.get('isPASS_CMND').value;
        const flagChangeUserName = this.form.get('userNameNew').value && this.form.get('userNameNew').value !== '';
        const data = {
            userName: flagChangeUserName ? this.form.get('userNameNew').value : this.form.get('userName').value,
            password: flagPassword ? this.model.soCMND : this.form.get('password').value,
            firstName: this.model.ten,
            lastName: this.model.hoDem,
            doiTuongId: this.model.id,
            parentId: 26,
        };
        this.apiService
            .post(UrlConstant.API.SYSTEM.USERS + '/CreateNewUserFromNhansu', data)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(() => {
                // show notification
                this.notificationService.showSuccessMessage(MessageConstant.COMMON.MSG_UPDATE_DONE);
                // close form
                this.closeForm();
            });
    }

    closeForm() {
        this.windowRef.close();
    }
}
