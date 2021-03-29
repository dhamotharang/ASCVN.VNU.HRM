import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '@core/data-services/api.service';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { MenuQuery } from '@management-state/menu/menu.query';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CustomTranslateService, FileService, NotificationService } from '@core/services/common';
import { ActionEnum } from '@core/constants/enum.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { ModalDeleteConfig, PageConfig } from '@core/constants/app.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { INhiemVuKHCN } from '../_models/science-technology.model';
import { BaseScienceTechnologyComponent } from '../_base/base-science-technology.component';
import { FormNhiemVuKhcnComponent } from './form-nhiem-vu-khcn/form-nhiem-vu-khcn.component';
import { FormDuyetComponent } from '../_component/form-duyet/form-duyet.component';
import { SelectionEvent } from '@progress/kendo-angular-grid';
import { AuthenticateService, ListRoleOption } from '@core/auth';
import { EKHCN } from '../_models/science-technology.enum';

@Component({
    selector: 'app-quan-ly-nhiem-vu-khcn',
    templateUrl: './quan-ly-nhiem-vu-khcn.component.html',
    styleUrls: ['./quan-ly-nhiem-vu-khcn.component.scss'],
})
export class QuanLyNhiemVuKhcnComponent extends BaseScienceTechnologyComponent<INhiemVuKHCN> implements OnInit, OnDestroy {
    @Input() isMain: boolean;
    @Input() isQuanLy: boolean;
    url: string = UrlConstant.API.NHIEM_VU_KHCN;
    sub_url_getList: string = '/GetListSortDynamic';
    sub_url_getID: string = '/GetById';
    userId: Number;
    extendModelSearch = {
        keyWord: '',
        idCoQuans: [],
        idCapDos: [],
        idLinhVucs: [],
        namThucHiens: [],
        idTrangThaiDuyets: [],
        permisionType: 0,
    };

    private get extendQueryOptions() {
        return {
            keyWord: this.extendModelSearch.keyWord,
            idCapDos: this.extendModelSearch.idCapDos,
            idLinhVucs: this.extendModelSearch.idLinhVucs,
            namThucHiens: this.extendModelSearch.namThucHiens,
            idTrangThaiDuyets: this.extendModelSearch.idTrangThaiDuyets,
            idCoQuans: this.extendModelSearch.idCoQuans.length > 0 ? this.extendModelSearch.idCoQuans.map(x => Number(x)) : [],
            permisionType: this.extendModelSearch.permisionType,
            ...this.queryOptions,
        };
    }

