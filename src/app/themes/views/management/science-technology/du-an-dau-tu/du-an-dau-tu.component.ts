import { Input, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ModalDeleteConfig, PageConfig } from '@core/constants/app.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { CustomTranslateService, FileService, NotificationService } from '@core/services/common';
import { MenuQuery } from '@management-state/menu/menu.query';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { NzModalService } from 'ng-zorro-antd';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { IDuAnDauTu } from '../_models/science-technology.model';
import { BaseScienceTechnologyComponent } from '../_base/base-science-technology.component';
import { FormDuAnDauTuComponent } from './form-du-an-dau-tu/form-du-an-dau-tu.component';
import { FormDuyetComponent } from '../_component/form-duyet/form-duyet.component';
import { ActionEnum } from '@core/constants/enum.constant';
import { SelectionEvent } from '@progress/kendo-angular-grid';
import { AuthenticateService, ListRoleOption } from '@core/auth';
import { EKHCN } from '../_models/science-technology.enum';

@Component({
    selector: 'app-du-an-dau-tu',
    templateUrl: './du-an-dau-tu.component.html',
    styleUrls: ['./du-an-dau-tu.component.scss'],
})
export class DuAnDauTuComponent extends BaseScienceTechnologyComponent<IDuAnDauTu> implements OnInit, OnDestroy {
    @Input() isMain: boolean;
    @Input() isQuanLy: boolean;
    @Input() idPhongThiNghiem: number;
    url: string = UrlConstant.API.KHCN_DU_AN_DAU_TU;
    sub_url_getList: string = '/GetListSortDynamic';
    sub_url_getID: string = '/GetById';
    userId: Number;
    extendModelSearch = {
        keyWord: '',
        soQuyetDinh: '',
        diaDiem: '',
        kinhPhi: 0,
        ngayKhoiCong: null,
        ngayHoanThanh: null,
        idLoaiDuAns: [],
        idCoQuans: [],
        namDauTus: [],
        idTrangThaiDuyets: [],
        permisionType: 0,
    };

    private get extendQueryOptions() {
        return {
            keyWord: this.extendModelSearch.keyWord,
            ngayKhoiCong: this.extendModelSearch.ngayKhoiCong,
            ngayHoanThanh: this.extendModelSearch.ngayHoanThanh,
            idLoaiDuAns: this.extendModelSearch.idLoaiDuAns,
            idCoQuans: this.extendModelSearch.idCoQuans.length > 0 ? this.extendModelSearch.idCoQuans.map(x => Number(x)) : [],
            namDauTus: this.extendModelSearch.namDauTus,
            idTrangThaiDuyets: this.extendModelSearch.idTrangThaiDuyets,
            permisionType: this.extendModelSearch.permisionType,

            ...this.queryOptions,
        };
    }

    constructor(
        private apiService: ApiService,
        private modal: NzModalService,
        private notification: NotificationService,
        protected windowService: WindowService,
        private translate: CustomTranslateService,
        protected menuQuery: MenuQuery,
        private fileService: FileService,
        protected auth: AuthenticateService,

    ) {
        super(menuQuery, windowService,auth);
    }

    ngOnInit() {
        super.ngOnInit();
        if (this.isMain == null) {
            this.isMain = true;
        }
        this.userId = this.user.userId != null ? Number(this.user.userId) : 0;
        this.tabName = this.menuQuery.getTitleWithCurrentUrl();

        this.rolesExtends.isDuyet =  this.isHasPermission(ListRoleOption.KHCN_0003);
        
        /*
            0 - Cá nhân
            1 - Quản lý
         */
        this.extendModelSearch.permisionType = 0;
        if (this.isQuanLy === true) {
            this.extendModelSearch.permisionType = 1;
        }

        this.loadItems();
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

    loadOneItems(id) {
        this.apiService
            .post(this.url + this.sub_url_getID, { id: id }, true)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                this.model = res.result;
                this.showFormCreateOrUpdate();
            });
    }

    loadItems() {
        this.isLoading = true;
        this.gridView$ = this.apiService.post(this.url + this.sub_url_getList, this.extendQueryOptions, true).pipe(
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
                if(this.isQuanLy || (x.dataItem.createdById == this.userId && x.dataItem.idTrangThaiDuyet !== this.trangThaiDuyet)){
                    this.selectionIds.push(x.dataItem.id);
                    this.selectionNames.push(x.dataItem.tenDuAnDauTu);
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

    showFormCreateOrUpdate() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('SCI.DADT.TITLE_DU_AN_DAU_TU'),
            content: FormDuAnDauTuComponent,
            width: 1200,
            top: 100,
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

    removeHandler(dataItem: IDuAnDauTu) {
        this.selectionIds = [];
        this.selectionIds.push(dataItem.id);
        this.removeSelectedHandler();
    }

    refreshHandler() {
        this.extendModelSearch = {
            keyWord: '',
            soQuyetDinh: '',
            diaDiem: '',
            kinhPhi: 0,
            ngayKhoiCong: null,
            ngayHoanThanh: null,
            idLoaiDuAns: [],
            idCoQuans: [],
            namDauTus: [],
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
                    this.apiService.delete(this.url + '/Delete', body).subscribe(res => {
                        // reset
                        this.selectionIds = [];
                        // show notification
                        this.notification.showSuccessMessage(this.translate.get('MES.DELETE_DONE'));
                        // set current page
                        this.gridState.skip = 0;
                        // reload data
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
            this.title = this.translate.get('SCI.DUYET_DA');
            this.opened = true;
            const windowRef = this.windowService.open({
                title: this.title,
                content: FormDuyetComponent,
                width: 800,
                top: 10,
                autoFocusedElement: 'body',
            });
            const param = windowRef.content.instance;
            param.action = this.action;
            param.model = this.model;
            param.idManHinh = EKHCN.DU_AN;
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
        this.fileService.exportFile(this.url + '/ExportExcel', this.extendQueryOptions, 'du-an-dau-tu');
    }
}
