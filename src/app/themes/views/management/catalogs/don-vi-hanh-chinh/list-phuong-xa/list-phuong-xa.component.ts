import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '@core/data-services/api.service';
import { NzModalService } from 'ng-zorro-antd';
import { EventBus, EventBusService, NotificationService } from '@core/services/common';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import { MenuQuery } from '@management-state/menu/menu.query';
import { IPhuongXa } from '@themes/views/management/catalogs/_models/catalog.model';
import { ModalDeleteConfig, PageConfig } from '@core/constants/app.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { IPagedResult } from '@core/models/common';
import { BaseCatalogComponent } from '../../_base/base-catalog.component';
import { FormPhuongXaComponent } from '../form-phuong-xa/form-phuong-xa.component';

@Component({
    selector: 'app-list-phuong-xa',
    templateUrl: './list-phuong-xa.component.html',
    styleUrls: ['./list-phuong-xa.component.scss'],
})
export class ListPhuongXaComponent extends BaseCatalogComponent<IPhuongXa> implements OnInit, OnDestroy {
    private quanHuyenIds: number[] = [];
    private tinhThanhId: number;
    private eventBusSub: Subscription;
    constructor(
        private apiService: ApiService,
        private modal: NzModalService,
        private notification: NotificationService,
        private windowService: WindowService,
        private translate: CustomTranslateService,
        private eventBus: EventBusService,
        protected menuQuery: MenuQuery
    ) {
        super(menuQuery);
    }

    ngOnInit() {
        super.ngOnInit();
        this.eventBusSub = this.eventBus.on(EventBus.SelectQuanHuyen, item => {
            if (item.quanHuyenId && item.quanHuyenId > 0) {
                this.quanHuyenIds = [item.quanHuyenId];
                this.tinhThanhId = item.tinhThanhId;
                // set page
                this.gridState.skip = 0;
                this.loadItems();
            }
        });
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.eventBusSub.unsubscribe();
    }

    showFormCreateOrUpdate() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('CATALOG.PHUONG_XA.TITLE'),
            content: FormPhuongXaComponent,
            width: 550,
            top: 100,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.action = this.action;
        param.model = this.model;
        param.tinhThanhId = this.tinhThanhId;
        param.quanHuyenId = this.quanHuyenIds[0];

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.loadItems();
            }
        });
    }

    /**
     * Removes handler
     * @param dataItem
     */
    removeHandler(dataItem: IPhuongXa) {
        this.selectionIds = [];
        this.selectionIds.push(dataItem.phuongXaId);
        this.removeSelectedHandler();
    }

    /**
     * Removes multiple selected handler
     */
    removeSelectedHandler() {
        if (this.selectionIds.length > 0) {
            const body = {
                phuongXaIds: this.selectionIds,
            };
            this.modal.confirm({
                nzTitle: ModalDeleteConfig.title,
                nzContent: ModalDeleteConfig.content,
                nzOkText: ModalDeleteConfig.yes,
                nzOkType: 'danger',
                nzOnOk: () => {
                    this.apiService
                        .delete(UrlConstant.API.DM_PHUONG_XA, body)
                        .pipe(takeUntil(this.destroyed$))
                        .subscribe(res => {
                            // reset
                            this.selectionIds = [];

                            // show notification
                            this.notification.showSuccessMessage(this.translate.get('MES.DELETE_DONE'));
                            // set current page
                            this.gridState.skip = 0;
                            // reload data
                            this.loadItems();
                        });
                },
                nzCancelText: ModalDeleteConfig.no,
                nzOnCancel: () => { },
            });
        }
    }

    /**
     * Loads data via api service
     */
    protected loadItems() {
        if (this.quanHuyenIds.length > 0) {
            this.isLoading = true;
            this.selectionIds = [];
            this.gridView$ = this.apiService
                .read(UrlConstant.API.DM_PHUONG_XA + '/List', {
                    ...this.queryOptions,
                    quanHuyenId: this.quanHuyenIds,
                })
                .pipe(
                    map(res => {
                        const results = res.result as IPagedResult<any[]>;
                        if (results && results.items) {
                            return {
                                data: results.items,
                                total: results.pagingInfo.totalItems,
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
                    finalize(() => (this.isLoading = false))
                );
        }
    }
}
