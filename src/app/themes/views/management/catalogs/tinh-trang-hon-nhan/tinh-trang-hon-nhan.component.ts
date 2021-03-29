import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalDeleteConfig, PageConfig } from '@core/constants/app.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { ITinhTrangHonNhan } from '@themes/views/management/catalogs/_models/catalog.model';
import { NotificationService } from '@core/services/common/notification.service';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormTinhTrangHonNhanComponent } from './form-tinh-trang-hon-nhan/form-tinh-trang-hon-nhan.component';
import { MenuQuery } from '@management-state/menu/menu.query';
import { finalize, map, tap } from 'rxjs/operators';
import { BaseCatalogComponent } from '../_base/base-catalog.component';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import { IPagedResult } from '@core/models/common';

@Component({
    selector: 'app-tinh-trang-hon-nhan',
    templateUrl: './tinh-trang-hon-nhan.component.html',
    styleUrls: ['./tinh-trang-hon-nhan.component.scss'],
})
export class TinhTrangHonNhanComponent extends BaseCatalogComponent<ITinhTrangHonNhan> implements OnInit, OnDestroy {
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

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    showFormCreateOrUpdate() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('CATALOG.TINH_TRANG_HON_NHAN.TITLE'),
            content: FormTinhTrangHonNhanComponent,
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

    removeHandler(dataItem: ITinhTrangHonNhan) {
        this.selectionIds = [];
        this.selectionIds.push(dataItem.tinhTrangHonNhanId);
        this.removeSelectedHandler();
    }

    removeSelectedHandler() {
        if (this.selectionIds.length > 0) {
            const body = {
                tinhTrangHonNhanIds: this.selectionIds,
            };
            this.modal.confirm({
                nzTitle: ModalDeleteConfig.title,
                nzContent: ModalDeleteConfig.content,
                nzOkText: ModalDeleteConfig.yes,
                nzOkType: 'danger',
                nzOnOk: () => {
                    this.apiService.delete(UrlConstant.API.DM_TINH_TRANG_HON_NHAN, body).subscribe(res => {
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

    loadItems() {
        // super.loadItems();
        this.isLoading = true;
        this.gridView$ = this.apiService.read(UrlConstant.API.DM_TINH_TRANG_HON_NHAN + '/List', this.queryOptions).pipe(
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
