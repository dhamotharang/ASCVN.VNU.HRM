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
import { IHoiNghiHoiThao } from '@themes/views/management/science-technology/_models/science-technology.model';
import { AuthenticateService } from '@core/auth';
import { DateUtil } from '@core/utils/date';

@Component({
    selector: 'app-form-hoi-nghi-hoi-thao',
    templateUrl: './form-hoi-nghi-hoi-thao.component.html',
    styleUrls: ['./form-hoi-nghi-hoi-thao.component.scss']
})
export class FormHoiNghiHoiThaoComponent extends BaseScienceTechnologyFormComponent<IHoiNghiHoiThao> implements OnInit, OnDestroy {
    url: string = UrlConstant.API.KHCN_HOI_NGHI_HOI_THAO;
    suDungPhongThiNghiems: string = 'suDungPhongThiNghiems';
    isQuanLy: false;
    tenCoQuanCap1: string;

    fsuDung = [];
    fhoiThaoHoiNghi:IHoiNghiHoiThao;
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
                /*Default Nguồc gốc: - Trong nước*/
                this.form.get('ngayBatDau').setValue(new Date());

                /*Default Ngày bắt đầu*/
                this.form.get('isTrongNuoc').setValue(true);

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
                    this.fhoiThaoHoiNghi = this.model.hoiThaoHoiNghi;
                    this.fsuDung = this.model.suDungPhongThiNghiems;
                    if(this.action == ActionEnum.UPDATE){
                        this.setFormValue(this.fhoiThaoHoiNghi);
                    }
                }
                if(this.model.hoiThaoHoiNghi && this.model.hoiThaoHoiNghi.tenCoQuan){
                    this.tenCoQuanCap1 = this.model.hoiThaoHoiNghi.tenCoQuan;
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
            idLoaiHoiThaoHoiNghi: [null,Validators.required],
            tenHoiThaoHoiNghi: ['',Validators.required],
            isTrongNuoc: [null],
            chuDe: [null,Validators.required],
            ngayBatDau: [null,Validators.required],
            ngayKetThuc: [null,Validators.required],
            diaDiem: [null,Validators.required],
            soLuongDaiBieu: [null],
            nguonKinhPhi: [null],
            kinhPhi: [null,Validators.required],
            idTrangThaiDuyet: [null],
            ghiChu: [''],
            suDungPhongThiNghiems:[],
        });
    }

    disabledNgayKetThuc = (current: Date): boolean => {
        if (!this.form.get('ngayBatDau').value) {
            return;
        }
        return differenceInCalendarDays(current, new Date(this.form.get('ngayBatDau').value)) < 0;
    }

    disabledNgayBatDau = (current: Date): boolean => {
        if (!this.form.get('ngayKetThuc').value) {
            return;
        }
        return differenceInCalendarDays(current, new Date(this.form.get('ngayKetThuc').value)) > 0;
    }

    disabledDateFrom = (current: Date): boolean => {
        return differenceInCalendarDays(current, new Date(this.model.ngayBatDau)) < 0;
    };

    disabledDateTo = (current: Date): boolean => {
        return differenceInCalendarDays(current, new Date(this.model.ngayKetThuc)) > 0;
    };

    onSubmit() {
        
        let lgthTongKP = this.form.get('kinhPhi').value ? this.form.get('kinhPhi').value.toLocaleString().replace(/[^\w\s]/g,'').length : 0;
        if (lgthTongKP > 15){
            this.notification.showErrorMessage(MessageErrorVI.KHCN05);
            return;
        }

        if (this.form.invalid) {
            FormUtil.validateAllFormFields(this.form);
            return;
        }
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

        if (this.form.get('ngayBatDau').value) {
            this.form.get('ngayBatDau').setValue(DateUtil.getFullDate(this.form.get('ngayBatDau').value));
        }
        if (this.form.get('ngayKetThuc').value) {
            this.form.get('ngayKetThuc').setValue(DateUtil.getFullDate(this.form.get('ngayKetThuc').value));
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
