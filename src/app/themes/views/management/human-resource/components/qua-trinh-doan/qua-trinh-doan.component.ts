import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseHumanResourceComponent } from '@themes/views/management/human-resource/_base/base-human-resource.component';
import { IQuaTrinhDoan } from '@themes/views/management/human-resource/_models/thong-tin-doan-dang.model';
import { ApiService } from '@core/data-services/api.service';
import { NzModalService } from 'ng-zorro-antd';
import { NotificationService } from '@core/services/common/notification.service';
import { MenuQuery } from '@management-state/menu/menu.query';
import { ActivatedRoute } from '@angular/router';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { ModalDeleteConfig, PageConfig } from '@core/constants/app.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { IPagedResult, IResponseData } from '@core/models/common/response-data.model';
import { FormQuaTrinhDoanComponent } from '@themes/views/management/human-resource/components/qua-trinh-doan/form-qua-trinh-doan/form-qua-trinh-doan.component';
import { IDuyetThongTinNhanSuModel } from '@themes/views/management/human-resource/_models/duyet-thong-tin-nhan-su.model';
import { TrangThaiDuLieuEnum } from '@themes/views/management/human-resource/_models';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import {DuyetThongTinNhanSuComponent} from '@themes/views/management/human-resource/components/duyet-thong-tin-nhan-su/duyet-thong-tin-nhan-su.component';

@Component({
    selector: 'app-qua-trinh-doan',
    templateUrl: './qua-trinh-doan.component.html',
    styleUrls: ['./qua-trinh-doan.component.scss'],
})
export class QuaTrinhDoanComponent extends BaseHumanResourceComponent<IQuaTrinhDoan> implements OnInit, OnDestroy {
    isShowInfo = false;
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
        // this.isShowInfo = (isShowTabHRM(hrmkey.QuaTrinhDoan) && isDuyetLyLichNhanSu) || !isDuyetLyLichNhanSu;
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    removeHandler(dataItem: IQuaTrinhDoan) {
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
                        .delete(UrlConstant.API.HRM_NS_QUA_TRINH_DOAN, body)
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
            idsNhanSuQuaTrinhDoan: this.selectionIds,
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

    protected showFormCreateOrUpdate() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: 'Quá trình Đoàn',
            content: FormQuaTrinhDoanComponent,
            width: 700,
            top: 10,
            autoFocusedElement: 'body',
        });
        const param = windowRef.content.instance;
        param.action = this.action;
        param.model = this.model;
        param.nhanSuId = this.nhanSuId;
        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.loadItems();
            }
        });
    }

    protected loadItems() {
        this.loading = true;
        this.gridView$ = this.apiService.read(UrlConstant.API.HRM_NS_QUA_TRINH_DOAN, this.queryOptions).pipe(
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
            finalize(() => (this.loading = false))
        );
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
