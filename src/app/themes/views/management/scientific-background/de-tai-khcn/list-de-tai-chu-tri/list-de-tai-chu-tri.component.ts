import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ModalDeleteConfig, PageConfig, ReziseTable } from '@core/constants/app.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { IDeTaiKhcn } from '@themes/views/management/scientific-background/_models/scientific-background.model';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import { NotificationService } from '@core/services/common/notification.service';
import { MenuQuery } from '@management-state/menu/menu.query';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { NzModalService } from 'ng-zorro-antd';
import { finalize, tap } from 'rxjs/operators';
import { BaseScientificBackgroundComponent } from '../../_base/base-scientific-background.component';
import { FormDeTaiKhcnComponent } from '../form-de-tai-khcn/form-de-tai-khcn.component';

@Component({
    selector: 'app-list-de-tai-chu-tri',
    templateUrl: './list-de-tai-chu-tri.component.html',
    styleUrls: ['./list-de-tai-chu-tri.component.scss'],
})
export class ListDeTaiChuTriComponent extends BaseScientificBackgroundComponent<IDeTaiKhcn> implements OnInit, OnDestroy {
    pageHeight = (window.innerHeight - ReziseTable - 20) / 2;
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.pageHeight = (event.target.innerHeight - ReziseTable - 20) / 2;
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
            title: 'Các đề tài KH&CN các cấp đã chủ trì',
            content: FormDeTaiKhcnComponent,
            width: 850,
            top: 100,
            autoFocusedElement: 'body',
        });
        const param = windowRef.content.instance;
        param.action = this.action;
        param.model = this.model;
        param.flagChuTri = true;
        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.loadItems();
            }
        });
    }

    removeHandler(dataItem: IDeTaiKhcn) {
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
                    this.apiService.delete(UrlConstant.API.LLKH_DE_TAI_KHCN, body).subscribe(res => {
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

    protected loadItems() {
        this.loading = true;
        this.gridView$ = this.apiService
            .fetchPost(UrlConstant.API.LLKH_DE_TAI_KHCN + '/List', {
                pageNumber: this.gridState.skip / this.gridState.take + 1,
                pageSize: this.gridState.take,
                sortName: this.gridState.sort[0].field,
                sortASC: this.gridState.sort[0].dir === 'asc',
                isChuTri: true,
            })
            .pipe(
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
