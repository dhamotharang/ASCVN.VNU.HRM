import { IVaiTro } from './../../../laboratory-catalog/_models/ptn.model';
import { Component, OnDestroy, OnInit, Input, forwardRef, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MenuQuery } from '@management-state/menu/menu.query';
import { WindowService } from '@progress/kendo-angular-dialog';
import { BaseScienceTechnologyComponent } from '../../_base/base-science-technology.component';
import { IChonNhanSu } from '@themes/views/management/laboratory/_models/ptn.model';
import { takeUntil } from 'rxjs/operators';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { AuthenticateService } from '@core/auth';

@Component({
    selector: 'app-chon-thanh-vien',
    templateUrl: './chon-thanh-vien.component.html',
    styleUrls: ['./chon-thanh-vien.component.scss'],
})
export class ChonThanhVienComponent extends BaseScienceTechnologyComponent<IChonNhanSu> implements OnInit, OnDestroy, OnChanges {
    @Input() idThamChieu: number;
    @Input() thanhPhanThamGia: [];
    @Output() changedData = new EventEmitter<any>();
    chonNhanSu: number[] = [];
    listNhanSu: IChonNhanSu[] = [];
    viewNhanSu: IChonNhanSu[] = [];
    idsNhanSu: number[] = [];
    listDropVaiTro: IVaiTro[] = [];
    value: any[];

    constructor(
        protected menuQuery: MenuQuery, 
        protected windowService: WindowService, 
        protected apiService: ApiService,
        protected auth: AuthenticateService,) {
        super(menuQuery, windowService, auth);
    }

    ngOnChanges(c: SimpleChanges): void {
        this.idThamChieu = c.idThamChieu.currentValue;
        this.loadVaiTro();
    }

    ngOnInit() {
        super.ngOnInit();
        this.loadVaiTro();
        if (this.thanhPhanThamGia) {
            this.thanhPhanThamGia.map((m: IChonNhanSu) => {
                m.nhanSuId = m.idNhanSu;
                this.viewNhanSu.push(m);
                this.idsNhanSu.push(m.idNhanSu);
            });
        }
        const body = this.viewNhanSu;
        this.changedData.emit(body);
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    showFormCreateOrUpdate() {}

    loadItems() {}

    changeNhanSu(data) {
        this.listNhanSu = data.map(item => ({
            nhanSuId: item.nhanSuId,
            maNhanSu: item.maNhanSu,
            hoTenNhanSu: item.hoDem + ' ' + item.ten,
            hoDem: item.hoDem,
            ten: item.ten,
            tenGioiTinh: item.tenGioiTinh,
            ngaySinh: item.ngaySinh,
            tenChucDanh: item.tenChucDanh,
            tenChucVu: item.tenChucVu,

        }));
    }

    addNhanSuHandler() {
        if (this.listNhanSu) {
            this.listNhanSu.map(m => {
                if (!this.idsNhanSu.includes(m.nhanSuId)) {
                    m.idVaiTro = 2;
                    this.viewNhanSu.push(m);
                    this.idsNhanSu.push(m.nhanSuId);
                }
            });
            this.listNhanSu = [];
            this.chonNhanSu = [];
        }
    }

    removeNhanSuHandler(item: IChonNhanSu, index: number) {
        this.viewNhanSu.splice(index, 1);
        this.idsNhanSu.splice(index, 1);
    }

    private loadVaiTro() {
        this.apiService
            .post(
                UrlConstant.API.DM_VAI_TRO_KHCN + '/GetList',
                {
                    pageSize: 0,
                    pageNumber: 0,
                    sortCol: 'id',
                    isAsc: false,
                },
                true
            )
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                this.listDropVaiTro = res.result.items as IVaiTro[];
            });
    }

    onChange(event) {
        const body = this.viewNhanSu;
        this.changedData.emit(body);
    }
}
