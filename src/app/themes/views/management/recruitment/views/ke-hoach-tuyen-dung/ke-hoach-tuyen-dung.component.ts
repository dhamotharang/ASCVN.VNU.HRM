import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActionEnum } from '@core/constants/enum.constant';
import { ModalDeleteConfig, PageConfig } from '@core/constants/app.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { MenuQuery } from '@management-state/menu/menu.query';
import { GridComponent, GridDataResult } from '@progress/kendo-angular-grid';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { NotificationService } from '@core/services/common/notification.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { IKeHoachTuyenDung } from '@themes/views/management/recruitment/_models/ke-hoach-tuyen-dung.model';
import { FormKeHoachTuyenDungComponent } from '../../components/form-ke-hoach-tuyen-dung/form-ke-hoach-tuyen-dung.component';
import { BaseRecruitmentComponent } from '../../_base/base-recruitment.component';
import { TrangThaiKeHoachEnum } from '@themes/views/management/recruitment/_models/recruitment.enum';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import { DuyetKeHoachComponent, LichSuKeHoachComponent } from '../../components';
import { FileService } from '@core/services/common';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { GroupDescriptor, process } from '@progress/kendo-data-query';

@Component({
    selector: 'app-ke-hoach-tuyen-dung',
    templateUrl: './ke-hoach-tuyen-dung.component.html',
    styleUrls: ['./ke-hoach-tuyen-dung.component.scss'],
})
export class KeHoachTuyenDungComponent extends BaseRecruitmentComponent<IKeHoachTuyenDung> implements OnInit, OnDestroy {
    @ViewChild(GridComponent) private grid: GridComponent;
    groups: GroupDescriptor[] = [{ field: 'maTenKeHoach', dir: null}, { field: 'ghiChu', dir: null}];

    searchAdvance = false;
    openFirstTime = false;
    gridView: GridDataResult;
    action: ActionEnum;
    lstTieuChuan = [];
    trangThaiKeHoachEnum = TrangThaiKeHoachEnum;
    modelSearch = {
        keyword: '',
        ngayBatDau: null,
        ngayKetThuc: null,
        nam: null,
        trangThai: null,
    };
    expandedDetailKeys: any[] = [];

    constructor(
        private apiService: ApiService,
        private windowService: WindowService,
        private notification: NotificationService,
        private translate: CustomTranslateService,
        private modalService: NzModalService,
        private fileService: FileService,
        protected menuQuery: MenuQuery
    ) {
        super(menuQuery);
    }

    ngOnInit() {
        super.ngOnInit();
        this.loadTieuChuanTuyenDung();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    searchHandler() {
        this.gridState.skip = 0;
        this.loadItems();
    }

    refreshHandler() {
        this.modelSearch = {
            keyword: '',
            ngayBatDau: null,
            ngayKetThuc: null,
            nam: null,
            trangThai: null,
        };
    }

    addHandler() {
        this.model = undefined;
        this.action = ActionEnum.CREATE;
        this.openForm();
    }

    editHandler(dataItem) {
        this.model = dataItem;
        this.action = ActionEnum.UPDATE;
        this.openForm();
    }

    openForm() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('RECRUITMENT.KE_HOACH.TITLE01'),
            content: FormKeHoachTuyenDungComponent,
            width: 1200,
            top: 0,
            autoFocusedElement: 'body',
            state: 'maximized',
        });

        const param = windowRef.content.instance;
        param.action = this.action;
        param.model = this.model;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.loadItems();

                this.gridView.data.forEach((_, idx) => {
                    this.grid.collapseRow(idx);
                });
            }
        });
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

    removeHandler(dataItem: IKeHoachTuyenDung) {
        this.selectionIds = [];
        this.selectionIds.push(dataItem.id);
        this.removeSelectedHandler();
    }

    removeSelectedHandler() {
        if (this.selectionIds.length > 0) {
            const body = {
                ids: this.selectionIds,
            };
            this.modalService.confirm({
                nzTitle: ModalDeleteConfig.title,
                nzContent: ModalDeleteConfig.content,
                nzOkText: ModalDeleteConfig.yes,
                nzOkType: 'danger',
                nzOnOk: () => {
                    this.apiService.delete(UrlConstant.API.HRM_TD_KE_HOACH_TUYEN_DUNG, body).subscribe(res => {
                        this.selectionIds = [];
                        this.notification.showSuccessMessage(this.translate.get('MES.DELETE_DONE'));
                        this.gridState.skip = 0;
                        this.loadItems();
                    });
                },
                nzCancelText: ModalDeleteConfig.no,
                nzOnCancel: () => {},
            });
        }
    }

    onPrintExcel() {}

    onExportExcel() {}

    onDuyets(flag: TrangThaiKeHoachEnum) {
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
            }
        });
    }

    onExpand(event) {
        const item = event.dataItem as IKeHoachTuyenDung;
        this.loadDetailItem(item, event.index);

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

    expandDetailsBy = (dataItem: any): any => {
        return dataItem.id;
    };

    goToChiTietViTriVieclLam(dataItem, index) {
        this.gridView.data.forEach((_, idx) => {
            if (index !== idx) {
                this.grid.collapseRow(idx);
            }else{
                this.grid.expandRow(idx);
            }
        });
        this.gridView.data[index].tabIndex = 1;
        this.loadDetailItem(dataItem, index);
    }

    downloadKeHoach(dataItem: IKeHoachTuyenDung){
        this.fileService.exportFile(
            UrlConstant.API.TD_REPORT + '/KeHoachTuyenDung',
            {idKeHoachTuyenDung: dataItem.id},
            'KeHoachTuyenDung'
        );
    }

    protected loadItems() {
        this.loading = true;
        this.apiService
            .read(UrlConstant.API.HRM_TD_KE_HOACH_TUYEN_DUNG + '/List', this.queryOptions)
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
                takeUntil(this.destroyed$),
                finalize(() => {
                    this.loading = false;
                }),
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
            tuNgay: this.modelSearch.ngayBatDau,
            denNgay: this.modelSearch.ngayKetThuc,
            idsCoQuan: '',
            nam: this.modelSearch.nam,
            idTrangThaiDuyet: this.modelSearch.trangThai,
        };
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

    private loadDetailItem(item: IKeHoachTuyenDung, index: number) {
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
                .pipe(takeUntil(this.destroyed$))
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
                            this.gridView.data[index].keHoachTuyenDungTieuChuans = lstItemTieuChuan;
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
                            this.gridView.data[index].keHoachTuyenDungTieuChuans = lstItemTieuChuan;
                        }
                    }
                });
        }
    }

    disabledNgayKetThuc = (current: Date): boolean => {
        if (!this.modelSearch.ngayBatDau) {
            return;
        }
        return differenceInCalendarDays(current, new Date(this.modelSearch.ngayBatDau)) < 0;
    }

    disabledNgayBatDau = (current: Date): boolean => {
        if (!this.modelSearch.ngayKetThuc) {
            return;
        }
        return differenceInCalendarDays(current, new Date(this.modelSearch.ngayKetThuc)) > 0;
    }
}
