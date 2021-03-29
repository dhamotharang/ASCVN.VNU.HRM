import { OnInit } from "@angular/core";
import { OnDestroy } from "@angular/core";
import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActionEnum } from "@core/constants/enum.constant";
import { UrlConstant } from "@core/constants/url.constant";
import { ApiService } from "@core/data-services/api.service";
import { CustomTranslateService, NotificationService } from "@core/services/common";
import { FormUtil } from "@core/utils/form";
import { WindowRef } from "@progress/kendo-angular-dialog";
import { takeUntil } from "rxjs/operators";
import { BaseLaboratoryCatalogFormComponent } from "../../_base/base-laboratory-catalog-form.component";
import { IVaiTroKHCN } from "../../_models/ptn.model";
@Component({
    selector: 'app-form-vai-tro-khcn',
    templateUrl: './form-vai-tro-khcn.component.html',
    styleUrls: ['./form-vai-tro-khcn.component.scss']
})
export class FormVaiTroKhcnComponent extends BaseLaboratoryCatalogFormComponent<IVaiTroKHCN> implements OnInit, OnDestroy {
    url: string = UrlConstant.API.DM_VAI_TRO_KHCN;
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

    createForm() {
        this.form = this.formBuilder.group({
            id: [0],
            ma: ['', Validators.required],
            ten: ['', Validators.required],
            stt: [null],
            isVisible: [true],
            ghiChu: [''],
            cssClass: [''],
        });
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
                        .post(this.url, this.form.value)
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
                        .put(this.url, this.form.value)
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
}
