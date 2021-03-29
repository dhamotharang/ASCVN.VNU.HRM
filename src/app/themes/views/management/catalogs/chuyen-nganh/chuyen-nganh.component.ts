import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NotificationService } from '@core/services/common/notification.service';
import { WindowService, WindowCloseResult } from '@progress/kendo-angular-dialog';
import { ApiService } from '@core/data-services/api.service';
import { FormControl } from '@angular/forms';
import { ActionEnum, ActionType } from '@core/constants/enum.constant';
import { INganh, IChuyenNganh } from '@themes/views/management/catalogs/_models/catalog.model';
import { PageConfig, ModalDeleteConfig, ReziseTable } from '@core/constants/app.constant';
import { SortDescriptor, State } from '@progress/kendo-data-query';
import { GridDataResult, PagerSettings } from '@progress/kendo-angular-grid';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MenuQuery } from '@management-state/menu/menu.query';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormChuyenNganhComponent } from './form-chuyen-nganh/form-chuyen-nganh.component';
import { FormNganhComponent } from './form-nganh/form-nganh.component';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
export enum ChuyenNganhEnum {
    Nganh = 0,
    ChuyenNganh = 1,
}
@Component({
    selector: 'app-chuyen-nganh',
    templateUrl: './chuyen-nganh.component.html',
    styleUrls: ['./chuyen-nganh.component.scss'],
})
export class ChuyenNganhComponent implements OnInit, OnDestroy {
    listPermission: number[];
    actionType = ActionType;
    opened = false;
    gridViewNganh: GridDataResult;
    gridViewChuyenNganh: GridDataResult;
    gridStateNganh: State = {
        sort: [{ field: 'id', dir: 'desc' }],
        skip: 0,
        take: 20,
    };

    gridStateChuyenNganh: State = {
        sort: [{ field: 'id', dir: 'desc' }],
        skip: 0,
        take: 20,
    };

    pageConfigNganh: PagerSettings | boolean = PageConfig;
    pageConfigChuyenNganh: PagerSettings | boolean = PageConfig;
    action: ActionEnum;
    chuyenNganhEnum = ChuyenNganhEnum;
    modelNganh: INganh;
    modelChuyenNganh: IChuyenNganh;

