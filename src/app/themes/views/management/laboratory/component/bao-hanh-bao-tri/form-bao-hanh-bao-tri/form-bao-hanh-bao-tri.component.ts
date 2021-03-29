import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActionEnum } from '@core/constants/enum.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService } from '@core/services/common';
import { DateUtil } from '@core/utils/date';
import { FormUtil } from '@core/utils/form';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { takeUntil } from 'rxjs/operators';
import { BaseLaboratoryFormComponent } from '../../../_base/base-laboratory-form.component';
import { IBaoHanhBaoTri } from '../../../_models/ptn.model';

@Component({
  selector: 'app-form-bao-hanh-bao-tri',
  templateUrl: './form-bao-hanh-bao-tri.component.html',
  styleUrls: ['./form-bao-hanh-bao-tri.component.scss'],
  animations: [],

})
export class FormBaoHanhBaoTriComponent extends BaseLaboratoryFormComponent<IBaoHanhBaoTri> implements OnInit, OnDestroy {

    userSelected: number[] = [];
    listNhanSu: any[] = [];
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
        if (this.action === ActionEnum.UPDATE && this.form.get('idNguoiThucHien').value) {
            // set value
            this.userSelected.push(this.form.get('idNguoiThucHien').value);
        }
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    createForm() {

        this.form = this.formBuilder.group({
            id: [0],
            idThietBi: [null, Validators.required],
            ngayThucHien: [null, Validators.required],
            idNguoiThucHien: [null, Validators.required],
            idTinhTrangThietBi: [null, Validators.required],
            hinhThuc: [null, Validators.required],
            noiDungThucHien: [''],
            ghiChu: ['']
        });
    }

    onSubmit() {



        if (this.idThietBi != null && this.idThietBi != undefined && this.idThietBi > 0) {
            this.form.get('idThietBi').setValue(this.idThietBi);
        }

        if (this.form.get('ngayThucHien').value) {
            this.form.get('ngayThucHien').setValue(DateUtil.getFullDate(this.form.get('ngayThucHien').value));
        }
        if (this.form.invalid) {
            FormUtil.validateAllFormFields(this.form);
            return;
        }
        switch (this.action) {
            case ActionEnum.CREATE:
                const create$ = this.apiService.post(UrlConstant.API.BAO_HANH_BAO_TRI, this.form.value).pipe(takeUntil(this.destroyed$));

                create$.subscribe(() => {
                    this.notification.showSuccessMessage(MessageConstant.COMMON.MSG_CREATE_DONE);
                    this.closeForm();
                });
                break;
            case ActionEnum.UPDATE:
                const update$ = this.apiService.put(UrlConstant.API.BAO_HANH_BAO_TRI, this.form.value).pipe(takeUntil(this.destroyed$));

                update$.subscribe(() => {
                    this.notification.showSuccessMessage(MessageConstant.COMMON.MSG_UPDATE_DONE);
                    this.closeForm();
                });
                break;
        }
    }

}
