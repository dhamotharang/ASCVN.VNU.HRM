import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { FormQuanHuyenComponent } from './form-quan-huyen/form-quan-huyen.component';
import { FormPhuongXaComponent } from './form-phuong-xa/form-phuong-xa.component';
import { FormTinhThanhComponent } from './form-tinh-thanh/form-tinh-thanh.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NotificationService } from '@core/services/common/notification.service';
import { WindowService, WindowCloseResult } from '@progress/kendo-angular-dialog';
import { ApiService } from '@core/data-services/api.service';
import { FormControl } from '@angular/forms';
import { ActionEnum, ActionType } from '@core/constants/enum.constant';
import { ITinhThanh, IQuanHuyen, IPhuongXa } from '@themes/views/management/catalogs/_models/catalog.model';
import { PageConfig, ModalDeleteConfig, ReziseTable } from '@core/constants/app.constant';
import { SortDescriptor, State } from '@progress/kendo-data-query';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MenuQuery } from '@management-state/menu/menu.query';
import { IPagedResult, IResponseData } from '@core/models/common/response-data.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';

export enum DonViHanhChinhEnum {
    TinhThanh = 0,
    QuanHuyen = 1,
    PhuongXa = 2,
}

@Component({
    selector: 'app-don-vi-hanh-chinh',
    templateUrl: './don-vi-hanh-chinh.component.html',
    styleUrls: ['./don-vi-hanh-chinh.component.scss'],
})
export class DonViHanhChinhComponent implements OnInit, OnDestroy {
    public actionType = ActionType;
    private tinhThanhId: number;
    private quanHuyenId: number;
    public opened = false;
    public gridViewTinhThanh: GridDataResult;

    public gridViewQuanHuyen: GridDataResult;
    public gridViewPhuongXa: GridDataResult;
    public gridStateTinhThanh: State = {
        sort: [{ field: 'id', dir: 'desc' }],
        skip: 0,
        take: 100,
    };

    public gridStateQuanHuyen: State = {
        sort: [{ field: 'id', dir: 'desc' }],
        skip: 0,
        take: 20,
    };

    public gridStatePhuongXa: State = {
        sort: [{ field: 'id', dir: 'desc' }],
        skip: 0,
        take: 20,
    };
    public pageConfig = PageConfig;

    public modelTinhThanh: ITinhThanh;
    public modelQuanHuyen: IQuanHuyen;
    public modelPhuongXa: IPhuongXa;
    public action: ActionEnum;

    public selectionTinhThanhIds: number[] = [];
    public selectionQuanHuyenIds: number[] = [];
    public selectionPhuongXaIds: number[] = [];

    public donViHanhChinhEnum = DonViHanhChinhEnum;
    public roles = {
        isView: false,
        isCreate: false,
        isUpdate: false,
        isDelete: false,
    };

