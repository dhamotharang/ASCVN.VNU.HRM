import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticateService } from '@core/auth';
import { ActionEnum } from '@core/constants/enum.constant';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService } from '@core/services/common';
import { MenuQuery } from '@management-state/menu/menu.query';
import { WindowService, WindowRef } from '@progress/kendo-angular-dialog';
import { IChonPhanCong, ILapThongBaoKeHoach, IPhanCongThucHien } from '../../../_models/science-technology-plan.model';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { BaseScienceTechnologyPlanFormComponent } from '../../../_base/base-science-technology-plan-form.component';
import { FormUtil } from '@core/utils/form';
import { DateUtil } from '@core/utils/date';
import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-form-lap-thong-bao-ke-hoach',
    templateUrl: './form-lap-thong-bao-ke-hoach.component.html',
    styleUrls: ['./form-lap-thong-bao-ke-hoach.component.scss']
})
export class FormLapThongBaoKeHoachComponent extends BaseScienceTechnologyPlanFormComponent<ILapThongBaoKeHoach> implements OnInit, OnDestroy {
    url: string = UrlConstant.API.LKH_KHCN_LAP_KE_HOACH_THONG_BAO;
    url_second: string = UrlConstant.API.LKH_KHCN_PHAN_CONG_THUC_HIEN;

    fThongBao: ILapThongBaoKeHoach;
    idThongBao: number;
    strPhanCongNhanSu = "phanCongNhanSu";

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
        switch (this.action){
            case ActionEnum.CREATE:
                let newDate = new Date();
                this.form.get('ngayBatDau').setValue(newDate);
                this.form.get('namThongBao').setValue(newDate.getFullYear());
                break;
            case ActionEnum.UPDATE:
                this.fThongBao = this.model.thongBao;
                this.setFormValue(this.fThongBao);
                break;
        }
    }

    protected createForm() {
        this.form = this.formBuilder.group({
            id: [0],
            maThongBao: ['',Validators.required],
            tenThongBao: ['',Validators.required],
            noiDung: ['',Validators.required],
            ngayBatDau: [null,Validators.required],
            ngayKetThuc: [null,Validators.required],
            namThongBao: [null],
            ghiChu: [''],
            isVisible: [true],
            fileDinhKems:[],
            phanCongNhanSu: null
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
        if (this.form.get('ngayBatDau').value) {
            this.form.get('ngayBatDau').setValue(DateUtil.getFullDate(this.form.get('ngayBatDau').value));
        }
        if (this.form.get('ngayKetThuc').value) {
            this.form.get('ngayKetThuc').setValue(DateUtil.getFullDate(this.form.get('ngayKetThuc').value));
        }
        if (this.form.invalid) {
            FormUtil.validateAllFormFields(this.form);
            return;
        }

        switch (this.action) {
            case ActionEnum.CREATE:
                const create$ = this.apiService.post(this.url, this.form.value).pipe(takeUntil(this.destroyed$));

                create$.subscribe((res) => {
                    this.notification.showSuccessMessage(MessageConstant.COMMON.MSG_CREATE_DONE);
                    this.closeForm();
                    this.onSubmitForPhanCong(res.result?.id,this.action);
                });
                break;
            case ActionEnum.UPDATE:
                const update$ = this.apiService.put(this.url, this.form.value).pipe(takeUntil(this.destroyed$));

                update$.subscribe(() => {
                    this.notification.showSuccessMessage(MessageConstant.COMMON.MSG_UPDATE_DONE);
                    this.closeForm();
                });

                this.onSubmitForPhanCong(this.form.get("id").value,this.action);
                break;
        }     
    }

    onSubmitForPhanCong(idThongBao,action){
        if(idThongBao){
            const chonNhanSu = this.form.get(this.strPhanCongNhanSu).value as IChonPhanCong;
            if(chonNhanSu){
                let arrTempt = {
                    idThongBao: idThongBao,
                    phanCongItems: chonNhanSu.phanCongItems,
                }
                switch(action){
                    case ActionEnum.CREATE:
                        const create$ = this.apiService.post(this.url_second, arrTempt).pipe(takeUntil(this.destroyed$));
                        create$.subscribe((res) => {
                            this.closeForm();
                        });
                        break;
                    case ActionEnum.UPDATE:
                        const update$ = this.apiService.put(this.url_second, arrTempt).pipe(takeUntil(this.destroyed$));
                        update$.subscribe((res) => {
                            this.closeForm();
                        });
                        break;
                }
            }
        }
    }
    
    receiveDataNhanSu(data) {
        this.form.get(this.strPhanCongNhanSu).setValue(data);
    }

}
