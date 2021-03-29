import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthenticateService, IUserInfo } from '@core/auth';
import { ActionEnum } from '@core/constants/enum.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService } from '@core/services/common';
import { FormUtil } from '@core/utils/form';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { map, takeUntil } from 'rxjs/operators';
import { BaseLaboratoryFormComponent } from '../../../_base/base-laboratory-form.component';
import { ISanPhamKHCN } from '../../../_models/ptn.model';

@Component({
    selector: 'app-form-them-san-pham-khcn',
    templateUrl: './form-them-san-pham-khcn.component.html',
    styleUrls: ['./form-them-san-pham-khcn.component.scss']
})
export class FormThemSanPhamKhcnComponent extends BaseLaboratoryFormComponent<ISanPhamKHCN> implements OnInit, OnDestroy {
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
        if(this.action == ActionEnum.CREATE){
            this.coQuanNhanSu$ = this.apiService.read(UrlConstant.API.HRM_DANH_MUC_CO_QUAN + '/ByNhanSu', {}).pipe(map(res => res.result));
            this.coQuanNhanSu$.subscribe(res => {
                if (res.idCoQuanCap1) {
                    this.form.get('idCoQuanNhanChuyenGiao').setValue(res.idCoQuanCap1);
                }
            });
            this.form.get("namHoanThanh").setValue(new Date().getFullYear());
        }
        if (this.idPhongThiNghiem != null && this.idPhongThiNghiem > 0) {
            this.form.get("idPhongThiNghiem").setValue(this.idPhongThiNghiem);
            this.isDisabled = true;
        }
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    createForm() {
        this.form = this.formBuilder.group({
            id: [0],
            idPhongThiNghiem: [null, Validators.required],
            maSanPham: ['', Validators.required],
            tenSanPham: ['', Validators.required],
            tenTacGia: [''],
            chungChi: [''],
            moTa: [''],
            namHoanThanh: [null],
            isChuyenGiao: [null],
            idCoQuanNhanChuyenGiao: [null],
            donNhanChuyenGiaoKhac: [''],
            isVisible: [null],
            ghiChu: ['']
        });
    }

    onSubmit() {
        if (this.form.invalid) {
            FormUtil.validateAllFormFields(this.form);
            return;
        }

        if (this.idPhongThiNghiem != null && this.idPhongThiNghiem > 0) {
            this.form.get("idPhongThiNghiem").setValue(this.idPhongThiNghiem);
        }

        if (this.form.get('idCoQuanNhanChuyenGiao').value) {
            this.form.get('idCoQuanNhanChuyenGiao').setValue(parseInt(this.form.get('idCoQuanNhanChuyenGiao').value),10);
        }

        switch (this.action) {
            case ActionEnum.CREATE:
                const create$ = this.apiService.post(UrlConstant.API.SAN_PHAM_KHCN, this.form.value).pipe(takeUntil(this.destroyed$));

                create$.subscribe(() => {
                    this.notification.showSuccessMessage(MessageConstant.COMMON.MSG_CREATE_DONE);
                    this.closeForm();
                });
                break;
            case ActionEnum.UPDATE:
                const update$ = this.apiService.put(UrlConstant.API.SAN_PHAM_KHCN, this.form.value).pipe(takeUntil(this.destroyed$));

                update$.subscribe(() => {
                    this.notification.showSuccessMessage(MessageConstant.COMMON.MSG_UPDATE_DONE);
                    this.closeForm();
                });
                break;
        }
    }

}

