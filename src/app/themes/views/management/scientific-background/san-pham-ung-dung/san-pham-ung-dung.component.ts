import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { PageConfig, ModalDeleteConfig, ReziseTable } from '@core/constants/app.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService } from '@core/services/common/notification.service';
import { WindowService, WindowCloseResult } from '@progress/kendo-angular-dialog';
import { SortDescriptor } from '@progress/kendo-data-query';
import { NzModalService } from 'ng-zorro-antd/modal';
import { MenuQuery } from '@management-state/menu/menu.query';
import { FormSanPhamUngDungComponent } from './form-san-pham-ung-dung/form-san-pham-ung-dung.component';
import { finalize, tap } from 'rxjs/operators';
import { ISanPhamUngDung } from '@themes/views/management/scientific-background/_models/scientific-background.model';
import { NoiUngDungEnum } from '@themes/views/management/scientific-background/_models/scientific-background.enum';
import { BaseScientificBackgroundComponent } from '../_base/base-scientific-background.component';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';

@Component({
    selector: 'app-san-pham-ung-dung',
    templateUrl: './san-pham-ung-dung.component.html',
    styleUrls: ['./san-pham-ung-dung.component.scss'],
})
export class SanPhamUngDungComponent extends BaseScientificBackgroundComponent<ISanPhamUngDung> implements OnInit, OnDestroy {
    noiUngDungEnum = NoiUngDungEnum;
    pageHeight = window.innerHeight - ReziseTable;
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.pageHeight = event.target.innerHeight - ReziseTable;
    }

    constructor(
        private apiService: ApiService,
        private windowService: WindowService,
        private notificationService: NotificationService,
        private translate: CustomTranslateService,
        private modal: NzModalService,
        protected menuQuery: MenuQuery
    ) {
        super(menuQuery, null);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    openForm() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: 'Sản phẩm được ứng dụng, chuyển giao',
            content: FormSanPhamUngDungComponent,
            width: 850,
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

    removeHandler(dataItem: ISanPhamUngDung) {
        this.selectionIds = [];
        this.selectionIds.push(dataItem.id);
        this.removeSelectedHandler();
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
                    this.apiService.delete(UrlConstant.API.LLKH_SAN_PHAM_UNG_DUNG, body).subscribe(res => {
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

    sortChange(sort: SortDescriptor[]): void {
        this.gridState.sort = sort;
        this.loadItems();
    }

    protected loadItems() {
        this.loading = true;
        this.gridView$ = this.apiService.fetchPost(UrlConstant.API.LLKH_SAN_PHAM_UNG_DUNG + '/List', this.queryOptions).pipe(
            tap(res => {
                if (res.total <= this.gridState.take) {
                    this.pageConfig = false;
                } else {
                    this.pageConfig = PageConfig;
                }
            }),
            finalize(() => (this.loading = false))
        );
    }
}
