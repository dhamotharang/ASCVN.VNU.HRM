import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionEnum } from '@core/constants/enum.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { IXepLoaiKetQuaDanhGia, IMucDoHoanThanh, ITrangThaiTienDo } from '@themes/views/management/catalogs/_models/catalog.model';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { forkJoin } from 'rxjs';
import { AuthQuery } from '@management-state/auth/auth.query';
import { IUserInfo } from '@core/auth/user-token.model';
import { SecurityUtil } from '@core/utils/security';
import { IPhieuDanhGiaViewModel, HinhThucTraLoiEnum, ICauHoiViewModel } from '../../_models';

@Component({
    selector: 'app-export-phieu-danh-gia',
    templateUrl: './export-phieu-danh-gia.component.html',
    styleUrls: ['./export-phieu-danh-gia.component.scss'],
})
export class ExportPhieuDanhGiaComponent implements OnInit {
    @ViewChild('contentPdf') content: ElementRef;
    phieuDanhGia: IPhieuDanhGiaViewModel;

    phieuDanhGiaId: number;
    nhanSuDanhGiaChiTietId: number;
    dotDanhGiaChiTietId: number;

    hinhThucTraLoiEnum = HinhThucTraLoiEnum;

    xepLoaiKetQuaDanhGias: IXepLoaiKetQuaDanhGia[];
    mucDoHoanThanhs: IMucDoHoanThanh[];
    trangThaiTienDos: ITrangThaiTienDo[];
    action: ActionEnum;

    isView = false;
    opened = false;

    currentUser: IUserInfo;
    currentDate = new Date();
    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private authQuery: AuthQuery,
        private windowRef: WindowRef
    ) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            if (params.k) {
                const key = SecurityUtil.get(decodeURIComponent(params.k));
                const requestParams = key.split('_');
                this.phieuDanhGiaId = Number.parseInt(requestParams[0], 10);
                this.nhanSuDanhGiaChiTietId = Number.parseInt(requestParams[1], 10);
                this.dotDanhGiaChiTietId = Number.parseInt(requestParams[2], 10);
                this.action = Number.parseInt(requestParams[3], 10);
                if (this.action === ActionEnum.VIEW) {
                    this.isView = true;
                }
            }
        });

        this.authQuery.select().subscribe(res => {
            this.currentUser = res;
        });

        const mucDoHoanThanhs = this.apiService.read(UrlConstant.API.DM_MUC_DO_HOAN_THANH + '/List', {
            pageSize: 0,
            pageNumber: 0,
        });

        const trangThaiTienDos = this.apiService.read(UrlConstant.API.DM_TRANG_THAI_TIEN_DO + '/List', {
            pageSize: 0,
            pageNumber: 0,
        });

        const xepLoaiKetQuaDanhGia = this.apiService.read(UrlConstant.API.DM_XEP_LOAI_KET_QUA_DANH_GIA + '/List', {
            pageSize: 0,
            pageNumber: 0,
        });

        forkJoin([mucDoHoanThanhs, trangThaiTienDos, xepLoaiKetQuaDanhGia]).subscribe(res => {
            if (res[0].result && res[0].result.items) {
                this.mucDoHoanThanhs = res[0].result?.items;
            }

            if (res[1].result && res[1].result.items) {
                this.trangThaiTienDos = res[1].result?.items;
            }

            if (res[2].result && res[2].result.items) {
                this.xepLoaiKetQuaDanhGias = res[2].result?.items;
            }

            this.initPhieuDanhGia();
        });
    }

    trackByFn(index, item) {
        return index;
    }

    onPrintHtml() {
        window.print();
    }

    close() {
        this.windowRef.close();
    }

    checkExistSelectQuestion(cauHois: ICauHoiViewModel[]) {
        return cauHois.filter(x => x.hinhThucTraLoiId === HinhThucTraLoiEnum.SELECT).length > 0;
    }

    private initPhieuDanhGia() {
        this.apiService
            .read(UrlConstant.API.PKS_PHAN_LOAI_DANH_GIA + '/ByPhieuId', {
                nhanSuDanhGiaChiTietId: this.nhanSuDanhGiaChiTietId,
                dotDanhGiaChiTietId: this.dotDanhGiaChiTietId,
                phieuId: this.phieuDanhGiaId,
            })
            .subscribe(res => {
                this.phieuDanhGia = res.result;

                if (this.phieuDanhGia) {
                    this.phieuDanhGia.nhomCauHois
                        // .filter(
                        //     nhomCauHoi =>
                        //         (nhomCauHoi.doiTuongThucHienId === DoiTuongThucHienEnum.TU_DANH_GIA &&
                        //             this.phieuDanhGia.typePhieu === DoiTuongThucHienEnum.TU_DANH_GIA) ||
                        //         (nhomCauHoi.doiTuongThucHienId !== DoiTuongThucHienEnum.BAN_GIAM_DOC_DHQG &&
                        //             this.phieuDanhGia.typePhieu === DoiTuongThucHienEnum.THU_TRUONG_DON_VI) ||
                        //         this.phieuDanhGia.typePhieu === DoiTuongThucHienEnum.BAN_GIAM_DOC_DHQG,
                        // )
                        .map(nhomCauHoi =>
                            nhomCauHoi.cauHois.map(cauHoi => {
                                if (cauHoi.tongHopNhiemVu === null || cauHoi.tongHopNhiemVu === undefined) {
                                    cauHoi.tongHopNhiemVu = {
                                        soGioChuan: 0,
                                        soGioGiamTru: 0,
                                        soGioPhaiThucHien: 0,
                                        soGioDaThucHien: 0,
                                        soGioThuaThieu: 0,
                                        stt: 0,
                                        tongHopNhiemVuId: 0,
                                    };
                                }
                            })
                        );
                }
            });
    }
}
