import { Component, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseCheckPermission } from '@core/auth';
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
import { IDinhMucTieuHao } from '../../_models/ptn.model';
import { FormDinhMucVatTuTieuHaoComponent } from './form-dinh-muc-vat-tu-tieu-hao/form-dinh-muc-vat-tu-tieu-hao.component';

@Component({
    selector: 'app-dinh-muc-vat-tu-tieu-hao',
    templateUrl: './dinh-muc-vat-tu-tieu-hao.component.html',
    styleUrls: ['./dinh-muc-vat-tu-tieu-hao.component.scss'],
})
export class DinhMucVatTuTieuHaoComponent extends BaseCheckPermission implements OnInit, OnDestroy {
    @ViewChild(TooltipDirective) public tooltipDir: TooltipDirective;
    @Input() idThietBi: number;
    @Input() isMain: boolean;
    private destroyed$ = new Subject();
    gridView$: Observable<GridDataResult>;
    private model: IDinhMucTieuHao;
    protected action: ActionEnum;
    searchAdvance = false;
    openFirstTime = false;
    title: string;
    isLoading = false;
    opened = false;
    tabName: string;
    selectionIds: number[] = [];
    dropdownListEnum = DropDownListEnum;
    pageConfig: PagerSettings | boolean = false;
    gridState: State = {
        sort: [
            {
                field: 'id',
                dir: 'desc',
            },
        ],
        skip: 0,
        take: 10,
    };

    public modelSearch = {
        keyword: '',
        idsThietBi: [],
        idsDonViTinh: [],
        loaiTieuHao: null,
    };

    pageHeight = window.innerHeight - ReziseTable + 32;
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.pageHeight = event.target.innerHeight - ReziseTable + 32;
    }

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

    ngOnInit() {
        if(this.idThietBi && this.idThietBi != undefined && this.idThietBi > 0) {
            this.modelSearch.idsThietBi.push(this.idThietBi);
        }
        this.tabName = this.menuQuery.getTitleWithCurrentUrl();
        if (this.idThietBi != null && this.idThietBi > 0 && this.idThietBi != undefined) {
            this.modelSearch.idsThietBi.push[this.idThietBi];
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
            .post(UrlConstant.API.PTN_VAT_TU_TIEU_HAO + '/GetDanhSachVatTuTieuHao', this.queryOptions, true)
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
            idsThietBi: this.modelSearch.idsThietBi != null ? this.modelSearch.idsThietBi.join(',') : '',
            loaiTieuHao: this.modelSearch.loaiTieuHao != null ? this.modelSearch.loaiTieuHao : null,
        };
    }

    addHandler(flag: boolean) {
        this.model = undefined;
        this.action = ActionEnum.CREATE;
        this.title = this.translate.get('PTN.TITLE.C_DINH_MUC_TIEU_HAO');

        this.openForm(flag);
    }

    editHandler(dataItem, flag: boolean) {
        this.model = dataItem;
        this.action = ActionEnum.UPDATE;
        this.title = this.translate.get('PTN.TITLE.C_DINH_MUC_TIEU_HAO');

        this.openForm(flag);
    }

    openForm(flag: boolean) {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.title,
            content: FormDinhMucVatTuTieuHaoComponent,
            width: 850,
            top: 10,
            autoFocusedElement: 'body',
        });
        const param = windowRef.content.instance;
        param.action = this.action;
        param.model = this.model;
        param.idThietBi = this.idThietBi;
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
