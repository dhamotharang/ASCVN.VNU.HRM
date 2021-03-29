import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { IThongTinDoanDang } from '@themes/views/management/human-resource/_models/thong-tin-doan-dang.model';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { MenuQuery } from '@management-state/menu/menu.query';
import { Observable, Subject } from 'rxjs';
import { DuLieuNhanSuEnum, TrangThaiDuLieuDescription } from '../../../_models';
import { GridDataResult, PagerSettings } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { PageConfig } from '@core/constants/app.constant';
import { IResponseData, IPagedResult } from '@core/models/common';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';

@Component({
    selector: 'app-tab-view-chinh-tri-xa-hoi',
    templateUrl: './tab-view-chinh-tri-xa-hoi.component.html',
    styleUrls: ['./tab-view-chinh-tri-xa-hoi.component.scss']
})
export class TabViewChinhTriXaHoiComponent implements OnInit, OnDestroy {
    @ViewChild(TooltipDirective) public tooltipDir: TooltipDirective;
    
    @Input() nhanSuId: number;
    @Input() duLieuNhanSuEnum: DuLieuNhanSuEnum;

    model: IThongTinDoanDang;

    opened = false;
    gridViewDoan$: Observable<GridDataResult>;
    gridStateDoan: State = {
        sort: [{ field: 'id', dir: 'desc' }],
        skip: 0,
        take: 10,
    };
    pageConfigDoan: PagerSettings | boolean = false;
    loadingDoan = false;    
    gridViewDang$: Observable<GridDataResult>;
    gridStateDang: State = {
        sort: [{ field: 'id', dir: 'desc' }],
        skip: 0,
        take: 10,
    };
    pageConfigDang: PagerSettings | boolean = false;
    loadingDang = false;    
    gridViewCD$: Observable<GridDataResult>;
    gridStateCD: State = {
        sort: [{ field: 'id', dir: 'desc' }],
        skip: 0,
        take: 10,
    };
    pageConfigCD: PagerSettings | boolean = false;
    loadingCD = false;    

    trangThaiDuLieus = TrangThaiDuLieuDescription;
    protected destroyed$ = new Subject();

    constructor(
        protected menuQuery: MenuQuery,
        protected route: ActivatedRoute,
        private apiService: ApiService,
    ) {
    }

    ngOnInit(): void {
        if (this.nhanSuId) {
            this.loadData();
            this.loadDoanItems();
            this.loadDangItems();
            this.loadCDItems();
        }
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    loadData() {
        this.apiService
            .read(UrlConstant.API.HRM_NS_DOAN_DANG, {
                idNhanSu: this.nhanSuId,
                manHinh: this.duLieuNhanSuEnum
            })
            .pipe(
                map(res => res.result),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => (this.model = res));
    }

    showTooltip(e: MouseEvent): void {
        const element = e.target as HTMLElement;
        if ((element.nodeName === 'CD' || element.nodeName === 'TH') && element.offsetWidth < element.scrollWidth) {
            this.tooltipDir.toggle(element);
        } else {
            this.tooltipDir.hide();
        }
    }


    onStateChangeDoan(state: State) {
        this.gridStateDoan = state;
        this.loadDoanItems();
    }

    onStateChangeDang(state: State) {
        this.gridStateDang = state;
        this.loadDangItems();
    }

    onStateChangeCD(state: State) {
        this.gridStateCD = state;
        this.loadCDItems();
    }

    protected loadDoanItems() {
        this.loadingDoan = true;
        this.gridViewDoan$ = this.apiService.read(UrlConstant.API.HRM_NS_KHEN_THUONG, {
            pageNumber: this.gridStateDoan.skip / this.gridStateDoan.take + 1,
            pageSize: this.gridStateDoan.take,
            sortName: this.gridStateDoan.sort[0].field,
            sortASC: this.gridStateDoan.sort[0].dir === 'asc',
            idNhanSu: this.nhanSuId,
            manHinh: this.duLieuNhanSuEnum
        }).pipe(
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
                if (res.total <= this.gridStateDoan.take) {
                    this.pageConfigDoan = false;
                } else {
                    this.pageConfigDoan = PageConfig;
                }
            }),
            finalize(() => (this.loadingDoan = false))
        );
    }

    protected loadDangItems() {
        this.loadingDang = true;
        this.gridViewDang$ = this.apiService.read(UrlConstant.API.HRM_NS_KY_LUAT, {
            pageNumber: this.gridStateDang.skip / this.gridStateDang.take + 1,
            pageSize: this.gridStateDang.take,
            sortName: this.gridStateDang.sort[0].field,
            sortASC: this.gridStateDang.sort[0].dir === 'asc',
            idNhanSu: this.nhanSuId,
            manHinh: this.duLieuNhanSuEnum
        }).pipe(
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
                if (res.total <= this.gridStateDang.take) {
                    this.pageConfigDang = false;
                } else {
                    this.pageConfigDang = PageConfig;
                }
            }),
            finalize(() => (this.loadingDang = false))
        );
    }

    protected loadCDItems() {
        this.loadingCD = true;
        this.gridViewCD$ = this.apiService.read(UrlConstant.API.HRM_NS_DANH_HIEU_THI_DUA_KHEN_THUONG, {
            pageNumber: this.gridStateCD.skip / this.gridStateCD.take + 1,
            pageSize: this.gridStateCD.take,
            sortName: this.gridStateCD.sort[0].field,
            sortASC: this.gridStateCD.sort[0].dir === 'asc',
            idNhanSu: this.nhanSuId,
            manHinh: this.duLieuNhanSuEnum
        }).pipe(
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
                if (res.total <= this.gridStateCD.take) {
                    this.pageConfigCD = false;
                } else {
                    this.pageConfigCD = PageConfig;
                }
            }),
            finalize(() => (this.loadingCD = false))
        );
    }
}
