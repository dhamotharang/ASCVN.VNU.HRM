import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseCheckPermission } from '@core/auth';
import { ModalDeleteConfig, PageConfig, ReziseTable } from '@core/constants/app.constant';
import { ActionEnum } from '@core/constants/enum.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService, UtilService } from '@core/services/common';
import { MenuQuery } from '@management-state/menu/menu.query';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { GridDataResult, PagerSettings } from '@progress/kendo-angular-grid';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';
import { State } from '@progress/kendo-data-query';
import { DropDownListEnum } from '@shared/containers/asc-select';
import { NzModalService } from 'ng-zorro-antd';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subject } from 'rxjs';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { IDinhMucTieuHao } from '../_models/ptn.model';
import { FormDinhMucTieuHaoComponent } from './form-dinh-muc-tieu-hao/form-dinh-muc-tieu-hao.component';

@Component({
  selector: 'app-dinh-muc-tieu-hao',
  templateUrl: './dinh-muc-tieu-hao.component.html',
  styleUrls: ['./dinh-muc-tieu-hao.component.scss']
})
export class DinhMucTieuHaoComponent extends BaseCheckPermission implements OnInit, OnDestroy {

    @ViewChild(TooltipDirective) public tooltipDir: TooltipDirective;
    opened = false;
    phongThiNghiemId: number;
    private destroyed$ = new Subject();
    searchAdvance = false;
    openFirstTime = false;
    loading = false;
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
    model: IDinhMucTieuHao;
    action: ActionEnum;
    selectionIds: number[] = [];

    dropdownListEnum = DropDownListEnum;
    searchControl = new FormControl();

    tabName: string;


    public modelSearch = {
        keyword: '',
        idsThietBi: [],
        idsDonViTinh: [],
        loaiTieuHao: null,
    };

    constructor(
        private route: ActivatedRoute,
        private util: UtilService,
        private apiService: ApiService,
        private windowService: WindowService,
        private spinner: NgxSpinnerService,
        private modal: NzModalService,
        private notificationService: NotificationService,
        protected menuQuery: MenuQuery
    ) {
        super(menuQuery);
    }

    pageHeight = window.innerHeight - ReziseTable + 32;
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.pageHeight = event.target.innerHeight - ReziseTable + 32;
    }

    ngOnInit() {
        //this.tabName = 'QUẢN LÝ VẬT TƯ TIÊU HAO';
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
        this.gridView$ = this.apiService.post(UrlConstant.API.PTN_VAT_TU_TIEU_HAO + '/GetDanhSachVatTuTieuHao', this.queryOptions).pipe(
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
            idsThietBi: this.modelSearch.idsThietBi != null ? this.modelSearch.idsThietBi.join(',') : '',
            idsDonViTinh: this.modelSearch.idsDonViTinh != null ? this.modelSearch.idsDonViTinh.join(',') : '',
            loaiTieuHao: this.modelSearch.loaiTieuHao != null ? this.modelSearch.loaiTieuHao : null,

        };
    }

    addHandler(flag: boolean) {
        this.model = undefined;
        this.action = ActionEnum.CREATE;
        this.openForm(flag);
    }

    editHandler(dataItem, flag: boolean) {
        this.model = dataItem;
        this.action = ActionEnum.UPDATE;
        this.openForm(flag);
    }

    openForm(flag: boolean) {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: flag == true ? 'Cập nhật Vật tư tiêu hao' : 'Thêm mới Vật tư tiêu hao',
            content: FormDinhMucTieuHaoComponent,
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
                    const remove$ = this.apiService.delete(UrlConstant.API.PTN_VAT_TU_TIEU_HAO, body).pipe(takeUntil(this.destroyed$));
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
        this.modelSearch = {
            keyword: '',
            idsThietBi: [],
            idsDonViTinh: [],
            loaiTieuHao: null,
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

}
