import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActionEnum } from '@core/constants/enum.constant';
import { GridDataResult, PagerSettings } from '@progress/kendo-angular-grid';
import { SortDescriptor, State } from '@progress/kendo-data-query';
import { Observable, Subject } from 'rxjs';
import { PageConfig, ReziseTable } from '@core/constants/app.constant';
import { ApiService } from '@core/data-services/api.service';
import { ITongHopKetQuaDanhGia } from '@themes/views/management/survey/_models/survey.model';
import { UrlConstant } from '@core/constants/url.constant';
import { FileService } from '@core/services/common/file.service';
import { MenuQuery } from '@management-state/menu/menu.query';
import { finalize, map, tap } from 'rxjs/operators';
import { DropDownListEnum } from '@shared/containers/asc-select/asc-select.enum';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

export enum ExportEnum {
    ExportExcel = 0,
    ExportExcelCaNhan = 1,
    ExportExcelTapThe = 2,
    ExportExcelTrinhPGDCoQuanHangNam = 3,
    ExportExcelTrinhPGDDonViLaoDong = 4,
    ExportExcelTongHopKetQuaDanhGiaXepLoaiChatLuong,
}
export enum ViewEnum {
    YEAR = 0,
    QUARTER = 1,
}

@Component({
    selector: 'app-list-tong-hop-ket-qua',
    templateUrl: './list-tong-hop-ket-qua.component.html',
    styleUrls: ['./list-tong-hop-ket-qua.component.scss'],
    animations: [fadeInOnEnterAnimation(), fadeOutOnLeaveAnimation()],
})
export class ListTongHopKetQuaComponent implements OnInit, OnDestroy {
    opened = false;
    searchAdvance = false;
    openFirstTime = false;
    gridView$: Observable<GridDataResult>;
    gridState: State = {
        sort: [
            {
                field: 'id',
                dir: 'desc',
            },
        ],
        skip: 0,
        take: 20,
    };

    tabName: string;
    pageConfig: PagerSettings | boolean = PageConfig;
    loading = false;

    model: ITongHopKetQuaDanhGia;
    action: ActionEnum;
    exportEnum = ExportEnum;
    viewEnum = null;
    dropdownListEnum = DropDownListEnum;
    public selectionIds: number[] = [];
    public chonDonVi: number[] = [];
    searchControl = new FormControl();
    modelThongKe: any;

    public modelSearch = {
        keyword: '',
        nam: new Date().getFullYear(),
        quy: null,
        coQuanId: null,
    };

    private destroyed$ = new Subject();
    pageHeight = window.innerHeight - ReziseTable - 21;
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.pageHeight = event.target.innerHeight - ReziseTable - 21;
    }
    constructor(private apiService: ApiService, private fileService: FileService, private menuQuery: MenuQuery) {}

    ngOnInit() {
        this.tabName = this.menuQuery.getTitleWithCurrentUrl();
        this.loadItems();
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    onStateChange(state: State) {
        this.gridState = state;
        this.loadItems();
    }

    /**
     * Search handler
     */
    searchHandler() {
        this.gridState.skip = 0;
        this.chonDonVi.length > 0 ? (this.modelSearch.coQuanId = this.chonDonVi.toString()) : (this.modelSearch.coQuanId = null);
        this.loadItems();
    }

    /**
     * Refresh handler
     */
    refreshHandler() {
        this.chonDonVi = [];
        this.modelSearch = {
            keyword: '',
            nam: new Date().getFullYear(),
            quy: null,
            coQuanId: null,
        };
    }

    sortChange(sort: SortDescriptor[]): void {
        this.gridState.sort = sort;
        this.loadItems();
    }

    loadItems() {
        this.loading = true;
        this.gridView$ = this.apiService.read(UrlConstant.API.PKS_TONG_HOP_KET_QUA_DANH_GIA, this.queryOptions).pipe(
            map(res => {
                this.modelThongKe = res.result.soLuongKetQuaDanhGia;
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

    onExportExcel(type: ExportEnum) {
        switch (type) {
            case this.exportEnum.ExportExcelCaNhan:
                this.fileService.exportFile(
                    UrlConstant.API.PKS_TONG_HOP_KET_QUA_DANH_GIA + '/ExportExcelCaNhan',
                    this.exportQueryOptions,
                    'DanhSachPhieuCaNhanDanhGia'
                );
                break;
            case this.exportEnum.ExportExcelTapThe:
                this.fileService.exportFile(
                    UrlConstant.API.PKS_TONG_HOP_KET_QUA_DANH_GIA + '/ExportExcelTapThe',
                    this.exportQueryOptions,
                    'DanhSachPhieuTapTheDanhGia'
                );
                break;
            case this.exportEnum.ExportExcelTrinhPGDCoQuanHangNam:
                this.fileService.exportFile(
                    UrlConstant.API.PKS_TONG_HOP_KET_QUA_DANH_GIA + '/ExportExcelTrinhPGDCoQuanHangNam',
                    this.exportQueryOptions,
                    'DanhSachPhieuTrinhPGDCoQuanDanhGia'
                );
                break;
            case this.exportEnum.ExportExcelTrinhPGDDonViLaoDong:
                this.fileService.exportFile(
                    UrlConstant.API.PKS_TONG_HOP_KET_QUA_DANH_GIA + '/ExportExcelTrinhPGDDonViLaoDong',
                    this.exportQueryOptions,
                    'DanhSachPhieuTrinhPGDDonViGia'
                );
                break;
        }
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

    private get queryOptions() {
        this.viewEnum = this.modelSearch.quy;
        return {
            pageNumber: this.gridState.skip / this.gridState.take + 1,
            pageSize: this.gridState.take,
            keyword: this.modelSearch.keyword,
            nam: this.modelSearch.nam,
            quy: this.modelSearch.quy,
            coQuanIds: this.modelSearch.coQuanId,
            sortCol: this.gridState.sort[0].field,
            sortByASC: this.gridState.sort[0].dir === 'asc',
        };
    }

    private get exportQueryOptions() {
        this.viewEnum = this.modelSearch.quy;
        return {
            pageNumber: 0,
            pageSize: 0,
            keyword: this.modelSearch.keyword,
            nam: this.modelSearch.nam,
            quy: this.modelSearch.quy,
            coQuanIds: this.modelSearch.coQuanId,
            sortCol: this.gridState.sort[0].field,
            sortByASC: this.gridState.sort[0].dir === 'asc',
        };
    }
}
