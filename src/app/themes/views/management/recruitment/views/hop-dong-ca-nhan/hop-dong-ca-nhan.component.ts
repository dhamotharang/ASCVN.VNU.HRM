import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PageConfig } from '@core/constants/app.constant';
import { ApiService } from '@core/data-services/api.service';
import { MenuQuery } from '@management-state/menu/menu.query';
import { UrlConstant } from '@core/constants/url.constant';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { IHopDongCaNhan } from '@themes/views/management/recruitment/_models/hop-dong-ca-nhan.model';
import { DateUtil } from '@core/utils/date';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { FormHopDongTuyenDungComponent, XacNhanHopDongComponent } from '@themes/views/management/recruitment/components';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import { GridComponent } from '@progress/kendo-angular-grid';
import { forkJoin } from 'rxjs';
import { IHopDong, IListHopDong, TrangThaiHopDongEnum, TrangThaiKeHoachEnum, XacNhanHopDongEnum } from '@themes/views/management/recruitment/_models';
import { BaseRecruitmentComponent } from '../../_base/base-recruitment.component';
import { IKeHoachTuyenDung } from '@themes/views/management/catalogs/_models/catalog.model';
import { DeXuatHopDongComponent } from '../../components/de-xuat-hop-dong/de-xuat-hop-dong.component';
import { ActionEnum } from '@core/constants/enum.constant';

@Component({
    selector: 'app-hop-dong-ca-nhan',
    templateUrl: './hop-dong-ca-nhan.component.html',
    styleUrls: ['./hop-dong-ca-nhan.component.scss'],
})
export class HopDongCaNhanComponent extends BaseRecruitmentComponent<IHopDongCaNhan> implements OnInit, OnDestroy {
    @ViewChild(GridComponent) private grid: GridComponent;
    chiTietHopDong: IHopDong;
    xacNhanHopDongEnum = XacNhanHopDongEnum;
    lstDanhMucKeHoach: IKeHoachTuyenDung[] = [];
    isHopDongCaNhan: boolean;
    searchAdvance = false;
    openFirstTime = false;
    modelFilter = {
        keyword: '',
        tuNgay: null,
        denNgay: null,
        nam: null,
        idKeHoachTuyenDung: null,
        idViTriViecLam: null,
        idLoaiHopDong: null,
        idTrangThaiHopDong: null,
        ngayBatDau: null,
        ngayKetThuc: null,
        idSoQuyetDinh: null,
        idNhanSuLogin: null,
        idLoaiNhanSu: null,
        idNgach: null,
        idTrinhDoChuyenMon: null,
        idQuyetDinh: null,
        xacNhanHopDong: null,
        isHopDong: null,
    };
    trangThaiHopDongEnum = TrangThaiHopDongEnum;
    constructor(
        private apiService: ApiService,
        private windowService: WindowService,
        private translate: CustomTranslateService,
        protected menuQuery: MenuQuery
    ) {
        super(menuQuery);
    }

