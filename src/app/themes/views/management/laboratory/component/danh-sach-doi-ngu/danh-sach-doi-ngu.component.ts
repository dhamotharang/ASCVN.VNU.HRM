import { Component, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseCheckPermission } from '@core/auth';
import { ModalDeleteConfig, PageConfig, ReziseTable } from '@core/constants/app.constant';
import { ActionEnum } from '@core/constants/enum.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { CustomTranslateService, FileService, NotificationService, UtilService } from '@core/services/common';
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
import { IDoiNguCanBo } from '../../_models/ptn.model';
import { FormThemDoiNguCanBoComponent } from './form-them-doi-ngu-can-bo/form-them-doi-ngu-can-bo.component';

@Component({
    selector: 'app-danh-sach-doi-ngu',
    templateUrl: './danh-sach-doi-ngu.component.html',
    styleUrls: ['./danh-sach-doi-ngu.component.scss'],
})
export class DanhSachDoiNguComponent extends BaseCheckPermission implements OnInit, OnDestroy {
    @Input() idPhongThiNghiem: number;
    @Input() isMain: boolean;
    @ViewChild(TooltipDirective) public tooltipDir: TooltipDirective;
    opened = false;
    private destroyed$ = new Subject();
    searchAdvance = false;
    openFirstTime = false;
    isLoading = false;
    gridView$: Observable<GridDataResult>;
    pageConfig: PagerSettings | boolean = PageConfig;
    model: IDoiNguCanBo;
    action: ActionEnum;
    selectionIds: number[] = [];
    title: string;
    dropdownListEnum = DropDownListEnum;
    searchControl = new FormControl();
    tabName: string;
    pageHeight = window.innerHeight - ReziseTable + 32;
    chonNhanSu: number[] = [];

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
        idNhanSu: null,
        idCoQuan: [],
        idsCoQuan: '',
        idPhongThiNghiem: [],
        idsPhongThiNghiem: null,
    };

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
        private translate: CustomTranslateService
    ) {
        super(menuQuery);
    }

    ngOnInit() {
        this.tabName = this.menuQuery.getTitleWithCurrentUrl();
        if (this.idPhongThiNghiem != null && this.idPhongThiNghiem > 0 && this.idPhongThiNghiem != undefined) {
            this.modelSearch.idPhongThiNghiem.push(this.idPhongThiNghiem);
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
        this.gridView$ = this.apiService.post(UrlConstant.API.DOI_NGU_CAN_BO + '/GetDanhSachDoiNgu', this.queryOptions, true).pipe(
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
            idsNhanSu: this.chonNhanSu != null ? this.chonNhanSu.join(',') : '',
            idsCoQuan: this.modelSearch.idCoQuan != null ? this.modelSearch.idCoQuan.join(',') : '',
            idsPhongThiNghiem: this.modelSearch.idPhongThiNghiem != null ? this.modelSearch.idPhongThiNghiem.join(',') : '',
        };
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

    addHandler(flag: boolean) {
        this.title = this.translate.get('PTN.TITLE.C_DOI_NGU_CAN_BO');

        this.model = undefined;
        this.action = ActionEnum.CREATE;
        this.openForm(flag);
    }

    editHandler(dataItem, flag: boolean) {
        this.title = this.translate.get('PTN.TITLE.M_DOI_NGU_CAN_BO');
        this.model = dataItem;
        this.action = ActionEnum.UPDATE;
        this.openForm(flag);
    }

    openForm(flag: boolean) {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.title,
            content: FormThemDoiNguCanBoComponent,
            width: 850,
            top: 10,
            autoFocusedElement: 'body',
        });
        const param = windowRef.content.instance;
        param.action = this.action;
        param.model = this.model;
        param.idPhongThiNghiem = this.idPhongThiNghiem;
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
                    const removeNhanSu$ = this.apiService.delete(UrlConstant.API.DOI_NGU_CAN_BO, body).pipe(takeUntil(this.destroyed$));
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
        this.chonNhanSu = [];
        this.modelSearch = {
            keyword: '',
            idNhanSu: null,
            idCoQuan: [],
            idsCoQuan: '',
            idPhongThiNghiem: [],
            idsPhongThiNghiem: '',
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
    changeNhanSu(data) {
        this.chonNhanSu = data.map(x => {
            return x.nhanSuId;
        });
    }
}
