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
    selector: 'app-de-xuat-hop-dong',
    templateUrl: './de-xuat-hop-dong.component.html',
    styleUrls: ['./de-xuat-hop-dong.component.scss'],
})
export class DeXuatHopDongComponent implements OnInit, OnDestroy {
    @Input() ids: number[];

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
            idsHopDong: this.ids,
            ghiChuNguoiGui: this.noiDungControl.value,
        };

        this.apiService
            .put(UrlConstant.API.TD_HOP_DONG + '/GuiXacNhan', model)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                this.notification.showSuccessMessage(this.translate.get('MES.SEND_DONE'));
                this.closeForm();
            });
    }

    closeForm() {
        this.windowRef.close();
    }
}
