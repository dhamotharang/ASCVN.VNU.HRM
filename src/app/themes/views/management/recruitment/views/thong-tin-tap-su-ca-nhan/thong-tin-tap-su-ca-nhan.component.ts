import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GroupDescriptor, State, process } from '@progress/kendo-data-query';
import { ModalDeleteConfig, PageConfig, ReziseTable } from '@core/constants/app.constant';
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
import { IKeHoachTuyenDung, TrangThaiHopDongEnum, TrangThaiKeHoachEnum } from '../../_models';
import { BaseCheckPermission } from '@core/auth/base-check-permission';
import { NotificationService } from '@core/services/common/notification.service';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { ViewFileComponent } from '@shared/controls/view-file';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { FormBaoCaoTapSuComponent } from '../../components/form-bao-cao-tap-su/form-bao-cao-tap-su.component';
import { ActionEnum } from '@core/constants/enum.constant';
import { IBaoCaoTapSuCaNhan } from '../../_models/bao-cao-tap-su.model';
import { FormChiTietBaoCaoComponent } from '../../components/form-chi-tiet-bao-cao/form-chi-tiet-bao-cao.component';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
    selector: 'app-thong-tin-tap-su-ca-nhan',
    templateUrl: './thong-tin-tap-su-ca-nhan.component.html',
    styleUrls: ['./thong-tin-tap-su-ca-nhan.component.scss'],
})
export class ThongTinTapSuCaNhanComponent extends BaseCheckPermission implements OnInit, OnDestroy {
    @ViewChild(TooltipDirective) public tooltipDir: TooltipDirective;

    gridViewTTTS: GridDataResult[] = [];
    gridViewBaoCao$: Observable<GridDataResult>;
    pageConfig: PagerSettings | boolean = false;
    opened = false;
    isLoadingTTTS = false;
    isLoadingBaoCao = false;
    tabName: string;
    dropdownListEnum = DropDownListEnum;
    hinhThucTraLuongEnum = HinhThucTraLuongEnum;
    hinhThuTraLuongDescription = HinhThuTraLuongDescription;
    lstDanhMucKeHoach: IKeHoachTuyenDung[] = [];
    selectionIds: number[] = [];
    modelUser: IBaoCaoTapSuCaNhan;
    pageHeight = window.innerHeight - ReziseTable - 130;
    trangThaiHopDongEnum = TrangThaiHopDongEnum;

    @HostListener('window:resize', ['$event'])
    modelSearchBaoCao = {
        keyword: '',
        trangThai: null,
        tuNgay: null,
        denNgay: null,
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
        private modal: NzModalService,
        private translate: CustomTranslateService,
        private notification: NotificationService,
        private fileService: FileService
    ) {
        super(menuQuery);
    }

