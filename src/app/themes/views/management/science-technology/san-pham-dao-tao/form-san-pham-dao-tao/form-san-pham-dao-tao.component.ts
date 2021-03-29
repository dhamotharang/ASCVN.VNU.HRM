import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticateService, IUserInfo } from '@core/auth';
import { ActionEnum } from '@core/constants/enum.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService } from '@core/services/common';
import { FormUtil } from '@core/utils/form';
import { MenuQuery } from '@management-state/menu/menu.query';
import { WindowService, WindowRef } from '@progress/kendo-angular-dialog';
import { map, takeUntil } from 'rxjs/operators';
import { BaseScienceTechnologyFormComponent } from '../../_base/base-science-technology-form.component';
import { ISanPhamDaoTao } from '../../_models/science-technology.model';
@Component({
    selector: 'app-form-san-pham-dao-tao',
    templateUrl: './form-san-pham-dao-tao.component.html',
    styleUrls: ['./form-san-pham-dao-tao.component.scss'],
})
export class FormSanPhamDaoTaoComponent extends BaseScienceTechnologyFormComponent<ISanPhamDaoTao> implements OnInit, OnDestroy {
    url: string = UrlConstant.API.KHCN_SAN_PHAM_DA0_TAO;

    user: IUserInfo;
    isQuanLy: false;
    tenCoQuanCap1: string = '';
    
    constructor(
        private apiService: ApiService,
        private notification: NotificationService,
        private formBuilder: FormBuilder,
        protected windowService: WindowService,
        protected menuQuery: MenuQuery,
        protected windowRef: WindowRef,
        protected auth: AuthenticateService
    ) {
        super(windowRef);
    }

    ngOnInit() {
        super.ngOnInit();
        this.user = this.auth.getUserInfo();
        this.coQuanNhanSu$ = this.apiService.read(UrlConstant.API.HRM_DANH_MUC_CO_QUAN + '/ByNhanSu', {}).pipe(map(res => res.result));
        
        switch(this.action){
            case ActionEnum.CREATE:
                const idUser = parseInt(this.user.doiTuongId, 10);
                this.userSelected.push(idUser);
                this.form.get('idNguoiHuongDan').setValue(idUser);

                this.coQuanNhanSu$ = this.apiService
                    .read(UrlConstant.API.HRM_DANH_MUC_CO_QUAN + '/ByNhanSu', {})
                    .pipe(map(res => res.result));
                    this.coQuanNhanSu$.subscribe(res => {
                    if (res.idCoQuanCap1) {
                        this.form.get('idCoQuan').setValue(res.idCoQuanCap1);
                        this.tenCoQuanCap1 = res.tenCoQuanCap1;
                    }
                });
                break;
            case ActionEnum.UPDATE:
                if (this.model) {
                    this.setFormValue(this.model.sanPhamDaoTao);
                    if(this.model.sanPhamDaoTao && this.model.sanPhamDaoTao.tenCoQuan){
                        this.tenCoQuanCap1 = this.model.sanPhamDaoTao.tenCoQuan;
                    }
                }
                if(this.form.get('idNguoiHuongDan').value){
                    this.userSelected.push(this.form.get('idNguoiHuongDan').value);
                }
                
                break;
        }

        if(this.tenCoQuanCap1 === undefined){
            this.tenCoQuanCap1 = '';
        }
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    createForm() {
        this.form = this.formBuilder.group({
            id: [0],
            idCoQuan: [null,Validators.required],
            idDeTai: [null, Validators.required],
            idNguoiHuongDan: [null,Validators.required],
            soTienSi: [null],
            soNghienCuuSinh: [null],
            idTrangThaiDuyet: [null],
            isVisible: [true],
            ghiChu: [''],
            fileDinhKems: [null],
        });
    }

    onSubmit() {
        if (this.form.invalid) {
            FormUtil.validateAllFormFields(this.form);
            return;
        }
        if (this.form.get('idCoQuan').value) {
            this.form.get('idCoQuan').setValue(parseInt(this.form.get('idCoQuan').value), 10);
        }

        switch (this.action) {
            case ActionEnum.CREATE:
                const create$ = this.apiService.post(this.url + '/Save', this.form.value).pipe(takeUntil(this.destroyed$));

                create$.subscribe(() => {
                    this.notification.showSuccessMessage(MessageConstant.COMMON.MSG_CREATE_DONE);
                    this.closeForm();
                });
                break;
            case ActionEnum.UPDATE:
                const update$ = this.apiService.post(this.url + '/Save', this.form.value).pipe(takeUntil(this.destroyed$));

                update$.subscribe(() => {
                    this.notification.showSuccessMessage(MessageConstant.COMMON.MSG_UPDATE_DONE);
                    this.closeForm();
                });
                break;
        }
    }
}
