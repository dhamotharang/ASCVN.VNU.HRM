import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { State } from '@progress/kendo-data-query';
import { ModalDeleteConfig, PageConfig, ReziseTable } from '@core/constants/app.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { MenuQuery } from '@management-state/menu/menu.query';
import { GridDataResult, PagerSettings, SelectionEvent } from '@progress/kendo-angular-grid';
import { finalize, map, tap, takeUntil } from 'rxjs/operators';
import { NotificationService } from '@core/services/common/notification.service';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { ActionEnum } from '@core/constants/enum.constant';
import { Observable, Subject, of } from 'rxjs';
import { DropDownListEnum } from '@shared/containers/asc-select';
import { SecurityUtil } from '@core/utils/security';
import { Router } from '@angular/router';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';
import { CustomTranslateService, FileService } from '@core/services/common';
import { DuyetThongTinNhanSuComponent } from '@themes/views/management/human-resource/components/duyet-thong-tin-nhan-su/duyet-thong-tin-nhan-su.component';
import { FormTaoQuyetDinhComponent, XemDanhMucThayDoiThongTinComponent } from '../../components';
import { DuLieuNhanSuEnum, IDataSearch, KEY_STORE_HRM, TrangThaiDuLieuEnum } from '@themes/views/management/human-resource/_models';
import { IDuyetThongTinNhanSuModel } from '@themes/views/management/human-resource/_models/duyet-thong-tin-nhan-su.model';
import { BaseCheckPermission } from '@core/auth/base-check-permission';
import { ViewFileComponent } from '@shared/controls/view-file';
import { IChiTietQuyetDinh, IItemQuyetDinhTuyenDung, IQuyetDinhTuyenDung, TrangThaiKeHoachEnum } from '../../_models';
import { IKeHoachTuyenDung } from '@themes/views/management/catalogs/_models/catalog.model';
import { NzModalService } from 'ng-zorro-antd/modal';
import { PopupViewProfileComponent } from '@themes/views/management/human-resource/views';

@Component({
    selector: 'app-quyet-dinh-tuyen-dung',
    templateUrl: './quyet-dinh-tuyen-dung.component.html',
    styleUrls: ['./quyet-dinh-tuyen-dung.component.scss'],
})
export class QuyetDinhTuyenDungComponent extends BaseCheckPermission implements OnInit, OnDestroy {
    @ViewChild(TooltipDirective) public tooltipDir: TooltipDirective;
    gridView$: Observable<GridDataResult>;
    gridViewHoSo$: Observable<GridDataResult>;
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
    action: ActionEnum;
    itemQDTD: IQuyetDinhTuyenDung;
    pageConfig: PagerSettings | boolean = false;
    pageHSConfig: PagerSettings | boolean = false;
    opened = false;
    isLoading = false;
    isLoadingHoSo = false;
    tabName: string;
    dropdownListEnum = DropDownListEnum;
    modelFilter = {
        nam: null,
        keyword: '',
        idKeHoachTuyenDung: null,
    };
    model: IItemQuyetDinhTuyenDung;
    private destroyed$ = new Subject();

