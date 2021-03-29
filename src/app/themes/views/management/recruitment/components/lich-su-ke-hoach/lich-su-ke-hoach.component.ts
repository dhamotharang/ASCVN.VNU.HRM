import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PageConfig } from '@core/constants/app.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { GridDataResult, PagerSettings } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { Observable, Subject } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { IKeHoachTuyenDung } from '../../_models';

@Component({
    selector: 'app-lich-su-ke-hoach',
    templateUrl: './lich-su-ke-hoach.component.html',
    styleUrls: ['./lich-su-ke-hoach.component.scss'],
})
export class LichSuKeHoachComponent implements OnInit, OnDestroy {
    @Input() keHoach: IKeHoachTuyenDung;

    gridView$: Observable<GridDataResult>;
    loading = false;

    pageConfig: PagerSettings | boolean = false;
    gridState: State = {
        sort: [{ field: 'id', dir: 'desc' }],
        skip: 0,
        take: 20,
    };

    private destroyed$ = new Subject();
    constructor(private apiService: ApiService, private window: WindowRef) {}

    ngOnInit() {
        this.loadItems();
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    closeForm() {
        this.window.close();
    }

    onStateChange(state: State) {
        this.gridState = state;
        this.loadItems();
    }

    private loadItems() {
        this.gridView$ = this.apiService.read(UrlConstant.API.TD_KE_HOACH_LICH_SU + '/List', this.queryOptions).pipe(
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
            sortName: this.gridState.sort[0].field,
            sortASC: this.gridState.sort[0].dir === 'asc',
            idKeHoachTuyenDung: this.keHoach.id,
        };
    }
}
