import { Component, Input, OnInit } from '@angular/core';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { IKeHoachTuyenDung, IKeHoachTuyenDungTieuChuan } from '../../_models';

@Component({
    selector: 'app-xem-chi-tiet-ke-hoach',
    templateUrl: './xem-chi-tiet-ke-hoach.component.html',
    styleUrls: ['./xem-chi-tiet-ke-hoach.component.scss'],
})
export class XemChiTietKeHoachComponent implements OnInit {
    @Input() model: IKeHoachTuyenDung;
    @Input() lstTieuChuan: any[];

    constructor(private apiService: ApiService) {}

    ngOnInit() {
        this.apiService
            .read(UrlConstant.API.HRM_TD_KE_HOACH_TUYEN_DUNG + '/ById', {
                id: this.model.id,
            })
            .subscribe(res => {
                if (res.result) {
                    const keHoach = res.result as IKeHoachTuyenDung;
                    if (keHoach.keHoachTuyenDungTieuChuans.length > 0) {
                        const lstItemTieuChuan = keHoach.keHoachTuyenDungTieuChuans.map(x => {
                            const itemTieuChuan = this.lstTieuChuan.find(m => m.id === x.idTieuChuanTuyenDung);
                            if (itemTieuChuan) {
                                return {
                                    id: x.id,
                                    idTieuChuanTuyenDung: x.idTieuChuanTuyenDung,
                                    tenYeuCau: itemTieuChuan.ten,
                                    yeuCau: x.yeuCau,
                                    ghiChu: x.ghiChu,
                                };
                            } else {
                                return {
                                    id: x.id,
                                    idTieuChuanTuyenDung: x.idTieuChuanTuyenDung,
                                    yeuCau: x.yeuCau,
                                    ghiChu: x.ghiChu,
                                };
                            }
                        });
                        this.model.keHoachTuyenDungTieuChuans = lstItemTieuChuan as IKeHoachTuyenDungTieuChuan[];
                    } else {
                        const lstItemTieuChuan = this.lstTieuChuan.map(x => {
                            return {
                                id: 0,
                                idTieuChuanTuyenDung: x.id,
                                tenYeuCau: x.ten,
                                yeuCau: '',
                                ghiChu: '',
                            };
                        });
                        this.model.keHoachTuyenDungTieuChuans = lstItemTieuChuan;
                    }
                }
            });
    }
}