    pageHeight = window.innerHeight - ReziseTable + 32;

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.pageHeight = event.target.innerHeight - ReziseTable + 32;
    }

    lstDanhMucKeHoach: IKeHoachTuyenDung[] = [];
    isDeXuatDuyet = false;
    constructor(
        private apiService: ApiService,
        private notification: NotificationService,
        private modal: NzModalService,
        private windowService: WindowService,
        protected menuQuery: MenuQuery,
        private translate: CustomTranslateService,
        private fileService: FileService
    ) {
        super(menuQuery);
    }

    ngOnInit() {
        super.ngOnInit();
        this.tabName = this.menuQuery.getTitleWithCurrentUrl();
        this.loadKeHoachItems();
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

    onChangeKeHoach(e) {
        this.onSearchHandler();
    }

    onSearchHandler() {
        if (this.modelFilter.idKeHoachTuyenDung && this.modelFilter.idKeHoachTuyenDung > 0) {
            this.gridState.skip = 0;
            this.gridViewHoSo$ = of();
            this.loadItems();
        } else {
            this.notification.showWarningMessage(this.translate.get('RECRUITMENT.MES.09'));
        }
    }

    changeNam() {
        this.modelFilter.idKeHoachTuyenDung = null;
        this.loadKeHoachItems();
    }
    resetHandler() {
        this.modelFilter = {
            nam: null,
            keyword: '',
            idKeHoachTuyenDung: null,
        };
    }

    onExportExcel() { }

    onCreateQDTD() {
        this.action = ActionEnum.CREATE;
        this.model = undefined;
        this.onQuyetDinhTuyenDung();
    }

    onQuyetDinhTuyenDung() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('RECRUITMENT.TEXT.22'),
            content: FormTaoQuyetDinhComponent,
            width: 1300,
            top: 10,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.model = this.model;
        param.action = this.action;

        windowRef.result.subscribe(result => {
            this.opened = false;
            if (result instanceof WindowCloseResult) {
            } else {
                this.loadItems();
            }
        });
    }

    editQuyetDinhTuyenDung(item) {
        const nhanSu$ = this.apiService
            .read(UrlConstant.API.TD_QUYET_DINH + '/TuyenDungChiTiet', {
                pageSize: this.gridStateHoSo.take,
                pageNumber: this.gridStateHoSo.skip / this.gridStateHoSo.take + 1,
                sortName: this.gridStateHoSo.sort[0].field,
                sortASC: this.gridStateHoSo.sort[0].dir === 'asc',
                idQuyetDinh: item.id,
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

        nhanSu$.subscribe(res => {
            if (res) {
                this.action = ActionEnum.UPDATE;
                this.model = res;
                this.onQuyetDinhTuyenDung();
                this.loadItems();
            }
        });
    }

    viewQuyetDinhTuyenDung(item) {
        const nhanSu$ = this.apiService
            .read(UrlConstant.API.TD_QUYET_DINH + '/TuyenDungChiTiet', {
                pageSize: this.gridStateHoSo.take,
                pageNumber: this.gridStateHoSo.skip / this.gridStateHoSo.take + 1,
                sortName: this.gridStateHoSo.sort[0].field,
                sortASC: this.gridStateHoSo.sort[0].dir === 'asc',
                idQuyetDinh: item.id,
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

        nhanSu$.subscribe(res => {
            if (res) {
                this.action = ActionEnum.VIEW;
                this.model = res;
                this.onQuyetDinhTuyenDung();
            }
        });
    }

    selectRow(e: SelectionEvent) {
        if (e.selectedRows[0].dataItem) {
            this.itemQDTD = e.selectedRows[0].dataItem;
            this.loadHoSoItems(this.itemQDTD.id);
        }
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

    showTooltip(e: MouseEvent): void {
        const element = e.target as HTMLElement;
        if ((element.nodeName === 'TD' || element.nodeName === 'TH') && element.offsetWidth < element.scrollWidth) {
            this.tooltipDir.toggle(element);
        } else {
            this.tooltipDir.hide();
        }
    }

    onStateChangeHoSoChange(state: State) {
        this.gridStateHoSo = state;
        this.loadHoSoItems(this.itemQDTD.id);
    }

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

    onHuy(idQuyetDinh: number) {
        this.modal.confirm({
            nzTitle: this.translate.get('RECRUITMENT.TEXT.26'),
            nzContent: this.translate.get('RECRUITMENT.TEXT.27'),
            nzOkText: ModalDeleteConfig.yes,
            nzOkType: 'danger',
            nzOnOk: () => {
                this.apiService
                    .delete(UrlConstant.API.TD_QUYET_DINH + '/TuyenDung', {
                        ids: [idQuyetDinh],
                    })
                    .subscribe(res => {
                        // show notification
                        this.notification.showSuccessMessage(this.translate.get('RECRUITMENT.MES.10'));
                        // set current page
                        this.gridState.skip = 0;
                        // reload data
                        this.loadItems();
                    });
            },
            nzCancelText: ModalDeleteConfig.no,
            nzOnCancel: () => { },
        });
    }

    onExportQD(id: number) {
        this.fileService.exportFile(
            UrlConstant.API.TD_QUYET_DINH_REPORTS + '/TuyenDung',
            {
                idQuyetDinh: id,
            },
            'QuyetDinhTuyenDung'
        );
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

    private loadItems() {
        if (this.modelFilter.idKeHoachTuyenDung && this.modelFilter.idKeHoachTuyenDung > 0) {
            this.isLoading = true;
            this.gridView$ = this.apiService.read(UrlConstant.API.TD_QUYET_DINH + '/TuyenDung', this.queryOptions).pipe(
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
    }

    private get queryOptions() {
        return {
            pageSize: this.gridState.take,
            pageNumber: this.gridState.skip / this.gridState.take + 1,
            sortName: this.gridState.sort[0].field,
            sortASC: this.gridState.sort[0].dir === 'asc',
            keyword: this.modelFilter.keyword,
            idKeHoachTuyenDung: this.modelFilter.idKeHoachTuyenDung,
            // nam: this.modelFilter.nam,
            nam: null,
        };
    }


    private loadHoSoItems(idQD: number) {
        this.isLoadingHoSo = true;
        this.gridViewHoSo$ = this.apiService
            .read(UrlConstant.API.TD_QUYET_DINH + '/TuyenDungChiTiet', {
                pageSize: this.gridStateHoSo.take,
                pageNumber: this.gridStateHoSo.skip / this.gridStateHoSo.take + 1,
                sortName: this.gridStateHoSo.sort[0].field,
                sortASC: this.gridStateHoSo.sort[0].dir === 'asc',
                idQuyetDinh: idQD,
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
                        this.pageHSConfig = false;
                    } else {
                        this.pageHSConfig = PageConfig;
                    }
                }),
                finalize(() => {
                    this.isLoadingHoSo = false;
                })
            );
    }

}
