import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActionEnum } from '@core/constants/enum.constant';
import { MessageConstant, MessageErrorVI } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService } from '@core/services/common';
import { FormUtil } from '@core/utils/form';
import { MenuQuery } from '@management-state/menu/menu.query';
import { WindowRef, WindowService } from '@progress/kendo-angular-dialog';
import { map, takeUntil } from 'rxjs/operators';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { BaseScienceTechnologyFormComponent } from '../../_base/base-science-technology-form.component';
import { IDuAnDauTu } from '../../_models/science-technology.model';
import { AuthenticateService } from '@core/auth';
import { DateUtil } from '@core/utils/date';

@Component({
    selector: 'app-form-du-an-dau-tu',
    templateUrl: './form-du-an-dau-tu.component.html',
    styleUrls: ['./form-du-an-dau-tu.component.scss']
})
export class FormDuAnDauTuComponent extends BaseScienceTechnologyFormComponent<IDuAnDauTu> implements OnInit, OnDestroy {
    url: string = UrlConstant.API.KHCN_DU_AN_DAU_TU;
    suDungPhongThiNghiems: string = 'suDungPhongThiNghiems';
    isQuanLy: false;
    tenCoQuanCap1: string;

    fsuDung = [];
    fduAnDauTu:IDuAnDauTu;
    constructor(
        private apiService: ApiService,
        private notification: NotificationService,
        private formBuilder: FormBuilder,
        protected windowService: WindowService,
        protected menuQuery: MenuQuery,
        protected windowRef: WindowRef,
        private auth: AuthenticateService

    ) {
        super(windowRef);
    }

    ngOnInit() {
        super.ngOnInit();
        switch(this.action){
            case ActionEnum.CREATE:
                this.form.get('namDauTu').setValue(new Date().getFullYear());
                this.coQuanNhanSu$ = this.apiService.read(UrlConstant.API.HRM_DANH_MUC_CO_QUAN + '/ByNhanSu', {}).pipe(map(res => res.result));
                this.coQuanNhanSu$.subscribe(res => {
                    if (res.idCoQuanCap1) {
                        this.form.get('idCoQuan').setValue(res.idCoQuanCap1);
                        this.tenCoQuanCap1 = res.tenCoQuanCap1;
                    }
                });
                break;
            case ActionEnum.UPDATE:
                if (this.model) {
                    this.fduAnDauTu = this.model.duAnDauTu;
                    this.fsuDung = this.model.suDungPhongThiNghiems;
                    if(this.action == ActionEnum.UPDATE){
                        this.setFormValue(this.fduAnDauTu);
                    }
                }
                if(this.model.duAnDauTu && this.model.duAnDauTu.tenCoQuan){
                    this.tenCoQuanCap1 = this.model.duAnDauTu.tenCoQuan;
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
            idCoQuan: [null],
            nam: [null],
            tenDuAnDauTu: ['',Validators.required],
            idLoaiDuAn: [null,Validators.required],
            soQuyetDinh: [''],
            namDauTu: [null],
            diaDiem: [''],
            ngayKhoiCong: [null,Validators.required],
            ngayHoanThanh: [null,Validators.required],
            kinhPhi: [null,Validators.required],
            ghiChu: [''],
            idTrangThaiDuyet: [null],
            suDungPhongThiNghiems:[],
        });
    }

    disabledNgayKetThuc = (current: Date): boolean => {
        if (!this.form.get('ngayKhoiCong').value) {
            return;
        }
        return differenceInCalendarDays(current, new Date(this.form.get('ngayKhoiCong').value)) < 0;
    }

    disabledNgayBatDau = (current: Date): boolean => {
        if (!this.form.get('ngayHoanThanh').value) {
            return;
        }
        return differenceInCalendarDays(current, new Date(this.form.get('ngayHoanThanh').value)) > 0;
    }

    disabledDateFrom = (current: Date): boolean => {
        return differenceInCalendarDays(current, new Date(this.model.ngayKhoiCong)) < 0;
    };

    disabledDateTo = (current: Date): boolean => {
        return differenceInCalendarDays(current, new Date(this.model.ngayHoanThanh)) > 0;
    };

    onSubmit() {
        const suDungPTNs = this.form.get(this.suDungPhongThiNghiems).value;
        if (suDungPTNs) {
            const convertData = [];
            let errTV = false;
            if (suDungPTNs) {
                suDungPTNs.map(res => {
                    convertData.push({
                        idPhongThiNghiem: res.id,
                        mucDoSuDung: res.mucDoSuDung != '' ? res.mucDoSuDung : 0,
                    });
                });
                if(errTV){
                    return;
                }
                this.form.get(this.suDungPhongThiNghiems).setValue(convertData);
            }
        }
        let lgthTongKP = this.form.get('kinhPhi').value ? this.form.get('kinhPhi').value.toLocaleString().replace(/[^\w\s]/g,'').length : 0;
        if (lgthTongKP > 15){
            this.notification.showErrorMessage(MessageErrorVI.KHCN05);
            return;
        }
        if (this.form.get('ngayKhoiCong').value) {
            this.form.get('ngayKhoiCong').setValue(DateUtil.getFullDate(this.form.get('ngayKhoiCong').value));
        }
        if (this.form.get('ngayHoanThanh').value) {
            this.form.get('ngayHoanThanh').setValue(DateUtil.getFullDate(this.form.get('ngayHoanThanh').value));
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
    receiveDataPhongThiNghiem(data) {
        this.form.get(this.suDungPhongThiNghiems).setValue(data);
    }
}
