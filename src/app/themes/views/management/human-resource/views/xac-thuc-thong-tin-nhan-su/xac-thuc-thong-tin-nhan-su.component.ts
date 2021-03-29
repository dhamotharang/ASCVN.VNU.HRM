import {Component, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {State} from '@progress/kendo-data-query';
import {PageConfig, ReziseTable} from '@core/constants/app.constant';
import {UrlConstant} from '@core/constants/url.constant';
import {ApiService} from '@core/data-services/api.service';
import {MenuQuery} from '@management-state/menu/menu.query';
import {GridDataResult, PagerSettings, SelectionEvent} from '@progress/kendo-angular-grid';
import {finalize, map, tap} from 'rxjs/operators';
import {WindowCloseResult, WindowService} from '@progress/kendo-angular-dialog';
import {Observable, Subject} from 'rxjs';
import {DropDownListEnum} from '@shared/containers/asc-select';
import {SecurityUtil} from '@core/utils/security';
import {ActivatedRoute, Router} from '@angular/router';
import {TooltipDirective} from '@progress/kendo-angular-tooltip';
import {CustomTranslateService} from '@core/services/common';
import {DuLieuNhanSuEnum, IDataSearch, KEY_STORE_HRM, TrangThaiDuLieuEnum} from '@themes/views/management/human-resource/_models';
import {IDuyetThongTinNhanSuModel} from '@themes/views/management/human-resource/_models/duyet-thong-tin-nhan-su.model';
import {XemDanhMucThayDoiThongTinComponent} from '@themes/views/management/recruitment/components';
import {DateUtil} from '@core/utils/date';
import {BaseCheckPermission, ListRoleOption} from '@core/auth';
import { DuyetThongTinNhanSuComponent } from '../../components';

@Component({
    selector: 'app-xac-thuc-thong-tin-nhan-su',
    templateUrl: './xac-thuc-thong-tin-nhan-su.component.html',
    styleUrls: ['./xac-thuc-thong-tin-nhan-su.component.scss']
})
export class XacThucThongTinNhanSuComponent extends BaseCheckPermission implements OnInit, OnDestroy {
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
        // idKeHoach: null,
        trangThaiDuyet: 1,
        idGioiTinh: null,
        ngaySinh: null,
    };
    hrmkeyStore = KEY_STORE_HRM;
    private destroyed$ = new Subject();

    pageHeight = window.innerHeight - ReziseTable + 32;

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.pageHeight = event.target.innerHeight - ReziseTable + 32;
    }

    isDeXuatDuyet = false;
    constructor(
        private apiService: ApiService,
        private windowService: WindowService,
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
                this.modelFilter.trangThaiDuyet = queryOption.trangThaiDuyet ? parseInt(queryOption.trangThaiDuyet, 10) : null;
                this.modelFilter.idGioiTinh = queryOption.idGioiTinh ? parseInt(queryOption.idGioiTinh, 10) : null;
                this.modelFilter.ngaySinh = queryOption.ngaySinh;
                this.gridState.skip = (queryOption.pageNumber - 1) * queryOption.pageSize;
                this.gridState.take = queryOption.pageSize;
                this.gridState.sort[0].field = queryOption.sortName;
                this.gridState.sort[0].dir = queryOption.sortASC ? 'asc' : 'desc';
                if (queryOption.idsCoQuan) {
                    this.modelFilter.coQuanId = [];
                    const listCoQuanId = queryOption.idsCoQuan.split(',')
                    listCoQuanId.map(x => {
                        this.modelFilter.coQuanId.push(x);
                    });
                } else {
                    this.modelFilter.coQuanId = [];
                }
                localStorage.removeItem(this.hrmkeyStore.XAC_THUC_NHAN_SU)
            }
            this.loadItems();
        });

        this.isDeXuatDuyet = this.isHasPermission(ListRoleOption.HRM_0003);
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    onStateChange(state: State) {
        this.gridState = state;
        this.loadItems();
    }

    onSearchHandler() {
        this.gridState.skip = 0;
        this.selectionIds = [];
        this.selectionHoSos = [];
        this.loadItems();
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
            // idKeHoach: null,
            trangThaiDuyet: 1,
            idGioiTinh: null,
            ngaySinh: null,
        };
    }

    onExportExcel() { }

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
        localStorage.setItem(this.hrmkeyStore.XAC_THUC_NHAN_SU, JSON.stringify(this.queryOptions));
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('LB.CONFIRM'),
            content: XemDanhMucThayDoiThongTinComponent,
            width: 900,
            top: 10,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.isTuyenDung = false;
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
        localStorage.setItem(this.hrmkeyStore.XAC_THUC_NHAN_SU, JSON.stringify(this.queryOptions));
        const data = {
            idNhanSu: nhanSuId,
            manHinh: DuLieuNhanSuEnum.DE_XUAT,
        } as IDataSearch;
        this.router.navigate([UrlConstant.ROUTE.HRM_DUYET_LY_LICH_NHAN_SU], {
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
        this.gridView$ = this.apiService.read(UrlConstant.API.HRM_NS_DUYET_HO_SO_TRUNG_TUYEN + '/DuyetThongTinDeXuat', this.queryOptions).pipe(
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
            // idKeHoachTuyenDung: this.modelFilter.idKeHoach,
            trangThaiDuyet: this.modelFilter.trangThaiDuyet,
        };
    }
}
