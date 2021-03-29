import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UrlConstant } from '@core/constants/url.constant';
import { takeUntil } from 'rxjs/operators';
import { INhanSuChiTiet } from '@themes/views/management/human-resource/_models/human-resource.model';
import { ApiService } from '@core/data-services/api.service';
import { DuLieuNhanSuEnum, TrangThaiDuLieuEnum } from '@themes/views/management/human-resource/_models';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-tab-view-thong-tin-chung',
    templateUrl: './tab-view-thong-tin-chung.component.html',
    styleUrls: ['./tab-view-thong-tin-chung.component.scss']
})
export class TabViewThongTinChungComponent implements OnInit, OnDestroy {
    @Input() nhanSuId: number;
    @Input() duLieuNhanSuEnum: DuLieuNhanSuEnum;

    model: INhanSuChiTiet;
    trangThaiDuLieuEnum = TrangThaiDuLieuEnum;
    protected destroyed$ = new Subject();

    constructor(
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
        const nhanSu$ = this.apiService
            .read(UrlConstant.API.HRM_NHAN_SU + '/ById', {
                idNhanSu: this.nhanSuId,
                manHinh: this.duLieuNhanSuEnum
            })
            .pipe(takeUntil(this.destroyed$));
        nhanSu$.subscribe(res => {
            if (res.result) {
                this.model = res.result;
            }
        });
    }
}
