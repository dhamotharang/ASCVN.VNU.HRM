import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { PageConfig, ModalDeleteConfig, ReziseTable } from '@core/constants/app.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService } from '@core/services/common/notification.service';
import { WindowService, WindowCloseResult } from '@progress/kendo-angular-dialog';
import { NzModalService } from 'ng-zorro-antd/modal';
import { MenuQuery } from '@management-state/menu/menu.query';
import { FormBangSoHuuTriTueComponent } from './form-bang-so-huu-tri-tue/form-bang-so-huu-tri-tue.component';
import { IBangSoHuuTriTue } from '@themes/views/management/scientific-background/_models/scientific-background.model';
import { finalize, tap } from 'rxjs/operators';
import { BaseScientificBackgroundComponent } from '../_base/base-scientific-background.component';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';

@Component({
    selector: 'app-bang-so-huu-tri-tue',
    templateUrl: './bang-so-huu-tri-tue.component.html',
    styleUrls: ['./bang-so-huu-tri-tue.component.scss'],
})
export class BangSoHuuTriTueComponent extends BaseScientificBackgroundComponent<IBangSoHuuTriTue> implements OnInit, OnDestroy {
    pageHeight = window.innerHeight - ReziseTable - 20;
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.pageHeight = event.target.innerHeight - ReziseTable - 20;
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
            title: 'Bằng sở hữu trí tuệ',
            content: FormBangSoHuuTriTueComponent,
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

    removeHandler(dataItem: IBangSoHuuTriTue) {
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
                    this.apiService.delete(UrlConstant.API.LLKH_BANG_SO_HUU_TRI_TUE, body).subscribe(res => {
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
        this.gridView$ = this.apiService.fetchPost(UrlConstant.API.LLKH_BANG_SO_HUU_TRI_TUE + '/List', this.queryOptions).pipe(
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
