import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalDeleteConfig, PageConfig } from '@core/constants/app.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { IViTriViecLam } from '@themes/views/management/catalogs/_models/catalog.model';
import { IPagedResult } from '@core/models/common';
import { EventBus, EventBusService, NotificationService } from '@core/services/common';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import { MenuQuery } from '@management-state/menu/menu.query';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { NzModalService } from 'ng-zorro-antd';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { BaseCatalogComponent } from '../../_base/base-catalog.component';
import { FormViTriViecLamComponent } from '../form-vi-tri-viec-lam/form-vi-tri-viec-lam.component';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-list-vi-tri-viec-lam',
    templateUrl: './list-vi-tri-viec-lam.component.html',
    styleUrls: ['./list-vi-tri-viec-lam.component.scss'],
})
export class ListViTriViecLamComponent extends BaseCatalogComponent<IViTriViecLam> implements OnInit, OnDestroy {
    private nhomViTriViecLamIds: number[] = [];
    private eventBusSelectViTriViecLam: Subscription;
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
        this.eventBusSelectViTriViecLam = this.eventBus.on(EventBus.SelectViTriViecLam, id => {
            this.nhomViTriViecLamIds = [id];
            // set page
            this.gridState.skip = 0;
            this.loadItems();
        });
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.eventBusSelectViTriViecLam.unsubscribe();
    }

    showFormCreateOrUpdate() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('CATALOG.VI_TRI_VIEC_LAM.TITLE'),
            content: FormViTriViecLamComponent,
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
    removeHandler(dataItem: IViTriViecLam) {
        this.selectionIds = [];
        this.selectionIds.push(dataItem.viTriViecLamId);
        this.removeSelectedHandler();
    }

    /**
     * Removes multiple selected handler
     */
    removeSelectedHandler() {
        if (this.selectionIds.length > 0) {
            const body = {
                viTriViecLamIds: this.selectionIds,
            };
            this.modal.confirm({
                nzTitle: ModalDeleteConfig.title,
                nzContent: ModalDeleteConfig.content,
                nzOkText: ModalDeleteConfig.yes,
                nzOkType: 'danger',
                nzOnOk: () => {
                    this.apiService
                        .delete(UrlConstant.API.DM_VI_TRI_VIEC_LAM, body)
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
            .read(UrlConstant.API.DM_VI_TRI_VIEC_LAM + '/List', {
                ...this.queryOptions,
                nhomViTriViecLamId: this.nhomViTriViecLamIds,
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
