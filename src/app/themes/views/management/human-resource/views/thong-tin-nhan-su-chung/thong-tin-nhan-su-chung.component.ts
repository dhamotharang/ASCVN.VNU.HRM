import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionEnum } from '@core/constants/enum.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { takeUntil } from 'rxjs/operators';
import { INhanSuChiTiet } from '@themes/views/management/human-resource/_models/human-resource.model';
import { ApiService } from '@core/data-services/api.service';
import { BaseHumanResourceItem } from '@themes/views/management/human-resource/_base/base-human-resource-item.component';
import { MenuQuery } from '@management-state/menu/menu.query';
import { IDuyetThongTinNhanSuModel } from '@themes/views/management/human-resource/_models/duyet-thong-tin-nhan-su.model';
import { TrangThaiDuLieuEnum } from '@themes/views/management/human-resource/_models';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import { DuyetThongTinNhanSuComponent } from '@themes/views/management/human-resource/components/duyet-thong-tin-nhan-su/duyet-thong-tin-nhan-su.component';
import { FormThongTinNhanSuChungComponent } from '../../components/form-thong-tin-nhan-su-chung/form-thong-tin-nhan-su-chung.component';

@Component({
    selector: 'app-thong-tin-nhan-su-chung',
    templateUrl: './thong-tin-nhan-su-chung.component.html',
    styleUrls: ['./thong-tin-nhan-su-chung.component.scss']
})
export class ThongTinNhanSuChungComponent extends BaseHumanResourceItem<INhanSuChiTiet> implements OnInit, OnDestroy {
    constructor(
        protected route: ActivatedRoute,
        protected menuQuery: MenuQuery,
        private apiService: ApiService,
        private windowService: WindowService,
        private translate: CustomTranslateService,
    ) {
        super(route, menuQuery);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    showFormCapNhatNhanSuChiTiet() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('HR.MES.06'),
            content: FormThongTinNhanSuChungComponent,
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
                manHinh: this.duLieuNhanSuEnum
            })
            .pipe(takeUntil(this.destroyed$));
        nhanSu$.subscribe(res => {
            if (res.result) {
                this.model = res.result;
            }
        });
    }
}
