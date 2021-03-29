import { Component, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseCheckPermission, ListRoleOption } from '@core/auth';
import { ModalDeleteConfig, PageConfig, ReziseTable } from '@core/constants/app.constant';
import { ActionEnum } from '@core/constants/enum.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService } from '@core/services/common';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import { MenuQuery } from '@management-state/menu/menu.query';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { GridDataResult, PagerSettings, SelectionEvent } from '@progress/kendo-angular-grid';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';
import { State } from '@progress/kendo-data-query';
import { DropDownListEnum } from '@shared/containers/asc-select';
import { ViewFileComponent } from '@shared/controls/view-file';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable, Subject } from 'rxjs';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { ETrangThaiDangKyPhong } from '../_models/ptn.enum';
import { IDangKySuDungThietBi } from '../_models/ptn.model';
import { FormLaboratoryApproveComponent } from './form-laboratory-approve/form-laboratory-approve.component';
import { FormLaboratoryRegisterComponent } from './form-laboratory-register/form-laboratory-register.component';

@Component({
    selector: 'app-laboratory-register',
    templateUrl: './laboratory-register.component.html',
    styleUrls: ['./laboratory-register.component.scss'],
})
export class LaboratoryRegisterComponent extends BaseCheckPermission implements OnInit, OnDestroy {
    @ViewChild(TooltipDirective) public tooltipDir: TooltipDirective;
    @Input() isQuanLy: boolean;
    opened = false;
    title: string;
    phongThiNghiemId: number;
    private destroyed$ = new Subject();
    searchAdvance = false;
    openFirstTime = false;
    isLoading = false;
    chonNhanSu: number[] = [];
    trangThaiDangKyPhongEnum = ETrangThaiDangKyPhong;
    gridView$: Observable<GridDataResult>;
    trangThaiDuyet = ETrangThaiDangKyPhong.DUYET;
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
    rolesExtends = {
        ...this.roles,
        isDuyet: false,
        isExcel: false,
    };

    pageConfig: PagerSettings | boolean = PageConfig;
    model: IDangKySuDungThietBi;
    action: ActionEnum;
    selectionIds: number[] = [];
    dropdownListEnum = DropDownListEnum;
    searchControl = new FormControl();

    tabName: string;

    public modelSearch = {
        keyword: '',
        tuNgay: null,
        denNgay: null,
        idsNhanSu: null,
        idTrangThai: [],
        idPhongThiNghiem: [],
        idCoQuan: [],
        permissionType: null,
    };

    constructor(
        private apiService: ApiService,
        private windowService: WindowService,
        private modal: NzModalService,
        private notificationService: NotificationService,
        protected menuQuery: MenuQuery,
        private translate: CustomTranslateService
    ) {
        super(menuQuery);
    }

    pageHeight = window.innerHeight - ReziseTable + 32;
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.pageHeight = event.target.innerHeight - ReziseTable + 32;
    }

    ngOnInit() {
        this.tabName = this.menuQuery.getTitleWithCurrentUrl();
        /*
            0 - Cá nhân
            1 - Quản lý
         */
        this.modelSearch.permissionType = 0;
        if (this.isQuanLy === true) {
            this.modelSearch.permissionType = 1;
        }
        super.ngOnInit();

        this.rolesExtends.isDuyet =  this.isHasPermission(ListRoleOption.PTN_0001);

        this.loadItems();
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    loadItems() {
        this.isLoading = true;
        this.gridView$ = this.apiService.post(UrlConstant.API.PTN_READPHONGTHINGHIEM + '/GetDanhSachDangKy', this.queryOptions, true).pipe(
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
            tuNgay: this.modelSearch.tuNgay,
            denNgay: this.modelSearch.denNgay,
            idsNhanSu: this.modelSearch.idsNhanSu,
            idsTrangThai: this.modelSearch.idTrangThai != null ? this.modelSearch.idTrangThai.join(',') : null,
            idsCoQuan: this.modelSearch.idCoQuan != null ? this.modelSearch.idCoQuan.join(',') : null,
            idsPhongThiNghiem: this.modelSearch.idPhongThiNghiem != null ? this.modelSearch.idPhongThiNghiem.join(',') : null,
            permissionType: this.modelSearch.permissionType,
        };
    }

    addHandler(flag: boolean) {
        this.title = this.translate.get('PTN.TITLE.C_DK_PTN');
        this.model = undefined;
        this.action = ActionEnum.CREATE;
        this.openForm(flag);
    }

    editHandler(dataItem, flag: boolean) {
        this.title = this.translate.get('PTN.TITLE.M_DK_PTN');
        this.model = dataItem;
        this.action = ActionEnum.UPDATE;
        this.openForm(flag);
    }

    approveHandler(dataItem, status: number) {
        this.title = this.translate.get('PTN.TITLE.Ap_DK_PTN');
        this.model = dataItem;
        this.openApproveForm(status);
    }

    openForm(flag: boolean) {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.title,
            content: FormLaboratoryRegisterComponent,
            width: 850,
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

    openApproveForm(status: number) {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.title,
            content: FormLaboratoryApproveComponent,
            width: 600,
            top: 10,
            autoFocusedElement: 'body',
        });
        const param = windowRef.content.instance;
        param.action = this.action;
        param.model = this.model;
        param.ids = [this.model.id];
        param.idTrangThai = status;
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
                    const remove$ = this.apiService.delete(UrlConstant.API.PTN_DANG_KY_SD_PTN, body).pipe(takeUntil(this.destroyed$));
                    remove$.subscribe(() => {
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
        this.chonNhanSu = [];
        this.modelSearch = {
            keyword: '',
            tuNgay: null,
            denNgay: null,
            idsNhanSu: null,
            idTrangThai: [],
            idPhongThiNghiem: [],
            idCoQuan: [],
            permissionType: null,
        };
    }

    searchHandler() {
        this.gridState.skip = 0;

        this.chonNhanSu.length > 0 ? (this.modelSearch.idsNhanSu = this.chonNhanSu.toString()) : (this.modelSearch.idsNhanSu = null);
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

    onStateChange(state: State) {
        this.gridState = state;
        this.loadItems();
    }

    showTooltip(e: MouseEvent): void {
        const element = e.target as HTMLElement;
        if ((element.nodeName === 'TD' || element.nodeName === 'TH') && element.offsetWidth < element.scrollWidth) {
            this.tooltipDir.toggle(element);
        } else {
            this.tooltipDir.hide();
        }
    }

    selectRow(e: SelectionEvent) {
        if (e.selectedRows.length > 0) {
            const listChon = e.selectedRows;
            listChon.map(x => {
                if (this.isQuanLy || x.dataItem.idTrangThaiDangKy !== this.trangThaiDuyet) {
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

    onDuyetKhongDuyet(flag: ETrangThaiDangKyPhong) {
        if (this.selectionIds.length > 0) {
            this.title = this.translate.get('PTN.TITLE.A_DANG_KY_PHONG');
            this.opened = true;
            const windowRef = this.windowService.open({
                title: this.title,
                content: FormLaboratoryApproveComponent,
                width: 600,
                top: 10,
                autoFocusedElement: 'body',
            });
            const param = windowRef.content.instance;
            param.action = this.action;
            param.model = this.model;
            param.ids = this.selectionIds;
            //param.idTrangThai = flag;

            windowRef.result.subscribe(result => {
                if (result instanceof WindowCloseResult) {
                    this.opened = false;
                    this.loadItems();
                }
            });
        }
    }

    changeNhanSu(data) {
        this.chonNhanSu = data.map(x => {
            return x.nhanSuId;
        });
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
