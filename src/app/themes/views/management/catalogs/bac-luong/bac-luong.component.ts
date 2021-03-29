import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalDeleteConfig, PageConfig } from '@core/constants/app.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { IBacLuong } from '@themes/views/management/catalogs/_models/catalog.model';
import { NotificationService } from '@core/services/common/notification.service';
import { WindowService } from '@progress/kendo-angular-dialog';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormBacLuongComponent } from './form-bac-luong/form-bac-luong.component';
import { MenuQuery } from '@management-state/menu/menu.query';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { BaseCatalogComponent } from '@themes/views/management/catalogs/_base/base-catalog.component';
import { IPagedResult } from '@core/models/common/response-data.model';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import { DropDownListEnum } from '@shared/containers/asc-select/asc-select.enum';

@Component({
    selector: 'app-bac-luong',
    templateUrl: './bac-luong.component.html',
    styleUrls: ['./bac-luong.component.scss'],
})
export class BacLuongComponent extends BaseCatalogComponent<IBacLuong> implements OnInit, OnDestroy {
    constructor(
        private apiService: ApiService,
        private windowService: WindowService,
        private notificationService: NotificationService,
        private modal: NzModalService,
        private translate: CustomTranslateService,
        protected menuQuery: MenuQuery
    ) {
        super(menuQuery);
    }
    modelSearch = {
        nhomNgachId: null,
        keyword: '',
    };
    dropdownListEnum = DropDownListEnum;
    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
    onSearchHandler() { 
        let query = {};
        if(this.modelSearch?.nhomNgachId > 0){
            query = { ...this.queryOptions,nhomNgachId : [this.modelSearch.nhomNgachId]};
        }else{
            query = { ...this.queryOptions};
        }
        this.isLoading = true;  
        this.gridView$ = this.apiService.read(UrlConstant.API.DM_BAC_LUONG + '/List',query).pipe(
            map(res => {
                const results = res.result as IPagedResult<IBacLuong[]>;
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

    resetHandler() {
        this.modelSearch = { 
            nhomNgachId: null,
            keyword: '',
        };
    }
 

    showFormCreateOrUpdate() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('CATALOG.BAC_LUONG.TITLE'),
            content: FormBacLuongComponent,
            width: 550,
            top: 100,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.action = this.action;
        param.model = this.model;

        windowRef.result.subscribe(result => {
            this.loadItems();
            this.opened = false;
        });
    }

    /**
     * Removes handler
     * @param dataItem
     */
    removeHandler(dataItem: IBacLuong) {
        this.selectionIds = [];
        this.selectionIds.push(dataItem.bacLuongId);
        this.removeSelectedHandler();
    }

    /**
     * Removes multiple selected handler
     */
    removeSelectedHandler() {
        if (this.selectionIds.length > 0) {
            const body = {
                bacLuongIds: this.selectionIds,
            };
            this.modal.confirm({
                nzTitle: ModalDeleteConfig.title,
                nzContent: ModalDeleteConfig.content,
                nzOkText: ModalDeleteConfig.yes,
                nzOkType: 'danger',
                nzOnOk: () => {
                    this.apiService
                        .delete(UrlConstant.API.DM_BAC_LUONG, body)
                        .pipe(takeUntil(this.destroyed$))
                        .subscribe(() => {
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

    /**
     * Loads data via api service
     */
    protected loadItems() {
        this.isLoading = true;  
        this.gridView$ = this.apiService.read(UrlConstant.API.DM_BAC_LUONG + '/List',{
        ...this.queryOptions}).pipe(
            map(res => {
                const results = res.result as IPagedResult<IBacLuong[]>;
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
