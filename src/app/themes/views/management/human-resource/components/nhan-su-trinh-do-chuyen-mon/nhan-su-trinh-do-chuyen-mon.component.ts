import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '@core/data-services/api.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NotificationService } from '@core/services/common/notification.service';
import { MenuQuery } from '@management-state/menu/menu.query';
import { ActivatedRoute } from '@angular/router';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { INhanSuTrinhDoChuyenMon, INhanSuTrinhDoTinHoc } from '@themes/views/management/human-resource/_models/trinh-do.model';
import { ModalDeleteConfig, PageConfig } from '@core/constants/app.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { MessageConstant } from '@core/constants/message.constant';
import { IPagedResult, IResponseData } from '@core/models/common/response-data.model';
import { BaseHumanResourceComponent } from '@themes/views/management/human-resource/_base/base-human-resource.component';
import { FormTrinhDoChuyenMonComponent } from '@themes/views/management/human-resource/components/nhan-su-trinh-do-chuyen-mon/form-trinh-do-chuyen-mon/form-trinh-do-chuyen-mon.component';
import { IDuyetThongTinNhanSuModel } from '@themes/views/management/human-resource/_models/duyet-thong-tin-nhan-su.model';
import { TrangThaiDuLieuEnum } from '@themes/views/management/human-resource/_models';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import {DuyetThongTinNhanSuComponent} from '@themes/views/management/human-resource/components/duyet-thong-tin-nhan-su/duyet-thong-tin-nhan-su.component';
import { GridDataResult } from '@progress/kendo-angular-grid';

@Component({
    selector: 'app-nhan-su-trinh-do-chuyen-mon',
    templateUrl: './nhan-su-trinh-do-chuyen-mon.component.html',
    styleUrls: ['./nhan-su-trinh-do-chuyen-mon.component.scss'],
})
export class NhanSuTrinhDoChuyenMonComponent extends BaseHumanResourceComponent<INhanSuTrinhDoChuyenMon> implements OnInit, OnDestroy {
    gridView: GridDataResult;
    constructor(
        private apiService: ApiService,
        private modal: NzModalService,
        private notificationService: NotificationService,
        private translate: CustomTranslateService,
        protected menuQuery: MenuQuery,
        protected route: ActivatedRoute,
        protected windowService: WindowService
    ) {
        super(null, null, null);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    removeHandler(dataItem: INhanSuTrinhDoTinHoc) {
        this.selectionIds = [];
        this.selectionIds.push(dataItem.id);
        this.removeSelectedHandler();
    }

    removeSelectedHandler() {
        if (this.selectionIds.length > 0) {
            const body = {
                ids: this.selectionIds,
            };
            this.modal.confirm({
                nzTitle: ModalDeleteConfig.title,
                nzContent: ModalDeleteConfig.content,
                nzOkText: ModalDeleteConfig.yes,
                nzOkType: 'danger',
                nzOnOk: () => {
                    this.apiService
                        .delete(UrlConstant.API.HRM_NS_TRINH_DO_CHUYEN_MON, body)
                        .pipe(takeUntil(this.destroyed$))
                        .subscribe(() => {
                            // reset
                            this.selectionIds = [];

                            // show notification
                            this.notificationService.showSuccessMessage(this.translate.get('MES.DELETE_DONE'));
                            // set current page
                            this.gridState.skip = 0;
                            // reload data
                            this.loadItems();
                        });
                },
                nzCancelText: ModalDeleteConfig.no,
                nzOnCancel: () => {},
            });
        }
    }

    onApprove(flag: boolean) {
        const body: IDuyetThongTinNhanSuModel = {
            duyetToanBo: false,
            idNhanSu: this.nhanSuId,
            idTrangThaiDuLieu: flag ? TrangThaiDuLieuEnum.SU_DUNG_CHINH : TrangThaiDuLieuEnum.KHONG_DUYET,
            idsNhanSuTrinhDoChuyenMon: this.selectionIds,
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
                this.selectionIds = [];
                this.loadItems();
            }
        });
    }

    isDisabled(args) {
        return {
            'k-disabled': args.dataItem.idTrangThaiDuLieu !== TrangThaiDuLieuEnum.DE_XUAT,
        };
    }

    protected showFormCreateOrUpdate() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('HR.TAB.DAO_TAO_BOI_DUONG_DAI_HAN'),
            content: FormTrinhDoChuyenMonComponent,
            width: 850,
            top: 100,
            autoFocusedElement: 'body',
        });
        const param = windowRef.content.instance;
        param.action = this.action;
        param.model = this.model;
        param.nhanSuId = this.nhanSuId;
        param.lstTrinhDoChuyenMonUsed = this.gridView.data;
        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.loadItems();
            }
        });
    }

    protected loadItems() {
        this.loading = true;
        this.apiService.read(UrlConstant.API.HRM_NS_TRINH_DO_CHUYEN_MON, this.queryOptions).pipe(
            map((res: IResponseData<IPagedResult<any>>) => {
                if (res.result && res.result.items) {
                    return {
                        data: res.result.items,
                        total: res.result.pagingInfo.totalItems,
                    };
                } else {
                    return {
                        data: [],
                        total: 0,
                    };
                }
            }),
            tap(res => {
                if (res.total <= this.gridState.take) {
                    this.pageConfig = false;
                } else {
                    this.pageConfig = PageConfig;
                }
            }),
            finalize(() => (this.loading = false)),
            takeUntil(this.destroyed$)
        ).
        subscribe(res => {
            this.gridView = res;
        });
    }

    private get queryOptions() {
        return {
            pageNumber: this.gridState.skip / this.gridState.take + 1,
            pageSize: this.gridState.take,
            sortName: this.gridState.sort[0].field,
            sortASC: this.gridState.sort[0].dir === 'asc',
            idNhanSu: this.nhanSuId,
            manHinh: this.duLieuNhanSuEnum
        };
    }
}
