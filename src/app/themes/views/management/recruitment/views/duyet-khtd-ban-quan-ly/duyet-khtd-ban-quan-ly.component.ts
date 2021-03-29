import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PageConfig } from '@core/constants/app.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { MenuQuery } from '@management-state/menu/menu.query';
import { GridComponent, GridDataResult } from '@progress/kendo-angular-grid';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { IKeHoachTuyenDung } from '@themes/views/management/recruitment/_models/ke-hoach-tuyen-dung.model';
import { NotificationService } from '@core/services/common/notification.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TrangThaiKeHoachEnum } from '@themes/views/management/recruitment/_models/recruitment.enum';
import { BaseRecruitmentComponent } from '../../_base/base-recruitment.component';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { DuyetKeHoachComponent, LichSuKeHoachComponent } from '../../components';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { GroupDescriptor, process } from '@progress/kendo-data-query';
@Component({
    selector: 'app-duyet-khtd-ban-quan-ly',
    templateUrl: './duyet-khtd-ban-quan-ly.component.html',
    styleUrls: ['./duyet-khtd-ban-quan-ly.component.scss'],
})
export class DuyetKhtdBanQuanLyComponent extends BaseRecruitmentComponent<any> implements OnInit, OnDestroy {
    @ViewChild(GridComponent) private grid: GridComponent;
    groups: GroupDescriptor[] = [{ field: 'maTenKeHoach', dir: null }, { field: 'ghiChu', dir: null}];

    searchAdvance = false;
    openFirstTime = false;
    gridView: GridDataResult;
    trangThaiKeHoachEnum = TrangThaiKeHoachEnum;
    modelSearch = {
        keyword: '',
        nam: new Date().getFullYear(),
        idCoQuan: null,
        idKeHoach: null,
        trangThai: null,
        tuNgay: null,
        denNgay: null,
    };
    lstDanhMucKeHoach: IKeHoachTuyenDung[] = [];
    lstTieuChuan = [];

    constructor(
        private apiService: ApiService,
        private notification: NotificationService,
        private translate: CustomTranslateService,
        private modalService: NzModalService,
        private windowService: WindowService,
        protected menuQuery: MenuQuery
    ) {
        super(menuQuery);
    }

