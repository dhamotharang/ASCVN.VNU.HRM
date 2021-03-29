import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '@core/data-services/api.service';
import { NzModalService } from 'ng-zorro-antd';
import { EmitEvent, EventBus, EventBusService, NotificationService } from '@core/services/common';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import { MenuQuery } from '@management-state/menu/menu.query';
import { IQuanHuyen, ITinhThanh } from '@themes/views/management/catalogs/_models/catalog.model';
import { ModalDeleteConfig, PageConfig } from '@core/constants/app.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { MessageConstant } from '@core/constants/message.constant';
import { IPagedResult } from '@core/models/common';
import { Subscription } from 'rxjs';
import { BaseCatalogComponent } from '../../_base/base-catalog.component';
import { FormQuanHuyenComponent } from '../form-quan-huyen/form-quan-huyen.component';

@Component({
    selector: 'app-list-quan-huyen',
    templateUrl: './list-quan-huyen.component.html',
    styleUrls: ['./list-quan-huyen.component.scss'],
})
export class ListQuanHuyenComponent extends BaseCatalogComponent<IQuanHuyen> implements OnInit, OnDestroy {
    private tinhThanhIds: number[] = [];
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

        this.eventBusSub = this.eventBus.on(EventBus.SelectTinhThanh, id => {
            this.tinhThanhIds = [id];
            // set page
            this.gridState.skip = 0;
            this.loadItems();
        });
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    showFormCreateOrUpdate() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('CATALOG.QUAN_HUYEN.TITLE'),
            content: FormQuanHuyenComponent,
            width: 550,
            top: 100,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.action = this.action;
        param.model = this.model;
        param.idTinhThanh = this.tinhThanhIds[0];

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.loadItems();
            }
        });
    }

    selectRow({ isEdited, dataItem, rowIndex }) {
        this.eventBus.emit(new EmitEvent(EventBus.SelectQuanHuyen, {
            tinhThanhId: dataItem.tinhThanhId,
            quanHuyenId: dataItem.quanHuyenId
        }));
    }

    /**
     * Removes handler
     * @param dataItem
     */
    removeHandler(dataItem: IQuanHuyen) {
        this.selectionIds = [];
        this.selectionIds.push(dataItem.quanHuyenId);
        this.removeSelectedHandler();
    }

    /**
     * Removes multiple selected handler
     */
    removeSelectedHandler() {
        if (this.selectionIds.length > 0) {
            const body = {
                quanHuyenIds: this.selectionIds,
            };
            this.modal.confirm({
                nzTitle: ModalDeleteConfig.title,
                nzContent: ModalDeleteConfig.content,
                nzOkText: ModalDeleteConfig.yes,
                nzOkType: 'danger',
                nzOnOk: () => {
                    this.apiService
                        .delete(UrlConstant.API.DM_QUAN_HUYEN, body)
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
        if (this.tinhThanhIds.length > 0) {
            this.isLoading = true;
            this.selectionIds = [];
            this.gridView$ = this.apiService
                .read(UrlConstant.API.DM_QUAN_HUYEN + '/List', {
                    ...this.queryOptions,
                    tinhThanhId: this.tinhThanhIds,
                })
                .pipe(
                    map(res => {
                        const results = res.result as IPagedResult<any[]>;
                        if (results && results.items) {
                            if (results.items.length === 0) {
                                this.eventBus.emit(new EmitEvent(EventBus.SelectQuanHuyen, -1));
                            }
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
