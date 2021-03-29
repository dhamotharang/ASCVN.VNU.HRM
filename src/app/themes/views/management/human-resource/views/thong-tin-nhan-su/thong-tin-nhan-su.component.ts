import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionEnum } from '@core/constants/enum.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { FormThongTinNhanSuComponent } from './form-thong-tin-nhan-su/form-thong-tin-nhan-su.component';
import { takeUntil } from 'rxjs/operators';
import { INhanSuChiTiet } from '@themes/views/management/human-resource/_models/human-resource.model';
import { FileService } from '@core/services/common/file.service';
import { ApiService } from '@core/data-services/api.service';
import { BaseHumanResourceItem } from '@themes/views/management/human-resource/_base/base-human-resource-item.component';
import { MenuQuery } from '@management-state/menu/menu.query';
import { IDuyetThongTinNhanSuModel } from '@themes/views/management/human-resource/_models/duyet-thong-tin-nhan-su.model';
import { DuLieuNhanSuEnum, TrangThaiDuLieuEnum } from '@themes/views/management/human-resource/_models';
import { NzModalService } from 'ng-zorro-antd';
import { NotificationService } from '@core/services/common';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import { KhaiBaoTaiKhoanNhanSuComponent } from '../../components';
import {DuyetThongTinNhanSuComponent} from '@themes/views/management/human-resource/components/duyet-thong-tin-nhan-su/duyet-thong-tin-nhan-su.component';

@Component({
    selector: 'app-thong-tin-nhan-su',
    templateUrl: './thong-tin-nhan-su.component.html',
    styleUrls: ['./thong-tin-nhan-su.component.scss'],
})
export class ThongTinNhanSuComponent extends BaseHumanResourceItem<INhanSuChiTiet> implements OnInit, OnDestroy {
    constructor(
        private fileService: FileService,
        protected route: ActivatedRoute,
        protected menuQuery: MenuQuery,
        private apiService: ApiService,
        private windowService: WindowService,
        private modal: NzModalService,
        private translate: CustomTranslateService,
        private notification: NotificationService
    ) {
        super(route, menuQuery);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    showFormCapNhatNhapSu() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('HR.MES.05'),
            content: KhaiBaoTaiKhoanNhanSuComponent,
            width: 1150,
            top: 10,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.action = ActionEnum.UPDATE;
        param.model = this.model;

        windowRef.result.subscribe(result => {
            if (result === true) {
                this.loadData();
            }

            this.opened = false;
        });
    }

    showFormCapNhatNhanSuChiTiet() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('HR.MES.06'),
            content: FormThongTinNhanSuComponent,
            width: 1150,
            top: 10,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.action = ActionEnum.UPDATE;
        param.model = this.model;

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
            idNhanSuChiTiet: this.model.idNhanSuChiTiet,
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
        const nhanSu$ = this.apiService
            .read(UrlConstant.API.HRM_NHAN_SU + '/ById', {
                idNhanSu: this.nhanSuId,
                manHinh: DuLieuNhanSuEnum.SU_DUNG_CHINH,
            })
            .pipe(takeUntil(this.destroyed$));
        nhanSu$.subscribe(res => {
            if (res.result) {
                this.model = res.result;
            }
        });
    }
}
