import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticateService } from '@core/auth';
import { ActionEnum } from '@core/constants/enum.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService } from '@core/services/common';
import { DateUtil } from '@core/utils/date';
import { FormUtil } from '@core/utils/form';
import { MenuQuery } from '@management-state/menu/menu.query';
import { WindowRef, WindowService } from '@progress/kendo-angular-dialog';
import { map, takeUntil } from 'rxjs/operators';
import { BaseScienceTechnologyFormComponent } from '../../_base/base-science-technology-form.component';
import { IGiaiThuongKHCN } from '../../_models/science-technology.model';
@Component({
    selector: 'app-form-giai-thuong-khoa-hoc-cong-nghe',
    templateUrl: './form-giai-thuong-khoa-hoc-cong-nghe.component.html',
    styleUrls: ['./form-giai-thuong-khoa-hoc-cong-nghe.component.scss']
})
export class FormGiaiThuongKhoaHocCongNgheComponent extends BaseScienceTechnologyFormComponent<IGiaiThuongKHCN> implements OnInit, OnDestroy {
    url: string = UrlConstant.API.GIAI_THUONG_KHCN;
    isQuanLy: false;
    tenCoQuanCap1: string;
    
    fGiaiThuong:IGiaiThuongKHCN;
    constructor(
        private apiService: ApiService,
        private notification: NotificationService,
        private formBuilder: FormBuilder,
        protected windowService: WindowService,
        protected menuQuery: MenuQuery,
        protected windowRef: WindowRef,
    ) {
        super(windowRef);
    }

    ngOnInit() {
        super.ngOnInit();
        switch(this.action){
            case ActionEnum.CREATE:
                this.coQuanNhanSu$ = this.apiService.read(UrlConstant.API.HRM_DANH_MUC_CO_QUAN + '/ByNhanSu', {}).pipe(map(res => res.result));
                this.coQuanNhanSu$.subscribe(res => {
                    if (res.idCoQuanCap1) {
                        this.form.get('idCoQuan').setValue(res.idCoQuanCap1);
                        this.tenCoQuanCap1 = res.tenCoQuanCap1;
                    }else{
                        this.tenCoQuanCap1 = '';
                    }
                });
                break;
            
            case ActionEnum.UPDATE:
                if (this.model) {
                    this.fGiaiThuong = this.model.giaiThuongKHCN;
                    this.setFormValue(this.fGiaiThuong);
                }
                if(this.model.giaiThuongKHCN && this.model.giaiThuongKHCN.tenCoQuan){
                    this.tenCoQuanCap1 = this.model.giaiThuongKHCN.tenCoQuan;
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
            tenGiaiThuongKHCN: ['',Validators.required],
            idLoaiGiaiThuong: [null,Validators.required],
            idThuHangGiaiThuong: [null,Validators.required],
            idDeTai: [null,Validators.required],
            soQuyetDinh: [''],
            ngayQuyetDinh: [null,Validators.required],
            idTrangThaiDuyet: [null],
            fileDinhKems: [null],
        });
    }

    onSubmit() {
        if (this.form.get('ngayQuyetDinh').value) {
            this.form.get('ngayQuyetDinh').setValue(DateUtil.getFullDate(this.form.get('ngayQuyetDinh').value));
        }

        if (this.form.invalid) {
            FormUtil.validateAllFormFields(this.form);
            return;
        }
        if (this.form.get("idCoQuan").value) {
            this.form.get("idCoQuan").setValue(parseInt(this.form.get("idCoQuan").value), 10);
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
