import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticateService } from '@core/auth';
import { ActionEnum } from '@core/constants/enum.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService } from '@core/services/common';
import { DateUtil } from '@core/utils/date';
import { FormUtil } from '@core/utils/form';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { takeUntil } from 'rxjs/operators';
import { BaseLaboratoryFormComponent } from '../../../_base/base-laboratory-form.component';
import { IMangRaNgoai } from '../../../_models/ptn.model';

@Component({
    selector: 'app-form-mang-ra-ngoai',
    templateUrl: './form-mang-ra-ngoai.component.html',
    styleUrls: ['./form-mang-ra-ngoai.component.scss'],
})
export class FormMangRaNgoaiComponent extends BaseLaboratoryFormComponent<IMangRaNgoai> implements OnInit, OnDestroy {
    userSelected: number[] = [];
    listNhanSu: any[] = [];
    idThietBi: number;
    isMain: Boolean = false;
    constructor(
        protected apiService: ApiService,
        private formBuilder: FormBuilder,
        private notification: NotificationService,
        protected windowRef: WindowRef,
        protected auth: AuthenticateService
    ) {
        super(windowRef, apiService);
    }

    ngOnInit() {
        super.ngOnInit();
        this.user = this.auth.getUserInfo();
        if (this.action === ActionEnum.CREATE) {
            if (this.user.doiTuongId) {
                const idUser = parseInt(this.user.doiTuongId, 10);
                this.userSelected.push(idUser);
                this.form.get('idNguoiDangKy').setValue(idUser);
            }
        }
        if (this.action === ActionEnum.UPDATE && this.form.get('idNguoiDangKy').value) {
            // set value
            this.userSelected.push(this.form.get('idNguoiDangKy').value);
        }
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    createForm() {
        this.form = this.formBuilder.group({
            id: [0],
            idThietBi: [null, Validators.required],
            idNguoiDangKy: [null, Validators.required],
            ngayThucHien: [null, Validators.required],
            lyDo: ['', Validators.required],
            idTrangThaiMangRaNgoai: [null, Validators.required],
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
                const create$ = this.apiService.post(UrlConstant.API.MANG_RA_NGOAI, this.form.value).pipe(takeUntil(this.destroyed$));

                create$.subscribe(() => {
                    this.notification.showSuccessMessage(MessageConstant.COMMON.MSG_CREATE_DONE);
                    this.closeForm();
                });
                break;
            case ActionEnum.UPDATE:
                const update$ = this.apiService.put(UrlConstant.API.MANG_RA_NGOAI, this.form.value).pipe(takeUntil(this.destroyed$));

                update$.subscribe(() => {
                    this.notification.showSuccessMessage(MessageConstant.COMMON.MSG_UPDATE_DONE);
                    this.closeForm();
                });
                break;
        }
    }
}
