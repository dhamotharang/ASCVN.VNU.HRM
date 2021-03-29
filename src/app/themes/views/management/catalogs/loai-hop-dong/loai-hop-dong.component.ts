import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { FormNhomHopDongComponent } from './form-nhom-hop-dong/form-nhom-hop-dong.component';
import { FormLoaiHopDongComponent } from './form-loai-hop-dong/form-loai-hop-dong.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NotificationService } from '@core/services/common/notification.service';
import { WindowService, WindowCloseResult } from '@progress/kendo-angular-dialog';
import { ApiService } from '@core/data-services/api.service';
import { FormControl } from '@angular/forms';
import { ActionEnum, ActionType } from '@core/constants/enum.constant';
import { INhomHopDong, ILoaiHopDong } from '@themes/views/management/catalogs/_models/catalog.model';
import { PageConfig, ModalDeleteConfig, ReziseTable } from '@core/constants/app.constant';
import { SortDescriptor, State } from '@progress/kendo-data-query';
import { GridDataResult, PagerSettings } from '@progress/kendo-angular-grid';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MenuQuery } from '@management-state/menu/menu.query';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
export enum HopDongEnum {
    NhomHopDong = 0,
    LoaiHopDong = 1,
}
@Component({
    selector: 'app-hop-dong',
    templateUrl: './loai-hop-dong.component.html',
    styleUrls: ['./loai-hop-dong.component.scss'],
})
export class LoaiHopDongComponent implements OnInit, OnDestroy {
    listPermission: number[];
    public actionType = ActionType;
    public opened = false;
    public gridViewNhomHopDong: GridDataResult;
    public gridViewLoaiHopDong: GridDataResult;
    public gridStateNhomHopDong: State = {
        sort: [{ field: 'id', dir: 'desc' }],
        skip: 0,
        take: 20,
    };

    public gridStateLoaiHopDong: State = {
        sort: [{ field: 'id', dir: 'desc' }],
        skip: 0,
        take: 20,
    };

    pageConfig: PagerSettings | boolean = PageConfig;
    protected destroyed$ = new Subject();
    public action: ActionEnum;
    public hopDongEnum = HopDongEnum;
    public modelNhomHopDong: INhomHopDong;
    public modelLoaiHopDong: ILoaiHopDong;
    public selectionNhomHopDongIds: number[] = [];
    public selectionLoaiHopDongIds: number[] = [];

