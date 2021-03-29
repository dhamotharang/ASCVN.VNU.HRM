import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GroupDescriptor, State, process } from '@progress/kendo-data-query';
import { PageConfig, ReziseTable } from '@core/constants/app.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { MenuQuery } from '@management-state/menu/menu.query';
import { GridDataResult, PagerSettings } from '@progress/kendo-angular-grid';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { WindowService } from '@progress/kendo-angular-dialog';
import { ActionEnum } from '@core/constants/enum.constant';
import { Observable, Subject, of } from 'rxjs';
import { DropDownListEnum } from '@shared/containers/asc-select';
import { SecurityUtil } from '@core/utils/security';
import { Router } from '@angular/router';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';
import { CustomTranslateService } from '@core/services/common';
import {
    DuLieuNhanSuEnum,
    HinhThucTraLuongEnum,
    HinhThuTraLuongDescription,
    IDataSearch,
} from '@themes/views/management/human-resource/_models';
import { IKeHoachDeXuat, IKeHoachTuyenDung, INhanSuDeXuat, TrangThaiKeHoachEnum } from '../../_models';
import { BaseCheckPermission } from '@core/auth/base-check-permission';
import { FormCapNhatTaiKhoanComponent, FormNhapHoSoTuyenDungComponent } from '../../components';
import { NotificationService } from '@core/services/common/notification.service';
import { PopupViewProfileComponent } from '@themes/views/management/human-resource/views/popup-view-profile/popup-view-profile.component';

@Component({
    selector: 'app-nhap-ho-so-tuyen-dung',
    templateUrl: './nhap-ho-so-tuyen-dung.component.html',
    styleUrls: ['./nhap-ho-so-tuyen-dung.component.scss'],
})
export class NhapHoSoTuyenDungComponent extends BaseCheckPermission implements OnInit, OnDestroy {
    @ViewChild(TooltipDirective) public tooltipDir: TooltipDirective;
    groups: GroupDescriptor[] = [{ field: 'tenNhomViTriViecLam', dir: null }];
    gridViewVTVL: GridDataResult;
    gridViewHoSo$: Observable<GridDataResult>;
    gridStateVTVL: State = {
        sort: [
            {
                field: 'id',
                dir: 'desc',
            },
        ],
        skip: 0,
        take: 20,
    };
    gridStateHoSo: State = {
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
    opened = false;
    isLoadingVTVL = false;
    isLoadingHoSo = false;

    tabName: string;
    dropdownListEnum = DropDownListEnum;
    hinhThucTraLuongEnum = HinhThucTraLuongEnum;
    hinhThuTraLuongDescription = HinhThuTraLuongDescription;
    lstDanhMucKeHoach: IKeHoachTuyenDung[] = [];
    modelFilter = {
        keyword: '',
        nam: new Date().getFullYear(),
        idKeHoach: null,
    };
    modelSearchHoSo = {
        keyword: '',
        idCoQuan: null,
        trangThai: null,
    };
    selectionIds: number[] = [];
    modelViTriTuyenDung: IKeHoachDeXuat;
    private destroyed$ = new Subject();

    pageHeight = window.innerHeight - ReziseTable - 130;
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.pageHeight = event.target.innerHeight - ReziseTable - 130;
    }

    constructor(
        private apiService: ApiService,
        private windowService: WindowService,
        protected menuQuery: MenuQuery,
        private router: Router,
        private translate: CustomTranslateService,
        private notification: NotificationService
    ) {
        super(menuQuery);
    }

    ngOnInit() {
        this.tabName = this.menuQuery.getTitleWithCurrentUrl();
        this.loadKeHoachItems();
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    changeNam() {
        this.modelFilter.idKeHoach = null;
        this.loadKeHoachItems();
    }

    onSearchHandler() {
        if (this.modelFilter.idKeHoach > 0) {
            this.gridStateVTVL.skip = 0;
            this.loadViTriDeXuat();
            // refesh
            this.modelViTriTuyenDung = null;
            this.gridViewHoSo$ = of();
        } else {
            this.notification.showErrorMessage(this.translate.get('RECRUITMENT.MES.12'));
        }
    }

    resetHandler() {
        this.modelFilter = {
            keyword: '',
            nam: new Date().getFullYear(),
            idKeHoach: null,
        };
    }

    onSearchHoSoHandler() {
        this.gridStateHoSo.skip = 0;
        this.loadHoSoItems(this.modelViTriTuyenDung.idKeHoachTuyenDung, this.modelViTriTuyenDung.idViTriViecLam);
    }

    onExportExcel() {}

    nhapLyLich() {
        if (this.modelViTriTuyenDung) {
            const keHoachItem = this.lstDanhMucKeHoach.find(x => x.id === this.modelViTriTuyenDung.idKeHoachTuyenDung);
            this.opened = true;
            const windowRef = this.windowService.open({
                title: this.translate.get('RECRUITMENT.KE_HOACH.TITLE'),
                // content: KhaiBaoTaiKhoanNhanSuComponent,
                content: FormNhapHoSoTuyenDungComponent,
                width: 1150,
                top: 10,
                autoFocusedElement: 'body',
            });

            const param = windowRef.content.instance;
            param.action = ActionEnum.CREATE;
            param.model = undefined;
            param.modelViTriTuyenDung = this.modelViTriTuyenDung;
            param.idCoQuan = keHoachItem.idCoQuan;

            windowRef.result.subscribe(result => {
                this.opened = false;
                this.loadHoSoItems(this.modelViTriTuyenDung.idKeHoachTuyenDung, this.modelViTriTuyenDung.idViTriViecLam);
            });
        } else {
        }
    }

    suaLyLich(dataItem: INhanSuDeXuat) {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('RECRUITMENT.KE_HOACH.TITLE'),
            // content: KhaiBaoTaiKhoanNhanSuComponent,
            content: FormNhapHoSoTuyenDungComponent,
            width: 1150,
            top: 10,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.action = ActionEnum.UPDATE;
        param.modelNhanSuDeXuat = dataItem;

        windowRef.result.subscribe(result => {
            this.opened = false;
            this.loadHoSoItems(this.modelViTriTuyenDung.idKeHoachTuyenDung, this.modelViTriTuyenDung.idViTriViecLam);
        });
    }

    // showLinkDuyetHoSoNhanSu(nhanSuId: number) {
    //     const data = {
    //         idNhanSu: nhanSuId,
    //         manHinh: DuLieuNhanSuEnum.DE_XUAT,
    //     } as IDataSearch;
    //     this.router.navigate([UrlConstant.ROUTE.HRM_DUYET_HO_SO_NHAN_SU], {
    //         queryParams: {
    //             k: encodeURIComponent(SecurityUtil.set(JSON.stringify(data))),
    //         },
    //     });
    // }
    showLinkDuyetHoSoNhanSu(nhanSuId: number) {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: 'Xem hồ sơ',
            content: PopupViewProfileComponent,
            width: 1150,
            top: 10,
            autoFocusedElement: 'body',
            state: 'maximized'
        });

