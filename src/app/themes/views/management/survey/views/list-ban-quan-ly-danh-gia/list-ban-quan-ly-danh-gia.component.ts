import { IBanQuanLyDanhGia, ISoLuongTongHopKetQuaDanhGia } from '@themes/views/management/survey/_models/survey.model';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActionEnum, ActionType } from '@core/constants/enum.constant';
import { SortDescriptor, State } from '@progress/kendo-data-query';
import { PageConfig, ReziseTable } from '@core/constants/app.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuQuery } from '@management-state/menu/menu.query';
import { SecurityService } from '@core/services/common/security.service';
import { GridDataResult, PagerSettings } from '@progress/kendo-angular-grid';
import { SelectUserSingleComponent } from '@shared/widgets/select-user-single/select-user-single.component';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { NotificationService } from '@core/services/common/notification.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { IPhieuTuDanhGiaViewModel } from '@themes/views/management/survey/_models/phieu-tu-danh-gia.model';
import { FileService } from '@core/services/common/file.service';
import { Observable, Subject } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { FormXetDuyetXepLoaiComponent } from '../../components/form-xet-duyet-xep-loai/form-xet-duyet-xep-loai.component';
import { DropDownListEnum } from '@shared/containers/asc-select/asc-select.enum';
import { LayoutViewEnum, TypeManagementSurveyEnum } from '@themes/views/management/survey/_models/survey.enum';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { FormChuyenDanhGiaComponent } from '../../components/form-chuyen-danh-gia/form-chuyen-danh-gia.component';
import { CustomTranslateService } from '@core/services/common';

export enum ExportEnum {
    ExportExcel,
    ExportExcelTongHopKetQuaCongChucVienChuc,
    ExportExcelTongHopKetQuaDanhGiaXepLoaiChatLuong,
}

@Component({
    selector: 'app-list-ban-quan-ly-danh-gia',
    templateUrl: './list-ban-quan-ly-danh-gia.component.html',
    styleUrls: ['./list-ban-quan-ly-danh-gia.component.scss'],
    animations: [fadeInOnEnterAnimation(), fadeOutOnLeaveAnimation()],
})
export class ListBanQuanLyDanhGiaComponent implements OnInit, OnDestroy {
    actionType = ActionType;
    opened = false;
    searchAdvance = false;
    openFirstTime = false;
    gridView: GridDataResult;
    cardView$: Observable<GridDataResult>;
    isBtnNext = false;
    isBtnPrevious = false;
    layoutView = LayoutViewEnum;
    exportEnum = ExportEnum;
    currentLayoutView = LayoutViewEnum.TABLE_VIEW;
    nhanSuId: number;

    loading = false;
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

    public roles = {
        isView: false,
        isCreate: false,
        isUpdate: false,
        isDelete: false,
    };

    pageConfig: PagerSettings | boolean = PageConfig;
    model: IBanQuanLyDanhGia;
    action: ActionEnum;
    selectionIds: number[] = [];

    dropdownListEnum = DropDownListEnum;
    modelThongKe: ISoLuongTongHopKetQuaDanhGia;
    searchControl = new FormControl();
    public chonDonVi: number[] = [];
    public chonNhanSu: number[] = [];
    public modelSearch = {
        keyword: '',
        nam: null,
        quy: null,
        tuNgay: null,
        denNgay: null,
        trangThaiDanhGia: null,
        coQuanId: null,
        doiTuongDanhGiaId: null,
        nhanSu: null,
        chucVuIds: [],
        chucDanhIds: [],
    };