    searchControl = new FormControl();
    nhomHopDongId: number;
    public roles = {
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
        public apiService: ApiService,
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
        this.loadItemNhomHopDongs();
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    /**
     * Adds handler
     */
    addHandler(mode: HopDongEnum) {
        this.action = ActionEnum.CREATE;
        switch (mode) {
            case HopDongEnum.NhomHopDong:
                this.modelNhomHopDong = undefined;
                this.openFormNhomHopDong();
                break;
            case HopDongEnum.LoaiHopDong:
                this.modelLoaiHopDong = undefined;
                this.modelLoaiHopDong = {
                    nhomHopDongId: this.nhomHopDongId,
                };
                this.openFormLoaiHopDong();
                break;
        }
    }

    editHandler(mode: HopDongEnum, dataItem) {
        this.action = ActionEnum.UPDATE;
        switch (mode) {
            case HopDongEnum.NhomHopDong:
                this.modelNhomHopDong = dataItem;
                this.openFormNhomHopDong();
                break;
            case HopDongEnum.LoaiHopDong:
                this.modelLoaiHopDong = dataItem;
                this.modelLoaiHopDong.nhomHopDongId = this.nhomHopDongId;
                this.openFormLoaiHopDong();
                break;
        }
    }

    openFormNhomHopDong() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: 'Nhóm hợp đồng',
            content: FormNhomHopDongComponent,
            width: 550,
            top: 100,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.action = this.action;
        param.model = this.modelNhomHopDong;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.loadItemNhomHopDongs();
            }
        });
    }

    openFormLoaiHopDong() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: 'Loại hợp đồng',
            content: FormLoaiHopDongComponent,
            width: 550,
            top: 100,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.action = this.action;
        param.model = this.modelLoaiHopDong;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.loadItemLoaiHopDongs();
            }
        });
    }

    /**
     * Removes handler
     * @param dataItem
     */
    removeHandler(mode, dataItem) {
        switch (mode) {
            case HopDongEnum.NhomHopDong:
                this.selectionNhomHopDongIds = [];
                this.selectionNhomHopDongIds.push(dataItem.nhomHopDongId);
                this.removeNhomHopDongSelectedHandler();
                break;
            case HopDongEnum.LoaiHopDong:
                this.selectionLoaiHopDongIds = [];
                this.selectionLoaiHopDongIds.push(dataItem.loaiHopDongId);
                this.removeLoaiHopDongSelectedHandler();
                break;
        }
    }

    /**
     * Removes multiple selected handler
     */
    removeNhomHopDongSelectedHandler() {
        if (this.selectionNhomHopDongIds.length > 0) {
            const body = {
                nhomHopDongIds: this.selectionNhomHopDongIds,
            };
            this.modal.confirm({
                nzTitle: ModalDeleteConfig.title,
                nzContent: ModalDeleteConfig.content,
                nzOkText: ModalDeleteConfig.yes,
                nzOkType: 'danger',
                nzOnOk: () => {
                    this.apiService.delete(UrlConstant.API.DM_NHOM_HOP_DONG, body).subscribe(res => {
                        // show notification
                        this.notificationService.showSuccessMessage(this.translate.get('MES.DELETE_DONE'));
                        // set current page
                        this.gridStateNhomHopDong.skip = 0;
                        // reload data
                        this.loadItemNhomHopDongs();
                    });
                },
                nzCancelText: ModalDeleteConfig.no,
                nzOnCancel: () => {},
            });
        }
    }

    removeLoaiHopDongSelectedHandler() {
        if (this.selectionLoaiHopDongIds.length > 0) {
            const body = {
                loaiHopDongIds: this.selectionLoaiHopDongIds,
            };
            this.modal.confirm({
                nzTitle: ModalDeleteConfig.title,
                nzContent: ModalDeleteConfig.content,
                nzOkText: ModalDeleteConfig.yes,
                nzOkType: 'danger',
                nzOnOk: () => {
                    this.apiService.delete(UrlConstant.API.DM_LOAI_HOP_DONG, body).subscribe(res => {
                        // show notification
                        this.notificationService.showSuccessMessage(this.translate.get('MES.DELETE_DONE'));
                        // set current page
                        this.gridStateLoaiHopDong.skip = 0;
                        // reload data
                        this.loadItemLoaiHopDongs();
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
    onStateChangeNhomHopDong(state: State) {
        this.gridStateNhomHopDong = state;
        this.loadItemNhomHopDongs();
    }

    onStateChangeLoaiHopDong(state: State) {
        this.gridStateLoaiHopDong = state;
        this.loadItemLoaiHopDongs();
    }

    cellClickNhomHopDongHandler({ isEdited, dataItem, rowIndex }) {
        if (dataItem.nhomHopDongId && dataItem.nhomHopDongId !== this.nhomHopDongId) {
            this.nhomHopDongId = dataItem.nhomHopDongId;
            this.loadItemLoaiHopDongs();
        }
    }

    public sortChange(mode: HopDongEnum, sort: SortDescriptor[]): void {
        switch (mode) {
            case HopDongEnum.NhomHopDong:
                this.gridStateNhomHopDong.sort = sort;
                this.loadItemNhomHopDongs();
                break;
            case HopDongEnum.LoaiHopDong:
                this.gridStateLoaiHopDong.sort = sort;
                this.loadItemLoaiHopDongs();
                break;
        }
    }

    /**
     * Gets query options
     */
    private get queryOptionNhomHopDongs() {
        return {
            pageNumber: this.gridStateNhomHopDong.skip / this.gridStateNhomHopDong.take + 1,
            pageSize: this.gridStateNhomHopDong.take,
            sortCol: this.gridStateNhomHopDong.sort[0].field,
            sortByASC: this.gridStateNhomHopDong.sort[0].dir === 'asc',
        };
    }

    private get queryOptionLoaiHopDongs() {
        return {
            pageNumber: this.gridStateLoaiHopDong.skip / this.gridStateLoaiHopDong.take + 1,
            pageSize: this.gridStateLoaiHopDong.take,
            nhomHopDongId: [this.nhomHopDongId],
            sortCol: this.gridStateLoaiHopDong.sort[0].field,
            sortByASC: this.gridStateLoaiHopDong.sort[0].dir === 'asc',
        };
    }

    private loadItemNhomHopDongs() {
        this.apiService
            .fetchPost(UrlConstant.API.DM_NHOM_HOP_DONG + '/List', this.queryOptionNhomHopDongs)
            .pipe(
                tap(res => {
                    if (res.total <= this.gridStateNhomHopDong.take) {
                        this.pageConfig = false;
                    } else {
                        this.pageConfig = PageConfig;
                    }
                }),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                if (res.data) {
                    const result = res.data as INhomHopDong[];
                    this.gridViewNhomHopDong = {
                        data: result,
                        total: res.total,
                    };
                    if (result && result.length > 0) {
                        this.nhomHopDongId = result[0].nhomHopDongId;
                        this.loadItemLoaiHopDongs();
                    } else {
                        this.gridViewNhomHopDong = {
                            data: [],
                            total: 0,
                        };
                    }
                }
            });
    }

    private loadItemLoaiHopDongs() {
        this.apiService
            .fetchPost(UrlConstant.API.DM_LOAI_HOP_DONG + '/List', this.queryOptionLoaiHopDongs)
            .pipe(
                tap(res => {
                    if (res.total <= this.gridStateLoaiHopDong.take) {
                        this.pageConfig = false;
                    } else {
                        this.pageConfig = PageConfig;
                    }
                }),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                if (res.data) {
                    const result = res.data as ILoaiHopDong[];
                    this.gridViewLoaiHopDong = {
                        data: result,
                        total: res.total,
                    };
                }
            });
    }
}