    constructor(
        private apiService: ApiService,
        private modal: NzModalService,
        private notification: NotificationService,
        protected menuQuery: MenuQuery,
        protected windowService: WindowService,
        private translate: CustomTranslateService,
        private fileService: FileService,
        protected auth: AuthenticateService,
    ) {
        super(menuQuery, windowService, auth);
    }
    ngOnInit() {
        super.ngOnInit();

        if (this.isMain == null) {
            this.isMain = true;
        }
        this.userId = this.user.userId != null ? Number(this.user.userId) : 0;
        this.tabName = this.menuQuery.getTitleWithCurrentUrl();

        this.rolesExtends.isDuyet =  this.isHasPermission(ListRoleOption.KHCN_0007);

        /*
            0 - Cá nhân
            1 - Quản lý
         */
        this.extendModelSearch.permisionType = 0;
        if (this.isQuanLy === true) {
            this.extendModelSearch.permisionType = 1;
        }

        super.ngOnInit();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    addHandler() {
        this.action = ActionEnum.CREATE;
        this.title = this.translate.get('NV.TITLE.C');
        this.loadOneItems(0);
    }

    editHandler(dataItem) {
        this.action = ActionEnum.UPDATE;
        this.title = this.translate.get('NV.TITLE.M');
        this.loadOneItems(dataItem.id);
    }

    showFormCreateOrUpdate() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.title,
            content: FormNhiemVuKhcnComponent,
            width: 1200,
            top: 10,
            autoFocusedElement: 'body',
        });
        const param = windowRef.content.instance;
        param.action = this.action;
        param.model = this.model;
        param.isQuanLy = this.isQuanLy;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.loadItems();
            }
        });
    }

    loadItems() {
        this.isLoading = true;
        this.gridView$ = this.apiService.post(UrlConstant.API.NHIEM_VU_KHCN + this.sub_url_getList, this.extendQueryOptions, true).pipe(
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

    selectRow(e: SelectionEvent) {
        if (e.selectedRows.length > 0) {
            const listChon = e.selectedRows;
            listChon.map(x => {
                if (this.isQuanLy || (x.dataItem.createdById == this.userId && x.dataItem.idTrangThaiDuyet !== this.trangThaiDuyet)) {
                    this.selectionIds.push(x.dataItem.id);
                    this.selectionNames.push(x.dataItem.maNhiemVuKhoaHoc);
                }
            });
        }
        if (e.deselectedRows.length > 0) {
            const listBoChon = e.deselectedRows;
            listBoChon.map(x => {
                const index = this.selectionIds.findIndex(y => x.dataItem.id === y);
                if (index > -1) {
                    this.selectionIds.splice(index, 1);
                    this.selectionNames.splice(index, 1);
                }
            });
        }
    }

    loadOneItems(id) {
        this.apiService
            .post(this.url + this.sub_url_getID, { id: id }, true)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                this.model = res.result;
                this.showFormCreateOrUpdate();
            });
    }

    removeHandler(dataItem) {
        this.selectionIds = [];
        this.selectionIds.push(dataItem.id);
        this.removeSelectedHandler();
    }

    refreshHandler() {
        this.extendModelSearch = {
            keyWord: '',
            idCoQuans: [],
            idCapDos: [],
            idLinhVucs: [],
            namThucHiens: [],
            idTrangThaiDuyets: [],
            permisionType: this.extendModelSearch.permisionType,
        };
        this.loadItems();
    }

    removeSelectedHandler() {
        if (this.selectionIds.length > 0) {
            const body = {
                idThamChieus: this.selectionIds,
            };
            this.modal.confirm({
                nzTitle: ModalDeleteConfig.title,
                nzContent: ModalDeleteConfig.content,
                nzOkText: ModalDeleteConfig.yes,
                nzOkType: 'danger',
                nzOnOk: () => {
                    const removeNhanSu$ = this.apiService.delete(this.url + '/Delete', body).pipe(takeUntil(this.destroyed$));
                    removeNhanSu$.subscribe(() => {
                        this.selectionIds = [];
                        this.notification.showSuccessMessage(MessageConstant.COMMON.MSG_DELETE_DONE);
                        this.gridState.skip = 0;
                        this.loadItems();
                    });
                },
                nzCancelText: ModalDeleteConfig.no,
                nzOnCancel: () => { },
            });
        }
    }

    onDuyetKhongDuyet() {
        if (this.selectionIds.length > 0) {
            this.title = this.translate.get('NV.TITLE.DUYET');
            this.opened = true;
            const windowRef = this.windowService.open({
                title: this.title,
                content: FormDuyetComponent,
                width: 800,
                top: 50,
                autoFocusedElement: 'body',
            });
            const param = windowRef.content.instance;
            param.action = this.action;
            param.model = this.model;
            param.idManHinh = EKHCN.NHIEM_VU;
            param.ids = this.selectionIds;
            param.names = this.selectionNames;
            param.url = this.url;
            windowRef.result.subscribe(result => {
                if (result instanceof WindowCloseResult) {
                    this.opened = false;
                    this.loadItems();
                }
            });
        }
    }

    onExportExcel() {
        this.fileService.exportFile(this.url + '/ExportExcel', this.extendQueryOptions, 'quan-ly-nhiem-vu-khcn');
    }
}
