import { Input } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActionEnum } from '@core/constants/enum.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { CustomTranslateService, EventBus, EventBusService, NotificationService } from '@core/services/common';
import { FormUtil } from '@core/utils/form';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BaseLaboratoryCatalogFormComponent } from '../../_base/base-laboratory-catalog-form.component';
import { IKetQuaDuKien } from '../../_models/ptn.model';

@Component({
    selector: 'app-form-ket-qua-du-kien',
    templateUrl: './form-ket-qua-du-kien.component.html',
    styleUrls: ['./form-ket-qua-du-kien.component.scss']
})
export class FormKetQuaDuKienComponent extends BaseLaboratoryCatalogFormComponent<IKetQuaDuKien> implements OnInit, OnDestroy {
    @Input() idNhomCongCu: number;
    url:string = UrlConstant.API.DM_KET_QUA_DU_KIEN;
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
            idNhomKetQuaDuKien: [this.idNhomCongCu, Validators.required],
            ma: ['', Validators.required],
            ten: ['', Validators.required],
            stt: [null],
            isVisible: [true],
            ghiChu: [''],
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
