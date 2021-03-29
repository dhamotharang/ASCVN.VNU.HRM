import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '@core/data-services/api.service';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { DuLieuNhanSuEnum, TrangThaiDuLieuDescription, TrangThaiDuLieuEnum } from '@themes/views/management/human-resource/_models';
import { PageConfig } from '@core/constants/app.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { finalize, map, tap } from 'rxjs/operators';
import { IPagedResult, IResponseData } from '@core/models/common';
import { ViewFileComponent } from '@shared/controls/view-file';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';
import { GridDataResult, PagerSettings } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { Observable, Subject } from 'rxjs';
import { CustomTranslateService } from '@core/services/common';

@Component({
    selector: 'app-tab-view-quan-he-gia-dinh',
    templateUrl: './tab-view-quan-he-gia-dinh.component.html',
    styleUrls: ['./tab-view-quan-he-gia-dinh.component.scss']
})
export class TabViewQuanHeGiaDinhComponent implements OnInit, OnDestroy {

    @ViewChild(TooltipDirective) public tooltipDir: TooltipDirective;

    @Input() nhanSuId: number;
    @Input() duLieuNhanSuEnum: DuLieuNhanSuEnum;
    // INhanSuQuanHeGiaDinh
    opened = false;
    gridViewBT$: Observable<GridDataResult>;
    gridStateBT: State = {
        sort: [{ field: 'id', dir: 'desc' }],
        skip: 0,
        take: 10,
    };
    pageConfigBT: PagerSettings | boolean = false;
    loadingBT = false;    
    gridView$: Observable<GridDataResult>;
    gridState: State = {
        sort: [{ field: 'id', dir: 'desc' }],
        skip: 0,
        take: 10,
    };
    pageConfig: PagerSettings | boolean = false;
    loading = false;    

    trangThaiDuLieus = TrangThaiDuLieuDescription;
    protected destroyed$ = new Subject();
    
    constructor(
        private apiService: ApiService,
        private translate: CustomTranslateService,
        protected windowService: WindowService
    ) {
    }

    ngOnInit(): void {
        if (this.nhanSuId) {
            this.loadBTItems();
            this.loadItems();
        }
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    showModalViewFile(guidId, name) {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('LB.VIEW_FILE'),
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

    onStateChangeBT(state: State) {
        this.gridStateBT = state;
        this.loadBTItems();
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

    protected loadBTItems() {
        this.loadingBT = true;
        this.gridViewBT$ = this.apiService.read(UrlConstant.API.HRM_NS_QUAN_HE_GIA_DINH, this.queryBTOptions).pipe(
            map((res: IResponseData<IPagedResult<any>>) => {
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
                if (res.total <= this.gridStateBT.take) {
                    this.pageConfigBT = false;
                } else {
                    this.pageConfigBT = PageConfig;
                }
            }),
            finalize(() => (this.loadingBT = false))
        );
    }

    private get queryBTOptions() {
        return {
            pageNumber: this.gridStateBT.skip / this.gridStateBT.take + 1,
            pageSize: this.gridStateBT.take,
            sortName: this.gridStateBT.sort[0].field,
            sortASC: this.gridStateBT.sort[0].dir === 'asc',
            idNhanSu: this.nhanSuId,
            id: null,
            isCaNhan: true,
            manHinh: this.duLieuNhanSuEnum
        };
    }

    protected loadItems() {
        this.loading = true;
        this.gridView$ = this.apiService.read(UrlConstant.API.HRM_NS_QUAN_HE_GIA_DINH, this.queryOptions).pipe(
            map((res: IResponseData<IPagedResult<any>>) => {
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
            finalize(() => (this.loading = false))
        );
    }

    private get queryOptions() {
        return {
            pageNumber: this.gridState.skip / this.gridState.take + 1,
            pageSize: this.gridState.take,
            sortName: this.gridState.sort[0].field,
            sortASC: this.gridState.sort[0].dir === 'asc',
            idNhanSu: this.nhanSuId,
            isCaNhan: false,
            manHinh: this.duLieuNhanSuEnum
        };
    }
}
