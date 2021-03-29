import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { map, takeUntil } from 'rxjs/operators';
import { BaseHumanResourceItem } from '@themes/views/management/human-resource/_base/base-human-resource-item.component';
import { ActivatedRoute } from '@angular/router';
import { MenuQuery } from '@management-state/menu/menu.query';
import { IDuyetThongTinNhanSuModel } from '@themes/views/management/human-resource/_models/duyet-thong-tin-nhan-su.model';
import { INhanSuHoanCanhKinhTe, INhanSuLichSuBanThan, TrangThaiDuLieuEnum } from '@themes/views/management/human-resource/_models';
import { CustomTranslateService } from '@core/services/common';
import { DuyetThongTinNhanSuComponent } from '@themes/views/management/human-resource/components/duyet-thong-tin-nhan-su/duyet-thong-tin-nhan-su.component';
import { FormThongTinKhacComponent } from './form-thong-tin-khac/form-thong-tin-khac.component';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-thong-tin-khac',
    templateUrl: './thong-tin-khac.component.html',
    styleUrls: ['./thong-tin-khac.component.scss']
})
export class ThongTinKhacComponent extends BaseHumanResourceItem<any> implements OnInit, OnDestroy {

    visibleLichSu = false;
    visibleKinhTe = false;
    modelNhanSuLichSuBanThan: INhanSuLichSuBanThan;
    modelNhanSuHoanCanhKinhTe: INhanSuHoanCanhKinhTe;

    constructor(
        protected route: ActivatedRoute,
        protected menuQuery: MenuQuery,
        private windowService: WindowService,
        private apiService: ApiService,
        private translate: CustomTranslateService
    ) {
        super(route, menuQuery);
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    showFormCapNhatThongTinKhac() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('HR.MES.14'),
            content: FormThongTinKhacComponent,
            width: 900,
            top: 10,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.model = this.model;
        param.nhanSuId = this.nhanSuId;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.loadData();
            }
        });
    }

    onApprove(flag: boolean) {
        const body: IDuyetThongTinNhanSuModel = {
            duyetToanBo: false,
            idNhanSu: this.nhanSuId,
            idTrangThaiDuLieu: flag ? TrangThaiDuLieuEnum.SU_DUNG_CHINH : TrangThaiDuLieuEnum.KHONG_DUYET,
            idNhanSuKhac: this.model.id,
        };

        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('LB.CONFIRM'),
            content: DuyetThongTinNhanSuComponent,
            width: 600,
            top: 10,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.body = body;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.loadData();
            }
        });
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
                        // compareData: itemLichSu.compareData === null ? null : {
                        //     id: itemLichSu.compareData.id,
                        //     idNhanSu: itemLichSu.compareData.idNhanSu,
                        //     idTrangThaiDuLieu: itemLichSu.compareData.idTrangThaiDuLieu,
                        //     lamViecCheDoCu: itemLichSu.compareData.lamViecCheDoCu,
                        //     nhanXet: itemLichSu.compareData.nhanXet,
                        //     thamGiaQuanLyKHCN: itemLichSu.compareData.thamGiaQuanLyKHCN,
                        //     thamGiaToChucChinhTri: itemLichSu.compareData.thamGiaToChucChinhTri,
                        //     thamGiaToChucNuocNgoai: itemLichSu.compareData.thamGiaToChucNuocNgoai,
                        //     thanNhanNuocNgoai: itemLichSu.compareData.thanNhanNuocNgoai,
                        //     tienAnTienSu: itemLichSu.compareData.tienAnTienSu,
                        // }
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
