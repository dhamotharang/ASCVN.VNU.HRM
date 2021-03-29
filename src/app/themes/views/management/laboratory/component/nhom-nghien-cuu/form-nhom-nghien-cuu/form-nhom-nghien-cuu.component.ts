import { INhomNghienCuu } from './../../../_models/ptn.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UrlConstant } from '@core/constants/url.constant';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService } from '@core/services/common';
import { MenuQuery } from '@management-state/menu/menu.query';
import { ActionEnum } from '@core/constants/enum.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { takeUntil } from 'rxjs/operators';
import { WindowRef, WindowService } from '@progress/kendo-angular-dialog';
import { BaseLaboratoryFormComponent } from '../../../_base/base-laboratory-form.component';
import { FormUtil } from '@core/utils/form';

@Component({
    selector: 'app-form-nhom-nghien-cuu',
    templateUrl: './form-nhom-nghien-cuu.component.html',
    styleUrls: ['./form-nhom-nghien-cuu.component.scss'],
})
export class FormNhomNghienCuuComponent extends BaseLaboratoryFormComponent<INhomNghienCuu> implements OnInit, OnDestroy {
    url: string = UrlConstant.API.NHOM_NGHIEN_CUU;
    constructor(
        protected apiService: ApiService,
        private notification: NotificationService,
        private formBuilder: FormBuilder,
        protected windowService: WindowService,
        protected menuQuery: MenuQuery,
        protected windowRef: WindowRef
    ) {
        super(windowRef, apiService);
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
            idPhongThiNghiem: [null, Validators.required],
            maNhomNghienCuu: ['', Validators.required],
            tenNhomNghienCuu: ['', Validators.required],
            tenNhomTruong: ['', Validators.required],
            namCongNhan: [null, Validators.required],
            isVisible: [true],
            moTa: [''],
            ghiChu: [''],
        });
    }

    onSubmit() {
        if (this.form.invalid) {
            FormUtil.validateAllFormFields(this.form);
            return;
        }
        switch (this.action) {
            case ActionEnum.CREATE:
                const create$ = this.apiService.post(this.url, this.form.value).pipe(takeUntil(this.destroyed$));

                create$.subscribe(() => {
                    this.notification.showSuccessMessage(MessageConstant.COMMON.MSG_CREATE_DONE);
                    this.closeForm();
                });
                break;
            case ActionEnum.UPDATE:
                const update$ = this.apiService.put(this.url, this.form.value).pipe(takeUntil(this.destroyed$));

                update$.subscribe(() => {
                    this.notification.showSuccessMessage(MessageConstant.COMMON.MSG_UPDATE_DONE);
                    this.closeForm();
                });
                break;
        }
    }
}