        const param = windowRef.content.instance;
        param.nhanSuId = nhanSuId;
        param.duLieuNhanSuEnum = DuLieuNhanSuEnum.DE_XUAT;

        windowRef.result.subscribe(result => {
            this.opened = false;
        });
    }

    selectRow({ isEdited, dataItem, rowIndex }) {
        if (dataItem) {
            this.modelViTriTuyenDung = dataItem;
            this.loadHoSoItems(dataItem.idKeHoachTuyenDung, dataItem.idViTriViecLam);
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
        this.gridStateHoSo = state;
        this.loadHoSoItems(this.modelViTriTuyenDung.idKeHoachTuyenDung, this.modelViTriTuyenDung.idViTriViecLam);
    }

    onChangeKeHoach(e) {
        this.onSearchHandler();
    }

    onCapNhatTaiKhoan(item: INhanSuDeXuat) {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('HR.MES.05'),
            content: FormCapNhatTaiKhoanComponent,
            width: 500,
            top: 10,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.model = item;

        windowRef.result.subscribe(result => {
            this.opened = false;
            this.loadHoSoItems(this.modelViTriTuyenDung.idKeHoachTuyenDung, this.modelViTriTuyenDung.idViTriViecLam);
        });
    }

    protected loadViTriDeXuat() {
        this.isLoadingVTVL = true;
        this.apiService
            .read(UrlConstant.API.HRM_TD_KE_HOACH_DE_XUAT + '/ListCreated', this.queryOptionsVTVL)
            .pipe(
                map(res => {
                    if (res.result) {
                        return {
                            data: res.result,
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
                    if (res.total <= this.gridStateVTVL.take) {
                        this.pageConfig = false;
                    } else {
                        this.pageConfig = PageConfig;
                    }
                }),
                finalize(() => {
                    this.isLoadingVTVL = false;
                })
            )
            .subscribe(res => {
                this.gridViewVTVL = process(res.data, {
                    group: this.groups,
                });
            });
    }

    private get queryOptionsVTVL() {
        return {
            pageSize: this.gridStateVTVL.take,
            pageNumber: this.gridStateVTVL.skip / this.gridStateVTVL.take + 1,
            sortName: this.gridStateVTVL.sort[0].field,
            sortASC: this.gridStateVTVL.sort[0].dir === 'asc',
            idKeHoachTuyenDung: this.modelFilter.idKeHoach,
        };
    }

    private loadKeHoachItems() {
        this.apiService
            .read(UrlConstant.API.HRM_TD_KE_HOACH_TUYEN_DUNG + '/DanhMuc', {
                pageSize: 0,
                pageNumber: 0,
                nam: this.modelFilter.nam,
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

    private loadHoSoItems(idKeHoach: number, idViTri: number) {
        this.isLoadingHoSo = true;
        this.gridViewHoSo$ = this.apiService
            .read(UrlConstant.API.HRM_NS_DUYET_HO_SO_TRUNG_TUYEN + '/DuyetThongTinDeXuatTaoHopDong', {
                pageSize: this.gridStateHoSo.take,
                pageNumber: this.gridStateHoSo.skip / this.gridStateHoSo.take + 1,
                sortName: this.gridStateHoSo.sort[0].field,
                sortASC: this.gridStateHoSo.sort[0].dir === 'asc',
                keyword: this.modelSearchHoSo.keyword,
                idKeHoachTuyenDung: idKeHoach,
                idViTriViecLam: idViTri,
            })
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
                    if (res.total <= this.gridStateHoSo.take) {
                        this.pageConfig = false;
                    } else {
                        this.pageConfig = PageConfig;
                    }
                }),
                finalize(() => {
                    this.isLoadingHoSo = false;
                })
            );
    }
}
