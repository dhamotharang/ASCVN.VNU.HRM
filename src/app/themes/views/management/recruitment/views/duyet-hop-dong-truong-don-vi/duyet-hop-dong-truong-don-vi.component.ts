import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PageConfig } from '@core/constants/app.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { MenuQuery } from '@management-state/menu/menu.query';
import { GridComponent } from '@progress/kendo-angular-grid';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { NotificationService } from '@core/services/common/notification.service';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { forkJoin } from 'rxjs';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { IHopDong, IListHopDong } from '@themes/views/management/recruitment/_models/hop-dong.model';
import { NzModalService } from 'ng-zorro-antd';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import { BaseRecruitmentComponent } from '@themes/views/management/recruitment/_base/base-recruitment.component';
import { TrangThaiHopDongEnum, TrangThaiKeHoachEnum, XacNhanHopDongEnum } from '../../_models';
import { FormDuyetHopDongTruongDonViComponent } from '../../components';
import { IKeHoachTuyenDung } from '@themes/views/management/catalogs/_models/catalog.model';
import { ActionEnum } from '@core/constants/enum.constant';
import { FormHopDongTuyenDungComponent } from '../../components/form-hop-dong-tuyen-dung/form-hop-dong-tuyen-dung.component';

@Component({
    selector: 'app-duyet-hop-dong-truong-don-vi',
    templateUrl: './duyet-hop-dong-truong-don-vi.component.html',
    styleUrls: ['./duyet-hop-dong-truong-don-vi.component.scss'],
})
export class DuyetHopDongTruongDonViComponent extends BaseRecruitmentComponent<IHopDong> implements OnInit, OnDestroy {
    searchAdvance = false;
    openFirstTime = false;
    @ViewChild(GridComponent) private grid: GridComponent;
    modelFilter = {
        keyword: '',
        tuNgay: null,
        denNgay: null,
        idKeHoachTuyenDung: null,
        idSoQuyetDinh: null,
        idTrangThaiHopDong: null,
        idNhanSuLogin: null,
        idViTriViecLam: null,
        idLoaiNhanSu: null,
        idNgach: null,
        idTrinhDoChuyenMon: null,
        idLoaiHopDong: null,
        idQuyetDinh: null,
        xacNhanHopDong: null,
        isHopDong: null,
    };
    lstDanhMucKeHoach: IKeHoachTuyenDung[] = [];
    chiTietHopDong: IHopDong;
    xacNhanHopDongEnum = XacNhanHopDongEnum;
    trangThaiHopDongEnum = TrangThaiHopDongEnum;
    constructor(
        private apiService: ApiService,
        private notification: NotificationService,
        private windowService: WindowService,
        private modal: NzModalService,
        private translate: CustomTranslateService,
        protected menuQuery: MenuQuery
    ) {
        super(menuQuery);
    }

    ngOnInit() {
        super.ngOnInit();
        this.loadKeHoachItems();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

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
        if (this.modelFilter.idKeHoachTuyenDung) {
            this.gridState.skip = 0;
            this.selectionIds = [];
            this.loadItems();
        } else {
            this.notification.showWarningMessage(this.translate.get('RECRUITMENT.MES.09'));
        }
    }

    onReset() {
        this.modelFilter = {
            keyword: '',
            tuNgay: null,
            denNgay: null,
            idKeHoachTuyenDung: null,
            idSoQuyetDinh: null,
            idTrangThaiHopDong: null,
            idNhanSuLogin: null,
            idViTriViecLam: null,
            idLoaiNhanSu: null,
            idNgach: null,
            idTrinhDoChuyenMon: null,
            idLoaiHopDong: null,
            idQuyetDinh: null,
            xacNhanHopDong: null,
            isHopDong: null,
        };
    }

    duyetHopDong(dataItem: IListHopDong) {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('RECRUITMENT.TEXT.11'),
            content: FormDuyetHopDongTruongDonViComponent,
            width: 800,
            top: 10,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.idsHopDong = [dataItem.idHopDong];

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.loadItems();
            }
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

    searchAdvanced() {
        this.openFirstTime = true;
        const el = document.querySelector('.search-backdrop');
        this.searchAdvance = !this.searchAdvance;
        if (this.searchAdvance) {
            el.classList.add('search-overlay');
        } else {
            el.classList.remove('search-overlay');
        }
    }

    onChangeKeHoach(e) {
        this.onSearch();
    }

    protected loadItems() {
        if (this.modelFilter.idKeHoachTuyenDung && this.modelFilter.idKeHoachTuyenDung > 0) {
            this.loading = true;
            this.gridView$ = this.apiService.read(UrlConstant.API.TD_HOP_DONG + '/TruongDonVi', this.queryOptions).pipe(
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
    }

    private get queryOptions() {
        return {
            ...this.queryString,
            keyword: this.modelFilter.keyword,
            tuNgay: this.modelFilter.tuNgay,
            denNgay: this.modelFilter.denNgay,
            nam: null,
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

    private loadKeHoachItems() {
        this.apiService
            .read(UrlConstant.API.HRM_TD_KE_HOACH_TUYEN_DUNG + '/DanhMuc', {
                pageSize: 0,
                pageNumber: 0,
                idTrangThaiDuyet: TrangThaiKeHoachEnum.BAN_DUYET,
                isFilterCoQuan: true,
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
        param.isHopDongXacNhan = false;
        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.loadItems();
            }
        });
    }
}
