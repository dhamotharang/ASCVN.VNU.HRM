import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '@core/data-services/api.service';
import { NzModalService } from 'ng-zorro-antd';
import { EventBus, EventBusService, NotificationService } from '@core/services/common';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import { MenuQuery } from '@management-state/menu/menu.query';
import { INgachCongChuc, INhomNgach } from '@themes/views/management/catalogs/_models/catalog.model';
import { ModalDeleteConfig, PageConfig } from '@core/constants/app.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { MessageConstant } from '@core/constants/message.constant';
import { IPagedResult } from '@core/models/common';
import { BaseCatalogComponent } from '../../_base/base-catalog.component';
import { FormNgachCongChucComponent } from '../form-ngach-cong-chuc/form-ngach-cong-chuc.component';

@Component({
    selector: 'app-list-ngach-cong-chuc',
    templateUrl: './list-ngach-cong-chuc.component.html',
    styleUrls: ['./list-ngach-cong-chuc.component.scss'],
})
export class ListNgachCongChucComponent extends BaseCatalogComponent<INhomNgach> implements OnInit, OnDestroy {
    private nhomNgachIds: number[] = [];
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
        this.eventBusSub = this.eventBus.on(EventBus.SelectNgachCongChuc, id => {
            this.nhomNgachIds = [id];
            // set page
            this.gridState.skip = 0;
            this.loadItems();
        });
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.eventBusSub.unsubscribe();
    }

    showFormCreateOrUpdate() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('CATALOG.NGACH_CONG_CHUC.TITLE'),
            content: FormNgachCongChucComponent,
            width: 550,
            top: 100,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.action = this.action;
        param.model = this.model;

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
    removeHandler(dataItem: INgachCongChuc) {
        this.selectionIds = [];
        this.selectionIds.push(dataItem.ngachCongChucId);
        this.removeSelectedHandler();
    }

    /**
     * Removes multiple selected handler
     */
    removeSelectedHandler() {
        if (this.selectionIds.length > 0) {
            const body = {
                ngachCongChucIds: this.selectionIds,
            };
            this.modal.confirm({
                nzTitle: ModalDeleteConfig.title,
                nzContent: ModalDeleteConfig.content,
                nzOkText: ModalDeleteConfig.yes,
                nzOkType: 'danger',
                nzOnOk: () => {
                    this.apiService
                        .delete(UrlConstant.API.DM_NGACH_CONG_CHUC, body)
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
                nzOnCancel: () => {},
            });
        }
    }

    /**
     * Loads data via api service
     */
    protected loadItems() {
        this.isLoading = true;
        this.gridView$ = this.apiService
            .read(UrlConstant.API.DM_NGACH_CONG_CHUC + '/List', {
                ...this.queryOptions,
                nhomNgachId: this.nhomNgachIds,
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
