import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '@core/data-services/api.service';
import { UrlConstant } from '@core/constants/url.constant';
import { map, takeUntil } from 'rxjs/operators';
import { INhanSuTrinhDo } from '@themes/views/management/human-resource/_models/trinh-do.model';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { ActivatedRoute } from '@angular/router';
import { FormTrinhDoComponent } from './form-trinh-do/form-trinh-do.component';
import { ViewFileComponent } from '@shared/controls/view-file/view-file.component';
import { BaseHumanResourceItem } from '@themes/views/management/human-resource/_base/base-human-resource-item.component';
import { MenuQuery } from '@management-state/menu/menu.query';
import { IDuyetThongTinNhanSuModel } from '@themes/views/management/human-resource/_models/duyet-thong-tin-nhan-su.model';
import { TrangThaiDuLieuEnum } from '@themes/views/management/human-resource/_models';
import { CustomTranslateService, EventBus, EventBusService } from '@core/services/common';
import {DuyetThongTinNhanSuComponent} from '@themes/views/management/human-resource/components/duyet-thong-tin-nhan-su/duyet-thong-tin-nhan-su.component';
import { Subscription } from 'rxjs';
import { ActionEnum } from '@core/constants/enum.constant';

@Component({
    selector: 'app-trinh-do-chuyen-mon',
    templateUrl: './trinh-do-chuyen-mon.component.html',
    styleUrls: ['./trinh-do-chuyen-mon.component.scss'],
})
export class TrinhDoChuyenMonComponent extends BaseHumanResourceItem<INhanSuTrinhDo> implements OnInit, OnDestroy {

    private eventLoad: Subscription;

    constructor(
        private apiService: ApiService,
        private eventBus: EventBusService,
        private windowService: WindowService,
        private translate: CustomTranslateService,
        protected route: ActivatedRoute,
        protected menuQuery: MenuQuery
    ) {
        super(route, menuQuery);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.eventLoad = this.eventBus.on(EventBus.ReloadTrinhDoChuyenMon, id => {
            this.loadData();
        });
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    showModalViewFile(guidId, name) {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('LB.VIEW_FILE'),
            content: ViewFileComponent,
            width: 1200,
            height: 800,
            top: 10,
            autoFocusedElement: 'body',
            state: 'maximized',
        });

        const param = windowRef.content.instance;
        param.key = guidId;
        param.fileName = name;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
            }
        });
    }

    showFormCapNhatTrinhDo() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('HR.MES.13'),
            content: FormTrinhDoComponent,
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
            idNhanSuTrinhDo: this.model.id,
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
            .read(UrlConstant.API.HRM_NS_TRINH_DO, {
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
