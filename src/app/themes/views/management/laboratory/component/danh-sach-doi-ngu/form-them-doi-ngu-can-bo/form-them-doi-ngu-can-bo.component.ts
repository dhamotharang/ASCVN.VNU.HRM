import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticateService, IUserInfo } from '@core/auth';
import { ActionEnum } from '@core/constants/enum.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService } from '@core/services/common';
import { FormUtil } from '@core/utils/form';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { takeUntil } from 'rxjs/operators';
import { BaseLaboratoryFormComponent } from '../../../_base/base-laboratory-form.component';
import { IDoiNguCanBo } from '../../../_models/ptn.model';

@Component({
  selector: 'app-form-them-doi-ngu-can-bo',
  templateUrl: './form-them-doi-ngu-can-bo.component.html',
  styleUrls: ['./form-them-doi-ngu-can-bo.component.scss']
})
export class FormThemDoiNguCanBoComponent extends BaseLaboratoryFormComponent<IDoiNguCanBo> implements OnInit, OnDestroy {

    idPhongThiNghiem: number;
    isDisabled: boolean = false;
    userSelected: number[] = [];
    user: IUserInfo;

    constructor(
        protected apiService: ApiService,
        private formBuilder: FormBuilder,
        private notification: NotificationService,
        protected windowRef: WindowRef,
        private auth: AuthenticateService

    ) {
        super(windowRef, null);
    }

    ngOnInit() {
        super.ngOnInit();
        if(this.idPhongThiNghiem != null && this.idPhongThiNghiem > 0)
        {
            this.form.get("idPhongThiNghiem").setValue(this.idPhongThiNghiem);
            this.isDisabled = true;
        }
        // this.user = this.auth.getUserInfo();

        // if (this.action === ActionEnum.CREATE) {
        //     if (this.user.doiTuongId) {
        //         const idUser = parseInt(this.user.doiTuongId,10);
        //         this.userSelected.push(idUser);
        //         this.form.get('idNhanSu').setValue(idUser);
        //     }
        // }
        if (this.action === ActionEnum.UPDATE && this.form.get('idNhanSu').value) {
            this.userSelected.push(this.form.get('idNhanSu').value);
        }
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    createForm() {
        this.form = this.formBuilder.group({
            id: [0],
            idPhongThiNghiem: [null, Validators.required],
            idNhanSu: [null, Validators.required],
            idNganh: [null],
            idChuyenNganh: [null],
            khoaHocDaoTao: [''],
            vanHanhThietBi: [''],
            kinhNghiemVanHanh: [''],
            chungChi: [''],
            idKyNangVanHanh: [null],
            isVisible: [null],
            ghiChu: [null],
            idVaiTro: [null],
            isCoHuu: [null]
        });
    }

    onSubmit() {
        if (this.form.invalid) {
            FormUtil.validateAllFormFields(this.form);
            return;
        }

        if(this.idPhongThiNghiem != null && this.idPhongThiNghiem > 0)
        {
            this.form.get("idPhongThiNghiem").setValue(this.idPhongThiNghiem);
        }

        switch (this.action) {
            case ActionEnum.CREATE:
                const create$ = this.apiService.post(UrlConstant.API.DOI_NGU_CAN_BO, this.form.value).pipe(takeUntil(this.destroyed$));

                create$.subscribe(() => {
                    this.notification.showSuccessMessage(MessageConstant.COMMON.MSG_CREATE_DONE);
                    this.closeForm();
                });
                break;
            case ActionEnum.UPDATE:
                const update$ = this.apiService.put(UrlConstant.API.DOI_NGU_CAN_BO, this.form.value).pipe(takeUntil(this.destroyed$));

                update$.subscribe(() => {
                    this.notification.showSuccessMessage(MessageConstant.COMMON.MSG_UPDATE_DONE);
                    this.closeForm();
                });
                break;
        }
    }

}