    tabName: string;
    private destroyed$ = new Subject();
    pageHeight = window.innerHeight - ReziseTable - 120;
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.pageHeight = event.target.innerHeight - ReziseTable - 120;
    }

    constructor(
        private apiService: ApiService,
        private router: Router,
        private menuQuery: MenuQuery,
        private security: SecurityService,
        private windowService: WindowService,
        private notification: NotificationService,
        private translate: CustomTranslateService,
        private modalService: NzModalService,
        private fileService: FileService
    ) { }

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

        this.loadItems();
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    danhGia(dataItem) {
        const str = `${dataItem.phieuDanhGiaId}_${dataItem.nhanSuDanhGiaChiTietId}_${dataItem.dotDanhGiaChiTietId}_${9}_${ActionEnum.CREATE
            }`;
        this.router.navigate([UrlConstant.ROUTE.PKS_DANH_GIA], {
            queryParams: {
                k: encodeURIComponent(this.security.encryptKey(str)),
            },
        });
    }

    viewHandler(dataItem) {
        const str = `${dataItem.phieuDanhGiaId}_${dataItem.nhanSuDanhGiaChiTietId}_${dataItem.dotDanhGiaChiTietId}_${9}_${ActionEnum.VIEW}`;
        this.router.navigate([UrlConstant.ROUTE.PKS_DANH_GIA], {
            queryParams: {
                k: encodeURIComponent(this.security.encryptKey(str)),
            },
        });
    }

    sortChange(sort: SortDescriptor[]): void {
        this.gridState.sort = sort;
        this.loadItems();
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
            coQuanId: null,
            doiTuongDanhGiaId: null,
            nhanSu: null,
            chucDanhIds: [],
            chucVuIds: [],
        };
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

    setLayoutView(layout: LayoutViewEnum) {
        if (layout === LayoutViewEnum.CARD_VIEW) {
            this.gridState.take = 6;
            this.gridState.skip = 0;
        } else {
            this.gridState.take = 20;
            this.gridState.skip = 0;
        }
        this.currentLayoutView = layout;
        this.loadItems();
    }

    onChuyenDanhGia(item: IPhieuTuDanhGiaViewModel) {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('SURVEY.TEXT.02'),
            content: SelectUserSingleComponent,
            width: 1200,
            top: 100,
            autoFocusedElement: 'body',
            state: 'maximized',
        });

        const param = windowRef.content.instance;
        param.action = this.action;
        param.model = null;
        param.message = this.translate.get('SURVEY.TEXT.04');
        param.manHinh = TypeManagementSurveyEnum.BAN_QUAN_LY_DANH_GIA;
        windowRef.result.subscribe((result: any) => {
            this.opened = false;
            // chuyen danh gia
            if (result instanceof WindowCloseResult) {
            } else {
                this.modalService.confirm({
                    nzTitle: '<i>' + this.translate.get('LB.CONFIRM') + '</i>',
                    nzContent: '<b>' + this.translate.get('SURVEY.TEXT.05') + '</b>',
                    nzOkText: this.translate.get('LB.OK'),
                    nzCancelText: this.translate.get('LB.NO'),
                    nzOnOk: () => {
                        const nhanSuDanhGiaChiTiet = {
                            nhanSuDanhGiaChiTietIds: [item.nhanSuDanhGiaChiTietId],
                            nhanSuId: result.nhanSuId,
                        };
                        this.apiService
                            .put(UrlConstant.API.PKS_NHAN_SU_DANH_GIA_CHI_TIET + '/MoveNhanSuDanhGiaCap3', nhanSuDanhGiaChiTiet)
                            .subscribe(res => {
                                this.notification.showSuccessMessage(this.translate.get('SURVEY.MES.01'));
                                this.loadItems();
                            });
                    },
                });
            }
        });
    }

    checkShowButtonDanhGia(item: IPhieuTuDanhGiaViewModel) {
        return item.typePhieu === 3;
    }

    // Chuyển nếu đã có kết quả 2: IDKetQuaXepLoai2 và chưa có kết quả 3: IDKetQuaXepLoai3
    checkShowButtonChuyen(item: IPhieuTuDanhGiaViewModel) {
        return (item.xepLoai2Id != null || item.xepLoai2Id > 0) && (item.xepLoai3Id == null || item.xepLoai3Id <= 0);
    }

    onPrintExcel() {
        this.fileService.exportFile(
            UrlConstant.API.PKS_TONG_HOP_PHIEU_DANH_GIA + '/ExportExcelTongHopKetQuaDanhGiaCongChucVienChuc',
            this.exportQueryOptions,
            'DanhSachExportExcelTongHopKetQuaDanhGiaCC-VCCapDHQGHN'
        );
    }

    onExportExcel(type: ExportEnum) {
        switch (type) {
            case this.exportEnum.ExportExcel:
                this.fileService.exportFile(
                    UrlConstant.API.PKS_TONG_HOP_PHIEU_DANH_GIA + '/ExportExcel',
                    this.exportQueryOptions,
                    'DanhSachPhieuDanhGiaCapDHQGHN'
                );
                break;
            case this.exportEnum.ExportExcelTongHopKetQuaDanhGiaXepLoaiChatLuong:
                this.fileService.exportFile(
                    UrlConstant.API.PKS_TONG_HOP_PHIEU_DANH_GIA + '/ExportExcelTongHopKetQuaDanhGiaXepLoaiChatLuong',
                    this.exportQueryOptions,
                    'TongHopKetQuaDanhGiaXepLoaiChatLuong'
                );
                break;
        }
    }

    onXetDuyet() {
        if (this.selectionIds.length > 0) {
            // if (this.selectionIds.length === 1) {
            //     this.cardView$.subscribe(res => {
            //         let item = res.data.find(x => x.nhanSuDanhGiaChiTietId === this.selectionIds[0]);
            //         if (item) {
            //             this.danhGia(item);
            //         }
            //     });
            // } else {
            this.opened = true;
            const windowRef = this.windowService.open({
                title: this.translate.get('SURVEY.QUAN_LY_DANH_GIA.XET_DUYET'),
                content: FormXetDuyetXepLoaiComponent,
                width: 600,
                top: 100,
                autoFocusedElement: 'body',
            });

            const param = windowRef.content.instance;
            param.type = TypeManagementSurveyEnum.BAN_QUAN_LY_DANH_GIA;
            param.model = this.selectionIds;

            windowRef.result.subscribe(result => {
                if (result instanceof WindowCloseResult) {
                    this.selectionIds = [];
                    this.loadItems();
                }
                this.opened = false;
            });
            // }
        } else {
            this.notification.showErrorMessage(this.translate.get('SURVEY.MES.02'));
        }
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

    transferSurveys() {
        if (this.selectionIds.length > 0) {
            this.opened = true;
            const windowRef = this.windowService.open({
                title: this.translate.get('SURVEY.TEXT.01'),
                content: FormChuyenDanhGiaComponent,
                width: 600,
                top: 100,
                autoFocusedElement: 'body',
            });

            const param = windowRef.content.instance;
            param.model = this.selectionIds;
            param.type = TypeManagementSurveyEnum.DON_VI_DANH_GIA;

            windowRef.result.subscribe(result => {
                this.opened = false;
                this.loadItems();
            });
        } else {
            this.notification.showErrorMessage(this.translate.get('SURVEY.MES.02'));
        }
    }

    private loadItems() {
        this.loading = true;
        this.cardView$ = this.apiService.read(UrlConstant.API.PKS_TONG_HOP_PHIEU_DANH_GIA + '/Search', this.queryOptions).pipe(
            map(res => {
                if (res.result && res.result.items) {
                    this.modelThongKe = res.result.soLuongTongHopKetQuaDanhGia;
                    return {
                        data: res.result.items,
                        total: res.result.pagingInfo.totalItems,
                    };
                } else {
                    this.modelThongKe = {
                        totalItems: 0,
                        soLuongDaDanhGia: 0,
                        soLuongChuaDanhGia: 0,
                        soLuong1: 0,
                        soLuong2: 0,
                        soLuong3: 0,
                        soLuong4: 0,
                        soLuong5: 0,
                        soLuong6: 0,
                        tyLe1: 0,
                        tyLe2: 0,
                        tyLe3: 0,
                        tyLe4: 0,
                        tyLe5: 0,
                        tyLe6: 0,
                    };
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

    private get queryOptions() {
        return {
            pageSize: this.gridState.take,
            pageNumber: this.gridState.skip / this.gridState.take + 1,
            sortName: this.gridState.sort[0].field,
            keyword: this.modelSearch.keyword,
            manHinh: TypeManagementSurveyEnum.BAN_QUAN_LY_DANH_GIA, // enum: 9 ban quan ly danh gia
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

    private get exportQueryOptions() {
        return {
            pageSize: 0,
            pageNumber: 0,
            sortName: this.gridState.sort[0].field,
            keyword: this.modelSearch.keyword,
            manHinh: TypeManagementSurveyEnum.BAN_QUAN_LY_DANH_GIA, // enum: 9 ban quan ly danh gia
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
