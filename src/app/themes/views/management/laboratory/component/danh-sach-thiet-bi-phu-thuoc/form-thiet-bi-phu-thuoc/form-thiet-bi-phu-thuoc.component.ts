
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActionEnum } from '@core/constants/enum.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService } from '@core/services/common';
import { FormUtil } from '@core/utils/form';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { takeUntil } from 'rxjs/operators';
import { BaseLaboratoryFormComponent } from '../../../_base/base-laboratory-form.component';
import { IThietBiPhuThuoc } from '../../../_models/ptn.model';

@Component({
  selector: 'app-form-thiet-bi-phu-thuoc',
  templateUrl: './form-thiet-bi-phu-thuoc.component.html',
  styleUrls: ['./form-thiet-bi-phu-thuoc.component.scss'],
  animations: [],
})
export class FormThietBiPhuThuocComponent extends BaseLaboratoryFormComponent<IThietBiPhuThuoc> implements OnInit, OnDestroy {

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
            idThietBiParent: [null, Validators.required],
            idThietBi: [null, Validators.required],
            ghiChu: [''],
        });
    }

    onSubmit() {

        if (this.idThietBi != null && this.idThietBi != undefined && this.idThietBi > 0) {
            this.form.get('idThietBiParent').setValue(this.idThietBi);
        }
        if (this.form.invalid) {
            FormUtil.validateAllFormFields(this.form);
            return;
        }

        switch (this.action) {
            case ActionEnum.CREATE:
                const create$ = this.apiService.post(UrlConstant.API.THIET_BI_PHU_THUOC, this.form.value).pipe(takeUntil(this.destroyed$));

                create$.subscribe(() => {
                    this.notification.showSuccessMessage(MessageConstant.COMMON.MSG_CREATE_DONE);
                    this.closeForm();
                });
                break;
            case ActionEnum.UPDATE:
                const update$ = this.apiService.put(UrlConstant.API.THIET_BI_PHU_THUOC, this.form.value).pipe(takeUntil(this.destroyed$));

                update$.subscribe(() => {
                    this.notification.showSuccessMessage(MessageConstant.COMMON.MSG_UPDATE_DONE);
                    this.closeForm();
                });
                break;
        }
    }

}
