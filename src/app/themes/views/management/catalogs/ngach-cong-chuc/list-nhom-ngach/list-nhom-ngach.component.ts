import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '@core/data-services/api.service';
import { NzModalService } from 'ng-zorro-antd';
import { EmitEvent, EventBus, EventBusService, NotificationService } from '@core/services/common';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import { MenuQuery } from '@management-state/menu/menu.query';
import { INhomNgach } from '@themes/views/management/catalogs/_models/catalog.model';
import { ModalDeleteConfig, PageConfig } from '@core/constants/app.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { MessageConstant } from '@core/constants/message.constant';
import { IPagedResult } from '@core/models/common';
import { BaseCatalogComponent } from '../../_base/base-catalog.component';
import { FormNhomNgachComponent } from '../form-nhom-ngach/form-nhom-ngach.component';

@Component({
    selector: 'app-list-nhom-ngach',
    templateUrl: './list-nhom-ngach.component.html',
    styleUrls: ['./list-nhom-ngach.component.scss'],
})
export class ListNhomNgachComponent extends BaseCatalogComponent<INhomNgach> implements OnInit, OnDestroy {
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
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    showFormCreateOrUpdate() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('CATALOG.NHOM_NGACH.TITLE'),
            content: FormNhomNgachComponent,
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

    selectRow({ isEdited, dataItem, rowIndex }) {
        this.eventBus.emit(new EmitEvent(EventBus.SelectNgachCongChuc, dataItem.nhomNgachId));
    }

    /**
     * Removes handler
     * @param dataItem
     */
    removeHandler(dataItem: INhomNgach) {
        this.selectionIds = [];
        this.selectionIds.push(dataItem.nhomNgachId);
        this.removeSelectedHandler();
    }

    /**
     * Removes multiple selected handler
     */
    removeSelectedHandler() {
        if (this.selectionIds.length > 0) {
            const body = {
                nhomNgachIds: this.selectionIds,
            };
            this.modal.confirm({
                nzTitle: ModalDeleteConfig.title,
                nzContent: ModalDeleteConfig.content,
                nzOkText: ModalDeleteConfig.yes,
                nzOkType: 'danger',
                nzOnOk: () => {
                    this.apiService
                        .delete(UrlConstant.API.DM_NHOM_NGACH, body)
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
        this.gridView$ = this.apiService.read(UrlConstant.API.DM_NHOM_NGACH + '/List', this.queryOptions).pipe(
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
