import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { INhanSuSucKhoe } from '@themes/views/management/human-resource/_models/nhan-su-suc-khoe.model';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { ViewFileComponent } from '@shared/controls/view-file/view-file.component';
import { map, takeUntil } from 'rxjs/operators';
import { FormNhanSuTinhTrangSucKhoeComponent } from './form-nhan-su-tinh-trang-suc-khoe/form-nhan-su-tinh-trang-suc-khoe.component';
import { BaseHumanResourceItem } from '@themes/views/management/human-resource/_base/base-human-resource-item.component';
import { MenuQuery } from '@management-state/menu/menu.query';
import { IDuyetThongTinNhanSuModel } from '@themes/views/management/human-resource/_models/duyet-thong-tin-nhan-su.model';
import { TrangThaiDuLieuEnum } from '@themes/views/management/human-resource/_models';
import { NzModalService } from 'ng-zorro-antd';
import { CustomTranslateService, NotificationService } from '@core/services/common';
import {DuyetThongTinNhanSuComponent} from '@themes/views/management/human-resource/components/duyet-thong-tin-nhan-su/duyet-thong-tin-nhan-su.component';
import { ActionEnum } from '@core/constants/enum.constant';

@Component({
    selector: 'app-tinh-trang-suc-khoe',
    templateUrl: './tinh-trang-suc-khoe.component.html',
    styleUrls: ['./tinh-trang-suc-khoe.component.scss'],
})
export class TinhTrangSucKhoeComponent extends BaseHumanResourceItem<INhanSuSucKhoe> implements OnInit, OnDestroy {
    fileAttact: any[] = [];
    constructor(
        protected route: ActivatedRoute,
        protected menuQuery: MenuQuery,
        private apiService: ApiService,
        private windowService: WindowService,
        private modal: NzModalService,
        private notification: NotificationService,
        private translate: CustomTranslateService
    ) {
        super(route, menuQuery);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    showFormCapNhatSucKhoe() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('HR.MES.12'),
            content: FormNhanSuTinhTrangSucKhoeComponent,
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

    openViewFile() {
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
        param.key = this.model.guidId;
        param.fileName = this.model.tenFile;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
            }
        });
    }

    onApprove(flag: boolean) {
        const body: IDuyetThongTinNhanSuModel = {
            duyetToanBo: false,
            idNhanSu: this.nhanSuId,
            idTrangThaiDuLieu: flag ? TrangThaiDuLieuEnum.SU_DUNG_CHINH : TrangThaiDuLieuEnum.KHONG_DUYET,
            idNhanSuSucKhoe: this.model.id,
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
            .read(UrlConstant.API.HRM_NS_SUC_KHOE, {
                idNhanSu: this.nhanSuId,
                manHinh: this.duLieuNhanSuEnum
            })
            .pipe(
                takeUntil(this.destroyed$),
                map(res => res.result)
            )
            .subscribe(res => {
                this.model = res;
                if (this.model && this.model.idFileDinhKem && this.model.idFileDinhKem > 0) {
                    const file = {
                        fileAttachId: this.model.idFileDinhKem,
                        fileDinhKemId: this.model.idFileDinhKem,
                        name: this.model.tenFile,
                        type: this.model.type,
                        size: this.model.size,
                        path: this.model.path,
                        isDelete: false,
                    };
                    this.fileAttact.push(file);
                }
            });
    }
}
