import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActionEnum } from '@core/constants/enum.constant';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService } from '@core/services/common/notification.service';
import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DropDownListEnum } from '@shared/containers/asc-select';
import { FormUtil } from '@core/utils/form';

@Component({
    selector: 'app-form-update-status-sso-user',
    templateUrl: './form-update-status-sso-user.component.html',
    styleUrls: ['./form-update-status-sso-user.component.scss']
})
export class FormUpdateStatusSsoUserComponent implements OnInit, OnDestroy {
    @Input() model: any;

    form: FormGroup;
    private destroyed$ = new Subject();

    constructor(
        private formBuilder: FormBuilder,
        private apiService: ApiService,
        private notificationService: NotificationService,
        private windowRef: WindowRef
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            trangThai: [true],
        });
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    onSubmit() {
        this.apiService.put(UrlConstant.API.ACL_USER + '/UpdateUserSSO', {
            idsNhanSu: this.model,
            isSSO: this.form.get('trangThai').value
        })
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
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
