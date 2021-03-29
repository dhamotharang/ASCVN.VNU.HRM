import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { MenuQuery } from '@management-state/menu/menu.query';
import { DuLieuNhanSuEnum, INhanSuHoanCanhKinhTe, INhanSuLichSuBanThan, TrangThaiDuLieuEnum } from '@themes/views/management/human-resource/_models';
import { forkJoin, Subject } from 'rxjs';

@Component({
    selector: 'app-tab-view-thong-tin-khac',
    templateUrl: './tab-view-thong-tin-khac.component.html',
    styleUrls: ['./tab-view-thong-tin-khac.component.scss']
})
export class TabViewThongTinKhacComponent implements OnInit, OnDestroy {
    @Input() nhanSuId: number;
    @Input() duLieuNhanSuEnum: DuLieuNhanSuEnum;
    
    model: any;
    visibleLichSu = false;
    visibleKinhTe = false;
    modelNhanSuLichSuBanThan: INhanSuLichSuBanThan;
    modelNhanSuHoanCanhKinhTe: INhanSuHoanCanhKinhTe;
    trangThaiDuLieuEnum = TrangThaiDuLieuEnum;

    protected destroyed$ = new Subject();
    constructor(
        protected route: ActivatedRoute,
        protected menuQuery: MenuQuery,
        private apiService: ApiService,
    ) {}

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
        const lichSuBanThan$ = this.apiService.read(UrlConstant.API.HRM_NS_LICH_SU_CA_NHAN, {
            idNhanSu: this.nhanSuId,
            manHinh: this.duLieuNhanSuEnum
        });

        const hoanCanhKinhTe$ = this.apiService.read(UrlConstant.API.HRM_NS_HOAN_CANH_KINH_TE, {
            idNhanSu: this.nhanSuId,
            manHinh: this.duLieuNhanSuEnum
        });

        forkJoin([lichSuBanThan$, hoanCanhKinhTe$])
            .pipe(takeUntil(this.destroyed$))
            .subscribe(([lichSuBanThan, hoanCanhKinhTe]) => {
                this.modelNhanSuLichSuBanThan = lichSuBanThan.result;
                this.modelNhanSuHoanCanhKinhTe = hoanCanhKinhTe.result;
                if (lichSuBanThan.result !== null) {
                    const itemLichSu = lichSuBanThan.result as INhanSuLichSuBanThan;
                    this.model = {
                        idLichSuBanThan: itemLichSu.id,
                        idNhanSu: itemLichSu.idNhanSu,
                        tienAnTienSu: itemLichSu.tienAnTienSu,
                        idTrangThaiDuLieu: itemLichSu.idTrangThaiDuLieu,
                        idTrangThaiDuLieuLichSuBanThan: itemLichSu.idTrangThaiDuLieu,
                        lamViecCheDoCu: itemLichSu.lamViecCheDoCu,
                        thamGiaToChucChinhTri: itemLichSu.thamGiaToChucChinhTri,
                        thamGiaToChucNuocNgoai: itemLichSu.thamGiaToChucNuocNgoai,
                        nhanXet: itemLichSu.nhanXet,
                    }
                }
                if (hoanCanhKinhTe.result !== null) {
                    const itemHoanCanh = hoanCanhKinhTe.result as INhanSuHoanCanhKinhTe;
                    this.model = {
                        ...this.model,
                        idHoanCanhKinhTe: itemHoanCanh.id,
                        idNhanSu: itemHoanCanh.idNhanSu,
                        idTrangThaiDuLieu: this.model.idTrangThaiDuLieu === 2 || itemHoanCanh.idTrangThaiDuLieu === 2 ? 2 : 1,
                        idTrangThaiDuLieuHoanCanhKinhTe: itemHoanCanh.idTrangThaiDuLieu,
                        nguonThuNhapChinh: itemHoanCanh.nguonThuNhapChinh,
                        nguonKhac: itemHoanCanh.nguonKhac,
                        tenNhaOTuMua: itemHoanCanh.tenNhaOTuMua,
                        tenNhaODuocCap: itemHoanCanh.tenNhaODuocCap,
                        dienTichNhaOTuMua: itemHoanCanh.dienTichNhaOTuMua,
                        dienTichNhaODuocCap: itemHoanCanh.dienTichNhaODuocCap,
                        dienTichDatODuocCap: itemHoanCanh.dienTichDatODuocCap,
                        dienTichDatOTuMua: itemHoanCanh.dienTichDatOTuMua,
                        datSanXuatKinhDoanh: itemHoanCanh.datSanXuatKinhDoanh,
                        dienTichDatSanXuatKinhDoanh: itemHoanCanh.dienTichDatSanXuatKinhDoanh,
                    }
                }
            });
    }
}