    ngOnInit() {
        super.ngOnInit();
        this.loadTieuChuanTuyenDung();
        this.loadKeHoachItems();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    searchHandler() {
        this.selectionIds = [];
        if (this.modelSearch.nam) {
            this.gridState.skip = 0;
            this.loadItems();
        } else {
            this.notification.showErrorMessage(this.translate.get('RECRUITMENT.MES.01'));
        }
    }
    disabledNgayKetThuc = (current: Date): boolean => {
        if (!this.modelSearch.tuNgay) {
            return;
        }
        // Can not select days before today and today
        return differenceInCalendarDays(current, new Date(this.modelSearch.tuNgay)) < 0;
    };

    disabledNgayBatDau = (current: Date): boolean => {
        if (!this.modelSearch.denNgay) {
            return;
        }
        // Can not select days before today and today
        return differenceInCalendarDays(current, new Date(this.modelSearch.denNgay)) > 0;
    };

    refreshHandler() {
        this.modelSearch = {
            keyword: '',
            nam: new Date().getFullYear(),
            idCoQuan: null,
            idKeHoach: null,
            trangThai: null,
            tuNgay: null,
            denNgay: null,
        };
    }

    changeFilter() {
        this.loadKeHoachItems();
    }

    onExportExcel() {}

    onDuyet(flag: TrangThaiKeHoachEnum) {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('LB.CONFIRM'),
            content: DuyetKeHoachComponent,
            width: 600,
            top: 10,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.ids = this.selectionIds;
        param.trangThaiKeHoachEnum = flag;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.selectionIds = [];
                this.loadItems();
                this.gridView.data.forEach((_, idx) => {
                    this.grid.collapseRow(idx);
                });
            }
        });
    }

    onExpand(event) {
        const item = event.dataItem as IKeHoachTuyenDung;

        // load list tieu chuan
        if (item.keHoachTuyenDungTieuChuans && item.keHoachTuyenDungTieuChuans.length > 0) {
            const listItemTieuChuan = item.keHoachTuyenDungTieuChuans.map(x => {
                const itemTieuChuan = this.lstTieuChuan.find(m => m.id === x.idTieuChuanTuyenDung);
                if (itemTieuChuan) {
                    return {
                        id: x.id,
                        idTieuChuanTuyenDung: x.idTieuChuanTuyenDung,
                        tenYeuCau: itemTieuChuan.ten,
                        yeuCau: x.yeuCau,
                        ghiChu: x.ghiChu,
                    };
                } else {
                    return {
                        id: x.id,
                        idTieuChuanTuyenDung: x.idTieuChuanTuyenDung,
                        tenYeuCau: '',
                        yeuCau: x.yeuCau,
                        ghiChu: x.ghiChu,
                    };
                }
            });
            item.keHoachTuyenDungTieuChuans = listItemTieuChuan;
        } else {
            this.apiService
                .read(UrlConstant.API.HRM_TD_KE_HOACH_TUYEN_DUNG + '/ById', {
                    id: item.id,
                })
                .subscribe(res => {
                    if (res.result) {
                        const keHoach = res.result as IKeHoachTuyenDung;
                        if (keHoach.keHoachTuyenDungTieuChuans.length > 0) {
                            const lstItemTieuChuan = keHoach.keHoachTuyenDungTieuChuans.map(x => {
                                const itemTieuChuan = this.lstTieuChuan.find(m => m.id === x.idTieuChuanTuyenDung);
                                if (itemTieuChuan) {
                                    return {
                                        id: x.id,
                                        idTieuChuanTuyenDung: x.idTieuChuanTuyenDung,
                                        tenYeuCau: itemTieuChuan.ten,
                                        yeuCau: x.yeuCau,
                                        ghiChu: x.ghiChu,
                                    };
                                } else {
                                    return {
                                        id: x.id,
                                        idTieuChuanTuyenDung: x.idTieuChuanTuyenDung,
                                        yeuCau: x.yeuCau,
                                        ghiChu: x.ghiChu,
                                    };
                                }
                            });
                            this.gridView[event.index].keHoachTuyenDungTieuChuans = lstItemTieuChuan;
                        } else {
                            const lstItemTieuChuan = this.lstTieuChuan.map(x => {
                                return {
                                    id: 0,
                                    idTieuChuanTuyenDung: x.id,
                                    tenYeuCau: x.ten,
                                    yeuCau: '',
                                    ghiChu: '',
                                };
                            });
                            this.gridView[event.index].keHoachTuyenDungTieuChuans = lstItemTieuChuan;
                        }
                    }
                });
        }

        this.gridView.data.forEach((_, idx) => {
            if (event.index !== idx) {
                this.grid.collapseRow(idx);
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

    private loadTieuChuanTuyenDung() {
        this.apiService
            .read(UrlConstant.API.HRM_DM_TIEU_CHUAN_TUYEN_DUNG, {
                pageSize: 0,
                pageNumber: 0,
            })
            .subscribe(res => {
                this.lstTieuChuan = res.result;
            });
    }

    private loadKeHoachItems() {
        this.apiService
            .read(UrlConstant.API.HRM_TD_KE_HOACH_TUYEN_DUNG + '/BanTCCB', {
                pageSize: 0,
                pageNumber: 0,
                nam: this.modelSearch.nam,
                idsCoQuan: this.modelSearch.idCoQuan,
            })
            .pipe(
                map(res => res.result),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                this.lstDanhMucKeHoach = res.items;
            });
    }

    protected loadItems() {
        this.loading = true;
        this.apiService
            .read(UrlConstant.API.HRM_TD_KE_HOACH_TUYEN_DUNG + '/BanTCCB', this.queryOptions)
            .pipe(
                map(res => {
                    if (res.result && res.result.items) {
                        const dataItem = res.result.items.map(x => {
                            return {
                                ...x,
                                maTenKeHoach: x.maKeHoach + ' - ' + x.tenKeHoach,
                            };
                        })
                        return {
                            data: dataItem,
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
                }),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                // this.gridView = res.data;
                this.gridView = process(res.data, {
                    group: this.groups,
                });
            });
    }

    private get queryOptions() {
        return {
            pageSize: this.gridState.take,
            pageNumber: this.gridState.skip / this.gridState.take + 1,
            sortName: this.gridState.sort[0].field,
            sortASC: this.gridState.sort[0].dir === 'asc',
            keyword: this.modelSearch.keyword,
            nam: this.modelSearch.nam,
            idsCoQuan: this.modelSearch.idCoQuan,
            // idKeHoach: this.modelSearch.idKeHoach,
            tuNgay: this.modelSearch.tuNgay,
            denNgay: this.modelSearch.denNgay,
            idTrangThaiDuyet: this.modelSearch.trangThai,
        };
    }

    selectRow({ isEdited, dataItem, rowIndex }) {
        // this.opened = true;
        // const windowRef = this.windowService.open({
        //     title: 'Xem chi tiết',
        //     content: XemChiTietKeHoachComponent,
        //     width: 1200,
        //     top: 10,
        //     autoFocusedElement: 'body',
        // });
        // const param = windowRef.content.instance;
        // // param.action = this.action;
        // param.model = dataItem;
        // param.lstTieuChuan = this.lstTieuChuan;
        // windowRef.result.subscribe(result => {
        //     if (result instanceof WindowCloseResult) {
        //         this.opened = false;
        //         this.loadItems();
        //     }
        // });
    }

    viewHistory(dataItem: IKeHoachTuyenDung) {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('RECRUITMENT.TEXT.18'),
            content: LichSuKeHoachComponent,
            width: 1200,
            top: 0,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.keHoach = dataItem;

        windowRef.result.subscribe(result => {
            this.opened = false;
        });
    }
}
