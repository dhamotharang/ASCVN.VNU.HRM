import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseCheckPermission } from '@core/auth';
import { ModalDeleteConfig, PageConfig, ReziseTable } from '@core/constants/app.constant';
import { ActionEnum } from '@core/constants/enum.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService } from '@core/services/common';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import { MenuQuery } from '@management-state/menu/menu.query';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { GridDataResult, PagerSettings } from '@progress/kendo-angular-grid';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';
import { State } from '@progress/kendo-data-query';
import { DropDownListEnum } from '@shared/containers/asc-select';
import { NzModalService } from 'ng-zorro-antd';
import { Observable, Subject } from 'rxjs';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { INhatKySuDungPhong } from '../_models/ptn.model';
import { FormLaboratoryHistoryComponent } from './form-laboratory-history/form-laboratory-history.component';

@Component({
    selector: 'app-laboratory-history',
    templateUrl: './laboratory-history.component.html',
    styleUrls: ['./laboratory-history.component.scss'],
})
export class LaboratoryHistoryComponent extends BaseCheckPermission implements OnInit, OnDestroy {
    @ViewChild(TooltipDirective) public tooltipDir: TooltipDirective;
    opened = false;
    title: string;
    phongThiNghiemId: number;
    private destroyed$ = new Subject();
    searchAdvance = false;
    openFirstTime = false;
    loading = false;
    chonNhanSu: number[] = [];
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

    public roles = {
        isView: false,
        isCreate: false,
        isUpdate: false,
        isDelete: false,
    };

    pageConfig: PagerSettings | boolean = PageConfig;
    model: INhatKySuDungPhong;
    action: ActionEnum;
    selectionIds: number[] = [];
    dropdownListEnum = DropDownListEnum;
    searchControl = new FormControl();

    tabName: string;

    public modelSearch = {
        keyword: '',
        tuNgay: null,
        denNgay: null,
        idDangKySuDung: null,
        idsNhanSu: null,
        idTrangThai: [],
        idPhongThiNghiem: [],
        idCoQuan: [],
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
        //this.tabName = 'NHẬT KÝ SỬ DỤNG PHÒNG THÍ NGHIỆM';
        this.tabName = this.menuQuery.getTitleWithCurrentUrl();
        super.ngOnInit();
        this.loadItems();
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    loadItems() {
        this.loading = true;
        this.gridView$ = this.apiService.post(UrlConstant.API.PTN_READPHONGTHINGHIEM + '/GetDangKySuDung_NhatKySuDung', this.queryOptions).pipe(
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
                this.loading = false;
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
            // idsTrangThai: this.modelSearch.idTrangThai != null ? this.modelSearch.idTrangThai.join(",") : null,
            // idsCoQuan: this.modelSearch.idCoQuan != null ? this.modelSearch.idCoQuan.join(",") : null,
            // idsPhongThiNghiem: this.modelSearch.idPhongThiNghiem != null ? this.modelSearch.idPhongThiNghiem.join(",") : null,
        };
    }

    addHandler(flag: boolean) {
        this.title = this.translate.get("PTN.TITLE.C_NKSD_PTN");
        this.model = undefined;
        this.action = ActionEnum.CREATE;
        this.openForm(flag);
    }

    editHandler(dataItem, flag: boolean) {
        this.title = this.translate.get("PTN.TITLE.M_NKSD_PTN");
        this.model = dataItem;
        this.action = ActionEnum.UPDATE;
        this.openForm(flag);
    }

    openForm(flag: boolean) {
        this.opened = true;
        const windowRef = this.windowService.open({
            title:  this.title,
            content: FormLaboratoryHistoryComponent,
            width: 900,
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
