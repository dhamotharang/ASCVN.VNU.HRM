import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { AuthenticateService } from '@core/auth';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { MenuQuery } from '@management-state/menu/menu.query';
import { WindowRef, WindowService } from '@progress/kendo-angular-dialog';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { BaseLaboratoryComponent } from '../../_base/base-laboratory.component';
import { IChuyenNganh, INganh } from '../../_models/ptn.model';

@Component({
    selector: 'app-chon-chuyen-nganh',
    templateUrl: './chon-chuyen-nganh.component.html',
    styleUrls: ['./chon-chuyen-nganh.component.scss'],
})
export class ChonChuyenNganhComponent extends BaseLaboratoryComponent<IChuyenNganh> implements OnInit, OnDestroy {
    @Input() idThamChieu: number;
    @Input() fnganhs: [];
    @Output() changedData = new EventEmitter<any>();
    gridDanhSach = [];
    idsChuyenNganh: number[] = [];
    idsNganh: number[] = [];
    listNganh: INganh[] = [];
    listDataCbbNganh: number[] = [];
    listChuyenNganh: IChuyenNganh[] = [];
    listDropChuyenNganh: IChuyenNganh[] = [];
    listDropNganh: INganh[] = [];

    constructor(
        protected apiService: ApiService,
        protected menuQuery: MenuQuery,
        protected windowRef: WindowRef,
        protected auth: AuthenticateService,
        protected windowService: WindowService
    ) {
        super(menuQuery, windowService);
    }

    ngOnInit() {
        super.ngOnInit();
        if (this.fnganhs && this.fnganhs.length > 0) {
            this.fnganhs.map((m: INganh) => {
                this.idsNganh.push(m.id);
                this.listNganh.push(m);
                if (m.chuyenNganhs) {
                    const arr = [];
                    m.chuyenNganhs.forEach((n: IChuyenNganh) => {
                        this.listChuyenNganh.push(n);
                        this.idsChuyenNganh.push(n.id);
                        arr.push(n.id);
                    });
                    this.gridDanhSach.push({
                        idNganh: m.id,
                        idChuyenNganh: arr,
                    });
                }
            });
            this.loadChuyenNganhTheoNganhs(null);
        } else {
            // this.addChuyenNganhHandler();
            // this.loadChuyenNganhTheoNganhs(-1);
        }
        const body = this.gridDanhSach;
        this.changedData.emit(body);
        this.loadNganhs();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    showFormCreateOrUpdate() {}

    loadItems() {}

    ngOnChanges(c: SimpleChanges): void {
        this.loadNganhs();
        this.loadChuyenNganhTheoNganhs(-1);
        // tslint:disable-next-line: no-unsafe-any
        this.idThamChieu = c.idThamChieu.currentValue;
    }
    onChange(event) {
        const body = this.gridDanhSach;
        this.changedData.emit(body);
    }

    private loadChuyenNganhTheoNganhs(idNganh?: number) {
        this.apiService
            .read(UrlConstant.API.DM_CHUYEN_NGANH_DAO_TAO + '/List', {
                isVisible: true,
                pageSize: 0,
                pageNumber: 0,
                sortCol: 'id',
                sortByASC: false,
                nganhId: idNganh ? [idNganh] : null,
            })
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                this.listDropChuyenNganh = res.result.items as IChuyenNganh[];
            });
    }

    private loadNganhs() {
        this.apiService
            .read(UrlConstant.API.DM_NGANH + '/List', {
                isVisible: true,
                pageSize: 0,
                pageNumber: 0,
                sortCol: 'id',
                sortByASC: false,
            })
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                this.listDropNganh = res.result.items as INganh[];
            });
    }

    addChuyenNganhHandler() {
        this.gridDanhSach.push({
            id: 0,
            idNganh: 0,
            idChuyenNganh: [],
        });
        this.loadChuyenNganhTheoNganhs(-1);
        this.onChange(this.gridDanhSach);
    }

    removeChuyenNganhHandler(item: IChuyenNganh, index: number) {
        this.gridDanhSach.splice(index, 1);
        this.idsChuyenNganh.splice(index, 1);
        this.loadChuyenNganhTheoNganhs();
        this.onChange(this.gridDanhSach);
    }

    onChangeChuyenNganh() {
        // this.loadChuyenNganhTheoNganhs(-1);
    }

    onFocusNganh(idNganh?: number) {
        idNganh = idNganh && idNganh > 0 && idNganh != undefined ? idNganh : -1;
        this.loadChuyenNganhTheoNganhs(idNganh);
    }

    onChangeNganh(idNganh?: number, rowIndex?: number) {
        if (idNganh && idNganh > 0 && idNganh != undefined) {
            this.loadChuyenNganhTheoNganhs(idNganh);
        } else {
            this.loadChuyenNganhTheoNganhs(-1);
            const item = this.gridDanhSach[rowIndex];
            if (item) {
                item.idChuyenNganh = [];
            }
        }
    }

    addChonChuyenNganhHandler() {
        if (this.listDataCbbNganh) {
            this.listDataCbbNganh.map(m => {
                if (!this.idsNganh.includes(m)) {
                    this.gridDanhSach.push({
                        idNganh: m,
                        idChuyenNganh: [],
                    });
                    this.idsNganh.push(m);
                }
            });
            this.listDataCbbNganh = [];
        }
    }
}
