import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalDeleteConfig, PageConfig } from '@core/constants/app.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { IPagedResult } from '@core/models/common';
import { CustomTranslateService, EventBus, EventBusService, NotificationService } from '@core/services/common';
import { MenuQuery } from '@management-state/menu/menu.query';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { NzModalService } from 'ng-zorro-antd';
import { Subscription } from 'rxjs';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { BaseLaboratoryCatalogComponent } from '../../_base/base-laboratory-catalog.components';
import { ICongCu } from '../../_models/ptn.model';
import { FormCongCuComponent } from '../form-cong-cu/form-cong-cu.component';

@Component({
    selector: 'app-list-cong-cu',
    templateUrl: './list-cong-cu.component.html',
    styleUrls: ['./list-cong-cu.component.scss']
})
export class ListCongCuComponent extends BaseLaboratoryCatalogComponent<ICongCu> implements OnInit, OnDestroy {
    private eventBusSub: Subscription;
    private id: number = null;
    constructor(
        private apiService: ApiService,
        private modal: NzModalService,
        private notification: NotificationService,
        protected windowService: WindowService,
        private translate: CustomTranslateService,
        private eventBus: EventBusService,
        protected menuQuery: MenuQuery
    ) {
        super(menuQuery, windowService);
    }

    ngOnInit() {
        this.tabName = this.menuQuery.getTitleWithCurrentUrl();
        super.ngOnInit();

        this.eventBusSub = this.eventBus.on(EventBus.SelectNhomCongCu, id => {
            this.id = id;
            // set page
            this.gridState.skip = 0;
            this.loadItems();

        });
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    protected showFormCreateOrUpdate() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('PTN.CC.CONG_CU'),
            content: FormCongCuComponent,
            width: 850,
            top: 10,
            autoFocusedElement: 'body',
        });
        const param = windowRef.content.instance;
        param.action = this.action;
        param.model = this.model;
        param.idNhomCongCu = this.id != null ? this.id : null;
        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.loadItems();
            }
        });
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
                        .delete(UrlConstant.API.DM_CONG_CU, body)
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
     * Removes handler
     * @param dataItem
     */
    removeHandler(dataItem: ICongCu) {
        this.selectionIds = [];
        this.selectionIds.push(dataItem.id);
        this.removeSelectedHandler();
    }

    /**
     * Loads data via api service
     */
    protected loadItems() {
        if (this.id && this.id !== null) {
            this.isLoading = true;
            this.gridView$ = this.apiService.post(UrlConstant.API.DM_CONG_CU + '/GetList', {
                ...this.queryOptions,
                idRef: this.id,
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

