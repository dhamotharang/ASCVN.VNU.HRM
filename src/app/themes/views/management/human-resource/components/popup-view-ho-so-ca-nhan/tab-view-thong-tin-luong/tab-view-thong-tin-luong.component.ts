import { INhanSuThongTinLuong } from '@themes/views/management/human-resource/_models/thong-tin-luong.model';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@core/data-services/api.service';
import { UrlConstant } from '@core/constants/url.constant';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { MenuQuery } from '@management-state/menu/menu.query';
import { DuLieuNhanSuEnum, TrangThaiDuLieuDescription, TrangThaiDuLieuEnum } from '@themes/views/management/human-resource/_models';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import { Observable, Subject } from 'rxjs';
import { GridDataResult, PagerSettings } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { PageConfig } from '@core/constants/app.constant';
import { IResponseData, IPagedResult } from '@core/models/common';

@Component({
    selector: 'app-tab-view-thong-tin-luong',
    templateUrl: './tab-view-thong-tin-luong.component.html',
    styleUrls: ['./tab-view-thong-tin-luong.component.scss']
})
export class TabViewThongTinLuongComponent implements OnInit, OnDestroy {
    @Input() nhanSuId: number;
    @Input() duLieuNhanSuEnum: DuLieuNhanSuEnum;

    model: INhanSuThongTinLuong;

    gridView$: Observable<GridDataResult>;
    gridState: State = {
        sort: [{ field: 'id', dir: 'desc' }],
        skip: 0,
        take: 10,
    };
    pageConfig: PagerSettings | boolean = false;
    loading = false;    
    
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
        }
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    loadData() {
        this.apiService
            .read(UrlConstant.API.HRM_NS_LUONG + '/ThongTinLuong', {
                idNhanSu: this.nhanSuId,
                manHinh: this.duLieuNhanSuEnum
            })
            .pipe(
                map(res => res.result),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => (this.model = res));
    }

    onStateChange(state: State) {
        this.gridState = state;
        this.loadItems();
    }

    private loadItems() {
        this.loading = true;
        this.gridView$ = this.apiService.read(UrlConstant.API.HRM_NS_LUONG + '/LichSuLuong', {
            pageNumber: this.gridState.skip / this.gridState.take + 1,
            pageSize: this.gridState.take,
            sortName: this.gridState.sort[0].field,
            sortASC: this.gridState.sort[0].dir === 'asc',
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
                if (res.total <= this.gridState.take) {
                    this.pageConfig = false;
                } else {
                    this.pageConfig = PageConfig;
                }
            }),
            finalize(() => (this.loading = false))
        );
    }
}
