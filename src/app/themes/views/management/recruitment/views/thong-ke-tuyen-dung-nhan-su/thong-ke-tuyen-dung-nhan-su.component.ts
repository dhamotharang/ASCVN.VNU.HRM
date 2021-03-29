import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseRecruitmentComponent } from '@themes/views/management/recruitment/_base/base-recruitment.component';
import { MenuQuery } from '@management-state/menu/menu.query';
import { ApiService } from '@core/data-services/api.service';
import { UrlConstant } from '@core/constants/url.constant';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { PageConfig } from '@core/constants/app.constant';
import { IThongKeNhanSuTuyenDung, TrangThaiKeHoachEnum } from '@themes/views/management/recruitment/_models';
import { AscSelectOption } from '@shared/containers/asc-select';

@Component({
    selector: 'app-thong-ke-tuyen-dung-nhan-su',
    templateUrl: './thong-ke-tuyen-dung-nhan-su.component.html',
    styleUrls: ['./thong-ke-tuyen-dung-nhan-su.component.scss'],
})
export class ThongKeTuyenDungNhanSuComponent extends BaseRecruitmentComponent<IThongKeNhanSuTuyenDung> implements OnInit, OnDestroy {
    listOfOption: AscSelectOption[] = [];
    modelFilter = {
        keyword: '',
        idsCoQuan: null,
        idKeHoach: null,
    };

    constructor(private apiService: ApiService, protected menuQuery: MenuQuery) {
        super(menuQuery);
    }

    ngOnInit() {
        super.ngOnInit();
        this.loadKeHoachTuyenDungBanDuyet();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    onSearch() {
        this.gridState.skip = 0;
        this.loadItems();
    }

    onReset() {
        this.modelFilter = {
            keyword: '',
            idsCoQuan: null,
            idKeHoach: null,
        };
    }

    protected loadItems() {
        this.loading = true;
        this.gridView$ = this.apiService.read(UrlConstant.API.TD_THONG_KE_TUYEN_DUNG, this.queryOptions).pipe(
            map(res => {
                if (res.result && res.result.items) {
                    return {
                        data: res.result.items as IThongKeNhanSuTuyenDung[],
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
            idKeHoachTuyenDung: this.modelFilter.idKeHoach,
            keyword: this.modelFilter.keyword,
            idsCoQuan: this.modelFilter.idsCoQuan ? this.modelFilter.idsCoQuan.join(',') : null,
        };
    }

    private loadKeHoachTuyenDungBanDuyet() {
        this.apiService
            .read(UrlConstant.API.HRM_TD_KE_HOACH_TUYEN_DUNG + '/DanhMuc', {
                pageSize: 0,
                pageNumber: 0,
                idTrangThaiDuyet: TrangThaiKeHoachEnum.BAN_DUYET,
            })
            .pipe(
                map(res => res.result),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                const items = res.items;
                this.listOfOption = items.map(m => {
                    return {
                        id: m.id,
                        text: `${m.maKeHoach} - ${m.tenKeHoach}`,
                    };
                });
            });
    }
}
