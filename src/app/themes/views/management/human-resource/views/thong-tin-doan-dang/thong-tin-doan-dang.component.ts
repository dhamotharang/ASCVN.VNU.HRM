import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { IThongTinDoanDang } from '@themes/views/management/human-resource/_models/thong-tin-doan-dang.model';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { map, takeUntil } from 'rxjs/operators';
import { FormNhanSuDoanDangComponent } from './form-nhan-su-doan-dang/form-nhan-su-doan-dang.component';
import { BaseHumanResourceItem } from '@themes/views/management/human-resource/_base/base-human-resource-item.component';
import { MenuQuery } from '@management-state/menu/menu.query';
import { IDuyetThongTinNhanSuModel } from '@themes/views/management/human-resource/_models/duyet-thong-tin-nhan-su.model';
import { TrangThaiDuLieuEnum } from '@themes/views/management/human-resource/_models';
import { NzModalService } from 'ng-zorro-antd';
import { CustomTranslateService, NotificationService } from '@core/services/common';
import {DuyetThongTinNhanSuComponent} from '@themes/views/management/human-resource/components/duyet-thong-tin-nhan-su/duyet-thong-tin-nhan-su.component';
import { ActionEnum } from '@core/constants/enum.constant';

@Component({
    selector: 'app-thong-tin-doan-dang',
    templateUrl: './thong-tin-doan-dang.component.html',
    styleUrls: ['./thong-tin-doan-dang.component.scss'],
})
export class ThongTinDoanDangComponent extends BaseHumanResourceItem<IThongTinDoanDang> implements OnInit, OnDestroy {
    constructor(
        protected menuQuery: MenuQuery,
        protected route: ActivatedRoute,
        private windowService: WindowService,
        private apiService: ApiService,
        private modal: NzModalService,
        private translate: CustomTranslateService,
        private notification: NotificationService
    ) {
        super(route, menuQuery);
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    showFormUpdateThongTinDoanDang() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('HR.MES.10'),
            content: FormNhanSuDoanDangComponent,
            width: 700,
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
            idNhanSuDoanDang: this.model.id,
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
            .read(UrlConstant.API.HRM_NS_DOAN_DANG, {
                idNhanSu: this.nhanSuId,
                manHinh: this.duLieuNhanSuEnum
            })
            .pipe(
                map(res => res.result),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => (this.model = res));
    }
}
