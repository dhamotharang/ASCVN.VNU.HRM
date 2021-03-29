import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { INhanSuThongTinTuyenDung } from '@themes/views/management/human-resource/_models/thong-tin-tuyen-dung.model';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { map, takeUntil } from 'rxjs/operators';
import { FormThongTinTuyenDungComponent } from './form-thong-tin-tuyen-dung/form-thong-tin-tuyen-dung.component';
import { BaseHumanResourceItem } from '@themes/views/management/human-resource/_base/base-human-resource-item.component';
import { ActivatedRoute } from '@angular/router';
import { MenuQuery } from '@management-state/menu/menu.query';
import { IDuyetThongTinNhanSuModel } from '@themes/views/management/human-resource/_models/duyet-thong-tin-nhan-su.model';
import { TrangThaiDuLieuEnum } from '@themes/views/management/human-resource/_models';
import { CustomTranslateService } from '@core/services/common';
import {DuyetThongTinNhanSuComponent} from '@themes/views/management/human-resource/components/duyet-thong-tin-nhan-su/duyet-thong-tin-nhan-su.component';
import { ActionEnum } from '@core/constants/enum.constant';

@Component({
    selector: 'app-thong-tin-tuyen-dung',
    templateUrl: './thong-tin-tuyen-dung.component.html',
    styleUrls: ['./thong-tin-tuyen-dung.component.scss'],
})
export class ThongTinTuyenDungComponent extends BaseHumanResourceItem<INhanSuThongTinTuyenDung> implements OnInit, OnDestroy {
    constructor(
        protected route: ActivatedRoute,
        protected menuQuery: MenuQuery,
        private windowService: WindowService,
        private apiService: ApiService,
        private translate: CustomTranslateService
    ) {
        super(route, menuQuery);
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    showFormCapNhatThongTinTuyenDung() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('HR.MES.11'),
            content: FormThongTinTuyenDungComponent,
            width: 900,
            top: 10,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.action = ActionEnum.UPDATE;
        param.model = this.model;
        param.nhanSuId = this.nhanSuId;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.loadData();
            }
        });
    }

    onApprove(flag: boolean) {
        const body: IDuyetThongTinNhanSuModel = {
            duyetToanBo: false,
            idNhanSu: this.nhanSuId,
            idTrangThaiDuLieu: flag ? TrangThaiDuLieuEnum.SU_DUNG_CHINH : TrangThaiDuLieuEnum.KHONG_DUYET,
            idNhanSuTuyenDung: this.model.id,
        };

        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('LB.CONFIRM'),
            content: DuyetThongTinNhanSuComponent,
            width: 600,
            top: 10,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.body = body;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.loadData();
            }
        });
    }

    loadData() {
        this.apiService
            .read(UrlConstant.API.HRM_NS_THONG_TIN_TUYEN_DUNG, {
                idNhanSu: this.nhanSuId,
                manHinh: this.duLieuNhanSuEnum
            })
            .pipe(
                map(res => res.result),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                this.model = res;
            });
    }
}
