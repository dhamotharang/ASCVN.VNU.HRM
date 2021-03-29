import { GridDataResult, PagerSettings } from '@progress/kendo-angular-grid';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { PageConfig, ReziseTable } from '@core/constants/app.constant';
import { ActionEnum, ActionType } from '@core/constants/enum.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService } from '@core/services/common/notification.service';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { SortDescriptor, State } from '@progress/kendo-data-query';
import { Observable, Subject } from 'rxjs';
import { IPhieuTuDanhGia } from '@themes/views/management/survey/_models/survey.model';
import { FormNhatKyPhieuDanhGiaComponent } from './form-nhat-ky-phieu-danh-gia/form-nhat-ky-phieu-danh-gia.component';
import { Router } from '@angular/router';
import { DoiTuongThucHienEnum, LayoutViewEnum, TypeManagementSurveyEnum } from '@themes/views/management/survey/_models/survey.enum';
import { AuthQuery } from '@management-state/auth/auth.query';
import { delay, finalize, map, tap } from 'rxjs/operators';
import { SelectUserSingleComponent } from '@shared/widgets/select-user-single/select-user-single.component';
import { MenuQuery } from '@management-state/menu/menu.query';
import { IPhieuTuDanhGiaViewModel } from '@themes/views/management/survey/_models/phieu-tu-danh-gia.model';
import { SecurityService } from '@core/services/common/security.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FileService } from '@core/services/common/file.service';
import { DropDownListEnum } from '@shared/containers/asc-select/asc-select.enum';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

@Component({
    selector: 'app-list-phieu-tu-danh-gia',
    templateUrl: './list-phieu-tu-danh-gia.component.html',
    styleUrls: ['./list-phieu-tu-danh-gia.component.scss'],
    animations: [fadeInOnEnterAnimation(), fadeOutOnLeaveAnimation()],
})
export class ListPhieuTuDanhGiaComponent implements OnInit, OnDestroy {
    cardView$: Observable<GridDataResult>;
    loading = false;
    isBtnNext = false;
    isBtnPrevious = false;
    layoutView = LayoutViewEnum;
    currentLayoutView = LayoutViewEnum.TABLE_VIEW;
    actionType = ActionType;
    opened = false;
    searchAdvance = false;
    openFirstTime = false;

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

    pageConfig: PagerSettings | boolean = PageConfig;

    model: IPhieuTuDanhGiaViewModel;
    action: ActionEnum;
    doiTuongThucHienEnum = DoiTuongThucHienEnum;
    selectionIds: number[] = [];
    public chonDonVi: number[] = [];
    public chonNhanSu: number[] = [];
    nhanSuId: number;

    dropdownListEnum = DropDownListEnum;

    public modelSearch = {
        keyword: '',
        nam: null,
        quy: null,
        tuNgay: null,
        denNgay: null,
        trangThaiDanhGia: null,
        doiTuongDanhGiaId: null,
        coQuanId: null,
        nhanSu: null,
        chucDanhIds: [],
        chucVuIds: [],
    };

    doiTuongThucHienId = 0;
    dotDanhGiaChiTietId = 0;

    roles = {
        isView: false,
        isCreate: false,
        isUpdate: false,
        isDelete: false,
    };

    tabName: string;

    private destroyed$ = new Subject();

