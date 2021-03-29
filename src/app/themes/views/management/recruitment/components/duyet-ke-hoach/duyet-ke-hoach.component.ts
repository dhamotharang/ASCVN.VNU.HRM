import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IDuyetThongTinNhanSuModel } from '@themes/views/management/human-resource/_models/duyet-thong-tin-nhan-su.model';
import { FormControl } from '@angular/forms';
import { UrlConstant } from '@core/constants/url.constant';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from '@core/data-services/api.service';
import { Subject } from 'rxjs';
import { CustomTranslateService, NotificationService } from '@core/services/common';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { TrangThaiKeHoachEnum } from '../../_models';

@Component({
    selector: 'app-duyet-ke-hoach',
    templateUrl: './duyet-ke-hoach.component.html',
    styleUrls: ['./duyet-ke-hoach.component.scss'],
})
export class DuyetKeHoachComponent implements OnInit, OnDestroy {
    @Input() ids: number[];
    @Input() trangThaiKeHoachEnum: TrangThaiKeHoachEnum;

    noiDungControl = new FormControl();

    private destroyed$ = new Subject();
    constructor(
        private apiService: ApiService,
        private notification: NotificationService,
        private translate: CustomTranslateService,
        private windowRef: WindowRef
    ) {}

    ngOnInit(): void {}

    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    onSubmit() {
        const model = {
            ids: this.ids,
            idTrangThaiDuyet: this.trangThaiKeHoachEnum,
            noiDung: this.noiDungControl.value,
        };

        switch (this.trangThaiKeHoachEnum) {
            case TrangThaiKeHoachEnum.TRUONG_DV_DUYET:
            case TrangThaiKeHoachEnum.TRUONG_DV_KO_DUYET:
                this.apiService
                    .put(UrlConstant.API.HRM_TD_KE_HOACH_DE_XUAT + '/TruongDonVi/Duyet', model)
                    .pipe(takeUntil(this.destroyed$))
                    .subscribe(res => {
                        this.notification.showSuccessMessage(this.translate.get('MES.UPDATE_DONE'));
                        this.closeForm();
                    });
                break;
            case TrangThaiKeHoachEnum.BAN_DUYET:
            case TrangThaiKeHoachEnum.BAN_KO_DUYET:
                this.apiService
                    .put(UrlConstant.API.HRM_TD_KE_HOACH_DE_XUAT + '/BanTCCB/Duyet', model)
                    .pipe(takeUntil(this.destroyed$))
                    .subscribe(res => {
                        this.notification.showSuccessMessage(this.translate.get('MES.UPDATE_DONE'));
                        this.closeForm();
                    });
                break;
            case TrangThaiKeHoachEnum.NS_DE_XUAT_DUYET:
                this.apiService
                    .put(UrlConstant.API.HRM_TD_KE_HOACH_DE_XUAT + '/NhanSuTCCB/DeXuatDuyet', model)
                    .pipe(takeUntil(this.destroyed$))
                    .subscribe(res => {
                        this.notification.showSuccessMessage(this.translate.get('MES.UPDATE_DONE'));
                        this.closeForm();
                    });
                break;
            case TrangThaiKeHoachEnum.TRUONG_DV_DE_XUAT_DUYET:
                this.apiService
                    .put(UrlConstant.API.HRM_TD_KE_HOACH_DE_XUAT + '/TruongDonVi/DeXuatDuyet', model)
                    .pipe(takeUntil(this.destroyed$))
                    .subscribe(res => {
                        this.notification.showSuccessMessage(this.translate.get('RECRUITMENT.MES.02'));
                        this.closeForm();
                    });
                break;
            case TrangThaiKeHoachEnum.TRUONG_DV_DUYET_GUI:
                this.apiService
                    .put(UrlConstant.API.HRM_TD_KE_HOACH_DE_XUAT + '/TruongDonVi/DuyetVaGui', model)
                    .pipe(takeUntil(this.destroyed$))
                    .subscribe(res => {
                        this.notification.showSuccessMessage(this.translate.get('MES.UPDATE_DONE'));
                        this.closeForm();
                    });
                break;
        }
    }

    closeForm() {
        this.windowRef.close();
    }
}