    ngOnInit() {
        super.ngOnInit();
        this.loadKeHoachItems();
        this.loadItems();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    onDuyetHopDong() { }

    onExportExcel() { }

    disabledNgayKetThuc = (current: Date): boolean => {
        if (!this.modelFilter.tuNgay) {
            return;
        }
        // Can not select days before today and today
        return differenceInCalendarDays(current, new Date(this.modelFilter.tuNgay)) < 0;
    };

    disabledNgayBatDau = (current: Date): boolean => {
        if (!this.modelFilter.denNgay) {
            return;
        }
        // Can not select days before today and today
        return differenceInCalendarDays(current, new Date(this.modelFilter.denNgay)) > 0;
    };
    
    openAdvanceSearch() {
        this.openFirstTime = true;
        const el = document.querySelector('.search-backdrop');
        this.searchAdvance = !this.searchAdvance;
        if (this.searchAdvance) {
            el.classList.add('search-overlay');
        } else {
            el.classList.remove('search-overlay');
        }
    }
    
    onSearch() {
        this.gridState.skip = 0;
        this.selectionIds = []; 
        this.loadItems();
    }

    onReset() {
        this.modelFilter = {
            keyword: '',
            tuNgay: null,
            denNgay: null,
            nam: null,
            idKeHoachTuyenDung: null,
            idViTriViecLam: null,
            idLoaiHopDong: null,
            idTrangThaiHopDong: null,
            ngayBatDau: null,
            ngayKetThuc: null,
            idSoQuyetDinh: null,
            idNhanSuLogin: null,
            idLoaiNhanSu: null,
            idNgach: null,
            idTrinhDoChuyenMon: null,
            idQuyetDinh: null,
            xacNhanHopDong: null,
            isHopDong: null,
        };
    }

    showFormXacNhanHopDongCaNhan(dataItem: IHopDongCaNhan) {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('RECRUITMENT.HDCN.XAC_NHAN01'),
            content: XacNhanHopDongComponent,
            width: 500,
            top: 10,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.idHopDongChiTiet = dataItem.idHopDongChiTiet;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
            }
            this.loadItems();
        });
    }

    onExpand(event) {
        const chiTietHopDong$ = this.apiService.read(UrlConstant.API.TD_HOP_DONG + '/ById', {
            idNhanSu: event.dataItem.idNhanSu,
            idHopDong: event.dataItem.id,
        });

        forkJoin([chiTietHopDong$, this.gridView$])
            .pipe(takeUntil(this.destroyed$))
            .subscribe(([chiTietHopDong, gridView]) => {
                this.chiTietHopDong = chiTietHopDong.result;
                gridView.data.forEach((item, idx) => {
                    if (event.index !== idx) {
                        this.grid.collapseRow(idx);
                    }
                });
            });
    }

    protected loadItems() {
        this.loading = true;
        this.gridView$ = this.apiService.read(UrlConstant.API.TD_HOP_DONG + '/ListCaNhan', this.queryOptions).pipe(
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
            finalize(() => {
                this.loading = false;
            })
        );
    }

    private get queryOptions() {
        return {
            ...this.queryString,
            keyword: this.modelFilter.keyword,
            tuNgay: this.modelFilter.ngayBatDau,
            denNgay: this.modelFilter.ngayKetThuc,
            nam: this.modelFilter.nam,
            isHopDong: this.modelFilter.isHopDong,
            idKeHoachTuyenDung: this.modelFilter.idKeHoachTuyenDung,
            
            idNhanSuLogin: this.modelFilter.idNhanSuLogin,
            idTrangThaiHopDong: this.modelFilter.idTrangThaiHopDong,
            idViTriViecLam: this.modelFilter.idViTriViecLam,
            idLoaiNhanSu: this.modelFilter.idLoaiNhanSu,
            idNgach: this.modelFilter.idNgach,
            idTrinhDoChuyenMon: this.modelFilter.idTrinhDoChuyenMon,
            idLoaiHopDong: this.modelFilter.idLoaiHopDong,
            idQuyetDinh: this.modelFilter.idQuyetDinh,
            xacNhanHopDong: this.modelFilter.xacNhanHopDong,
            idsCoQuan: null,
        };
    }

    changeNam() {
        this.modelFilter.idKeHoachTuyenDung = null;
        this.loadKeHoachItems();
    }

    private loadKeHoachItems() {
        this.apiService
            .read(UrlConstant.API.HRM_TD_KE_HOACH_TUYEN_DUNG + '/DanhMuc', {
                pageSize: 0,
                pageNumber: 0,
                nam: this.modelFilter.nam,
                idTrangThaiDuyet: TrangThaiKeHoachEnum.BAN_DUYET,
                isFilterCoQuan: true
            })
            .pipe(
                map(res => res.result),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                this.lstDanhMucKeHoach = res.items;
            });
    }
    viewHandler(dataItem: IListHopDong) {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('RECRUITMENT.HD.TITLE'),
            content: FormHopDongTuyenDungComponent,
            width: 1000,
            top: 10,
            autoFocusedElement: 'body',
        });
        const param = windowRef.content.instance;
        param.action = ActionEnum.VIEW;
        param.idNhanSu = dataItem.idNhanSu;
        param.idHopDong = dataItem.idHopDong;
        param.idTrangThaiHopDong = dataItem.idTrangThaiHopDong; 
        param.idHopDongChiTiet = dataItem.idHopDongChiTiet; 
        param.isHopDongXacNhan = true;
        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.loadItems();
            }
        });
    }
}
