import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalDeleteConfig, PageConfig } from '@core/constants/app.constant';
import { ActionEnum } from '@core/constants/enum.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { CustomTranslateService, EventBus, EventBusService, NotificationService } from '@core/services/common';
import { MenuQuery } from '@management-state/menu/menu.query';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subscription } from 'rxjs';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { BaseLaboratoryComponent } from '../../_base/base-laboratory.component';
import { IPhanQuyenPhuTrach } from '../../_models/ptn.model';
import { FormCapNhatNhanSuComponent } from './form-cap-nhat-nhan-su/form-cap-nhat-nhan-su.component';
import { FormThemNhanSuComponent } from './form-them-nhan-su/form-them-nhan-su.component';

@Component({
    selector: 'app-list-nhan-su',
    templateUrl: './list-nhan-su.component.html',
    styleUrls: ['./list-nhan-su.component.scss'],
})
export class ListNhanSuComponent extends BaseLaboratoryComponent<IPhanQuyenPhuTrach> implements OnInit, OnDestroy {
    isDisable: boolean = true;
    private eventBusSub: Subscription;
    modelSearch = {
        ...this.modelSearch,
    };
    idsPhongThiNghiem: number[] = [];

    constructor(
        private apiService: ApiService,
        private modal: NzModalService,
        private notification: NotificationService,
        protected menuQuery: MenuQuery,
        protected windowService: WindowService,
        private eventBus: EventBusService,
        private translate: CustomTranslateService,
        private notificationService: NotificationService
    ) {
        super(menuQuery, windowService);
    }
    ngOnInit() {

        this.tabName = this.menuQuery.getTitleWithCurrentUrl();
        this.eventBusSub = this.eventBus.on(EventBus.SelectPhongThiNghiem, ids => {
            if (ids != null && ids !== undefined) {
                this.idsPhongThiNghiem = ids;
                this.isDisable = false;
                super.ngOnInit();
            }
        });
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.eventBusSub.unsubscribe();
    }
    loadItems() {
        if (this.idsPhongThiNghiem) {
            this.isLoading = true;
            this.gridView$ = this.apiService
                .post(
                    UrlConstant.API.PHAN_QUYEN_PHU_TRACH + '/GetPhanQuyenPhuTrachPhong',
                    {
                        ...this.queryOptions,
                        idPhongThiNghiem: this.idsPhongThiNghiem[0],
                    },
                    true
                )
                .pipe(
                    map(res => {
                        if (res.result && res.result.items) {
                            return {
                                data: res.result.items,
                                total: res.result.pagingInfo.totalItems,
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
                    finalize(() => {
                        this.isLoading = false;
                    })
                );
        }
    }

    removeHandler(dataItem) {
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
                    const remove$ = this.apiService.delete(UrlConstant.API.PHAN_QUYEN_PHU_TRACH, body).pipe(takeUntil(this.destroyed$));
                    remove$.subscribe(() => {
                        this.selectionIds = [];
                        this.notificationService.showSuccessMessage(MessageConstant.COMMON.MSG_DELETE_DONE);
                        this.gridState.skip = 0;
                        this.loadItems();
                    });
                },
                nzCancelText: ModalDeleteConfig.no,
                nzOnCancel: () => { },
            });
        }
    }

    addHandler() {
        if (this.idsPhongThiNghiem && this.idsPhongThiNghiem.length > 0) {
            this.model = undefined;
            this.action = ActionEnum.CREATE;
            this.title = this.translate.get('PTN.TITLE.C_PQPT');
            this.showFormCreate();
        }
    }

    editHandler(dataItem) {
        if (dataItem) {
            this.model = dataItem;
            this.action = ActionEnum.UPDATE;
            this.title = this.translate.get('PTN.TITLE.M_PQPT');
            this.showFormUpdate();
        }

    }

    showFormCreate() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.title,
            content: FormThemNhanSuComponent,
            width: 850,
            top: 10,
            autoFocusedElement: 'body',
        });
        const param = windowRef.content.instance;
        param.action = this.action;
        param.model = this.model;
        param.idsPhongThiNghiem = this.idsPhongThiNghiem;
        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.loadItems();
            }
        });
    }

    showFormUpdate() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.title,
            content: FormCapNhatNhanSuComponent,
            width: 850,
            top: 10,
            autoFocusedElement: 'body',
        });
        const param = windowRef.content.instance;
        param.action = this.action;
        param.model = this.model;
        param.idPhongThiNghiem = this.idsPhongThiNghiem[0];
        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.loadItems();
            }
        });
    }

    showFormCreateOrUpdate() { }
}
