import { Component, HostListener, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActionEnum } from '@core/constants/enum.constant';
import { GridDataResult, PagerSettings } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { ModalDeleteConfig, PageConfig, ReziseTable } from '@core/constants/app.constant';
import { WindowService } from '@progress/kendo-angular-dialog';
import { NotificationService } from '@core/services/common/notification.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UrlConstant } from '@core/constants/url.constant';
import { expandCollapse } from '@core/animations/expand-collapse.animations';
import { IDataSearch, INhanSuCoQuan } from '@themes/views/management/human-resource/_models/human-resource.model';
import { Observable, Subject } from 'rxjs';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { ApiService } from '@core/data-services/api.service';
import { MenuQuery } from '@management-state/menu/menu.query';
import { FileService } from '@core/services/common/file.service';
import { DropDownListEnum } from '@shared/containers/asc-select/asc-select.enum';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { BaseCheckPermission } from '@core/auth/base-check-permission';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';
import { DuLieuNhanSuEnum, KEY_STORE_HRM, TrangThaiDuLieuEnum } from '@themes/views/management/human-resource/_models';
import { FormThongTinNhanSuChungComponent, FormUpdateLoaiDoiTuongDanhGiaComponent, KhaiBaoTaiKhoanNhanSuComponent } from '@themes/views/management/human-resource/components';
import { ActivatedRoute, Router } from '@angular/router';
import { SecurityUtil } from '@core/utils/security';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import { DateUtil } from '@core/utils/date';
export enum ExportEnum {
    ExportExcel,
    ExportNhanSuSSO
}
@Component({
    selector: 'app-tra-cuu-nhan-su',
    templateUrl: './tra-cuu-nhan-su.component.html',
    styleUrls: ['./tra-cuu-nhan-su.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [expandCollapse, fadeInOnEnterAnimation(), fadeOutOnLeaveAnimation()],
})
export class TraCuuNhanSuComponent extends BaseCheckPermission implements OnInit, OnDestroy {
    @ViewChild(TooltipDirective) public tooltipDir: TooltipDirective;
    opened = false;
    action: ActionEnum;
    isLoading = false;
    searchAdvance = false;
    openFirstTime = false;
    gridView$: Observable<GridDataResult>;
    exportEnum = ExportEnum;
    gridState: State = {
        sort: [{ field: 'id', dir: 'desc' }],
        skip: 0,
        take: 20,
    };
    hrmkeyStore = KEY_STORE_HRM;
    pageConfig: PagerSettings | boolean = false;

    modelSearch = {
        keyword: '',
        maNhanSu: null,
        hoTen: null,
        soDienThoai: null,
        loaiNhanSuId: null,
        loaiHopDongId: null,
        trangThaiNhanSuId: null,
        chucVuId: null,
        chucDanhId: null,
        ngachId: null,
        quocTichId: null,
        danTocId: null,
        tonGiaoId: null,
        coQuanId: [],
        idGioiTinh: null,
        ngaySinh: null,
    };

    model: INhanSuCoQuan;
    selectionIds = [];

    tabName: string;

    searchControl = new FormControl();
    dropdownListEnum = DropDownListEnum;

    private destroyed$ = new Subject();

    pageHeight = window.innerHeight - ReziseTable + 32;

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.pageHeight = event.target.innerHeight - ReziseTable + 32;
    }

    constructor(
        private apiService: ApiService,
        private windowService: WindowService,
        private notificationService: NotificationService,
        private modal: NzModalService,
        private fileService: FileService,
        private router: Router,
        private route: ActivatedRoute,
        private translate: CustomTranslateService,
        protected menuQuery: MenuQuery
    ) {
        super(menuQuery);
    }

    ngOnInit() {
        super.ngOnInit();
        this.tabName = this.menuQuery.getTitleWithCurrentUrl();
        this.route.queryParams.subscribe(params => {
            if (params.query) {
                const queryOption = JSON.parse(SecurityUtil.get(decodeURIComponent(params.query)));
                this.modelSearch.keyword = queryOption.keySearch;
                this.modelSearch.maNhanSu = queryOption.maNhanSu;
                this.modelSearch.hoTen = queryOption.hoTen;
                this.modelSearch.soDienThoai = queryOption.soDienThoai;
                this.modelSearch.loaiNhanSuId = queryOption.idsLoaiNhanSu ? parseInt(queryOption.idsLoaiNhanSu, 10) : null;
                this.modelSearch.loaiHopDongId = queryOption.idsLoaiHopDong ? parseInt(queryOption.idsLoaiHopDong, 10) : null;
                this.modelSearch.trangThaiNhanSuId = queryOption.idsTrangThaiNhanSu ? parseInt(queryOption.idsTrangThaiNhanSu, 10) : null;
                this.modelSearch.chucVuId = queryOption.idsChucVu ? parseInt(queryOption.idsChucVu, 10) : null;
                this.modelSearch.chucDanhId = queryOption.idsChucDanh ? parseInt(queryOption.idsChucDanh, 10) : null;
                this.modelSearch.ngachId = queryOption.idsNgach ? parseInt(queryOption.idsNgach, 10) : null;
                this.modelSearch.quocTichId = queryOption.idsQuocTich ? parseInt(queryOption.idsQuocTich, 10) : null;
                this.modelSearch.danTocId = queryOption.idsDanToc ? parseInt(queryOption.idsDanToc, 10) : null;
                this.modelSearch.tonGiaoId = queryOption.idsTonGiao ? parseInt(queryOption.idsTonGiao, 10) : null;
                this.modelSearch.idGioiTinh = queryOption.idGioiTinh ? parseInt(queryOption.idGioiTinh, 10) : null;
                this.modelSearch.ngaySinh = queryOption.ngaySinh;
                this.gridState.skip = (queryOption.pageNumber - 1) * queryOption.pageSize;
                this.gridState.take = queryOption.pageSize;
                this.gridState.sort[0].field = queryOption.sortName;
                this.gridState.sort[0].dir = queryOption.sortASC ? 'asc' : 'desc';
                if (queryOption.idsCoQuan) {
                    this.modelSearch.coQuanId = [];
                    const listCoQuanId = queryOption.idsCoQuan.split(',')
                    listCoQuanId.map(x => {
                        this.modelSearch.coQuanId.push(x);
                    });
                } else {
                    this.modelSearch.coQuanId = [];
                }
                localStorage.removeItem(this.hrmkeyStore.TRA_CUU_NHAN_SU);
            }
            this.loadItems();
        });
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    createHandler() {
        this.action = ActionEnum.CREATE;
        this.model = undefined;
        this.showFormKhaiBaoTaiKhoanNhanSu();
    }

    editHandler(dataItem) {
        this.action = ActionEnum.UPDATE;
        const nhanSu$ = this.apiService
            .read(UrlConstant.API.HRM_NHAN_SU + '/ById', {
                idNhanSu: dataItem.idNhanSu,
                manHinh: DuLieuNhanSuEnum.SU_DUNG_CHINH,
            })
            .pipe(
                map(res => {
                    if (res.result) {
                        return res.result;
                    } else {
                        return {};
                    }
                }),
                takeUntil(this.destroyed$)
            );

        nhanSu$.subscribe(nhanSu => {
            if (nhanSu) {
                this.model = nhanSu;
                this.showFormKhaiBaoTaiKhoanNhanSu();
            }
        });
    }

    showLinkHoSoNhanSu(nhanSuId: number) {
        localStorage.setItem(this.hrmkeyStore.TRA_CUU_NHAN_SU, JSON.stringify(this.queryOptions));
        const data = {
            idNhanSu: nhanSuId,
            manHinh: DuLieuNhanSuEnum.SU_DUNG_CHINH,
        } as IDataSearch;
        this.router.navigate([UrlConstant.ROUTE.HRM_THONG_TIN_NHAN_SU], {
            queryParams: {
                k: encodeURIComponent(
                    SecurityUtil.set(JSON.stringify(data))
                ),
            },
        });
    }

    showFormKhaiBaoTaiKhoanNhanSu() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('LB.HRM.01'),
            // content: KhaiBaoTaiKhoanNhanSuComponent,
            content: FormThongTinNhanSuChungComponent,
            width: 1150,
            top: 10,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.action = this.action;
        param.model = this.model;

        windowRef.result.subscribe(result => {
            if (result === true) {
            }
            this.loadItems();
            this.opened = false;
        });
    }

    showFormUpdateLoaiDoiTuongDanhGia() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('HR.MES.04'),
            content: FormUpdateLoaiDoiTuongDanhGiaComponent,
            width: 700,
            top: 10,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.nhanSuSelectionIds = this.selectionIds;

        windowRef.result.subscribe(result => {
            if (result === true) {
                this.loadItems();
            }

            this.opened = false;
        });
    }

    /**
     * Removes handler
     * @param dataItem
     */
    removeHandler(dataItem) {
        this.selectionIds = [];
        this.selectionIds.push(dataItem.idNhanSu);
        this.removeSelectedHandler();
    }

    /**
     * Removes multiple selected handler
     */
    removeSelectedHandler() {
        if (this.selectionIds.length > 0) {
            const body = {
                idsNhanSu: this.selectionIds,
            };
            this.modal.confirm({
                nzTitle: ModalDeleteConfig.title,
                nzContent: ModalDeleteConfig.content,
                nzOkText: ModalDeleteConfig.yes,
                nzOkType: 'danger',
                nzOnOk: () => {
                    const removeNhanSu$ = this.apiService.delete(UrlConstant.API.HRM_NHAN_SU, body).pipe(takeUntil(this.destroyed$));
                    removeNhanSu$.subscribe(() => {
                        this.selectionIds = [];
                        this.notificationService.showSuccessMessage(this.translate.get('MES.DELETE_DONE'));
                        this.gridState.skip = 0;
                        this.loadItems();
                    });
                },
                nzCancelText: ModalDeleteConfig.no,
                nzOnCancel: () => { },
            });
        }
    }

    showTooltip(e: MouseEvent): void {
        const element = e.target as HTMLElement;
        if ((element.nodeName === 'TD' || element.nodeName === 'TH') && element.offsetWidth < element.scrollWidth) {
            this.tooltipDir.toggle(element);
        } else {
            this.tooltipDir.hide();
        }
    }

    onStateChange(state: State) {
        this.gridState = state;
        this.loadItems();
    }

    searchHandler() {
        this.gridState.skip = 0;
        this.loadItems();
    }

    refreshHandler() {
        this.modelSearch = {
            keyword: '',
            maNhanSu: null,
            hoTen: null,
            soDienThoai: null,
            loaiNhanSuId: null,
            loaiHopDongId: null,
            trangThaiNhanSuId: null,
            chucVuId: null,
            chucDanhId: null,
            ngachId: null,
            quocTichId: null,
            danTocId: null,
            tonGiaoId: null,
            coQuanId: [],
            idGioiTinh: null,
            ngaySinh: null,
        };
    }

    onSearchChange() {
        this.gridState.skip = 0;
        this.loadItems();
    }

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


    private loadItems() {
        this.isLoading = true;
        this.gridView$ = this.apiService.read(UrlConstant.API.HRM_NHAN_SU, this.queryOptions).pipe(
            map(res => {
                if (res.result) {
                    return {
                        data: res.result.items,
                        total: res.result.pagingInfo?.totalItems,
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
            finalize(() => (this.isLoading = false))
        );
    }

    private get queryOptions() {
        return {
            pageNumber: this.gridState.skip / this.gridState.take + 1,
            pageSize: this.gridState.take,
            sortName: this.gridState.sort[0].field,
            sortASC: this.gridState.sort[0].dir === 'asc',
            keySearch: this.modelSearch.keyword,
            idsCoQuan: this.modelSearch.coQuanId.join(','),
            maNhanSu: this.modelSearch.maNhanSu,
            hoTen: this.modelSearch.hoTen,
            soDienThoai: this.modelSearch.soDienThoai ? this.modelSearch.soDienThoai.toString() : null,
            idsLoaiHopDong: this.modelSearch.loaiHopDongId ? this.modelSearch.loaiHopDongId.toString() : null,
            idsTrangThaiNhanSu: this.modelSearch.trangThaiNhanSuId ? this.modelSearch.trangThaiNhanSuId.toString() : null,
            idsChucVu: this.modelSearch.chucVuId ? this.modelSearch.chucVuId.toString() : null,
            idsChucDanh: this.modelSearch.chucDanhId ? this.modelSearch.chucDanhId.toString() : null,
            idsQuocTich: this.modelSearch.quocTichId ? this.modelSearch.quocTichId.toString() : null,
            idsNgach: this.modelSearch.ngachId ? this.modelSearch.ngachId.toString() : null,
            idsTonGiao: this.modelSearch.tonGiaoId ? this.modelSearch.tonGiaoId.toString() : null,
            idsDanToc: this.modelSearch.danTocId ? this.modelSearch.danTocId.toString() : null,
            idsLoaiNhanSu: this.modelSearch.loaiNhanSuId ? this.modelSearch.loaiNhanSuId.toString() : null,
            idGioiTinh: this.modelSearch.idGioiTinh ? this.modelSearch.idGioiTinh : null,
            ngaySinh: this.modelSearch.ngaySinh ? DateUtil.getFullDate(this.modelSearch.ngaySinh) : null,

            isGiangVien: null,
            isNghienCuuVien: null,
            isThamGiaNVCL: null,
            isThamGiaGiangDayCL: null,
            isThamGiaQuanLyCL: null,
            isQuanLyCSVC: null,
            isQuanLySach: null,
            idTrangThaiDuLieu: TrangThaiDuLieuEnum.SU_DUNG_CHINH,
            isDongBo: null,
        };
    }

    private get exportQueryOptions() {
        return {
            pageNumber: 0,
            pageSize: 0,
            sortName: this.gridState.sort[0].field,
            sortASC: this.gridState.sort[0].dir === 'asc',
            keySearch: this.modelSearch.keyword,
            idsCoQuan: this.modelSearch.coQuanId.join(','),
            maNhanSu: this.modelSearch.maNhanSu,
            hoTen: this.modelSearch.hoTen,
            soDienThoai: this.modelSearch.soDienThoai ? this.modelSearch.soDienThoai.toString() : null,
            idsLoaiHopDong: this.modelSearch.loaiHopDongId ? this.modelSearch.loaiHopDongId.toString() : null,
            idsTrangThaiNhanSu: this.modelSearch.trangThaiNhanSuId ? this.modelSearch.trangThaiNhanSuId.toString() : null,
            idsChucVu: this.modelSearch.chucVuId ? this.modelSearch.chucVuId.toString() : null,
            idsChucDanh: this.modelSearch.chucDanhId ? this.modelSearch.chucDanhId.toString() : null,
            idsQuocTich: this.modelSearch.quocTichId ? this.modelSearch.quocTichId.toString() : null,
            idsNgach: this.modelSearch.ngachId ? this.modelSearch.ngachId.toString() : null,
            idsTonGiao: this.modelSearch.tonGiaoId ? this.modelSearch.tonGiaoId.toString() : null,
            idsDanToc: this.modelSearch.danTocId ? this.modelSearch.danTocId.toString() : null,
            idsLoaiNhanSu: this.modelSearch.loaiNhanSuId ? this.modelSearch.loaiNhanSuId.toString() : null,
            idGioiTinh: this.modelSearch.idGioiTinh ? this.modelSearch.idGioiTinh : null,
            ngaySinh: this.modelSearch.ngaySinh ? DateUtil.getFullDate(this.modelSearch.ngaySinh) : null,

            isGiangVien: null,
            isNghienCuuVien: null,
            isThamGiaNVCL: null,
            isThamGiaGiangDayCL: null,
            isThamGiaQuanLyCL: null,
            isQuanLyCSVC: null,
            isQuanLySach: null,
            idTrangThaiDuLieu: TrangThaiDuLieuEnum.SU_DUNG_CHINH,
            isDongBo: null,
        };
    }
   
    onExportExcel(type: ExportEnum) {
        switch (type) {
            case this.exportEnum.ExportExcel:
                this.fileService.exportFile(UrlConstant.API.HRM_NHAN_SU + '/ExportExcel', this.exportQueryOptions, 'DanhSachNhanSu');
                
                break;
            case this.exportEnum.ExportNhanSuSSO:
                this.fileService.exportFile(
                    UrlConstant.API.HRM_NHAN_SU + '/ExportNhanSuSSO',
                    this.exportQueryOptions,
                    'DanhSachNhanSuDuocCapSSO'
                );
                break;
        }
    }
}
