import { Component, OnDestroy, OnInit } from '@angular/core';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { BaseLaboratoryFormComponent } from '../../../_base/base-laboratory-form.component';
import { ApiService } from '@core/data-services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '@core/services/common';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { FormUtil } from '@core/utils/form';
import { ActionEnum } from '@core/constants/enum.constant';
import { takeUntil } from 'rxjs/operators';
import { UrlConstant } from '@core/constants/url.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { FOLDER } from '@core/constants/app.constant';
import { IHuongDanSuDung } from '../../../_models/ptn.model';

@Component({
  selector: 'app-form-huong-dan-su-dung',
  templateUrl: './form-huong-dan-su-dung.component.html',
  styleUrls: ['./form-huong-dan-su-dung.component.scss'],
  animations: [],

})
export class FormHuongDanSuDungComponent extends BaseLaboratoryFormComponent<IHuongDanSuDung> implements OnInit, OnDestroy {

    folder = FOLDER;
    idThietBi: number;
    constructor(
        protected apiService: ApiService,
        private formBuilder: FormBuilder,
        private notification: NotificationService,
        protected windowRef: WindowRef
    ) {
        super(windowRef, null);
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
            idThietBi: [null, Validators.required],
            tieuDe: ['', Validators.required],
            ghiChu: [''],
            idsFileDinhKem: [[]],
        });
    }

    onSubmit() {
        if (this.idThietBi != null && this.idThietBi != undefined && this.idThietBi > 0) {
            this.form.get('idThietBi').setValue(this.idThietBi);
        }
        if (this.form.invalid) {
            FormUtil.validateAllFormFields(this.form);
            return;
        }
        switch (this.action) {
            case ActionEnum.CREATE:
                const create$ = this.apiService.post(UrlConstant.API.HUONG_DAN_SU_DUNG, this.form.value).pipe(takeUntil(this.destroyed$));

                create$.subscribe(() => {
                    this.notification.showSuccessMessage(MessageConstant.COMMON.MSG_CREATE_DONE);
                    this.closeForm();
                });
                break;
            case ActionEnum.UPDATE:
                const update$ = this.apiService.put(UrlConstant.API.HUONG_DAN_SU_DUNG, this.form.value).pipe(takeUntil(this.destroyed$));

                update$.subscribe(() => {
                    this.notification.showSuccessMessage(MessageConstant.COMMON.MSG_UPDATE_DONE);
                    this.closeForm();
                });
                break;
        }
    }
}
