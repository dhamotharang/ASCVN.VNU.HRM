import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { State } from '@progress/kendo-data-query';
import { PageConfig, ReziseTable } from '@core/constants/app.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { MenuQuery } from '@management-state/menu/menu.query';
import { GridDataResult, PagerSettings, SelectionEvent } from '@progress/kendo-angular-grid';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { NotificationService } from '@core/services/common/notification.service';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { ActionEnum } from '@core/constants/enum.constant';
import { Observable, Subject } from 'rxjs';
import { DropDownListEnum } from '@shared/containers/asc-select';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { SecurityUtil } from '@core/utils/security';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';
import { CustomTranslateService } from '@core/services/common';
import { DuyetThongTinNhanSuComponent } from '@themes/views/management/human-resource/components/duyet-thong-tin-nhan-su/duyet-thong-tin-nhan-su.component';
import { FormTaoQuyetDinhComponent, XemDanhMucThayDoiThongTinComponent } from '../../components';
import { DuLieuNhanSuEnum, IDataSearch, KEY_STORE_HRM, TrangThaiDuLieuEnum } from '@themes/views/management/human-resource/_models';
import { IDuyetThongTinNhanSuModel } from '@themes/views/management/human-resource/_models/duyet-thong-tin-nhan-su.model';
import { DateUtil } from '@core/utils/date';
import { BaseCheckPermission } from '@core/auth/base-check-permission';
import { ListRoleOption } from '@core/auth/user-role-option';

@Component({
    selector: 'app-duyet-ho-so-ung-vien',
    templateUrl: './duyet-ho-so-ung-vien.component.html',
    styleUrls: ['./duyet-ho-so-ung-vien.component.scss'],
})
export class DuyetHoSoUngVienComponent extends BaseCheckPermission implements OnInit, OnDestroy {
    @ViewChild(TooltipDirective) public tooltipDir: TooltipDirective;
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
    pageConfig: PagerSettings | boolean = false;
    selectionIds: number[] = [];
    selectionHoSos = [];
    opened = false;
    isLoading = false;
    searchAdvance = false;
    openFirstTime = false;
    tabName: string;
    dropdownListEnum = DropDownListEnum;
    hrmkeyStore = KEY_STORE_HRM;
    modelFilter = {
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
        ngayBatDau: null,
        ngayKetThuc: null,
        idKeHoach: null,
        trangThaiDuyet: null,
        idGioiTinh: null,
        ngaySinh: null,
    };

    private destroyed$ = new Subject();

