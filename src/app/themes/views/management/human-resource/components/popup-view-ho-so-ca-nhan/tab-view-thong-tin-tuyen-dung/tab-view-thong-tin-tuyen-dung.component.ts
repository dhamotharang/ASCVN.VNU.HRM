import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { INhanSuThongTinTuyenDung } from '@themes/views/management/human-resource/_models/thong-tin-tuyen-dung.model';
import { map, takeUntil } from 'rxjs/operators';
import { DuLieuNhanSuEnum, TrangThaiDuLieuEnum } from '@themes/views/management/human-resource/_models';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-tab-view-thong-tin-tuyen-dung',
    templateUrl: './tab-view-thong-tin-tuyen-dung.component.html',
    styleUrls: ['./tab-view-thong-tin-tuyen-dung.component.scss']
})
export class TabViewThongTinTuyenDungComponent implements OnInit, OnDestroy {
    @Input() nhanSuId: number;
    @Input() duLieuNhanSuEnum: DuLieuNhanSuEnum;

    model: INhanSuThongTinTuyenDung;
    trangThaiDuLieuEnum = TrangThaiDuLieuEnum;
    protected destroyed$ = new Subject();

    constructor(
        private apiService: ApiService,
    ) { }

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
            .read(UrlConstant.API.HRM_NS_THONG_TIN_TUYEN_DUNG, {
                idNhanSu: this.nhanSuId,
                manHinh: this.duLieuNhanSuEnum
            })
            .pipe(
                map(res => res.result),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                this.model = res;
            });
    }
}
