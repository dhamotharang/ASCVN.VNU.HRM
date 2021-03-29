import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '@core/data-services/api.service';
import { IPhuCap } from '@themes/views/management/recruitment/_models';
import { UrlConstant } from '@core/constants/url.constant';
import { BaseRecruitmentComponent } from '@themes/views/management/recruitment/_base/base-recruitment.component';
import { MenuQuery } from '@management-state/menu/menu.query';
import { finalize, map, tap } from 'rxjs/operators';
import { PageConfig } from '@core/constants/app.constant';
import { DateUtil } from '@core/utils/date';

@Component({
    selector: 'app-tien-do-thuc-hien',
    templateUrl: './tien-do-thuc-hien.component.html',
    styleUrls: ['./tien-do-thuc-hien.component.scss'],
})
export class TienDoThucHienComponent extends BaseRecruitmentComponent<any> implements OnInit, OnDestroy {
    @Input() idKeHoach: number;

    constructor(private apiService: ApiService, protected menuQuery: MenuQuery) {
        super(menuQuery);
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected loadItems() {
        this.loading = true;
        this.gridView$ = this.apiService.read(UrlConstant.API.HRM_TD_KE_HOACH_TUYEN_DUNG_CHI_TIET + '/List', this.queryOptions).pipe(
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
            ...this.queryString,
            idKeHoachTuyenDung: this.idKeHoach,
        };
    }
}