    searchControl = new FormControl();
    pageHeight = window.innerHeight - ReziseTable;

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.pageHeight = event.target.innerHeight - ReziseTable;
    }

    private destroyed$ = new Subject();

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
        // this.loadItemTinhThanhs();
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    cellClickTinhThanhHandler({ isEdited, dataItem, rowIndex }) {
        if (dataItem.tinhThanhId) {
            this.tinhThanhId = dataItem.tinhThanhId;
            this.loadItemQuanHuyens();
        }
    }

    cellClickQuanHuyenHandler({ isEdited, dataItem, rowIndex }) {
        if (dataItem.quanHuyenId) {
            this.quanHuyenId = dataItem.quanHuyenId;
            this.loadItemPhuongXas();
        }
    }

    /**
     * Adds handler
     */
    addHandler(mode: DonViHanhChinhEnum) {
        this.action = ActionEnum.CREATE;
        switch (mode) {
            case DonViHanhChinhEnum.TinhThanh:
                this.modelTinhThanh = undefined;
                this.openFormTinhThanh();
                break;
            case DonViHanhChinhEnum.QuanHuyen:
                this.modelQuanHuyen = undefined;
                this.modelQuanHuyen = {
                    tinhThanhId: this.tinhThanhId,
                };
                this.openFormQuanHuyen();
                break;
            case DonViHanhChinhEnum.PhuongXa:
                this.modelPhuongXa = undefined;
                this.modelPhuongXa = {
                    quanHuyenId: this.quanHuyenId,
                    tinhThanhId: this.tinhThanhId,
                };
                this.openFormPhuongXa();
                break;
        }
    }

    editHandler(mode: DonViHanhChinhEnum, dataItem) {
        this.action = ActionEnum.UPDATE;
        switch (mode) {
            case DonViHanhChinhEnum.TinhThanh:
                this.modelTinhThanh = dataItem;
                this.openFormTinhThanh();
                break;
            case DonViHanhChinhEnum.QuanHuyen:
                this.modelQuanHuyen = dataItem;
                this.openFormQuanHuyen();
                break;
            case DonViHanhChinhEnum.PhuongXa:
                this.modelPhuongXa = dataItem;
                this.modelPhuongXa.tinhThanhId = this.tinhThanhId;
                this.openFormPhuongXa();
                break;
        }
    }

    openFormTinhThanh() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('CATALOG.TINH_THANH.TITLE'),
            content: FormTinhThanhComponent,
            width: 550,
            top: 100,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.action = this.action;
        param.model = this.modelTinhThanh;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.loadItemTinhThanhs();
            }
        });
    }

    openFormQuanHuyen() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('CATALOG.QUAN_HUYEN.TITLE'),
            content: FormQuanHuyenComponent,
            width: 550,
            top: 100,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.action = this.action;
        param.model = this.modelQuanHuyen;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.loadItemQuanHuyens();
            }
        });
    }

    openFormPhuongXa() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('CATALOG.PHUONG_XA.TITLE'),
            content: FormPhuongXaComponent,
            width: 550,
            top: 100,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.action = this.action;
        param.model = this.modelPhuongXa;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.loadItemPhuongXas();
            }
        });
    }

    /**
     * Removes handler
     * @param mode
     * @param dataItem
     */
    removeHandler(mode, dataItem) {
        switch (mode) {
            case DonViHanhChinhEnum.TinhThanh:
                this.selectionTinhThanhIds = [];
                this.selectionTinhThanhIds.push(dataItem.tinhThanhId);
                this.removeTinhThanhSelectedHandler();
                break;
            case DonViHanhChinhEnum.QuanHuyen:
                this.selectionQuanHuyenIds = [];
                this.selectionQuanHuyenIds.push(dataItem.quanHuyenId);
                this.removeQuanHuyenSelectedHandler();
                break;
            case DonViHanhChinhEnum.PhuongXa:
                this.selectionPhuongXaIds = [];
                this.selectionPhuongXaIds.push(dataItem.phuongXaId);
                this.removePhuongXaSelectedHandler();
                break;
        }
    }

    /**
     * Removes multiple selected handler
     */
    removeTinhThanhSelectedHandler() {
        if (this.selectionTinhThanhIds.length > 0) {
            const body = {
                tinhThanhIds: this.selectionTinhThanhIds,
            };
            this.modal.confirm({
                nzTitle: ModalDeleteConfig.title,
                nzContent: ModalDeleteConfig.content,
                nzOkText: ModalDeleteConfig.yes,
                nzOkType: 'danger',
                nzOnOk: () => {
                    const removeTinhThanh$ = this.apiService.delete(UrlConstant.API.DM_TINH_THANH, body).pipe(takeUntil(this.destroyed$));
                    removeTinhThanh$.subscribe(res => {
                        // reset
                        this.selectionTinhThanhIds = [];
                        // show notification
                        this.notificationService.showSuccessMessage(this.translate.get('MES.DELETE_DONE'));
                        // set current page
                        this.gridStateTinhThanh.skip = 0;
                        // reload data
                        this.loadItemTinhThanhs();
                    });
                },
                nzCancelText: ModalDeleteConfig.no,
                nzOnCancel: () => {},
            });
        }
    }

    removeQuanHuyenSelectedHandler() {
        if (this.selectionQuanHuyenIds.length > 0) {
            const body = {
                quanHuyenIds: this.selectionQuanHuyenIds,
            };
            this.modal.confirm({
                nzTitle: ModalDeleteConfig.title,
                nzContent: ModalDeleteConfig.content,
                nzOkText: ModalDeleteConfig.yes,
                nzOkType: 'danger',
                nzOnOk: () => {
                    const removeQuanHuyen$ = this.apiService.delete(UrlConstant.API.DM_QUAN_HUYEN, body).pipe(takeUntil(this.destroyed$));
                    removeQuanHuyen$.subscribe(() => {
                        // reset
                        this.selectionQuanHuyenIds = [];
                        // show notification
                        this.notificationService.showSuccessMessage(this.translate.get('MES.DELETE_DONE'));
                        // set current page
                        this.gridStateQuanHuyen.skip = 0;
                        // reload data
                        this.loadItemQuanHuyens();
                    });
                },
                nzCancelText: ModalDeleteConfig.no,
                nzOnCancel: () => {},
            });
        }
    }

    removePhuongXaSelectedHandler() {
        if (this.selectionPhuongXaIds.length > 0) {
            const body = {
                phuongXaIds: this.selectionPhuongXaIds,
            };
            this.modal.confirm({
                nzTitle: ModalDeleteConfig.title,
                nzContent: ModalDeleteConfig.content,
                nzOkText: ModalDeleteConfig.yes,
                nzOkType: 'danger',
                nzOnOk: () => {
                    const removePhuongXa$ = this.apiService.delete(UrlConstant.API.DM_PHUONG_XA, body).pipe(takeUntil(this.destroyed$));
                    removePhuongXa$.subscribe(() => {
                        // reset
                        this.selectionPhuongXaIds = [];
                        // show notification
                        this.notificationService.showSuccessMessage(this.translate.get('MES.DELETE_DONE'));
                        // set current page
                        this.gridStatePhuongXa.skip = 0;
                        // reload data
                        this.loadItemPhuongXas();
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
    onStateChangeTinhThanh(state: State) {
        this.gridStateTinhThanh = state;
        this.loadItemTinhThanhs();
    }

    onStateChangeQuanHuyen(state: State) {
        this.gridStateQuanHuyen = state;
        this.loadItemQuanHuyens();
    }

    onStateChangePhuongXa(state: State) {
        this.gridStatePhuongXa = state;
        this.loadItemPhuongXas();
    }

    sortChange(mode: DonViHanhChinhEnum, sort: SortDescriptor[]): void {
        switch (mode) {
            case DonViHanhChinhEnum.TinhThanh:
                this.gridStateTinhThanh.sort = sort;
                this.loadItemTinhThanhs();
                break;
            case DonViHanhChinhEnum.QuanHuyen:
                this.gridStateQuanHuyen.sort = sort;
                this.loadItemQuanHuyens();
                break;
            case DonViHanhChinhEnum.PhuongXa:
                this.gridStatePhuongXa.sort = sort;
                this.loadItemPhuongXas();
                break;
        }
    }

    /**
     * Gets query options
     */
    private get queryOptionTinhThanhs() {
        return {
            pageNumber: this.gridStateTinhThanh.skip / this.gridStateTinhThanh.take + 1,
            pageSize: this.gridStateTinhThanh.take,
            sortCol: this.gridStateTinhThanh.sort[0].field,
            sortByASC: this.gridStateTinhThanh.sort[0].dir === 'asc',
        };
    }

    private get queryOptionQuanHuyens() {
        return {
            pageNumber: this.gridStateQuanHuyen.skip / this.gridStateQuanHuyen.take + 1,
            pageSize: this.gridStateQuanHuyen.take,
            tinhThanhId: [this.tinhThanhId],
            sortCol: this.gridStateQuanHuyen.sort[0].field,
            sortByASC: this.gridStateQuanHuyen.sort[0].dir === 'asc',
        };
    }

    private get queryOptionPhuongXas() {
        return {
            pageNumber: this.gridStatePhuongXa.skip / this.gridStatePhuongXa.take + 1,
            pageSize: this.gridStatePhuongXa.take,
            quanHuyenId: [this.quanHuyenId],
            sortCol: this.gridStatePhuongXa.sort[0].field,
            sortByASC: this.gridStatePhuongXa.sort[0].dir === 'asc',
        };
    }

    /**
     * Loads data via api service
     */
    private loadItemTinhThanhs() {
        const tinhThanhs$ = this.apiService
            .read(UrlConstant.API.DM_TINH_THANH + '/List', this.queryOptionTinhThanhs)
            .pipe(takeUntil(this.destroyed$));
        tinhThanhs$.subscribe((res: IResponseData<IPagedResult<any>>) => {
            if (res.result && res.result.items) {
                this.gridViewTinhThanh = {
                    data: res.result.items,
                    total: res.result.pagingInfo.totalItems,
                };
                // load Quận huyện
                this.tinhThanhId = this.gridViewTinhThanh.data[0].tinhThanhId;
                this.loadItemQuanHuyens();
            } else {
                this.gridViewTinhThanh = {
                    data: [],
                    total: 0,
                };
                this.gridViewQuanHuyen = {
                    data: [],
                    total: 0,
                };
                this.gridViewPhuongXa = {
                    data: [],
                    total: 0,
                };
            }
        });
    }

    private loadItemQuanHuyens() {
        const quanHuyens$ = this.apiService
            .read(UrlConstant.API.DM_QUAN_HUYEN + '/List', this.queryOptionQuanHuyens)
            .pipe(takeUntil(this.destroyed$));
        quanHuyens$.subscribe((res: IResponseData<IPagedResult<any>>) => {
            if (res.result && res.result.items) {
                this.gridViewQuanHuyen = {
                    data: res.result.items,
                    total: res.result.pagingInfo.totalItems,
                };
                // load Quận huyện
                this.quanHuyenId = this.gridViewQuanHuyen.data[0].quanHuyenId;
                this.loadItemPhuongXas();
            } else {
                this.gridViewQuanHuyen = {
                    data: [],
                    total: 0,
                };
                this.gridViewPhuongXa = {
                    data: [],
                    total: 0,
                };
            }
        });
    }

    private loadItemPhuongXas() {
        const phuongXas$ = this.apiService
            .read(UrlConstant.API.DM_PHUONG_XA + '/List', this.queryOptionPhuongXas)
            .pipe(takeUntil(this.destroyed$));
        phuongXas$.subscribe((res: IResponseData<IPagedResult<any>>) => {
            if (res.result && res.result.items > 0) {
                this.gridViewPhuongXa = {
                    data: res.result.items,
                    total: res.result.pagingInfo.totalItems,
                };
            } else {
                this.gridViewPhuongXa = {
                    data: [],
                    total: 0,
                };
            }
        });
    }
}
