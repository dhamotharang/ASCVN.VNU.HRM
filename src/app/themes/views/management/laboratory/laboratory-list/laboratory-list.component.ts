import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalDeleteConfig, PageConfig, ReziseTable } from '@core/constants/app.constant';
import { ActionEnum, FileExtensionEnum } from '@core/constants/enum.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { CustomTranslateService, FileService, NotificationService, UtilService } from '@core/services/common';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { GridDataResult, PagerSettings, SelectionEvent } from '@progress/kendo-angular-grid';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';
import { State, SortDescriptor } from '@progress/kendo-data-query';
import { DropDownListEnum } from '@shared/containers/asc-select';
import { NzModalService } from 'ng-zorro-antd';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subject } from 'rxjs';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { BaseCheckPermission } from '@core/auth/base-check-permission';
import { MenuQuery } from '@management-state/menu/menu.query';
import { FormLaboratoryComponent } from './form-laboratory/form-laboratory.component';
import { ICoQuanByNhanSu, IPhongThiNghiem } from '../_models/ptn.model';
import { AuthenticateService, IUserInfo } from '@core/auth';
import { ViewFileComponent } from '@shared/controls/view-file';

export enum ReportLaboratoryEnum {
    MAU_1,
    MAU_2,
}

@Component({
    selector: 'app-laboratory-list',
    templateUrl: './laboratory-list.component.html',
    styleUrls: ['./laboratory-list.component.scss'],
})
export class LaboratoryListComponent extends BaseCheckPermission implements OnInit, OnDestroy {
    @ViewChild(TooltipDirective) public tooltipDir: TooltipDirective;
    filtersLoaded: Promise<boolean>;
    opened = false;
    phongThiNghiemId: number;
    userId: Number;
    private destroyed$ = new Subject();
    searchAdvance = false;
    openFirstTime = false;
    isLoading = false;
    gridView$: Observable<GridDataResult>;
    gridState: State = {
        sort: [
            {
                field: 'id',
                dir: 'desc',
            },
        ],
        skip: 0,
        take: 20,
    };
    coQuanNhanSu$: Observable<ICoQuanByNhanSu>;

    pageConfig: PagerSettings | boolean = PageConfig;
    model: IPhongThiNghiem;
    action: ActionEnum;
    selectionIds: number[] = [];
    title: string;
    dropdownListEnum = DropDownListEnum;
    searchControl = new FormControl();
    // public chonDonVi: number[] = [];
    // public chonNhanSu: number[] = [];
    public modelSearch = {
        keyword: '',
        idNhanSu: null,
        idCoQuan: [],        
        idLoaiHinhPhong: null,
        dsIdNganh: '',
        dsIdChuyenNganh: '',
        idNganh: [],
        idChuyenNganh: [],
        permissionType: null,
    };

