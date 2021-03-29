import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActionEnum } from '@core/constants/enum.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { IDoiTuongDanhGia, IXepLoaiKetQuaDanhGia } from '@themes/views/management/catalogs/_models/catalog.model';
import { IPhieuTuDanhGiaViewModel } from '@themes/views/management/survey/_models/phieu-tu-danh-gia.model';
import { SecurityService } from '@core/services/common/security.service';
import { forkJoin, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { OnDestroy } from '@angular/core';

export class DataChartXepLoai {
    category: string;
    value: number;
}
export class DataTongHopKetQua {
    idCoQuan: number;
    idDoiTuongDanhGia: number;
    nam?: number;
    quy?: number;
    t1: number;
    t2: number;
    t3: number;
    t4: number;
    t5: number;
    t6: number;
    ten: string;
}
export class DataTongSoPhieu {
    idCoQuan: number;
    idDoiTuongDanhGia: number;
    nam?: number;
    quy?: number;
    soPhieu: number;
    ten: string;
}
export class DataChartTongSoPhieu {
    idDoiTuongDanhGia: number;
    soPhieu: number;
    tongSoPhieu: number;
    ten: string;
}

@Component({
    selector: 'app-dashboard-v2',
    templateUrl: './dashboard-v2.component.html',
    styleUrls: ['./dashboard-v2.component.css'],
})
export class DashboardV2Component implements OnInit, OnDestroy {
    @ViewChild('content') content: ElementRef;
    public dataTongHopKetQuas: DataTongHopKetQua[];
    public tongSoPhieus: DataTongSoPhieu[];
    public seriesDataXepLoai: DataChartXepLoai[] = [];
    public seriesDataTongSoPhieu: DataChartTongSoPhieu[] = [];
    public categoriesXepLoai: string[] = [];
    public tongSoPhieu = 0;
    public listStyle = ['bg-success', 'bg-info', 'bg-warning', 'bg-danger'];
    listPhieuTuDanhGia: IPhieuTuDanhGiaViewModel[] = [];
    totalPhieuDanhGiaCaNhan = 0;

    public categoriesQuy = ['Q1', 'Q2', 'Q3', 'Q4'];
    public dataChartColum = {
        listData: [],
    };

    /*NHAN SU THEO DON VI */
    public seriesDataNSDonViOfNam: number[] = [
        20,
        60,
        33,
        30,
        50,
        11,
        25,
        22,
        43,
        45,
        100,
        40,
        33,
        30,
        50,
        11,
        25,
        22,
        43,
        45,
        20,
        40,
        33,
        30,
        50,
        11,
        25,
        22,
        43,
        45,
    ];

    seriesDataPhieuDanhGiaTotal: number[] = [];

    cateNSDonVi: string[] = [];

    thongKeKetQuaXepLoaiTheoDonVis = [];

    private destroyed$ = new Subject();
    public labelContent(e: any): string {
        return e.category;
    }
    constructor(private apiService: ApiService, private router: Router, private security: SecurityService) {
        const xepLoais = this.apiService.read(`${UrlConstant.API.DM_XEP_LOAI_KET_QUA_DANH_GIA}/List`, {
            pageSize: 0,
            pageNumber: 0,
        });

        const doiTuongDanhGias = this.apiService.read(`${UrlConstant.API.DM_DOI_TUONG_DANH_GIA}/List`, {
            pageSize: 0,
            pageNumber: 0,
        });

        const dataCharts = this.apiService.read(UrlConstant.API.PKS_TONG_HOP_KET_QUA, this.queryOptions);

        forkJoin([xepLoais, doiTuongDanhGias, dataCharts]).subscribe(res => {
            if (res[0].result && res[0].result.items) {
                const resultXepLoais = res[0].result?.items as IXepLoaiKetQuaDanhGia[];
                this.categoriesXepLoai = resultXepLoais.sort().map(m => {
                    return m.ten;
                });
                this.seriesDataXepLoai = resultXepLoais.sort().map(m => {
                    return { category: m.ten, value: 0 };
                });
                this.dataChartColum.listData = resultXepLoais.sort().map(m => {
                    return {
                        name: m.ten,
                        data: [0, 0, 0, 0],
                    };
                });
            }

            if (res[1].result && res[1].result.items) {
                const resultDoiTuongs = res[1].result?.items as IDoiTuongDanhGia[];
                this.seriesDataTongSoPhieu = resultDoiTuongs.sort().map(m => {
                    return {
                        idDoiTuongDanhGia: m.doiTuongDanhGiaId,
                        soPhieu: 0,
                        tongSoPhieu: 0,
                        ten: m.ten,
                    };
                });
            }

            if (res[2].result) {
                this.dataTongHopKetQuas = res[2].result.tongHopKetQuas as DataTongHopKetQua[];
                this.tongSoPhieus = res[2].result.tongSoPhieus as DataTongSoPhieu[];
                this.dataTongHopKetQuas.map(x => {
                    this.seriesDataXepLoai[0].value = this.seriesDataXepLoai[0].value + x.t1;
                    this.seriesDataXepLoai[1].value = this.seriesDataXepLoai[1].value + x.t2;
                    this.seriesDataXepLoai[2].value = this.seriesDataXepLoai[2].value + x.t3;
                    this.seriesDataXepLoai[3].value = this.seriesDataXepLoai[3].value + x.t4;

                    const index = this.seriesDataTongSoPhieu.findIndex(y => y.idDoiTuongDanhGia === x.idDoiTuongDanhGia);
                    if (index > -1) {
                        this.seriesDataTongSoPhieu[index].soPhieu = this.seriesDataTongSoPhieu[index].soPhieu + x.t1 + x.t2 + x.t3 + x.t4;
                    }

                    if (x.quy > 0) {
                        const data = this.dataChartColum.listData[x.quy - 1].data; //  data: [0, 0, 0, 0]
                        data[0] = data[0] + x.t1;
                        data[1] = data[1] + x.t2;
                        data[2] = data[2] + x.t3;
                        data[3] = data[3] + x.t4;
                        this.dataChartColum.listData[x.quy - 1].data = data;
                    }
                });

                this.tongSoPhieus.map(x => {
                    this.tongSoPhieu = this.tongSoPhieu + x.soPhieu;
                    const index = this.seriesDataTongSoPhieu.findIndex(y => y.idDoiTuongDanhGia === x.idDoiTuongDanhGia);
                    if (index > -1) {
                        this.seriesDataTongSoPhieu[index].tongSoPhieu = this.seriesDataTongSoPhieu[index].tongSoPhieu + x.soPhieu;
                    }
                });
            }
        });
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    ngOnInit() {
        this.loadItemPhieuTuDanhGias();
        this.loadItemThongKeTheoCapDonVi();
    }

    changeStyle(index: number) {
        return this.listStyle[index];
    }

    danhGia(dataItem: IPhieuTuDanhGiaViewModel) {
        const str = `${dataItem.phieuDanhGiaId}_${dataItem.nhanSuDanhGiaChiTietId}_${dataItem.dotDanhGiaChiTietId}_${ActionEnum.CREATE}`;
        this.router.navigate([UrlConstant.ROUTE.PKS_DANH_GIA], {
            queryParams: {
                k: encodeURIComponent(this.security.encryptKey(str)),
            },
        });
    }

    private loadItemThongKeTheoCapDonVi() {
        this.apiService
            .read(UrlConstant.API.PKS_THONG_KE_THEO_CAP_DON_VI, {})
            .pipe(
                takeUntil(this.destroyed$),
                map(res => res.result)
            )
            .subscribe(res => {
                const thongKeTheoCapDonVis = res.thongKeTheoCapDonVis;
                const xepLoaiKetQuas = res.xepLoaiKetQuas;
                this.cateNSDonVi = thongKeTheoCapDonVis.map(m => m.tenCoQuan);
                this.seriesDataPhieuDanhGiaTotal = thongKeTheoCapDonVis.map(m => m.tongSoPhieu);

                this.thongKeKetQuaXepLoaiTheoDonVis = xepLoaiKetQuas.map(x => {
                    let lstData = [];
                    switch (x.id) {
                        case 1:
                            lstData = thongKeTheoCapDonVis.map(x => x.xL1);
                            break;
                        case 2:
                            lstData = thongKeTheoCapDonVis.map(x => x.xL2);
                            break;
                        case 3:
                            lstData = thongKeTheoCapDonVis.map(x => x.xL3);
                            break;
                        case 4:
                            lstData = thongKeTheoCapDonVis.map(x => x.xL4);
                            break;
                    }
                    return {
                        name: x.ten,
                        data: lstData,
                    };
                });
            });
    }

    private loadItemPhieuTuDanhGias() {
        this.apiService
            .read(UrlConstant.API.PKS_TONG_HOP_PHIEU_DANH_GIA + '/Search', {
                pageNumber: 1,
                pageSize: 4,
                nhanSuId: null,
                dotDanhGiaChiTietId: null,
                manHinh: 1,
                keyword: null,
                nam: null,
                quy: null,
                tuNgay: null,
                denNgay: null,
                sortCol: 'Id',
                sortByASC: true,
            })
            .subscribe(res => {
                if (res.result) {
                    this.listPhieuTuDanhGia = res.result ? (res.result.items as IPhieuTuDanhGiaViewModel[]) : [];
                    this.totalPhieuDanhGiaCaNhan = this.listPhieuTuDanhGia.length;
                }
            });
    }

    private get queryOptions() {
        return {
            dotId: null,
            nam: null,
            quyId: null,
            coQuanIds: null,
        };
    }
}
