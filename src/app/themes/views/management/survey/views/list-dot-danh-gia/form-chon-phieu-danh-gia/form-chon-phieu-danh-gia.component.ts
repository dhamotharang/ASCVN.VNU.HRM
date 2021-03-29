import { Component, OnInit } from '@angular/core';
import { PageConfig } from '@core/constants/app.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { IPagedResult } from '@core/models/common/response-data.model';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { GridDataResult, PagerSettings } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';

@Component({
    selector: 'app-form-chon-phieu-danh-gia',
    templateUrl: './form-chon-phieu-danh-gia.component.html',
    styleUrls: ['./form-chon-phieu-danh-gia.component.scss'],
})
export class FormChonPhieuDanhGiaComponent implements OnInit {
    gridView$: Observable<GridDataResult>;
    isLoading = false;

    public gridState: State = {
        sort: [{ field: 'id', dir: 'desc' }],
        skip: 0,
        take: 20,
    };

    pageConfig: PagerSettings | boolean = false;

    constructor(private apiService: ApiService, private window: WindowRef) {}

    ngOnInit() {
        this.loadItems();
    }

    onStateChange(state: State) {
        this.gridState = state;
        this.loadItems();
    }

    selectItem(item) {
        this.window.close(item);
    }

    closeForm() {
        this.window.close();
    }

    private get queryOptions() {
        return {
            pageNumber: this.gridState.skip / this.gridState.take + 1,
            pageSize: this.gridState.take,
            keyWord: '',
            sortCol: this.gridState.sort[0].field,
            sortByASC: this.gridState.sort[0].dir === 'asc',
        };
    }

    private loadItems() {
        this.isLoading = true;
        this.gridView$ = this.apiService.read(UrlConstant.API.PKS_PHIEU_DANH_GIA + '/Search', this.queryOptions).pipe(
            map(res => {
                const results = res.result as IPagedResult<any[]>;
                if (results && results.items) {
                    return {
                        data: results.items,
                        total: results.pagingInfo.totalItems,
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
}
