import { HostListener } from '@angular/core';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
import { NzModalService } from 'ng-zorro-antd';
import { Observable, Subject } from 'rxjs';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { IBaoHanhBaoTri } from '../../_models/ptn.model';
import { FormBaoHanhBaoTriComponent } from './form-bao-hanh-bao-tri/form-bao-hanh-bao-tri.component';

@Component({
    selector: 'app-bao-hanh-bao-tri',
    templateUrl: './bao-hanh-bao-tri.component.html',
    styleUrls: ['./bao-hanh-bao-tri.component.scss'],
})
export class BaoHanhBaoTriComponent extends BaseCheckPermission implements OnInit {
    @ViewChild(TooltipDirective) public tooltipDir: TooltipDirective;
    @Input() idThietBi: number;
    private destroyed$ = new Subject();
    gridView$: Observable<GridDataResult>;
    private model: IBaoHanhBaoTri;
    protected action: ActionEnum;
    title: string;
    isLoading = false;
    opened = false;
    selectionIds: number[] = [];

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
        if (this.idThietBi) {
            super.ngOnInit();
            this.loadItems();
        }
    }

    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    private loadItems() {
        this.isLoading = true;
        this.gridView$ = this.apiService.post(UrlConstant.API.BAO_HANH_BAO_TRI + '/GetDanhSachBaoHanhBaoTri', this.queryOptions, true).pipe(
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
            finalize(() => (this.isLoading = false))
        );

    }

    private get queryOptions() {
        return {
            pageSize: this.gridState.take,
            pageNumber: this.gridState.skip / this.gridState.take + 1,
            sortCol: this.gridState.sort[0].field,
            isAsc: this.gridState.sort[0].dir === 'asc' ? true : false,
            keyword: this.modelSearch.keyword,
            idThietBi: this.idThietBi != null ? this.idThietBi : 0,
        };
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

    addHandler(flag: boolean) {
        this.model = undefined;
        this.title = this.translate.get("PTN.TITLE.C_BAO_HANH_BAO_TRI");
        this.action = ActionEnum.CREATE;
        this.openForm(flag);
    }

    editHandler(dataItem, flag: boolean) {
        this.model = dataItem;
        this.title = this.translate.get("PTN.TITLE.M_BAO_HANH_BAO_TRI");
        this.action = ActionEnum.UPDATE;
        this.openForm(flag);
    }

    openForm(flag: boolean) {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.title,
            content: FormBaoHanhBaoTriComponent,
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
                    const remove$ = this.apiService.delete(UrlConstant.API.BAO_HANH_BAO_TRI, body).pipe(takeUntil(this.destroyed$));
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
}
