import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ModalDeleteConfig, PageConfig, ReziseTable } from '@core/constants/app.constant';
import { ActionEnum, ActionType } from '@core/constants/enum.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { IXepLoaiKetQuaDanhGia } from '@themes/views/management/catalogs/_models/catalog.model';
import { NotificationService } from '@core/services/common/notification.service';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { SortDescriptor, State } from '@progress/kendo-data-query';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { FormKetQuaDanhGiaComponent } from './form-ket-qua-danh-gia/form-ket-qua-danh-gia.component';
import { MenuQuery } from '@management-state/menu/menu.query';
import { tap } from 'rxjs/operators';
import { PagerSettings } from '@progress/kendo-angular-treelist';
import { BaseCatalogComponent } from '../_base/base-catalog.component';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';

@Component({
    selector: 'app-ket-qua-danh-gia',
    templateUrl: './ket-qua-danh-gia.component.html',
    styleUrls: ['./ket-qua-danh-gia.component.scss'],
})
export class KetQuaDanhGiaComponent extends BaseCatalogComponent<IXepLoaiKetQuaDanhGia> implements OnInit, OnDestroy {
    constructor(
        public apiService: ApiService,
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
            title: this.translate.get('CATALOG.KET_QUA_DANH_GIA.TITLE'),
            content: FormKetQuaDanhGiaComponent,
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

    removeHandler(dataItem: IXepLoaiKetQuaDanhGia) {
        this.selectionIds = [];
        this.selectionIds.push(dataItem.xepLoaiKetQuaDanhGiaId);
        this.removeSelectedHandler();
    }

    removeSelectedHandler() {
        if (this.selectionIds.length > 0) {
            const body = {
                xepLoaiKetQuaDanhGiaIds: this.selectionIds,
            };
            this.modal.confirm({
                nzTitle: ModalDeleteConfig.title,
                nzContent: ModalDeleteConfig.content,
                nzOkText: ModalDeleteConfig.yes,
                nzOkType: 'danger',
                nzOnOk: () => {
                    this.apiService.delete(UrlConstant.API.DM_KET_QUA_DANH_GIA, body).subscribe(res => {
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
        this.gridView$ = this.apiService.fetchPost(UrlConstant.API.DM_KET_QUA_DANH_GIA + '/List', this.queryOptions).pipe(
            tap(res => {
                if (res.total <= this.gridState.take) {
                    this.pageConfig = false;
                } else {
                    this.pageConfig = PageConfig;
                }
            })
        );
    }
}