    pageHeight = window.innerHeight - ReziseTable + 32;

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.pageHeight = event.target.innerHeight - ReziseTable + 32;
    }
    isDeXuatDuyet = false;
    constructor(
        private apiService: ApiService,
        private notification: NotificationService,
        private windowService: WindowService,
        private modal: NzModalService,
        protected menuQuery: MenuQuery,
        private router: Router,
        private route: ActivatedRoute,
        private translate: CustomTranslateService
    ) {
        super(menuQuery);
    }

    ngOnInit() {
        super.ngOnInit();
        this.tabName = this.menuQuery.getTitleWithCurrentUrl();
        this.route.queryParams.subscribe(params => {
            if (params.query) {
                const queryOption = JSON.parse(SecurityUtil.get(decodeURIComponent(params.query)));
                this.modelFilter.keyword = queryOption.keyword;
                this.modelFilter.maNhanSu = queryOption.maNhanSu;
                this.modelFilter.hoTen = queryOption.hoTen;
                this.modelFilter.soDienThoai = queryOption.soDienThoai;
                this.modelFilter.loaiNhanSuId = queryOption.idsLoaiNhanSu ? parseInt(queryOption.idsLoaiNhanSu, 10) : null;
                this.modelFilter.loaiHopDongId = queryOption.idsLoaiHopDong ? parseInt(queryOption.idsLoaiHopDong, 10) : null;
                this.modelFilter.trangThaiNhanSuId = queryOption.idsTrangThaiNhanSu ? parseInt(queryOption.idsTrangThaiNhanSu, 10) : null;
                this.modelFilter.chucVuId = queryOption.idsChucVu ? parseInt(queryOption.idsChucVu, 10) : null;
                this.modelFilter.chucDanhId = queryOption.idsChucDanh ? parseInt(queryOption.idsChucDanh, 10) : null;
                this.modelFilter.ngachId = queryOption.idsNgach ? parseInt(queryOption.idsNgach, 10) : null;
                this.modelFilter.quocTichId = queryOption.idsQuocTich ? parseInt(queryOption.idsQuocTich, 10) : null;
                this.modelFilter.danTocId = queryOption.idsDanToc ? parseInt(queryOption.idsDanToc, 10) : null;
                this.modelFilter.tonGiaoId = queryOption.idsTonGiao ? parseInt(queryOption.idsTonGiao, 10) : null;
                this.modelFilter.ngayBatDau = queryOption.tuNgay;
                this.modelFilter.ngayKetThuc = queryOption.denNgay;
                this.modelFilter.idKeHoach = queryOption.idKeHoachTuyenDung ? parseInt(queryOption.idKeHoachTuyenDung, 10) : null;
                this.modelFilter.trangThaiDuyet = queryOption.trangThaiDuyet ? parseInt(queryOption.trangThaiDuyet, 10) : null;
                this.modelFilter.idGioiTinh = queryOption.idGioiTinh ? parseInt(queryOption.idGioiTinh, 10) : null;
                this.modelFilter.ngaySinh = queryOption.ngaySinh;
                this.gridState.skip = (queryOption.pageNumber - 1) * queryOption.pageSize;
                this.gridState.take = queryOption.pageSize;
                this.gridState.sort[0].field = queryOption.sortName;
                this.gridState.sort[0].dir = queryOption.sortASC ? 'asc' : 'desc';
                if (queryOption.idsCoQuan) {
                    this.modelFilter.coQuanId = [];
                    const listCoQuanId = queryOption.idsCoQuan.split(',');
                    listCoQuanId.map(x => {
                        this.modelFilter.coQuanId.push(x);
                    });
                } else {
                    this.modelFilter.coQuanId = [];
                }
                localStorage.removeItem(this.hrmkeyStore.DUYET_HO_SO);
                this.loadItems();
            }
        });
        this.isDeXuatDuyet = this.isHasPermission(ListRoleOption.HRM_0004);
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    disabledNgayKetThuc = (current: Date): boolean => {
        if (!this.modelFilter.ngayBatDau) {
            return;
        }
        // Can not select days before today and today
        return differenceInCalendarDays(current, new Date(this.modelFilter.ngayBatDau)) < 0;
    };

    disabledNgayBatDau = (current: Date): boolean => {
        if (!this.modelFilter.ngayKetThuc) {
            return;
        }
        // Can not select days before today and today
        return differenceInCalendarDays(current, new Date(this.modelFilter.ngayKetThuc)) > 0;
    };

    onStateChange(state: State) {
        this.gridState = state;
        this.loadItems();
    }

    onSearchHandler() {
        if (this.modelFilter.idKeHoach && this.modelFilter.idKeHoach > 0) {
            this.gridState.skip = 0;
            this.selectionIds = [];
            this.selectionHoSos = [];
            this.loadItems();
        } else {
            this.notification.showWarningMessage(this.translate.get('RECRUITMENT.MES.09'));
        }
    }

    resetHandler() {
        this.modelFilter = {
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
            ngayBatDau: null,
            ngayKetThuc: null,
            idKeHoach: null,
            trangThaiDuyet: null,
            idGioiTinh: null,
            ngaySinh: null,
        };
    }

    onExportExcel() {}

    // onQuyetDinhTuyenDung() {
    //     this.opened = true;
    //     const windowRef = this.windowService.open({
    //         title: this.translate.get('RECRUITMENT.TEXT.22'),
    //         content: FormTaoQuyetDinhComponent,
    //         width: 1000,
    //         top: 10,
    //         autoFocusedElement: 'body',
    //     });

    //     const param = windowRef.content.instance;
    //     param.model = this.selectionHoSos;
    //     param.action = ActionEnum.CREATE;

    //     windowRef.result.subscribe(result => {
    //         if (result instanceof WindowCloseResult) {
    //             this.selectionIds = [];
    //             this.selectionHoSos = [];
    //             this.opened = false;
    //         }
    //     });
    // }

    // taoHopDong(dataItem) {
    //     this.opened = true;
    //     const windowRef = this.windowService.open({
    //         title: this.translate.get('RECRUITMENT.HD.TITLE'),
    //         content: FormTaoHopDongComponent,
    //         width: 1000,
    //         top: 10,
    //         autoFocusedElement: 'body',
    //     });

    //     const param = windowRef.content.instance;
    //     param.action = ActionEnum.CREATE;
    //     param.idNhanSu = dataItem.id;

    //     windowRef.result.subscribe(result => {
    //         if (result instanceof WindowCloseResult) {
    //             this.opened = false;
    //             this.loadItems();
    //         }
    //     });
    // }

    selectRow(e: SelectionEvent) {
        // kt list bo chon
        if (e.deselectedRows.length > 0) {
            const listBoChon = e.deselectedRows;
            listBoChon.map(x => {
                const index = this.selectionHoSos.findIndex(y => x.dataItem.id === y.id);
                if (index > -1) {
                    this.selectionHoSos.splice(index, 1);
                }
            });
        }
        // kt list chon
        if (e.selectedRows.length > 0) {
            const listChon = e.selectedRows;
            listChon.map(x => {
                this.selectionHoSos.push(x.dataItem);
            });
        }
    }

    viewChange(nhanSuId: number) {
        localStorage.setItem(this.hrmkeyStore.DUYET_HO_SO, JSON.stringify(this.queryOptions));
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('LB.CONFIRM'),
            content: XemDanhMucThayDoiThongTinComponent,
            width: 900,
            top: 10,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.isTuyenDung = true;
        param.nhanSuId = nhanSuId;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.loadItems();
            }
        });
    }

    onApprove(dataItem, flag: boolean) {
        const body: IDuyetThongTinNhanSuModel = {
            duyetToanBo: true,
            idNhanSu: dataItem.id,
            idTrangThaiDuLieu: flag ? TrangThaiDuLieuEnum.SU_DUNG_CHINH : TrangThaiDuLieuEnum.KHONG_DUYET,
        };

        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('LB.CONFIRM'),
            content: DuyetThongTinNhanSuComponent,
            width: 600,
            top: 10,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.body = body;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.loadItems();
            }
        });
    }

    showLinkDuyetHoSoNhanSu(nhanSuId: number) {
        localStorage.setItem(this.hrmkeyStore.DUYET_HO_SO, JSON.stringify(this.queryOptions));
        const data = {
            idNhanSu: nhanSuId,
            manHinh: DuLieuNhanSuEnum.DE_XUAT,
        } as IDataSearch;
        this.router.navigate([UrlConstant.ROUTE.HRM_DUYET_HO_SO_NHAN_SU], {
            queryParams: {
                k: encodeURIComponent(SecurityUtil.set(JSON.stringify(data))),
            },
        });
    }

    showTooltip(e: MouseEvent): void {
        const element = e.target as HTMLElement;
        if ((element.nodeName === 'TD' || element.nodeName === 'TH') && element.offsetWidth < element.scrollWidth) {
            this.tooltipDir.toggle(element);
        } else {
            this.tooltipDir.hide();
        }
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
        this.gridView$ = this.apiService
            .read(UrlConstant.API.HRM_NS_DUYET_HO_SO_TRUNG_TUYEN + '/DuyetThongTinDeXuatTaoHopDong', this.queryOptions)
            .pipe(
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
                    this.isLoading = false;
                })
            );
    }

    private get queryOptions() {
        return {
            pageSize: this.gridState.take,
            pageNumber: this.gridState.skip / this.gridState.take + 1,
            sortName: this.gridState.sort[0].field,
            sortASC: this.gridState.sort[0].dir === 'asc',
            keyword: this.modelFilter.keyword,
            idsCoQuan: this.modelFilter.coQuanId.join(','),
            maNhanSu: this.modelFilter.maNhanSu,
            hoTen: this.modelFilter.hoTen,
            soDienThoai: this.modelFilter.soDienThoai ? this.modelFilter.soDienThoai.toString() : null,
            idsLoaiHopDong: this.modelFilter.loaiHopDongId ? this.modelFilter.loaiHopDongId.toString() : null,
            idsTrangThaiNhanSu: this.modelFilter.trangThaiNhanSuId ? this.modelFilter.trangThaiNhanSuId.toString() : null,
            idsChucVu: this.modelFilter.chucVuId ? this.modelFilter.chucVuId.toString() : null,
            idsChucDanh: this.modelFilter.chucDanhId ? this.modelFilter.chucDanhId.toString() : null,
            idsQuocTich: this.modelFilter.quocTichId ? this.modelFilter.quocTichId.toString() : null,
            idsNgach: this.modelFilter.ngachId ? this.modelFilter.ngachId.toString() : null,
            idsTonGiao: this.modelFilter.tonGiaoId ? this.modelFilter.tonGiaoId.toString() : null,
            idsDanToc: this.modelFilter.danTocId ? this.modelFilter.danTocId.toString() : null,
            idsLoaiNhanSu: this.modelFilter.loaiNhanSuId ? this.modelFilter.loaiNhanSuId.toString() : null,
            idGioiTinh: this.modelFilter.idGioiTinh ? this.modelFilter.idGioiTinh : null,
            ngaySinh: this.modelFilter.ngaySinh ? DateUtil.getFullDate(this.modelFilter.ngaySinh) : null,
            idKeHoachTuyenDung: this.modelFilter.idKeHoach,
            tuNgay: this.modelFilter.ngayBatDau,
            denNgay: this.modelFilter.ngayKetThuc,
            trangThaiDuyet: this.modelFilter.trangThaiDuyet,
        };
    }
}
