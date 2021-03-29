import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ModalDeleteConfig, PageConfig } from '@core/constants/app.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { MenuQuery } from '@management-state/menu/menu.query';
import { GridComponent } from '@progress/kendo-angular-grid';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { NotificationService } from '@core/services/common/notification.service';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { ActionEnum } from '@core/constants/enum.constant';
import { forkJoin } from 'rxjs';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { IHopDong, IListHopDong } from '@themes/views/management/recruitment/_models/hop-dong.model';
import { NzModalService } from 'ng-zorro-antd';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import { ChamDutHopDongComponent, DeXuatHopDongComponent } from '@themes/views/management/recruitment/components';
import { BaseRecruitmentComponent } from '@themes/views/management/recruitment/_base/base-recruitment.component';
import { FormTaoHopDongComponent } from '../../components/form-tao-hop-dong/form-tao-hop-dong.component';
import { TrangThaiHopDongEnum, TrangThaiKeHoachEnum, XacNhanHopDongEnum, XacNhanHopDongTuyenDungEnum } from '../../_models';
import { IKeHoachTuyenDung, IQuyetDinh } from '@themes/views/management/catalogs/_models/catalog.model';
import { FormHopDongTuyenDungComponent } from '../../components/form-hop-dong-tuyen-dung/form-hop-dong-tuyen-dung.component';

@Component({
    selector: 'app-quan-ly-hop-dong',
    templateUrl: './quan-ly-hop-dong.component.html',
    styleUrls: ['./quan-ly-hop-dong.component.scss'],
})
export class QuanLyHopDongComponent extends BaseRecruitmentComponent<IHopDong> implements OnInit, OnDestroy {
    @ViewChild(GridComponent) private grid: GridComponent;

    modelFilter = {
        keyword: '',
        ngayBatDau: null,
        ngayKetThuc: null,
        nam: new Date().getFullYear(),
        idKeHoachTuyenDung: null,
        idTrangThaiHopDong: null,
        idNhanSuLogin: null,
        idViTriViecLam: null,
        idLoaiNhanSu: null,
        idNgach: null,
        idTrinhDoChuyenMon: null,
        idLoaiHopDong: null,
        idQuyetDinh: null,
        xacNhanHopDong: null,
        isHopDong: null,
    };
    XacNhanHopDongTuyenDungEnum = XacNhanHopDongTuyenDungEnum;
    xacNhanHopDongEnum = XacNhanHopDongEnum;
    searchAdvance = false;
    openFirstTime = false;
    lstDanhMucKeHoach: IKeHoachTuyenDung[] = [];
    lstSoQuyetDinh: IQuyetDinh[] = [];
    chiTietHopDong: IHopDong;
    trangThaiHopDongEnum = TrangThaiHopDongEnum;
    constructor(
        private apiService: ApiService,
        private notification: NotificationService,
        private windowService: WindowService,
        private modal: NzModalService,
        private translate: CustomTranslateService,
        protected menuQuery: MenuQuery
    ) {
        super(menuQuery);
    }