    pageHeight = window.innerHeight - ReziseTable - 100;

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.pageHeight = event.target.innerHeight - ReziseTable - 100;
    }

    constructor(
        public apiService: ApiService,
        private windowService: WindowService,
        private notificationService: NotificationService,
        private router: Router,
        private authQuery: AuthQuery,
        private menuQuery: MenuQuery,
        private security: SecurityService,
        private modalService: NzModalService,
        private fileService: FileService
    ) {}

    ngOnInit() {
        this.tabName = this.menuQuery.getTitleWithCurrentUrl();
        const storage = this.menuQuery.getStorage();
        if (storage && storage.length > 0) {
            const permissions = this.menuQuery.getPermissionWithCurrentUrl(storage);
            if (permissions.includes(ActionType.VIEW)) {
                this.roles.isView = true;
            }

            if (permissions.includes(ActionType.CREATE)) {
                this.roles.isCreate = true;
            }

            if (permissions.includes(ActionType.DELETE)) {
                this.roles.isDelete = true;
            }

            if (permissions.includes(ActionType.UPDATE)) {
                this.roles.isUpdate = true;
            }
        }

        // load Nhân sự Id
        this.authQuery
            .select('doiTuongId')
            .pipe(delay(0))
            .subscribe(nhanSuId => {
                if (nhanSuId) {
                    this.nhanSuId = Number.parseInt(nhanSuId, 10);
                }
            });
        // load phiếu tự đánh giá
        this.loadItems();
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    setLayoutView(layout: LayoutViewEnum) {
        this.currentLayoutView = layout;
        if (layout === LayoutViewEnum.CARD_VIEW) {
            this.gridState.take = 6;
            this.gridState.skip = 0;
        } else {
            this.gridState.take = 20;
            this.gridState.skip = 0;
        }
        this.loadItems();
    }

    /**
     * Adds handler
     */
    danhGia(dataItem: IPhieuTuDanhGiaViewModel) {
        const str = `${dataItem.phieuDanhGiaId}_${dataItem.nhanSuDanhGiaChiTietId}_${dataItem.dotDanhGiaChiTietId}_${1}_${
            ActionEnum.CREATE
        }`;
        this.router.navigate([UrlConstant.ROUTE.PKS_DANH_GIA], {
            queryParams: {
                k: encodeURIComponent(this.security.encryptKey(str)),
            },
        });
    }

    viewHandler(dataItem) {
        const str = `${dataItem.phieuDanhGiaId}_${dataItem.nhanSuDanhGiaChiTietId}_${dataItem.dotDanhGiaChiTietId}_${1}_${ActionEnum.VIEW}`;
        this.router.navigate([UrlConstant.ROUTE.PKS_DANH_GIA], {
            queryParams: {
                k: encodeURIComponent(this.security.encryptKey(str)),
            },
        });
    }

    transferSurveys() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: 'Chọn nhân sự',
            content: SelectUserSingleComponent,
            width: 1200,
            top: 100,
            autoFocusedElement: 'body',
            state: 'maximized',
        });

        const param = windowRef.content.instance;
        param.action = this.action;
        param.model = null;
        param.message = 'Chọn nhân sự để gửi đánh giá';
        param.manHinh = TypeManagementSurveyEnum.TU_DANH_GIA;

        windowRef.result.subscribe((result: any) => {
            this.opened = false;
            // chuyen danh gia
            if (result instanceof WindowCloseResult) {
            } else {
                const nhanSuDanhGiaChiTiet = {
                    nhanSuDanhGiaChiTietIds: this.selectionIds,
                    nhanSuId: result.nhanSuId,
                };
                this.apiService
                    .put(UrlConstant.API.PKS_NHAN_SU_DANH_GIA_CHI_TIET + '/MoveNhanSuDanhGiaCap2', nhanSuDanhGiaChiTiet)
                    .subscribe(res => {
                        this.notificationService.showSuccessMessage('Gửi đánh giá thành công !');
                    });
            }
        });
    }

    transferSurvey(item: IPhieuTuDanhGia) {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: 'Chọn nhân sự',
            content: SelectUserSingleComponent,
            width: 1200,
            top: 100,
            autoFocusedElement: 'body',
            state: 'maximized',
        });

        const param = windowRef.content.instance;
        param.action = this.action;
        param.model = null;
        param.message = 'Chọn nhân sự để gửi đánh giá';
        param.manHinh = TypeManagementSurveyEnum.TU_DANH_GIA;

        windowRef.result.subscribe((result: any) => {
            this.opened = false;
            // chuyen danh gia
            if (result instanceof WindowCloseResult) {
            } else {
                this.modalService.confirm({
                    nzTitle: '<i>Xác nhận</i>',
                    nzContent: '<b>Bạn có chắc muốn gửi đánh giá ?</b>',
                    nzOkText: 'Đồng ý',
                    nzCancelText: 'Không',
                    nzOnOk: () => {
                        const nhanSuDanhGiaChiTiet = {
                            nhanSuDanhGiaChiTietIds: [item.nhanSuDanhGiaChiTietId],
                            nhanSuId: result.nhanSuId,
                        };
                        switch (item.typePhieu) {
                            case DoiTuongThucHienEnum.TU_DANH_GIA:
                                this.apiService
                                    .put(UrlConstant.API.PKS_NHAN_SU_DANH_GIA_CHI_TIET + '/SendNhanSuDanhGiaCap2', nhanSuDanhGiaChiTiet)
                                    .subscribe(res => {
                                        this.notificationService.showSuccessMessage('Gửi đánh giá thành công !');
                                    });
                                break;
                            case DoiTuongThucHienEnum.THU_TRUONG_DON_VI:
                                this.apiService
                                    .put(UrlConstant.API.PKS_NHAN_SU_DANH_GIA_CHI_TIET + '/SendNhanSuDanhGiaCap3', nhanSuDanhGiaChiTiet)
                                    .subscribe(res => {
                                        this.notificationService.showSuccessMessage('Gửi đánh giá thành công !');
                                    });
                                break;
                        }
                    },
                });
            }
        });
    }

    viewNhatKyPhieuDanhGia(dataItem) {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: 'Nhật ký Phiếu đánh giá',
            content: FormNhatKyPhieuDanhGiaComponent,
            width: 1500,
            top: 100,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.model = dataItem;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
            }
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

    onStateChange(state: State) {
        this.gridState = state;
        this.loadItems();
    }

    changeNhanSu(data) {
        this.chonNhanSu = data.map(x => {
            return x.nhanSuId;
        });
    }

    searchHandler() {
        this.gridState.skip = 0;
        this.chonDonVi.length > 0 ? (this.modelSearch.coQuanId = this.chonDonVi.toString()) : (this.modelSearch.coQuanId = null);
        this.chonNhanSu.length > 0 ? (this.modelSearch.nhanSu = this.chonNhanSu.toString()) : (this.modelSearch.nhanSu = null);
        this.loadItems();
    }

    refreshHandler() {
        this.chonDonVi = [];
        this.chonNhanSu = [];
        this.modelSearch = {
            keyword: '',
            nam: null,
            quy: null,
            tuNgay: null,
            denNgay: null,
            trangThaiDanhGia: null,
            doiTuongDanhGiaId: null,
            coQuanId: null,
            nhanSu: null,
            chucDanhIds: [],
            chucVuIds: [],
        };
    }

    sortChange(sort: SortDescriptor[]): void {
        this.gridState.sort = sort;
        this.loadItems();
    }

    /* ********************************************************* */
    /* ***********************TỰ ĐÁNH GIÁ*********************** */
    /* ********************************************************* */

    // Tự đánh giá
    checkShowButtonTuDanhGia(item: IPhieuTuDanhGiaViewModel) {
        if (
            item.typePhieu === 1 &&
            (item.xepLoai2Id == null || item.xepLoai2Id <= 0) &&
            (item.xepLoai3Id == null || item.xepLoai3Id <= 0)
        ) {
            return true;
        }
        return false;
    }

    // Gửi tự đánh giá
    checkShowButtonGuiTuDanhGia(item: IPhieuTuDanhGiaViewModel) {
        if (item.typePhieu === 1 && (item.xepLoai2Id == null || item.xepLoai2Id <= 0)) {
            return true;
        }
        return false;
    }

    /* ********************************************************* */
    /* ***********************QUẢN LÝ ĐÁNH GIÁ****************** */
    /* ********************************************************* */

    // Quản lý đánh giá
    checkShowButtonQuanLyDanhGia(item: IPhieuTuDanhGiaViewModel) {
        if (item.typePhieu === 2 && (item.xepLoai3Id == null || item.xepLoai3Id <= 0)) {
            return true;
        }
        return false;
    }

    // Chuyển quản lý đánh giá
    checkShowButtonQuanLyChuyenDanhGia(item: IPhieuTuDanhGiaViewModel) {
        if (
            item.typePhieu === 2 &&
            (item.xepLoai2Id == null || item.xepLoai2Id <= 0) &&
            (item.xepLoai3Id == null || item.xepLoai3Id <= 0)
        ) {
            return true;
        }
        return false;
    }

    /* ********************************************************* */
    /* ***********************BAN QUẢN LÝ ĐÁNH GIÁ ************* */
    /* ********************************************************* */

    // Ban quản lý đánh giá
    checkShowButtonBanQuanLyDanhGia(item: IPhieuTuDanhGiaViewModel) {
        if (item.typePhieu === 3) {
            return true;
        }
        return false;
    }

    // Chuyển ban quản lý đánh giá
    checkShowButtonChuyenBanQuanLy(item: IPhieuTuDanhGiaViewModel) {
        if (item.typePhieu === 3 && (item.xepLoai2Id != null || item.xepLoai2Id > 0) && (item.xepLoai3Id == null || item.xepLoai3Id <= 0)) {
            return true;
        }
        return false;
    }

    onNextPage() {
        this.gridState.skip = this.gridState.skip + this.gridState.take;
        this.loadItems();
    }

    onPreviousPage() {
        if (this.gridState.skip > 0) {
            this.gridState.skip = this.gridState.skip - this.gridState.take;
        }
        this.loadItems();
    }

    private loadItems() {
        this.loading = true;
        this.cardView$ = this.apiService.read(UrlConstant.API.PKS_TONG_HOP_PHIEU_DANH_GIA + '/Search', this.queryOptions).pipe(
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

                this.isBtnPrevious = this.gridState.skip > 0 && res.data.length < res.total;
                this.isBtnNext = this.gridState.skip + this.gridState.take < res.total;
            }),
            finalize(() => {
                this.loading = false;
            })
        );
    }

    onExportExcel() {
        this.fileService.exportFile(
            UrlConstant.API.PKS_TONG_HOP_PHIEU_DANH_GIA + '/ExportExcel',
            this.excelQueryOptions,
            'DanhSachPhieuTuDanhGia'
        );
    }

    private get queryOptions() {
        return {
            pageSize: this.gridState.take,
            pageNumber: this.gridState.skip / this.gridState.take + 1,
            sortName: this.gridState.sort[0].field,
            sortDirection: this.gridState.sort[0].dir === 'asc',
            keyword: this.modelSearch.keyword,
            manHinh: 1, // enum: 1 tu danh gia
            trangThaiId: this.modelSearch.trangThaiDanhGia,
            loaiDoiTuongId: this.modelSearch.doiTuongDanhGiaId,
            nam: this.modelSearch.nam,
            quy: this.modelSearch.quy,
            tuNgay: this.modelSearch.tuNgay,
            denNgay: this.modelSearch.denNgay,
            coQuanIds: this.modelSearch.coQuanId,
            nhanSuSearchIds: this.modelSearch.nhanSu,
            idsChucVu: this.modelSearch.chucVuIds.join(','),
            idsChucDanh: this.modelSearch.chucDanhIds.join(','),
        };
    }

    private get excelQueryOptions() {
        return {
            pageSize: 0,
            pageNumber: 0,
            sortName: this.gridState.sort[0].field,
            sortDirection: this.gridState.sort[0].dir === 'asc',
            keyword: this.modelSearch.keyword,
            manHinh: 1, // enum: 1 tu danh gia
            trangThaiId: this.modelSearch.trangThaiDanhGia,
            loaiDoiTuongId: this.modelSearch.doiTuongDanhGiaId,
            nam: this.modelSearch.nam,
            quy: this.modelSearch.quy,
            tuNgay: this.modelSearch.tuNgay,
            denNgay: this.modelSearch.denNgay,
            coQuanIds: this.modelSearch.coQuanId,
            nhanSuSearchIds: this.modelSearch.nhanSu,
            idsChucVu: this.modelSearch.chucVuIds.join(','),
            idsChucDanh: this.modelSearch.chucDanhIds.join(','),
        };
    }
}
