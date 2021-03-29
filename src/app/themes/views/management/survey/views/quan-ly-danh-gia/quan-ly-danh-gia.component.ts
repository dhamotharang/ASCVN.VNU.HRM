import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActionEnum, ActionType } from '@core/constants/enum.constant';
import { GridDataResult, PagerSettings } from '@progress/kendo-angular-grid';
import { SortDescriptor, State } from '@progress/kendo-data-query';
import { PageConfig, ReziseTable } from '@core/constants/app.constant';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { UrlConstant } from '@core/constants/url.constant';
import { Router } from '@angular/router';
import { IQuanLyDanhGia, ISoLuongTongHopKetQuaDanhGia } from '@themes/views/management/survey/_models/survey.model';
import { FormControl } from '@angular/forms';
import { MenuQuery } from '@management-state/menu/menu.query';
import { SecurityService } from '@core/services/common/security.service';
import { SelectUserSingleComponent } from '@shared/widgets/select-user-single/select-user-single.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NotificationService } from '@core/services/common/notification.service';
import { IPhieuTuDanhGiaViewModel } from '@themes/views/management/survey/_models/phieu-tu-danh-gia.model';
import { ApiService } from '@core/data-services/api.service';
import { FileService } from '@core/services/common/file.service';
import { finalize, map, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { FormXetDuyetXepLoaiComponent } from '../../components/form-xet-duyet-xep-loai/form-xet-duyet-xep-loai.component';
import { DropDownListEnum } from '@shared/containers/asc-select/asc-select.enum';
import { LayoutViewEnum, TypeManagementSurveyEnum } from '@themes/views/management/survey/_models/survey.enum';
import { FormChuyenDanhGiaComponent } from '../../components/form-chuyen-danh-gia/form-chuyen-danh-gia.component';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { CustomTranslateService } from '@core/services/common';

export enum ExportEnum {
    ExportExcel = 0,
    ExportExcelTongHopKetQuaCongChucVienChuc = 1,
    ExportExcelTongHopKetQuaDanhGiaXepLoaiChatLuong = 2,
}

@Component({
    selector: 'app-quan-ly-danh-gia',
    templateUrl: './quan-ly-danh-gia.component.html',
    styleUrls: ['./quan-ly-danh-gia.component.scss'],
    animations: [fadeInOnEnterAnimation(), fadeOutOnLeaveAnimation()],
})
export class QuanLyDanhGiaComponent implements OnInit, OnDestroy {
    public actionType = ActionType;
    public opened = false;
    public searchAdvance = false;
    public openFirstTime = false;
    public gridView: GridDataResult;
    cardView$: Observable<GridDataResult>;
    isBtnNext = false;
    isBtnPrevious = false;
    cardView: GridDataResult = {
        data: [],
        total: 0,
    };
    layoutView = LayoutViewEnum;
    exportEnum = ExportEnum;
    currentLayoutView = LayoutViewEnum.TABLE_VIEW;
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
    loading = true;
    pageConfig: PagerSettings | boolean = PageConfig;

    public model: IQuanLyDanhGia;
    public action: ActionEnum;
    public selectionIds: number[] = [];
    public chonDonVi: number[] = [];
    public chonNhanSu: number[] = [];
    searchControl = new FormControl();
    dropdownListEnum = DropDownListEnum;
    modelThongKe: ISoLuongTongHopKetQuaDanhGia;
    modelSearch = {
        keyword: '',
        nam: null,
        quy: null,
        tuNgay: null,
        denNgay: null,
        trangThaiDanhGia: null,
        doiTuongDanhGiaId: null,
        coQuanId: null,
        nhanSu: null,
        chucVuIds: [],
        chucDanhIds: [],
    };

    roles = {
        isView: false,
        isCreate: false,
        isUpdate: false,
        isDelete: false,
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
        private windowService: WindowService,
        private router: Router,
        private menuQuery: MenuQuery,
        private security: SecurityService,
        private modalService: NzModalService,
        private notification: NotificationService,
        private translate: CustomTranslateService,
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

    sortChange(sort: SortDescriptor[]): void {
        this.gridState.sort = sort;
        this.loadItems();
    }

    transferSurvey(dataItem) {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('SURVEY.TEXT.01'),
            content: FormChuyenDanhGiaComponent,
            width: 600,
            top: 100,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.model = [dataItem.nhanSuDanhGiaChiTietId];
        param.type = TypeManagementSurveyEnum.QUAN_LY_DANH_GIA;

        windowRef.result.subscribe(result => {
            this.opened = false;
            this.loadItems();
        });
        // this.opened = true;
        // const windowRef = this.windowService.open({
        //     title: 'Chọn nhân sự',
        //     content: SelectUserSingleComponent,
        //     width: 1200,
        //     top: 100,
        //     autoFocusedElement: 'body',
        //     state: 'maximized',
        // });

        // const param = windowRef.content.instance;
        // param.action = this.action;
        // param.model = null;
        // param.message = 'Chọn nhân sự để chuyển đánh giá';
        // param.manHinh = TypeManagementSurveyEnum.QUAN_LY_DANH_GIA;
        // windowRef.result.subscribe((result: any) => {
        //     this.opened = false;
        //     // chuyen danh gia
        //     if (result instanceof WindowCloseResult) {
        //     } else {
        //         this.modalService.confirm({
        //             nzTitle: '<i>Xác nhận</i>',
        //             nzContent: '<b>Bạn có chắc muốn chuyển đánh giá ?</b>',
        //             nzOkText: 'Đồng ý',
        //             nzCancelText: 'Không',
        //             nzOnOk: () => {
        //                 const nhanSuDanhGiaChiTiet = {
        //                     nhanSuDanhGiaChiTietIds: [...dataItem.nhanSuDanhGiaChiTietId],
        //                     nhanSuId: result.nhanSuId,
        //                 };
        //                 const saveNhanSuCap2$ = this.apiService
        //                     .put(UrlConstant.API.PKS_NHAN_SU_DANH_GIA_CHI_TIET + '/MoveNhanSuDanhGiaCap2', nhanSuDanhGiaChiTiet)
        //                     .pipe(takeUntil(this.destroyed$));

        //                 saveNhanSuCap2$.subscribe(res => {
        //                     this.notification.showSuccessMessage('Chuyển nhân sự đánh giá thành công !');
        //                     this.loadItems();
        //                 });
        //             },
        //         });
        //     }
        // });
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
            param.type = TypeManagementSurveyEnum.QUAN_LY_DANH_GIA;

            windowRef.result.subscribe(result => {
                this.opened = false;
                this.loadItems();
            });
            // this.opened = true;
            // const windowRef = this.windowService.open({
            //     title: 'Chọn nhân sự',
            //     content: SelectUserSingleComponent,
            //     width: 1200,
            //     top: 100,
            //     autoFocusedElement: 'body',
            //     state: 'maximized',
            // });

            // const param = windowRef.content.instance;
            // param.action = this.action;
            // param.model = null;
            // param.message = 'Chọn nhân sự để chuyển đánh giá';
            // param.manHinh = TypeManagementSurveyEnum.QUAN_LY_DANH_GIA;
            // windowRef.result.subscribe((result: any) => {
            //     this.opened = false;
            //     // chuyen danh gia
            //     if (result instanceof WindowCloseResult) {
            //     } else {
            //         this.modalService.confirm({
            //             nzTitle: '<i>Xác nhận</i>',
            //             nzContent: '<b>Bạn có chắc muốn chuyển đánh giá ?</b>',
            //             nzOkText: 'Đồng ý',
            //             nzCancelText: 'Không',
            //             nzOnOk: () => {
            //                 const nhanSuDanhGiaChiTiet = {
            //                     nhanSuDanhGiaChiTietIds: this.selectionIds,
            //                     nhanSuId: result.nhanSuId,
            //                 };
            //                 const saveNhanSuCap2$ = this.apiService
            //                     .put(UrlConstant.API.PKS_NHAN_SU_DANH_GIA_CHI_TIET + '/MoveNhanSuDanhGiaCap2', nhanSuDanhGiaChiTiet)
            //                     .pipe(takeUntil(this.destroyed$));

            //                 saveNhanSuCap2$.subscribe(res => {
            //                     if (res.result === null && res.errorMessages.length > 0) {
            //                         const messages = res.errorMessages
            //                             .map(x => {
            //                                 return x.errorMessage + ' <b>' + x.errorValues.join(',') + '</b>';
            //                             })
            //                             .join('<br/>');
            //                         this.notification.showWarningMessage(messages);
            //                     } else {
            //                         this.notification.showSuccessMessage('Chuyển nhân sự đánh giá thành công !');
            //                     }

            //                     this.loadItems();
            //                 });
            //             },
            //         });
            //     }
            // });
        } else {
            this.notification.showErrorMessage(this.translate.get('SURVEY.MES.02'));
        }
    }

    danhGia(dataItem) {
        const str = `${dataItem.phieuDanhGiaId}_${dataItem.nhanSuDanhGiaChiTietId}_${dataItem.dotDanhGiaChiTietId}_${2}_${
            ActionEnum.CREATE
        }`;
        this.router.navigate([UrlConstant.ROUTE.PKS_DANH_GIA], {
            queryParams: {
                k: encodeURIComponent(this.security.encryptKey(str)),
            },
        });
    }

    viewHandler(dataItem) {
        const str = `${dataItem.phieuDanhGiaId}_${dataItem.nhanSuDanhGiaChiTietId}_${dataItem.dotDanhGiaChiTietId}_${2}_${ActionEnum.VIEW}`;
        this.router.navigate([UrlConstant.ROUTE.PKS_DANH_GIA], {
            queryParams: {
                k: encodeURIComponent(this.security.encryptKey(str)),
            },
        });
    }

    changeNhanSu(data) {
        this.chonNhanSu = data.map(x => {
            return x.nhanSuId;
        });
    }

    searchHandler() {
        this.chonDonVi.length > 0 ? (this.modelSearch.coQuanId = this.chonDonVi.toString()) : (this.modelSearch.coQuanId = null);
        this.chonNhanSu.length > 0 ? (this.modelSearch.nhanSu = this.chonNhanSu.toString()) : (this.modelSearch.nhanSu = null);

        // set pageNumber
        this.gridState.skip = 0;
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
            chucVuIds: [],
            chucDanhIds: [],
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

    // onChuyenDanhGia(item: IPhieuTuDanhGiaViewModel) {
    //     this.opened = true;
    //     const windowRef = this.windowService.open({
    //         title: 'Chọn nhân sự',
    //         content: SelectUserSingleComponent,
    //         width: 1200,
    //         top: 100,
    //         autoFocusedElement: 'body',
    //         state: 'maximized',
    //     });

    //     const param = windowRef.content.instance;
    //     param.action = this.action;
    //     param.model = null;
    //     param.message = 'Chọn nhân sự để chuyển đánh giá';
    //     param.manHinh = TypeManagementSurveyEnum.QUAN_LY_DANH_GIA;

    //     windowRef.result.subscribe((result: any) => {
    //         this.opened = false;
    //         // chuyen danh gia
    //         if (result instanceof WindowCloseResult) {
    //         } else {
    //             this.modalService.confirm({
    //                 nzTitle: '<i>Xác nhận</i>',
    //                 nzContent: '<b>Bạn có chắc muốn chuyển đánh giá ?</b>',
    //                 nzOkText: 'Đồng ý',
    //                 nzCancelText: 'Không',
    //                 nzOnOk: () => {
    //                     const nhanSuDanhGiaChiTiet = {
    //                         nhanSuDanhGiaChiTietIds: [item.nhanSuDanhGiaChiTietId],
    //                         nhanSuId: result.nhanSuId,
    //                     };
    //                     this.apiService
    //                         .put(UrlConstant.API.PKS_NHAN_SU_DANH_GIA_CHI_TIET + '/MoveNhanSuDanhGiaCap2', nhanSuDanhGiaChiTiet)
    //                         .subscribe(res => {
    //                             this.notification.showSuccessMessage('Chuyển nhân sự đánh giá thành công !');
    //                             this.loadItems();
    //                         });
    //                 },
    //             });
    //         }
    //     });
    // }
    onChuyenDanhGia(item: IPhieuTuDanhGiaViewModel) {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('SURVEY.TEXT.01'),
            content: FormChuyenDanhGiaComponent,
            width: 800,
            top: 100,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.model = [item.nhanSuDanhGiaChiTietId];
        param.type = TypeManagementSurveyEnum.QUAN_LY_DANH_GIA;

        windowRef.result.subscribe(result => {
            this.opened = false;
            // chuyen danh gia
            if (result instanceof WindowCloseResult) {
            } else {
            }
        });
    }

    onSendNhanSuDanhGia(item: IPhieuTuDanhGiaViewModel) {
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
        param.manHinh = TypeManagementSurveyEnum.QUAN_LY_DANH_GIA;

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
                        this.apiService
                            .put(UrlConstant.API.PKS_NHAN_SU_DANH_GIA_CHI_TIET + '/SendNhanSuDanhGiaCap3', nhanSuDanhGiaChiTiet)
                            .subscribe(res => {
                                this.notification.showSuccessMessage('Gửi đánh giá thành công !');
                                this.loadItems();
                            });
                    },
                });
            }
        });
    }

    checkShowButtonDanhGia(item: IPhieuTuDanhGiaViewModel) {
        if (item.typePhieu === 2 && (item.xepLoai3Id == null || item.xepLoai3Id <= 0)) {
            return true;
        }
        return false;
    }

    // Chuyển nếu chưa có kết quả 2: IDKetQuaXepLoai2
    checkShowButtonChuyen(item: IPhieuTuDanhGiaViewModel) {
        if (
            // (item.typePhieu == 2 || item.typePhieu == 0) &&
            (item.xepLoai2Id == null || item.xepLoai2Id <= 0) &&
            (item.xepLoai3Id == null || item.xepLoai3Id <= 0)
        ) {
            return true;
        }
        return false;
    }

    // Gửi nếu đã có kết quả IDKetQuaXepLoai2 && chưa có IDKetQuaXepLoai3
    checkShowButtonGui(item: IPhieuTuDanhGiaViewModel) {
        if (item.typePhieu === 2 && item.xepLoai2Id != null && item.xepLoai2Id > 0 && (item.xepLoai3Id == null || item.xepLoai3Id <= 0)) {
            return true;
        }
        return false;
    }

    onPrintExcel() {
        this.fileService.exportFile(
            UrlConstant.API.PKS_TONG_HOP_PHIEU_DANH_GIA + '/ExportExcelTongHopKetQuaDanhGiaCongChucVienChuc',
            this.exportQueryOptions,
            'DanhSachExportExcelTongHopKetQuaDanhGiaCC-VCCapQuanLy'
        );
    }

    onExportExcel(type: ExportEnum) {
        switch (type) {
            case this.exportEnum.ExportExcel:
                this.fileService.exportFile(
                    UrlConstant.API.PKS_TONG_HOP_PHIEU_DANH_GIA + '/ExportExcel',
                    this.exportQueryOptions,
                    'DanhSachPhieuDanhGia'
                );
                break;
            case this.exportEnum.ExportExcelTongHopKetQuaCongChucVienChuc:
                this.fileService.exportFile(
                    UrlConstant.API.PKS_TONG_HOP_PHIEU_DANH_GIA + '/ExportExcelTongHopKetQuaDanhGiaCongChucVienChuc',
                    this.exportQueryOptions,
                    'DanhSachExportExcelTongHopKetQuaDanhGiaCongChucVienChuc'
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

    onXetDuyet() {
        if (this.selectionIds.length > 0) {
            if (this.selectionIds.length === 1) {
                this.cardView$.subscribe(res => {
                    const item = res.data.find(x => x.nhanSuDanhGiaChiTietId === this.selectionIds[0]);
                    if (item) {
                        this.danhGia(item);
                    }
                });
            } else {
                this.opened = true;
                const windowRef = this.windowService.open({
                    title: 'Xét duyệt',
                    content: FormXetDuyetXepLoaiComponent,
                    width: 600,
                    top: 100,
                    autoFocusedElement: 'body',
                });

                const param = windowRef.content.instance;
                param.type = 2;
                param.model = this.selectionIds;

                windowRef.result.subscribe(result => {
                    if (result instanceof WindowCloseResult) {
                        this.selectionIds = [];
                        this.loadItems();
                    }
                    this.opened = false;
                });
            }
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
            sortDirection: this.gridState.sort[0].dir === 'asc',
            keyword: this.modelSearch.keyword,
            manHinh: 2, // enum: 2 quan ly danh gia
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
            sortDirection: this.gridState.sort[0].dir === 'asc',
            keyword: this.modelSearch.keyword,
            manHinh: 2, // enum: 2 quan ly danh gia
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
