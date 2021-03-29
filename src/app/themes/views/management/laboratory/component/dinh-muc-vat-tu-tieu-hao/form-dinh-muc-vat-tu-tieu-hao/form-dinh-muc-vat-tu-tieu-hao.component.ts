import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { IDinhMucTieuHao } from '../../../_models/ptn.model';

@Component({
    selector: 'app-form-dinh-muc-vat-tu-tieu-hao',
    templateUrl: './form-dinh-muc-vat-tu-tieu-hao.component.html',
    styleUrls: ['./form-dinh-muc-vat-tu-tieu-hao.component.scss'],
    animations: [],
})
export class FormDinhMucVatTuTieuHaoComponent extends BaseLaboratoryFormComponent<IDinhMucTieuHao> implements OnInit, OnDestroy {
    idThietBi: number;
    isDisabled: boolean;

    constructor(
        protected apiService: ApiService,
        private formBuilder: FormBuilder,
        private notification: NotificationService,
        protected windowRef: WindowRef
    ) {
        super(windowRef, null);
    }

    ngOnInit() {
        this.isDisabled = true;
        super.ngOnInit();
        if (this.idThietBi != null && this.idThietBi != undefined && this.idThietBi > 0) {
            this.form.get('idThietBi').setValue(this.idThietBi);
            this.isDisabled = true;
        }
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    createForm() {
        this.form = this.formBuilder.group({
            id: [null],
            idThietBi: [null, Validators.required],
            idVatTu: [null, Validators.required],
            idNhomCongCu: [null, Validators.required],
            tieuHao: [null],
            idDonViTinh: [null],
            loaiTieuHao: [null, Validators.required],
            ghiChu: [''],
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
                const create$ = this.apiService.post(UrlConstant.API.PTN_VAT_TU_TIEU_HAO, this.form.value).pipe(takeUntil(this.destroyed$));

                create$.subscribe(() => {
                    this.notification.showSuccessMessage(MessageConstant.COMMON.MSG_CREATE_DONE);
                    this.closeForm();
                });
                break;
            case ActionEnum.UPDATE:
                const update$ = this.apiService.put(UrlConstant.API.PTN_VAT_TU_TIEU_HAO, this.form.value).pipe(takeUntil(this.destroyed$));

                update$.subscribe(() => {
                    this.notification.showSuccessMessage(MessageConstant.COMMON.MSG_UPDATE_DONE);
                    this.closeForm();
                });
                break;
        }
    }
}
