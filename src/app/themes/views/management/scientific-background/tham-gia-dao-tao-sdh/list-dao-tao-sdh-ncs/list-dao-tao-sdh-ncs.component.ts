import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ModalDeleteConfig, PageConfig, ReziseTable } from '@core/constants/app.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { VaiTroHuongDanEnum } from '@themes/views/management/scientific-background/_models/scientific-background.enum';
import { IThamGiaDaoTaoSdh } from '@themes/views/management/scientific-background/_models/scientific-background.model';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import { NotificationService } from '@core/services/common/notification.service';
import { MenuQuery } from '@management-state/menu/menu.query';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { NzModalService } from 'ng-zorro-antd';
import { finalize, tap } from 'rxjs/operators';
import { BaseScientificBackgroundComponent } from '../../_base/base-scientific-background.component';
import { FormThamGiaDaoTaoSdhComponent } from '../form-tham-gia-dao-tao-sdh/form-tham-gia-dao-tao-sdh.component';

@Component({
    selector: 'app-list-dao-tao-sdh-ncs',
    templateUrl: './list-dao-tao-sdh-ncs.component.html',
    styleUrls: ['./list-dao-tao-sdh-ncs.component.scss'],
})
export class ListDaoTaoSdhNcsComponent extends BaseScientificBackgroundComponent<IThamGiaDaoTaoSdh> implements OnInit, OnDestroy {
    vaiTroHuongDanEnum = VaiTroHuongDanEnum;
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
            title: this.translate.get('SB.TEXT.02'),
            content: FormThamGiaDaoTaoSdhComponent,
            width: 850,
            top: 100,
            autoFocusedElement: 'body',
        });
        const param = windowRef.content.instance;
        param.action = this.action;
        param.model = this.model;
        param.flagNCS = true;
        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.loadItems();
            }
        });
    }

    removeHandler(dataItem: IThamGiaDaoTaoSdh) {
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
                    this.apiService.delete(UrlConstant.API.LLKH_THAM_GIA_DAO_TAO_SDH, body).subscribe(res => {
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
            .fetchPost(UrlConstant.API.LLKH_THAM_GIA_DAO_TAO_SDH + '/List', {
                pageNumber: this.gridState.skip / this.gridState.take + 1,
                pageSize: this.gridState.take,
                sortName: this.gridState.sort[0].field,
                sortASC: this.gridState.sort[0].dir === 'asc',
                isNghienCuuSinh: true,
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