    selectionNganhIds: number[] = [];
    selectionChuyenNganhIds: number[] = [];
    searchControl = new FormControl();
    nganhId: number;
    protected destroyed$ = new Subject();
    roles = {
        isView: false,
        isCreate: false,
        isUpdate: false,
        isDelete: false,
    };
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
        private menuQuery: MenuQuery
    ) {}

    ngOnInit() {
        const storage = this.menuQuery.getStorage();
        if (storage && storage.length > 0) {
            const permissions = this.menuQuery.getPermissionWithCurrentUrl(storage);
            if (permissions.includes(ActionType.VIEW)) {
                this.roles.isView = true;
            }

            if (permissions.includes(ActionType.CREATE)) {
                this.roles.isCreate = true;
            }

            if (permissions.includes(ActionType.DELETE)) {
                this.roles.isDelete = true;
            }

            if (permissions.includes(ActionType.UPDATE)) {
                this.roles.isUpdate = true;
            }
        }
        this.loadItemNganhs();
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    /**
     * Adds handler
     */
    addHandler(mode: ChuyenNganhEnum) {
        this.action = ActionEnum.CREATE;
        switch (mode) {
            case ChuyenNganhEnum.Nganh:
                this.modelNganh = undefined;
                this.openFormNganh();
                break;
            case ChuyenNganhEnum.ChuyenNganh:
                this.modelChuyenNganh = {
                    ma: '',
                    ten: '',
                    nganhId: this.nganhId,
                };
                this.openFormChuyenNganh();
                break;
        }
    }

    editHandler(mode: ChuyenNganhEnum, dataItem) {
        this.action = ActionEnum.UPDATE;
        switch (mode) {
            case ChuyenNganhEnum.Nganh:
                this.modelNganh = dataItem;
                this.openFormNganh();
                break;
            case ChuyenNganhEnum.ChuyenNganh:
                this.modelChuyenNganh = dataItem;
                this.openFormChuyenNganh();
                break;
        }
    }

    openFormNganh() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: 'Ngành',
            content: FormNganhComponent,
            width: 550,
            top: 100,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.action = this.action;
        param.model = this.modelNganh;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.loadItemNganhs();
            }
        });
    }

    openFormChuyenNganh() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: 'Chuyên ngành',
            content: FormChuyenNganhComponent,
            width: 550,
            top: 100,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.action = this.action;
        param.model = this.modelChuyenNganh;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.loadItemChuyenNganhs();
            }
        });
    }

    /**
     * Removes handler
     * @param dataItem
     */
    removeHandler(mode, dataItem) {
        switch (mode) {
            case ChuyenNganhEnum.Nganh:
                this.selectionNganhIds = [];
                this.selectionNganhIds.push(dataItem.nhomChuyenNganhId);
                this.removeNganhSelectedHandler();
                break;
            case ChuyenNganhEnum.ChuyenNganh:
                this.selectionChuyenNganhIds = [];
                this.selectionChuyenNganhIds.push(dataItem.ChuyenNganhId);
                this.removeChuyenNganhSelectedHandler();
                break;
        }
    }

    /**
     * Removes multiple selected handler
     */
    removeNganhSelectedHandler() {
        if (this.selectionNganhIds.length > 0) {
            const body = {
                nhomChuyenNganhIds: this.selectionNganhIds,
            };
            this.modal.confirm({
                nzTitle: ModalDeleteConfig.title,
                nzContent: ModalDeleteConfig.content,
                nzOkText: ModalDeleteConfig.yes,
                nzOkType: 'danger',
                nzOnOk: () => {
                    this.apiService.delete(UrlConstant.API.DM_NHOM_VIEC_LAM, body).subscribe(res => {
                        this.selectionNganhIds = [];
                        // show notification
                        this.notificationService.showSuccessMessage(this.translate.get('MES.DELETE_DONE'));
                        // set current page
                        this.gridStateNganh.skip = 0;
                        // reload data
                        this.loadItemNganhs();
                    });
                },
                nzCancelText: ModalDeleteConfig.no,
                nzOnCancel: () => {},
            });
        }
    }

    removeChuyenNganhSelectedHandler() {
        if (this.selectionChuyenNganhIds.length > 0) {
            const body = {
                ChuyenNganhIds: this.selectionChuyenNganhIds,
            };
            this.modal.confirm({
                nzTitle: ModalDeleteConfig.title,
                nzContent: ModalDeleteConfig.content,
                nzOkText: ModalDeleteConfig.yes,
                nzOkType: 'danger',
                nzOnOk: () => {
                    this.apiService.delete(UrlConstant.API.DM_VI_TRI_VIEC_LAM, body).subscribe(res => {
                        this.selectionChuyenNganhIds = [];
                        // show notification
                        this.notificationService.showSuccessMessage(this.translate.get('MES.DELETE_DONE'));
                        // set current page
                        this.gridStateChuyenNganh.skip = 0;
                        // reload data
                        this.loadItemChuyenNganhs();
                    });
                },
                nzCancelText: ModalDeleteConfig.no,
                nzOnCancel: () => {},
            });
        }
    }

    /**
     * State change with fields: take, skip, sort
     * @param state
     */
    onStateChangeNganh(state: State) {
        this.gridStateNganh = state;
        this.loadItemNganhs();
    }

    onStateChangeChuyenNganh(state: State) {
        this.gridStateChuyenNganh = state;
        this.loadItemChuyenNganhs();
    }

    cellClickNganhHandler({ isEdited, dataItem, rowIndex }) {
        if (dataItem.id && dataItem.id !== this.nganhId) {
            this.nganhId = dataItem.id;
            this.loadItemChuyenNganhs();
        }
    }

    public sortChange(mode: ChuyenNganhEnum, sort: SortDescriptor[]): void {
        switch (mode) {
            case ChuyenNganhEnum.Nganh:
                this.gridStateNganh.sort = sort;
                this.loadItemNganhs();
                break;
            case ChuyenNganhEnum.ChuyenNganh:
                this.gridStateChuyenNganh.sort = sort;
                this.loadItemChuyenNganhs();
                break;
        }
    }
    /**
     * Gets query options
     */
    private get queryOptionNganhs() {
        return {
            pageNumber: this.gridStateNganh.skip / this.gridStateNganh.take + 1,
            pageSize: this.gridStateNganh.take,
            sortCol: this.gridStateNganh.sort[0].field,
            sortByASC: this.gridStateNganh.sort[0].dir === 'asc' ? true : false,
        };
    }

    private get queryOptionChuyenNganhs() {
        return {
            pageNumber: this.gridStateChuyenNganh.skip / this.gridStateChuyenNganh.take + 1,
            pageSize: this.gridStateChuyenNganh.take,
            nganhId: [this.nganhId ?? 0],
            sortCol: this.gridStateChuyenNganh.sort[0].field,
            sortByASC: this.gridStateChuyenNganh.sort[0].dir === 'asc' ? true : false,
        };
    }

    /**
     * Loads data via api service
     */
    private loadItemNganhs() {
        this.apiService
            .fetchPost(UrlConstant.API.DM_NGANH + '/List', this.queryOptionNganhs)
            .pipe(
                tap(res => {
                    if (res.total <= this.gridStateNganh.take) {
                        this.pageConfigNganh = false;
                    } else {
                        this.pageConfigNganh = PageConfig;
                    }
                }),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                if (res.data) {
                    const result = res.data as INganh[];
                    this.gridViewNganh = {
                        data: result,
                        total: res.total,
                    };
                    if (result && result.length > 0) {
                        this.nganhId = result[0].id;
                        this.loadItemChuyenNganhs();
                    } else {
                        this.gridViewNganh = {
                            data: [],
                            total: 0,
                        };
                    }
                }
            });
    }

    private loadItemChuyenNganhs() {
        this.apiService
            .fetchPost(UrlConstant.API.DM_CHUYEN_NGANH + '/List', this.queryOptionChuyenNganhs)
            .pipe(
                tap(res => {
                    if (res.total <= this.gridStateChuyenNganh.take) {
                        this.pageConfigChuyenNganh = false;
                    } else {
                        this.pageConfigChuyenNganh = PageConfig;
                    }
                }),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                if (res.data) {
                    const result = res.data as IChuyenNganh[];
                    this.gridViewChuyenNganh = {
                        data: result,
                        total: res.total,
                    };
                }
            });
    }
}
