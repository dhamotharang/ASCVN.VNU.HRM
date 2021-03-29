import { Input, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AuthenticateService, ListRoleOption } from '@core/auth';
import { ModalDeleteConfig, PageConfig } from '@core/constants/app.constant';
import { ActionEnum } from '@core/constants/enum.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { CustomTranslateService, FileService, NotificationService } from '@core/services/common';
import { MenuQuery } from '@management-state/menu/menu.query';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { SelectionEvent } from '@progress/kendo-angular-grid';
import { NzModalService } from 'ng-zorro-antd';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { BaseScienceTechnologyComponent } from '../_base/base-science-technology.component';
import { FormDuyetComponent } from '../_component/form-duyet/form-duyet.component';
import { EKHCN } from '../_models/science-technology.enum';
import { IPhatMinhSangChe } from '../_models/science-technology.model';
import { FormPhatMinhSangCheComponent } from './form-phat-minh-sang-che/form-phat-minh-sang-che.component';
@Component({
    selector: 'app-phat-minh-sang-che',
    templateUrl: './phat-minh-sang-che.component.html',
    styleUrls: ['./phat-minh-sang-che.component.scss'],
})
export class PhatMinhSangCheComponent extends BaseScienceTechnologyComponent<IPhatMinhSangChe> implements OnInit, OnDestroy {
    @Input() isMain: boolean;
    @Input() isQuanLy: boolean;
    @Input() idPhongThiNghiem: number;

    url: string = UrlConstant.API.KHCN_PHAT_MINH_SANG_CHE;
    sub_url_getList: string = '/GetListSortDynamic';
    sub_url_getID: string = '/GetById';
    userId: Number;

    extendModelSearch = {
        keyWord: '',
        idDeTais: [],
        idTinhTrangDangKys: [],
        idTinhTrangSanPhams: [],
        idQuocGiaCapBangs: [],
        idToChucCapBangs: [],
        idCoQuans: [],
        idTrangThaiDuyets: [],
        idPhongThiNghiems: [],
        permisionType: 0,
    };

    private get extendQueryOptions() {
        return {
            keyWord: this.extendModelSearch.keyWord,
            idDeTais: this.extendModelSearch.idDeTais,
            idTinhTrangDangKys: this.extendModelSearch.idTinhTrangDangKys,
            idTinhTrangSanPhams: this.extendModelSearch.idTinhTrangSanPhams,
            idQuocGiaCapBangs: this.extendModelSearch.idQuocGiaCapBangs,
            idToChucCapBangs: this.extendModelSearch.idToChucCapBangs,
            idTrangThaiDuyets: this.extendModelSearch.idTrangThaiDuyets,
            idCoQuans: this.extendModelSearch.idCoQuans.length > 0 ? this.extendModelSearch.idCoQuans.map(x=> Number(x)) : [],
            permisionType: this.extendModelSearch.permisionType,
            idPhongThiNghiems: this.extendModelSearch.idPhongThiNghiems,

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
        this.rolesExtends.isDuyet =  this.isHasPermission(ListRoleOption.KHCN_0006);

        if (this.idPhongThiNghiem) {
            this.extendModelSearch.idPhongThiNghiems.push(this.idPhongThiNghiem);
        }

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
                    this.selectionNames.push(x.dataItem.tenPhatMinhSangChe);
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
            title: this.translate.get('SCI.PMSC.TITLE_PHAT_MINH_SANG_CHE'),
            content: FormPhatMinhSangCheComponent,
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

    removeHandler(dataItem: IPhatMinhSangChe) {
        this.selectionIds = [];
        this.selectionIds.push(dataItem.id);
        this.removeSelectedHandler();
    }
    refreshHandler() {
        this.extendModelSearch = {
            keyWord: '',
            idDeTais: [],
            idTinhTrangDangKys: [],
            idTinhTrangSanPhams: [],
            idQuocGiaCapBangs: [],
            idToChucCapBangs: [],
            idCoQuans: [],
            idTrangThaiDuyets: [],
            idPhongThiNghiems: [],
            permisionType: this.extendModelSearch.permisionType
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
                nzOnCancel: () => {},
            });
        }
    }

    onDuyetKhongDuyet() {
        if (this.selectionIds.length > 0) {
            this.title = this.translate.get('SCI.DUYET_PM');
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
            param.idManHinh = EKHCN.PHAT_MINH;
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
        this.fileService.exportFile(this.url + '/ExportExcel', this.extendQueryOptions, 'phat-minh-sang-che');
    }
}
