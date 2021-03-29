import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalDeleteConfig, PageConfig} from '@core/constants/app.constant';
import {UrlConstant} from '@core/constants/url.constant';
import {ApiService} from '@core/data-services/api.service';
import {INhomViecLam} from '@themes/views/management/catalogs/_models/catalog.model';
import {IPagedResult} from '@core/models/common';
import {EmitEvent, EventBus, EventBusService, NotificationService} from '@core/services/common';
import {CustomTranslateService} from '@core/services/common/custom-translate.service';
import {MenuQuery} from '@management-state/menu/menu.query';
import {WindowCloseResult, WindowService} from '@progress/kendo-angular-dialog';
import {NzModalService} from 'ng-zorro-antd';
import {finalize, map, takeUntil, tap} from 'rxjs/operators';
import {BaseCatalogComponent} from '../../_base/base-catalog.component';
import {FormNhomViecLamComponent} from '../form-nhom-viec-lam/form-nhom-viec-lam.component';

@Component({
    selector: 'app-list-nhom-viec-lam',
    templateUrl: './list-nhom-viec-lam.component.html',
    styleUrls: ['./list-nhom-viec-lam.component.scss'],
})
export class ListNhomViecLamComponent extends BaseCatalogComponent<INhomViecLam> implements OnInit, OnDestroy {
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
            title: this.translate.get('CATALOG.NHOM_VIEC_LAM.TITLE'),
            content: FormNhomViecLamComponent,
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
        this.eventBus.emit(new EmitEvent(EventBus.SelectViTriViecLam, dataItem.nhomViTriViecLamId));
    }

    /**
     * Removes handler
     * @param dataItem
     */
    removeHandler(dataItem: INhomViecLam) {
        this.selectionIds = [];
        this.selectionIds.push(dataItem.nhomViTriViecLamId);
        this.removeSelectedHandler();
    }

    /**
     * Removes multiple selected handler
     */
    removeSelectedHandler() {
        if (this.selectionIds.length > 0) {
            const body = {
                nhomViTriViecLamIds: this.selectionIds,
            };
            this.modal.confirm({
                nzTitle: ModalDeleteConfig.title,
                nzContent: ModalDeleteConfig.content,
                nzOkText: ModalDeleteConfig.yes,
                nzOkType: 'danger',
                nzOnOk: () => {
                    this.apiService
                        .delete(UrlConstant.API.DM_NHOM_VIEC_LAM, body)
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
        this.gridView$ = this.apiService.read(UrlConstant.API.DM_NHOM_VIEC_LAM + '/List', this.queryOptions).pipe(
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
