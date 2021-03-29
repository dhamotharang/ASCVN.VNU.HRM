import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService } from '@core/services/common';
import { FormUtil } from '@core/utils/form';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { BaseLaboratoryFormComponent } from '../../../_base/base-laboratory-form.component';
import { IDangKySuDungThietBi } from '../../../_models/ptn.model';

@Component({
  selector: 'app-form-chon-thiet-bi',
  templateUrl: './form-chon-thiet-bi.component.html',
  styleUrls: ['./form-chon-thiet-bi.component.scss'],
  animations: [],
})
export class FormChonThietBiComponent extends BaseLaboratoryFormComponent<IDangKySuDungThietBi> implements OnInit, OnDestroy {

    constructor(
        protected apiService: ApiService,
        private formBuilder: FormBuilder,
        private notification: NotificationService,
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
            id: [null],
            idPhongThiNghiem: [null, Validators.required],
            idThietBi: [null, Validators.required],
            idVatTu: [null],
            mucTieuHao: [null],
            dieuKienVanHanh: [null],
            ghiChu : [''],
        });
    }

    onSubmit() {

        if (this.form.invalid) {
            FormUtil.validateAllFormFields(this.form);
            return;
        }
    }

}
