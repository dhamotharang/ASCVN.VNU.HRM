import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageConfig } from '@core/constants/app.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { finalize, map, tap } from 'rxjs/operators';
import { IPagedResult, IResponseData } from '@core/models/common/response-data.model';
import { MenuQuery } from '@management-state/menu/menu.query';
import { DuLieuNhanSuEnum, TrangThaiDuLieuDescription } from '../../../_models';
import { Observable, Subject } from 'rxjs';
import { GridDataResult, PagerSettings } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { ViewFileComponent } from '@shared/controls/view-file';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';

@Component({
    selector: 'app-tab-view-qua-trinh-cong-tac',
    templateUrl: './tab-view-qua-trinh-cong-tac.component.html',
    styleUrls: ['./tab-view-qua-trinh-cong-tac.component.scss']
})
export class TabViewQuaTrinhCongTacComponent implements OnInit, OnDestroy {
    @ViewChild(TooltipDirective) public tooltipDir: TooltipDirective;

    @Input() nhanSuId: number;
    @Input() duLieuNhanSuEnum: DuLieuNhanSuEnum;

    opened = false;
    gridViewQTCT$: Observable<GridDataResult>;
    gridStateQTCT: State = {
        sort: [{ field: 'id', dir: 'desc' }],
        skip: 0,
        take: 10,
    };
    gridViewKN$: Observable<GridDataResult>;
    gridStateKN: State = {
        sort: [{ field: 'id', dir: 'desc' }],
        skip: 0,
        take: 10,
    };

    pageConfigQTCT: PagerSettings | boolean = false;
    pageConfigKN: PagerSettings | boolean = false;
    loadingQTCT = false;
    loadingKN = false;
    trangThaiDuLieus = TrangThaiDuLieuDescription;
    
    protected destroyed$ = new Subject();

    constructor(
        private apiService: ApiService,
        protected menuQuery: MenuQuery,
        protected route: ActivatedRoute,
        protected windowService: WindowService
    ) {
    }

    ngOnInit(): void {
        if (this.nhanSuId) {
            this.loadQTCTItems();
            this.loadKNItems();
        }
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
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

    onStateChangeQTCT(state: State) {
        this.gridStateQTCT = state;
        this.loadQTCTItems();
    }

    onStateChangeKN(state: State) {
        this.gridStateKN = state;
        this.loadKNItems();
    }

    showTooltip(e: MouseEvent): void {
        const element = e.target as HTMLElement;
        if ((element.nodeName === 'TD' || element.nodeName === 'TH') && element.offsetWidth < element.scrollWidth) {
            this.tooltipDir.toggle(element);
        } else {
            this.tooltipDir.hide();
        }
    }

    protected loadQTCTItems() {
        this.loadingQTCT = true;
        this.gridViewQTCT$ = this.apiService.read(UrlConstant.API.HRM_NS_QUA_TRINH_CONG_TAC, this.queryQTCTOptions).pipe(
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
                if (res.total <= this.gridStateQTCT.take) {
                    this.pageConfigQTCT = false;
                } else {
                    this.pageConfigQTCT = PageConfig;
                }
            }),
            finalize(() => (this.loadingQTCT = false))
        );
    }

    private get queryQTCTOptions() {
        return {
            pageNumber: this.gridStateQTCT.skip / this.gridStateQTCT.take + 1,
            pageSize: this.gridStateQTCT.take,
            sortName: this.gridStateQTCT.sort[0].field,
            sortASC: this.gridStateQTCT.sort[0].dir === 'asc',
            idNhanSu: this.nhanSuId,
            manHinh: this.duLieuNhanSuEnum
        };
    }

    protected loadKNItems() {
        this.loadingKN = true;
        this.gridViewKN$ = this.apiService.read(UrlConstant.API.HRM_NS_KIEM_NHIEM, this.queryKNOptions).pipe(
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
                if (res.total <= this.gridStateKN.take) {
                    this.pageConfigKN = false;
                } else {
                    this.pageConfigKN = PageConfig;
                }
            }),
            finalize(() => (this.loadingKN = false))
        );
    }

    private get queryKNOptions() {
        return {
            pageNumber: this.gridStateKN.skip / this.gridStateKN.take + 1,
            pageSize: this.gridStateKN.take,
            sortName: this.gridStateKN.sort[0].field,
            sortASC: this.gridStateKN.sort[0].dir === 'asc',
            idNhanSu: this.nhanSuId,
            manHinh: this.duLieuNhanSuEnum
        };
    }
}
