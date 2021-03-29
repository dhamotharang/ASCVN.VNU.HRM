import { Component, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthenticateService, BaseCheckPermission, IUserInfo } from '@core/auth';
import { ModalDeleteConfig, PageConfig, ReziseTable } from '@core/constants/app.constant';
import { ActionEnum } from '@core/constants/enum.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { CustomTranslateService, NotificationService } from '@core/services/common';
import { MenuQuery } from '@management-state/menu/menu.query';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { GridDataResult, PagerSettings } from '@progress/kendo-angular-grid';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';
import { State } from '@progress/kendo-data-query';
import { DropDownListEnum } from '@shared/containers/asc-select';
import { NzModalService } from 'ng-zorro-antd';
import { Observable, Subject } from 'rxjs';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { INhatKySuDungPhong } from '../../_models/ptn.model';
import { FormNhatKySuDungThietBiComponent } from './form-nhat-ky-su-dung-thiet-bi/form-nhat-ky-su-dung-thiet-bi.component';

@Component({
    selector: 'app-nhat-ky-su-dung-thiet-bi',
    templateUrl: './nhat-ky-su-dung-thiet-bi.component.html',
    styleUrls: ['./nhat-ky-su-dung-thiet-bi.component.scss'],
})
export class NhatKySuDungThietBiComponent extends BaseCheckPermission implements OnInit, OnDestroy {
    @ViewChild(TooltipDirective) public tooltipDir: TooltipDirective;
    @Input() isMain: boolean;
    @Input() isQuanLy: boolean;
    @Input() idDangKySuDung: number;
    opened = false;
    title: string;
    private destroyed$ = new Subject();
    searchAdvance = false;
    openFirstTime = false;
    isLoading = false;
    chonNhanSu: number[] = [];
    gridView$: Observable<GridDataResult>;
    pageConfig: PagerSettings | boolean = PageConfig;
    model: INhatKySuDungPhong;
    modelOneDangKySuDung: INhatKySuDungPhong;
    action: ActionEnum;
    selectionIds: number[] = [];
    dropdownListEnum = DropDownListEnum;
    searchControl = new FormControl();
    user: IUserInfo;
    disibleSearchNhanSu = false;
    tabName: string;
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

    modelSearch = {
        keyword: '',
        tuNgay: null,
        denNgay: null,
        idDangKySuDung: null,
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
        private translate: CustomTranslateService,
        private auth: AuthenticateService
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
        this.modelSearch.permissionType = 0;
        if (this.isMain === true) {
            this.user = this.auth.getUserInfo();
            if (this.user.doiTuongId) {
                this.disibleSearchNhanSu = true;
                this.modelSearch.idsNhanSu = this.user.doiTuongId;
            }
            this.modelSearch.permissionType = 1;
        }

        if (this.idDangKySuDung != null && this.idDangKySuDung > 0 && this.idDangKySuDung !== undefined) {
            this.modelSearch.idDangKySuDung = this.idDangKySuDung;
        }
        super.ngOnInit();
        this.loadItems();
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    loadItems() {
        this.isLoading = true;
        this.gridView$ = this.apiService
            .post(UrlConstant.API.PTN_READPHONGTHINGHIEM + '/GetDangKySuDung_NhatKySuDung', this.queryOptions, true)
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
            tuNgay: this.modelSearch.tuNgay,
            denNgay: this.modelSearch.denNgay,
            idDangKySuDung: this.modelSearch.idDangKySuDung,
            idsNhanSu: this.modelSearch.idsNhanSu,
            permissionType: this.modelSearch.permissionType,

            // idsTrangThai: this.modelSearch.idTrangThai != null ? this.modelSearch.idTrangThai.join(",") : null,
            // idsCoQuan: this.modelSearch.idCoQuan != null ? this.modelSearch.idCoQuan.join(",") : null,
            // idsPhongThiNghiem: this.modelSearch.idPhongThiNghiem != null ? this.modelSearch.idPhongThiNghiem.join(",") : null,
        };
    }

    addHandler(flag: boolean) {
        this.title = this.translate.get('PTN.TITLE.C_NKSD_PTN');
        this.model = undefined;
        this.action = ActionEnum.CREATE;
        this.loadOneDangKy(this.idDangKySuDung ?? 0);
    }

    editHandler(dataItem, flag: boolean) {
        this.title = this.translate.get('PTN.TITLE.M_NKSD_PTN');
        this.model = dataItem;
        this.action = ActionEnum.UPDATE;
        this.openForm();
    }

    loadOneDangKy(id) {
        this.apiService
            .post(UrlConstant.API.PTN_DANG_KY_SD_PTN + '/GetById', { idDangKy : id }, true)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                this.modelOneDangKySuDung = res.result;
                this.openForm();
            });
    }

    openForm() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.title,
            content: FormNhatKySuDungThietBiComponent,
            width: 1000,
            top: 10,
            autoFocusedElement: 'body',
        });
        const param = windowRef.content.instance;
        param.action = this.action;
        param.model = this.model;
        param.idDangKySuDung = this.idDangKySuDung;
        param.modelOneDangKySuDung = this.modelOneDangKySuDung;
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
                    const remove$ = this.apiService.delete(UrlConstant.API.NHAT_KY_SU_DUNG_PHONG, body).pipe(takeUntil(this.destroyed$));
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
            idDangKySuDung: null,
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

    changeNhanSu(data) {
        this.chonNhanSu = data.map(x => {
            return x.nhanSuId;
        });
    }
}
