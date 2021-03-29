import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageConfig } from '@core/constants/app.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { IChuyenNganh } from '@themes/views/management/catalogs/_models/catalog.model';
import { CustomTranslateService, NotificationService } from '@core/services/common';
import { GridDataResult, PagerSettings } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { BaseCheckPermission } from '@core/auth';
import { MenuQuery } from '@management-state/menu/menu.query';
import { WindowService } from '@progress/kendo-angular-dialog';
import { NzModalService } from 'ng-zorro-antd';

@Component({
    selector: 'app-danh-sach-chuyen-nganh',
    templateUrl: './danh-sach-chuyen-nganh.component.html',
    styleUrls: ['./danh-sach-chuyen-nganh.component.scss'],
})
export class DanhSachChuyenNganhComponent extends BaseCheckPermission implements OnInit, OnDestroy {
    @Input() idPhongThiNghiem: number;
    gridView$: Observable<GridDataResult>;
    private model: IChuyenNganh;
    isLoading = false;
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
        if (this.idPhongThiNghiem) {
            super.ngOnInit();
            this.loadItems();
        }
    }

    ngOnDestroy() {

    }
    private loadItems() {
        this.isLoading = true;
        this.gridView$ = this.apiService.post(UrlConstant.API.PTN_READPHONGTHINGHIEM + '/GetPhongThiNghiem_ChuyenNganh', this.queryOptions, true).pipe(
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
            idPhongThiNghiem: this.idPhongThiNghiem,
        };
    }

    onStateChange(state: State) {
        this.gridState = state;
        this.loadItems();
    }
}