    tabName: string;
    user: IUserInfo;
    pageHeight = window.innerHeight - ReziseTable + 32;

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.pageHeight = event.target.innerHeight - ReziseTable + 32;
    }
    constructor(
        private fileService: FileService,
        private route: ActivatedRoute,
        private util: UtilService,
        private apiService: ApiService,
        private windowService: WindowService,
        private spinner: NgxSpinnerService,
        private modal: NzModalService,
        private notificationService: NotificationService,
        protected menuQuery: MenuQuery,
        private translate: CustomTranslateService,
        private auth: AuthenticateService
    ) {
        super(menuQuery);
    }

    ngOnInit() {
        super.ngOnInit();
        /*
            0 - Cá nhân
            1 - Quản lý
         */
        this.user = this.auth.getUserInfo();
        this.userId = this.user.userId != null ? Number(this.user.userId) : 0;
        this.modelSearch.permissionType = 1;
        this.tabName = this.menuQuery.getTitleWithCurrentUrl();
        this.coQuanNhanSu$ = this.apiService.read(UrlConstant.API.HRM_DANH_MUC_CO_QUAN + '/ByNhanSu', {}).pipe(map(res => res.result));      
        if (this.user.doiTuongId) {
            this.modelSearch.idNhanSu = parseInt(this.user.doiTuongId, 10);
        }
        if (this.coQuanNhanSu$) {
            this.coQuanNhanSu$.subscribe(res => {
                if (res.idCoQuanCap1) {
                    this.modelSearch.idCoQuan.push(res.idCoQuanCap1);
                    this.loadItems();
                }
            });
        }else{
            this.loadItems();
        }
        
       
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    loadItems() {
        this.isLoading = true;
        this.gridView$ = this.apiService
            .post(UrlConstant.API.PTN_READPHONGTHINGHIEM + '/GetDanhSachPhongThiNghiem', this.queryOptions, true)
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

    private get queryOptions() {
        return {
            pageSize: this.gridState.take,
            pageNumber: this.gridState.skip / this.gridState.take + 1,
            sortCol: this.gridState.sort[0].field,
            isAsc: this.gridState.sort[0].dir === 'asc' ? true : false,
            keyword: this.modelSearch.keyword,
            idNhanSu: this.modelSearch.idNhanSu,
            idsCoQuan: this.modelSearch.idCoQuan ? this.modelSearch.idCoQuan.join(',') : '',
            idLoaiHinhPhong: this.modelSearch.idLoaiHinhPhong,
            dsIdNganh: this.modelSearch.idNganh  ? this.modelSearch.idNganh.join(',') : '',
            dsIdChuyenNganh: this.modelSearch.idChuyenNganh ? this.modelSearch.idChuyenNganh.join(',') : '',
            permissionType: this.modelSearch.permissionType,
        };
    }

    private get exportQueryOptions() {
        return {
            pageSize: 0,
            pageNumber: 0,
            sortName: this.gridState.sort[0].field,
            sortASC: this.gridState.sort[0].dir === 'asc',
            keyword: this.modelSearch.keyword,
            idNhanSu: null,
            idCoQuan: null,
            idLoaiHinhPhong: null,
            dsIdNganh: '',
            dsIdChuyenNganh: '',
        };
    }

    selectRow(e: SelectionEvent) {
        if (e.selectedRows.length > 0) {
            const listChon = e.selectedRows;
            listChon.map(x => {
                if(x.dataItem.createdById == this.userId){
                    this.selectionIds.push(x.dataItem.id);
                }
            });
        }
        if (e.deselectedRows.length > 0) {
            const listBoChon = e.deselectedRows;
            listBoChon.map(x => {
                const index = this.selectionIds.findIndex(y => x.dataItem.id === y);
                if (index > -1) {
                    this.selectionIds.splice(index, 1);
                }
            });
        }
    }

    showTooltip(e: MouseEvent): void {
        const element = e.target as HTMLElement;
        if ((element.nodeName === 'TD' || element.nodeName === 'TH') && element.offsetWidth < element.scrollWidth) {
            this.tooltipDir.toggle(element);
        } else {
            this.tooltipDir.hide();
        }
    }

    onStateChange(state: State) {
        this.gridState = state;
        this.loadItems();
    }

    onExportExcel() {
        const exportExcelNhanSu$ = this.fileService
            .downloadFile(UrlConstant.API.PTN_READPHONGTHINGHIEM + '/ExportExcel', this.exportQueryOptions)
            .pipe(takeUntil(this.destroyed$));

        exportExcelNhanSu$.subscribe(res => {
            this.fileService.convertResourceToBlob(
                res.body,
                FileExtensionEnum.XLXS,
                'DanhSachPhongThiNghiem' + this.util.extendDateTimeNameExport() + '.xls'
            );
        });
    }

    addHandler(flag: boolean) {
        this.title = this.translate.get('PTN.TITLE.C_PHONG_THI_NGHIEM');

        this.model = undefined;
        this.action = ActionEnum.CREATE;
        this.openForm(flag);
    }

    editHandler(dataItem, flag: boolean) {
        this.title = this.translate.get('PTN.TITLE.M_PHONG_THI_NGHIEM');

        this.model = dataItem;
        if (dataItem.dsNganh && dataItem.dsNganh !== '') {
            dataItem.idNganh = dataItem.dsNganh.split(',').map(Number)[0];
        }
        if (dataItem.dsChuyenNganh && dataItem.dsChuyenNganh !== '') {
            dataItem.idChuyenNganh = dataItem.dsChuyenNganh.split(',').map(Number);
        }
        this.action = ActionEnum.UPDATE;
        this.openForm(flag);
    }

    openForm(flag: boolean) {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.title,
            content: FormLaboratoryComponent,
            width: 850,
            top: 10,
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
                    const removeNhanSu$ = this.apiService.delete(UrlConstant.API.PTN_PHONGTHINGHIEM, body).pipe(takeUntil(this.destroyed$));
                    removeNhanSu$.subscribe(() => {
                        this.selectionIds = [];
                        this.notificationService.showSuccessMessage(MessageConstant.COMMON.MSG_DELETE_DONE);
                        this.gridState.skip = 0;
                        this.loadItems();
                    });
                },
                nzCancelText: ModalDeleteConfig.no,
                nzOnCancel: () => {},
            });
        }
    }

    refreshHandler() {
        this.modelSearch = {
            keyword: '',
            idNhanSu: null,
            idCoQuan: [],
            idLoaiHinhPhong: null,
            dsIdNganh: '',
            dsIdChuyenNganh: '',
            idNganh: [],
            idChuyenNganh: [],
            permissionType: null,
        };
    }

    searchHandler() {
        this.gridState.skip = 0;
        this.loadItems();
    }

    onSearchChange() {
        this.gridState.skip = 0;
        this.loadItems();
    }

    openAdvanceSearch() {
        this.openFirstTime = true;
        const el = document.querySelector('.search-backdrop');
        this.searchAdvance = !this.searchAdvance;
        if (this.searchAdvance) {
            el.classList.add('search-overlay');
        } else {
            el.classList.remove('search-overlay');
        }
    }
    showModalViewFile(guidId, name) {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: 'Xem tập tin Đính kèm',
            content: ViewFileComponent,
            width: 1200,
            height: 800,
            top: 10,
            autoFocusedElement: 'body',
            state: 'maximized',
        });

        const param = windowRef.content.instance;
        param.key = guidId;
        param.fileName = name;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
            }
        });
    }
}
