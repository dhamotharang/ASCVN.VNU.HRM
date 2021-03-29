import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GroupDescriptor, State, process } from '@progress/kendo-data-query';
import { PageConfig, ReziseTable } from '@core/constants/app.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { MenuQuery } from '@management-state/menu/menu.query';
import { GridDataResult, PagerSettings } from '@progress/kendo-angular-grid';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { DropDownListEnum } from '@shared/containers/asc-select';
import { SecurityUtil } from '@core/utils/security';
import { Router } from '@angular/router';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';
import { CustomTranslateService, FileService } from '@core/services/common';
import {
    DuLieuNhanSuEnum,
    HinhThucTraLuongEnum,
    HinhThuTraLuongDescription,
    IDataSearch,
} from '@themes/views/management/human-resource/_models';
import { IKeHoachTuyenDung, TrangThaiDanhGiaTapSuEnum, TrangThaiKeHoachEnum } from '../../_models';
import { BaseCheckPermission } from '@core/auth/base-check-permission';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { ViewFileComponent } from '@shared/controls/view-file';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { ActionEnum } from '@core/constants/enum.constant';
import { FormDanhGiaBaoCaoTapSuComponent } from '../../components/form-danh-gia-bao-cao-tap-su/form-danh-gia-bao-cao-tap-su.component';
import { IDanhGiaBaoCaoTapSu } from '../../_models/danh-gia-tap-su.model';
import { IDanhGiaBaoCao } from '../../_models/danh-gia-bao-cao.model';

@Component({
    selector: 'app-danh-gia-bao-cao-tap-su',
    templateUrl: './danh-gia-bao-cao-tap-su.component.html',
    styleUrls: ['./danh-gia-bao-cao-tap-su.component.scss'],
})
export class DanhGiaBaoCaoTapSuComponent extends BaseCheckPermission implements OnInit, OnDestroy {
    @ViewChild(TooltipDirective) public tooltipDir: TooltipDirective;
    gridViewTTTS: GridDataResult[] = [];
    gridViewBaoCao$: Observable<GridDataResult>;
    pageConfig: PagerSettings | boolean = false;
    pageConfigBC: PagerSettings | boolean = false;
    opened = false;
    isLoadingTTTS = false;
    isLoadingBaoCao = false;
    tabName: string;
    dropdownListEnum = DropDownListEnum;
    hinhThucTraLuongEnum = HinhThucTraLuongEnum;
    trangThaiDanhGiaTapSuEnum = TrangThaiDanhGiaTapSuEnum;
    hinhThuTraLuongDescription = HinhThuTraLuongDescription;
    lstDanhMucKeHoach: IKeHoachTuyenDung[] = [];
    selectionIds: number[] = [];
    modelDanhGiaBaoCao: IDanhGiaBaoCao;
    pageHeight = window.innerHeight - ReziseTable - 130;
    trangThaiHopDongEnum = TrangThaiDanhGiaTapSuEnum;
    PhanCongHuongDanTapSu: any;
    @HostListener('window:resize', ['$event'])
    modelSearchBaoCao = {
        keyword: '',
        trangThai: null,
        tuNgay: null,
        denNgay: null,
        idQuyetDinhPhanCong: null,
    };
    gridStateTTTS: State = {
        sort: [
            {
                field: 'id',
                dir: 'desc',
            },
        ],
        skip: 0,
        take: 20,
    };
    gridStateBaoCao: State = {
        sort: [
            {
                field: 'id',
                dir: 'desc',
            },
        ],
        skip: 0,
        take: 20,
    };
    private destroyed$ = new Subject();
    constructor(
        private apiService: ApiService,
        private windowService: WindowService,
        protected menuQuery: MenuQuery,
        private router: Router,
        private translate: CustomTranslateService,
        private fileService: FileService
    ) {
        super(menuQuery);
    }

