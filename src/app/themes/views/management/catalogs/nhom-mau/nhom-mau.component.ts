import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ModalDeleteConfig, PageConfig, ReziseTable } from '@core/constants/app.constant';
import { ActionEnum, ActionType } from '@core/constants/enum.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { INhomMau } from '@themes/views/management/catalogs/_models/catalog.model';
import { NotificationService } from '@core/services/common/notification.service';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { GridDataResult, PagerSettings } from '@progress/kendo-angular-grid';
import { SortDescriptor, State } from '@progress/kendo-data-query';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { FormNhomMauComponent } from './form-nhom-mau/form-nhom-mau.component';
import { MenuQuery } from '@management-state/menu/menu.query';
import { finalize, map, tap } from 'rxjs/operators';
import { BaseCatalogComponent } from '../_base/base-catalog.component';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import { IPagedResult } from '@core/models/common';

@Component({
    selector: 'app-nhom-mau',
    templateUrl: './nhom-mau.component.html',
    styleUrls: ['./nhom-mau.component.scss'],
})
export class NhomMauComponent extends BaseCatalogComponent<INhomMau> implements OnInit, OnDestroy {
    constructor(
        private apiService: ApiService,
        private windowService: WindowService,
        private notificationService: NotificationService,
        private translate: CustomTranslateService,
        private modal: NzModalService,
        protected menuQuery: MenuQuery
    ) {
        super(menuQuery);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    showFormCreateOrUpdate() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('CATALOG.NHOM_MAU.TITLE'),
            content: FormNhomMauComponent,
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

    removeHandler(dataItem: INhomMau) {
        this.selectionIds = [];
        this.selectionIds.push(dataItem.nhomMauId);
        this.removeSelectedHandler();
    }

    removeSelectedHandler() {
        if (this.selectionIds.length > 0) {
            const body = {
                nhomMauIds: this.selectionIds,
            };
            this.modal.confirm({
                nzTitle: ModalDeleteConfig.title,
                nzContent: ModalDeleteConfig.content,
                nzOkText: ModalDeleteConfig.yes,
                nzOkType: 'danger',
                nzOnOk: () => {
                    this.apiService.delete(UrlConstant.API.DM_NHOM_MAU, body).subscribe(res => {
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

    loadItems() {
        this.isLoading = true;
        this.gridView$ = this.apiService.read(UrlConstant.API.DM_NHOM_MAU + '/List', this.queryOptions).pipe(
            map(res => {
                const results = res.result as IPagedResult<INhomMau[]>;
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
