import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ModalDeleteConfig, PageConfig, ReziseTable } from '@core/constants/app.constant';
import { ActionEnum, ActionType } from '@core/constants/enum.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { IHocVi } from '@themes/views/management/catalogs/_models/catalog.model';
import { NotificationService } from '@core/services/common/notification.service';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { GridDataResult, PagerSettings } from '@progress/kendo-angular-grid';
import { SortDescriptor, State } from '@progress/kendo-data-query';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { FormHocViComponent } from './form-hoc-vi/form-hoc-vi.component';
import { MenuQuery } from '@management-state/menu/menu.query';
import { tap } from 'rxjs/operators';
import { BaseCatalogComponent } from '../_base/base-catalog.component';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';

@Component({
    selector: 'app-hoc-vi',
    templateUrl: './hoc-vi.component.html',
    styleUrls: ['./hoc-vi.component.scss'],
})
export class HocViComponent extends BaseCatalogComponent<IHocVi> implements OnInit, OnDestroy {
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
            title: this.translate.get('CATALOG.HOC_VI.TITLE'),
            content: FormHocViComponent,
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

    removeHandler(dataItem: IHocVi) {
        this.selectionIds = [];
        this.selectionIds.push(dataItem.hocViId);
        this.removeSelectedHandler();
    }

    removeSelectedHandler() {
        if (this.selectionIds.length > 0) {
            const body = {
                hocViIds: this.selectionIds,
            };
            this.modal.confirm({
                nzTitle: ModalDeleteConfig.title,
                nzContent: ModalDeleteConfig.content,
                nzOkText: ModalDeleteConfig.yes,
                nzOkType: 'danger',
                nzOnOk: () => {
                    this.apiService.delete(UrlConstant.API.DM_HOC_VI, body).subscribe(res => {
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
        this.gridView$ = this.apiService.fetchPost(UrlConstant.API.DM_HOC_VI + '/List', this.queryOptions).pipe(
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