    ngOnInit() {
        this.tabName = this.menuQuery.getTitleWithCurrentUrl();
        this.loadKeHoachItems();
        this.loadViTriDeXuat();
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    resetHandler() {
        this.modelSearchBaoCao = {
            trangThai: null,
            keyword: '',
            tuNgay: null,
            denNgay: null,
            idQuyetDinhPhanCong: null,
        };
    }

    onSearchBaoCaoHandler() {
        this.gridStateBaoCao.skip = 0;
        this.loadBaoCaoItems(this.modelDanhGiaBaoCao.id);
    }

    disabledNgayKetThucBC = (current: Date): boolean => {
        if (!this.modelSearchBaoCao.tuNgay) {
            return;
        }
        // Can not select days before today and today
        return differenceInCalendarDays(current, new Date(this.modelSearchBaoCao.tuNgay)) < 0;
    };

    disabledNgayBatDauBC = (current: Date): boolean => {
        if (!this.modelSearchBaoCao.denNgay) {
            return;
        }
        // Can not select days before today and today
        return differenceInCalendarDays(current, new Date(this.modelSearchBaoCao.denNgay)) > 0;
    };

    showLinkDuyetBaoCaoNhanSu(nhanSuId: number) {
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

    selectRow({ isEdited, dataItem, rowIndex }) {
        if (dataItem) {
            this.modelDanhGiaBaoCao = dataItem;
            this.loadBaoCaoItems(dataItem.id);
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
        this.gridStateBaoCao = state;
        this.loadBaoCaoItems(this.modelDanhGiaBaoCao.id);
    }

    protected loadViTriDeXuat() {
        this.isLoadingTTTS = true;
        this.apiService
            .read(UrlConstant.API.TD_QUA_TRINH_TAP_SU + '/DanhGiaBaoCaoTapSu', this.queryOptionsTTTS)
            .pipe(
                map(res => {
                    if (res.result) {
                        return {
                            data: res.result.items,
                            total: res.result.length,
                        };
                    } else {
                        return {
                            data: [],
                            total: 0,
                        };
                    }
                }),
                tap(res => {
                    if (res.total <= this.gridStateTTTS.take) {
                        this.pageConfig = false;
                    } else {
                        this.pageConfig = PageConfig;
                    }
                }),
                finalize(() => {
                    this.isLoadingTTTS = false;
                })
            )
            .subscribe(response => {
                this.gridViewTTTS = response.data;
            });
    }

    private get queryOptionsTTTS() {
        return {
            pageSize: this.gridStateTTTS.take,
            pageNumber: this.gridStateTTTS.skip / this.gridStateTTTS.take + 1,
            sortName: this.gridStateTTTS.sort[0].field,
            sortASC: this.gridStateTTTS.sort[0].dir === 'asc',
            keyword: this.modelSearchBaoCao.keyword,
            idQuyetDinhPhanCong: this.modelSearchBaoCao.idQuyetDinhPhanCong,
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

    private loadBaoCaoItems(id: number) {
        this.isLoadingBaoCao = true;
        this.gridViewBaoCao$ = this.apiService.read(UrlConstant.API.TD_QUA_TRINH_TAP_SU + '/DanhGiaBaoCaoTapSuChiTiet', {
            pageSize: this.gridStateTTTS.take,
            pageNumber: this.gridStateTTTS.skip / this.gridStateTTTS.take + 1,
            sortName: this.gridStateTTTS.sort[0].field,
            sortASC: this.gridStateTTTS.sort[0].dir === 'asc',
            keyword: this.modelSearchBaoCao.keyword,
            idQuyetDinhPhanCong: id,
            trangThai: this.modelSearchBaoCao.trangThai,
            tuNgay: this.modelSearchBaoCao.tuNgay,
            denNgay: this.modelSearchBaoCao.denNgay
        }).pipe(
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
                if (res.total <= this.gridStateBaoCao.take) {
                    this.pageConfig = false;
                } else {
                    this.pageConfig = PageConfig;
                }
            }),
            finalize(() => {
                this.isLoadingBaoCao = false;
            })
        );
    }

    onResize(event) {
        this.pageHeight = event.target.innerHeight - ReziseTable - 130;
    }

    showModalViewFile(guidId, name) {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: 'Xem tập tin Đính kèm',
            content: ViewFileComponent,
            width: 1200,
            height: 800,
            top: 10,
            autoFocusedElement: 'body',
            state: 'maximized',
        });

        const param = windowRef.content.instance;
        param.key = guidId;
        param.fileName = name;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
            }
        });
    }

    openBaoCaoTapSu(dataItem: IDanhGiaBaoCaoTapSu) {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('RECRUITMENT.TAP_SU.DANH_GIA_TAP_SU'),
            content: FormDanhGiaBaoCaoTapSuComponent,
            width: 1000,
            top: 10,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.action = ActionEnum.CREATE;
        param.data = dataItem;
        param.dataDanhGia = this.modelDanhGiaBaoCao;
        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.loadBaoCaoItems(this.modelDanhGiaBaoCao.id);
            }
        });
    }

    viewBaoCaoTapSu(dataItem: IDanhGiaBaoCaoTapSu) {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('RECRUITMENT.TAP_SU.DANH_GIA_TAP_SU'),
            content: FormDanhGiaBaoCaoTapSuComponent,
            width: 1000,
            top: 10,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.action = ActionEnum.VIEW;
        param.data = dataItem;
        param.dataDanhGia = this.modelDanhGiaBaoCao;
        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.loadBaoCaoItems(this.modelDanhGiaBaoCao.id);
            }
        });
    }
    onExportExcel(idPhanCongBCTS: number) {
        this.fileService.exportFile(UrlConstant.API.TD_QUYET_DINH_REPORTS + '/BaoCaoHetTapSu',
            {
                idPhanCongBaoCaoTapSu: idPhanCongBCTS
            },
            'ThongKeTapSu'
        );
    }
}