    ngOnInit() {
        super.ngOnInit();
        this.loadKeHoachItems();
        this.loadQuyetDinhItems();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
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

    onSearch() {
        if (this.modelFilter.idKeHoachTuyenDung) {
            this.gridState.skip = 0;
            this.selectionIds = [];
            this.loadItems();
        } else {
            this.notification.showWarningMessage(this.translate.get('RECRUITMENT.MES.09'));
        }
    }

    onReset() {
        this.modelFilter = {
            keyword: '',
            ngayBatDau: null,
            ngayKetThuc: null,
            nam: new Date().getFullYear(),
            idKeHoachTuyenDung: null,
            idTrangThaiHopDong: null,
            idNhanSuLogin: null,
            idViTriViecLam: null,
            idLoaiNhanSu: null,
            idNgach: null,
            idTrinhDoChuyenMon: null,
            idLoaiHopDong: null,
            idQuyetDinh: null,
            xacNhanHopDong: null,
            isHopDong: null,
        };
    }

    onTaoHopDong() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('RECRUITMENT.HD.TITLE'),
            content: FormTaoHopDongComponent,
            width: 1000,
            top: 10,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.model = this.selectionIds;
        param.action = ActionEnum.CREATE;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.selectionIds = [];
                this.opened = false;
            }
        });
    }

    editHandler(dataItem: IListHopDong) {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('RECRUITMENT.HD.TITLE'),
            content: FormHopDongTuyenDungComponent,
            width: 1000,
            top: 10,
            autoFocusedElement: 'body',
        });
        const param = windowRef.content.instance;
        param.action = dataItem.idHopDong && dataItem.idHopDong > 0 ? ActionEnum.UPDATE : ActionEnum.CREATE;
        param.idNhanSu = dataItem.idNhanSu;
        param.idHopDong = dataItem.idHopDong;
        param.idTrangThaiHopDong = dataItem.idTrangThaiHopDong; 

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.loadItems();
            }
        });
    }

    viewHandler(dataItem: IListHopDong) {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('RECRUITMENT.HD.TITLE'),
            content: FormHopDongTuyenDungComponent,
            width: 1000,
            top: 10,
            autoFocusedElement: 'body',
        });
        const param = windowRef.content.instance;
        param.action = ActionEnum.VIEW;
        param.idNhanSu = dataItem.idNhanSu;
        param.idHopDong = dataItem.idHopDong;
        param.idTrangThaiHopDong = dataItem.idTrangThaiHopDong;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.loadItems();
            }
        });
    }

    kyPhuLucHandler(dataItem: IListHopDong) {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('RECRUITMENT.HD.TITLE'),
            content: FormTaoHopDongComponent,
            width: 1000,
            top: 10,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.action = ActionEnum.UPDATE;
        param.idNhanSu = dataItem.idNhanSu;
        param.idHopDong = dataItem.idHopDong;
        param.isPhuLuc = true;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.loadItems();
            }
        });
    }

    chamDutHopDongHandler(dataItem: IListHopDong) {
        this.chamDutHopDongHandlers([dataItem.idHopDong]);
    }

    chamDutHopDongHandlers(ids: number[]) {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('RECRUITMENT.TEXT.14'),
            content: ChamDutHopDongComponent,
            width: 550,
            top: 10,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.ids = ids;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.selectionIds = [];
                this.opened = false;
                this.loadItems();
            }
        });
    }

    removeHandler(dataItem: IListHopDong) {
        this.selectionIds = [];
        this.selectionIds.push(dataItem.idHopDong);
        this.removeSelectedHandler();
    }

    /**
     * Removes multiple selected handler
     */
    removeSelectedHandler() {
        if (this.selectionIds.length > 0) {
            const body = {
                ids: this.selectionIds,
            };
            this.modal.confirm({
                nzTitle: ModalDeleteConfig.title,
                nzContent: ModalDeleteConfig.content,
                nzOkText: ModalDeleteConfig.yes,
                nzOkType: 'danger',
                nzOnOk: () => {
                    this.apiService.delete(UrlConstant.API.TD_HOP_DONG, body).subscribe(res => {
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

    // onDeXuatHopDongs() {
    // this.modal.confirm({
    //     nzTitle: '<i>' + this.translate.get('LB.CONFIRM') + '</i>',
    //     nzContent: '<b>' + this.translate.get('RECRUITMENT.TEXT.10') + '</b>',
    //     nzOkText: this.translate.get('LB.OK'),
    //     nzCancelText: this.translate.get('LB.NO'),
    //     nzOkType: 'danger',
    //     nzOnOk: () => {
    //         this.apiService
    //             .put(UrlConstant.API.TD_HOP_DONG + '/DeXuat', {
    //                 idsHopDong: this.selectionIds,
    //             })
    //             .pipe(takeUntil(this.destroyed$))
    //             .subscribe(() => {
    //                 this.notification.showSuccessMessage(this.translate.get('RECRUITMENT.MES.05'));
    //                 this.selectionIds = [];
    //                 this.loadItems();
    //             });
    //     },
    //     nzOnCancel: () => { },
    // });
    // }

    onDeXuatHopDong(id: number) {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('RECRUITMENT.HD.GUI_CA_NHAN_XAC_NHAN'),
            content: DeXuatHopDongComponent,
            width: 500,
            top: 10,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.ids = [id];

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.loadItems();
            }
        });
    }

    // showFormDuyetHopDongCaNhan() {
    //     this.opened = true;
    //     const windowRef = this.windowService.open({
    //         title: this.translate.get('RECRUITMENT.TEXT.11'),
    //         content: DuyetHopDongCaNhanComponent,
    //         width: 1000,
    //         top: 10,
    //         autoFocusedElement: 'body',
    //     });

    //     const param = windowRef.content.instance;
    //     param.ids = this.selectionIds;

    //     windowRef.result.subscribe(result => {
    //         if (result instanceof WindowCloseResult) {
    //             this.selectionIds = [];
    //             this.opened = false;
    //             this.loadItems();
    //         }
    //     });
    // }

    onExpand(event) {
        const chiTietHopDong$ = this.apiService.read(UrlConstant.API.TD_HOP_DONG + '/ById', {
            idNhanSu: event.dataItem.idNhanSu,
            idHopDong: event.dataItem.id,
        });

        forkJoin([chiTietHopDong$, this.gridView$])
            .pipe(takeUntil(this.destroyed$))
            .subscribe(([chiTietHopDong, gridView]) => {
                this.chiTietHopDong = chiTietHopDong.result;
                gridView.data.forEach((item, idx) => {
                    if (event.index !== idx) {
                        this.grid.collapseRow(idx);
                    }
                });
            });
    }

    taoHopDong() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('RECRUITMENT.HD.TITLE'),
            content: FormHopDongTuyenDungComponent,
            width: 1000,
            top: 10,
            autoFocusedElement: 'body',
            state: 'maximized',
        });

        const param = windowRef.content.instance;
        param.action = ActionEnum.CREATE;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.loadItems();
            }
        });
    }
    data = [];
    protected loadItems() {
        if (this.modelFilter.idKeHoachTuyenDung && this.modelFilter.idKeHoachTuyenDung > 0) {
            this.loading = true;
            this.apiService.read(UrlConstant.API.TD_HOP_DONG + '/List', this.queryOptions).pipe(
                map(res => {
                    if (res.result && res.result.items) {
                        res.result.items.forEach(element => {
                            element.expand = false;
                        });
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
                    this.loading = false;
                })
            ).subscribe(element => {
                this.data = element.data;
            });
        }
    }

    onExportExcel() {
        // this.fileService.exportFile(
        //     UrlConstant.API.PKS_TONG_HOP_KET_QUA_DANH_GIA + '/ExportExcelCaNhan',
        //     this.exportQueryOptions,
        //     'DanhSachPhieuCaNhanDanhGia'
        // );
    }

    changeNam() {
        this.modelFilter.idKeHoachTuyenDung = null;
        this.loadKeHoachItems();
    }

    onChangeKeHoach(e) {
        this.loadQuyetDinhItems();
        this.onSearch();
    }

    onHuy(idHopDong: number) {
        this.modal.confirm({
            nzTitle: this.translate.get('RECRUITMENT.TEXT.28'),
            nzContent: this.translate.get('RECRUITMENT.TEXT.27'),
            nzOkText: ModalDeleteConfig.yes,
            nzOkType: 'danger',
            nzOnOk: () => {
                this.apiService
                    .delete(UrlConstant.API.TD_HOP_DONG, {
                        ids: [idHopDong],
                    })
                    .subscribe(res => {
                        // show notification
                        this.notification.showSuccessMessage(this.translate.get('RECRUITMENT.MES.11'));
                        // set current page
                        this.gridState.skip = 0;
                        // reload data
                        this.loadItems();
                    });
            },
            nzCancelText: ModalDeleteConfig.no,
            nzOnCancel: () => {},
        });
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

    private loadQuyetDinhItems() {
        this.apiService
            .read(UrlConstant.API.HRM_TD_QUYET_DINH + '/DanhMuc', {
                pageSize: 0,
                pageNumber: 0,
                sortName: 'id',
                idLoaiQuyetDinh: 0,
                idKeHoachTuyenDung: this.modelFilter.idKeHoachTuyenDung,
            })
            .pipe(
                map(res => res.result),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                this.lstSoQuyetDinh = res.items;
            });
    }

    private get queryOptions() {
        return {
            ...this.queryString,
            keyword: this.modelFilter.keyword,
            tuNgay: this.modelFilter.ngayBatDau,
            denNgay: this.modelFilter.ngayKetThuc,
            nam: this.modelFilter.nam,
            isHopDong: this.modelFilter.isHopDong,
            idKeHoachTuyenDung: this.modelFilter.idKeHoachTuyenDung,

            idNhanSuLogin: this.modelFilter.idNhanSuLogin,
            idTrangThaiHopDong: this.modelFilter.idTrangThaiHopDong,
            idViTriViecLam: this.modelFilter.idViTriViecLam,
            idLoaiNhanSu: this.modelFilter.idLoaiNhanSu,
            idNgach: this.modelFilter.idNgach,
            idTrinhDoChuyenMon: this.modelFilter.idTrinhDoChuyenMon,
            idLoaiHopDong: this.modelFilter.idLoaiHopDong,
            idQuyetDinh: this.modelFilter.idQuyetDinh,
            xacNhanHopDong: this.modelFilter.xacNhanHopDong,
            idsCoQuan: null,
        };
    }
}
