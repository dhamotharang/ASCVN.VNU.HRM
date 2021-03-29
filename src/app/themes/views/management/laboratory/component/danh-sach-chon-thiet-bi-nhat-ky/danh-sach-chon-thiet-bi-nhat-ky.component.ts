import { Component, forwardRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseCheckPermission } from '@core/auth';
import { PageConfig } from '@core/constants/app.constant';
import { ActionEnum } from '@core/constants/enum.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { CustomTranslateService, NotificationService } from '@core/services/common';
import { MenuQuery } from '@management-state/menu/menu.query';
import { WindowService } from '@progress/kendo-angular-dialog';
import { GridDataResult, PagerSettings } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { DropDownListEnum } from '@shared/containers/asc-select';
import { NzModalService } from 'ng-zorro-antd';
import { Observable, Subject } from 'rxjs';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { INhatKySuDungPhongChiTiet, IThietBi, ITinhTrangThietBi } from '../../_models/ptn.model';

@Component({
    selector: 'app-danh-sach-chon-thiet-bi-nhat-ky',
    templateUrl: './danh-sach-chon-thiet-bi-nhat-ky.component.html',
    styleUrls: ['./danh-sach-chon-thiet-bi-nhat-ky.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => DanhSachChonThietBiNhatKyComponent),
        },
    ],
})
export class DanhSachChonThietBiNhatKyComponent extends BaseCheckPermission implements OnInit, OnDestroy, OnChanges, ControlValueAccessor {
    @Input() idDangKySuDung: number;
    @Input() idNhatKySuDung: number;
    @Input() idsThietBiDaChon: string;
    @Input() idsThietBi: number[] = [];
    gridView$: Observable<GridDataResult>;
    private model: INhatKySuDungPhongChiTiet;
    protected destroyed$ = new Subject();
    protected action: ActionEnum;
    selectionIds: number[] = [];
    listThietBi: INhatKySuDungPhongChiTiet[] = [];
    listDropThietBi: IThietBi[] = [];
    loading = false;
    opened = false;
    pageConfig: PagerSettings | boolean = false;
    dropdownListEnum = DropDownListEnum;
    listChonThietBi: number[] = [];
    listDropTinhTrangThietBi: ITinhTrangThietBi[] = [];

    gridState: State = {
        sort: [
            {
                field: 'id',
                dir: 'desc',
            },
        ],
        skip: 0,
        take: 10,
    };

    public modelSearch = {
        keyword: '',
    };

    value: INhatKySuDungPhongChiTiet[];

    constructor(
        private apiService: ApiService,
        private windowService: WindowService,
        private modal: NzModalService,
        private notificationService: NotificationService,
        protected menuQuery: MenuQuery,
        private translate: CustomTranslateService
    ) {
        super(menuQuery);
    }

    onChange(value?) {
        this.value = this.listThietBi;
    }

    onTouched() {}

    writeValue(obj: any): void {
        // this.value = obj;
        if (obj != null) this.listThietBi = obj;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    ngOnChanges(c: SimpleChanges): void {
        this.idDangKySuDung = c.idDangKySuDung.currentValue;
        this.loadThietBiTheoDangKySuDungs();
        this.loadTrangThaiThietBis();
    }

    ngOnInit() {
        if (this.idDangKySuDung) {
            super.ngOnInit();
            this.loadItems();
            this.loadTrangThaiThietBis();
        }
    }

    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    private loadItems() {
        this.loading = true;
        this.gridView$ = this.apiService.post(UrlConstant.API.PTN_DANG_KY_SD_PTN + '/GetListThietBi', this.queryOptions, true).pipe(
            map(res => {
                if (res.result && res.result.items) {
                    return {
                        data: res.result.items,
                        total: res.result.pagingInfo.totalItems,
                    };
                } else {
                    return {
                        data: [],
                        total: 0,
                    };
                }
            }),
            tap(res => {
                if (res.total <= this.gridState.take) {
                    this.pageConfig = false;
                } else {
                    this.pageConfig = PageConfig;
                }
            }),
            finalize(() => (this.loading = false))
        );
    }

    private get queryOptions() {
        return {
            pageSize: this.gridState.take,
            pageNumber: this.gridState.skip / this.gridState.take + 1,
            sortCol: this.gridState.sort[0].field,
            isAsc: this.gridState.sort[0].dir === 'asc' ? true : false,
            keyword: this.modelSearch.keyword,
            //idsThietBi: this.idDangKySuDung != null ? this.idDangKySuDung.toString() : '',
        };
    }

    onStateChange(state: State) {
        this.gridState = state;
        this.loadItems();
    }

    addThietBiHandler() {
        // this.listThietBi.push({
        //     id: 0,
        //     idDangKySuDung_NhatKySuDung: null,
        //     idThietBi: null,
        //     idTinhTrangThietBiTruocSD: null,
        //     idTinhTrangThietBiSauSD: null,
        //     mucTieuHao: null,
        //     ghiChu: '',
        // });
        if (this.listChonThietBi) {
            this.listChonThietBi.map(m => {
                if (!this.idsThietBi.includes(m)) {
                    const item =  this.listDropThietBi.find(x => x.id = m );
                    if (item){
                        this.listThietBi.push({
                            id: 0,
                            idThietBi: m,
                            idDangKySuDung_NhatKySuDung:  0,
                            idTinhTrangThietBiTruocSD: null,
                            idTinhTrangThietBiSauSD: null,
                            mucTieuHao: null,
                            ghiChu: null,
                            maThietBi: item.maThietBi ? item.maThietBi : '',
                            tenThietBi: item.tenThietBi ? item.tenThietBi : '',
                        });
                        this.idsThietBi.push(m);
                    }
                }
            });
            this.listChonThietBi = [];
        }
        this.loadThietBiTheoDangKySuDungs();
        this.onChange(this.listThietBi);
    }

    removeThietBiHandler(item: IThietBi, index: number) {
        this.listThietBi.splice(index, 1);
        this.idsThietBi.splice(index, 1);
        this.loadThietBiTheoDangKySuDungs();
        this.onChange(this.listThietBi);
    }

    onChangeThietBi() {
        this.loadThietBiTheoDangKySuDungs();
    }

    private loadThietBiTheoDangKySuDungs() {
        // this.idsThietBiDaChon = this.listThietBi
        //     .filter(m => m.idThietBi > 0)
        //     .map(m => m.idThietBi)
        //     .join(',');

        this.idsThietBiDaChon = this.idsThietBi ? this.idsThietBi.join(',') : '';

        this.apiService
            .post(UrlConstant.API.NHAT_KY_SU_DUNG_PHONG + '/GetListThietBi', {
                pageSize: 0,
                pageNumber: 0,
                sortCol: 'id',
                isAsc: false,
                idDangKySuDung: this.idDangKySuDung != null ? this.idDangKySuDung : null,
                idsThietBi: this.idsThietBiDaChon != null && this.idsThietBiDaChon != '' ? this.idsThietBiDaChon : null,
            })
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                this.listDropThietBi = res.result.items as IThietBi[];
            });
    }

    private loadTrangThaiThietBis() {
        this.apiService
            .post(UrlConstant.API.DM_TINH_TRANG_THIET_BI + '/GetList', {
                pageSize: 0,
                pageNumber: 0,
                sortCol: 'id',
                isAsc: false,
            })
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                this.listDropTinhTrangThietBi = res.result.items as ITinhTrangThietBi[];
            });
    }
}
