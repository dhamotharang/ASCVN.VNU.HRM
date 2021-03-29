import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PageConfig } from '@core/constants/app.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { State } from '@progress/kendo-data-query';
import { Subject } from 'rxjs';
import { finalize, map, takeUntil } from 'rxjs/operators';
import { ILichSuDanhGiaChiTietViewModel, INhatKyDanhGiaViewModel } from '@themes/views/management/survey/_models/nhat-ky.model';

@Component({
    selector: 'app-form-nhat-ky-phieu-danh-gia',
    templateUrl: './form-nhat-ky-phieu-danh-gia.component.html',
    styleUrls: ['./form-nhat-ky-phieu-danh-gia.component.scss'],
})
export class FormNhatKyPhieuDanhGiaComponent implements OnInit, OnDestroy {
    @Input() model: any;

    gridNhatKyPhieuDanhGia: ILichSuDanhGiaChiTietViewModel[] = [];
    loading = false;

    pageConfig = PageConfig;
    gridState: State = {
        sort: [{ field: 'id', dir: 'desc' }],
        skip: 0,
        take: 20,
    };

    nhatKyPhieu: INhatKyDanhGiaViewModel;

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
        this.apiService
            .read(UrlConstant.API.PKS_NHAN_SU_DANH_GIA_CHI_TIET + '/NhatKy', this.queryOptions)
            .pipe(
                takeUntil(this.destroyed$),
                map(res => res.result),
                finalize(() => (this.loading = false))
            )
            .subscribe(res => {
                if (res) {
                    const nhatKy = res as INhatKyDanhGiaViewModel;
                    this.nhatKyPhieu = res;
                    this.gridNhatKyPhieuDanhGia = nhatKy.lichSuDanhGiaChiTiets;
                }
            });
    }

    private get queryOptions() {
        return {
            pageNumber: this.gridState.skip / this.gridState.take + 1,
            pageSize: this.gridState.take,
            idNhanSuDanhGiaChiTiet: this.model.nhanSuDanhGiaChiTietId,
            manHinh: null,
        };
    }
}