    ngOnInit() {
        this.tabName = this.menuQuery.getTitleWithCurrentUrl();
        this.loadBCTapSuCaNhan();
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
        };
    }

    onSearchBaoCaoHandler() {
        this.gridStateBaoCao.skip = 0;
        this.loadBaoCaoItems(this.modelUser.id);
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
            this.modelUser = dataItem;
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
        this.loadBaoCaoItems(this.modelUser.id);
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

    openBaoCaoTapSu() {
        if (this.modelUser) {
            this.opened = true;
            const windowRef = this.windowService.open({
                title: this.translate.get('RECRUITMENT.TAP_SU.BAO_CAO_TAP_SU'),
                content: FormBaoCaoTapSuComponent,
                width: 1000,
                top: 10,
                autoFocusedElement: 'body',
            });

            const param = windowRef.content.instance;
            param.action = ActionEnum.CREATE;
            param.itemTapSu = this.modelUser;
            windowRef.result.subscribe(result => {
                if (result instanceof WindowCloseResult) {
                    this.opened = false;
                    this.loadBaoCaoItems(this.modelUser.id);
                }
            });
        } else {
            this.notification.showWarningMessage(this.translate.get('RECRUITMENT.MES.13'));
        }
    }
    openChitietBaoCaoTapSu(id: number, idTapSu: number, action: ActionEnum) {
        if (this.modelUser) {
            this.opened = true;
            const windowRef = this.windowService.open({
                title: this.translate.get('RECRUITMENT.TAP_SU.BAO_CAO_TAP_SU'),
                content: FormChiTietBaoCaoComponent,
                width: 1000,
                top: 10,
                autoFocusedElement: 'body',
            });

            const param = windowRef.content.instance;
            param.action = action;
            param.idTapSu = idTapSu;
            param.id = id;
            windowRef.result.subscribe(result => {
                if (result instanceof WindowCloseResult) {
                    this.opened = false;
                    this.loadBaoCaoItems(this.modelUser.id);
                }
            });
        } else {
            this.notification.showWarningMessage(this.translate.get('RECRUITMENT.MES.13'));
        }
    }

    onViewBaoCao(id: number) {
        this.openChitietBaoCaoTapSu(id, this.modelUser.id, ActionEnum.VIEW);
    }

    onUpdateBaoCao(id: number) {
        this.openChitietBaoCaoTapSu(id, this.modelUser.id, ActionEnum.UPDATE);
    }

    onDeleteBaoCao(id: number) {
        this.openChitietBaoCaoTapSu(id, this.modelUser.id, ActionEnum.UPDATE);
    }

    onHuy(idBaoCao: number) {
        this.modal.confirm({
            nzTitle: this.translate.get('RECRUITMENT.TEXT.29'),
            nzContent: this.translate.get('RECRUITMENT.TEXT.27'),
            nzOkText: ModalDeleteConfig.yes,
            nzOkType: 'danger',
            nzOnOk: () => {
                this.apiService
                    .delete(UrlConstant.API.TD_QUA_TRINH_TAP_SU + '/BaoCao', {
                        ids: [idBaoCao],
                    })
                    .subscribe(res => {
                        // show notification
                        this.notification.showSuccessMessage(this.translate.get('RECRUITMENT.MES.11'));
                        // set current page
                        this.gridStateTTTS.skip = 0;
                        // reload data
                        this.loadBaoCaoItems(this.modelUser.id);
                    });
            },
            nzCancelText: ModalDeleteConfig.no,
            nzOnCancel: () => {},
        });
    }

    private get queryOptionsTTTS() {
        return {
            pageSize: this.gridStateTTTS.take,
            pageNumber: this.gridStateTTTS.skip / this.gridStateTTTS.take + 1,
            sortName: this.gridStateTTTS.sort[0].field,
            sortASC: this.gridStateTTTS.sort[0].dir === 'asc',
        };
    }

    private loadBaoCaoItems(id: number) {
        this.isLoadingBaoCao = true;
        this.gridViewBaoCao$ = this.apiService
            .read(UrlConstant.API.TD_QUA_TRINH_TAP_SU + '/DanhGiaBaoCaoTapSuChiTiet', {
                pageSize: this.gridStateBaoCao.take,
                pageNumber: this.gridStateBaoCao.skip / this.gridStateBaoCao.take + 1,
                sortName: this.gridStateBaoCao.sort[0].field,
                sortASC: this.gridStateBaoCao.sort[0].dir === 'asc',
                keyword: this.modelSearchBaoCao.keyword,
                trangThai: this.modelSearchBaoCao.trangThai,
                tuNgay: this.modelSearchBaoCao.tuNgay,
                denNgay: this.modelSearchBaoCao.denNgay,
                idQuyetDinhPhanCong: id,
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

    protected loadBCTapSuCaNhan() {
        this.isLoadingTTTS = true;
        this.apiService
            .read(UrlConstant.API.TD_QUA_TRINH_TAP_SU + '/DanhGiaBaoCaoTapSuCaNhan', this.queryOptionsTTTS)
            .pipe(
                map(res => {
                    if (res.result) {
                        return {
                            data: res.result.items,
                            total: res.result.items.length,
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
            .subscribe(res => {
                this.gridViewTTTS = res.data;
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
