import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalDeleteConfig, PageConfig } from '@core/constants/app.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { MenuQuery } from '@management-state/menu/menu.query';
import { SelectionEvent } from '@progress/kendo-angular-grid';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { ActionEnum } from '@core/constants/enum.constant';
import { FormGroup } from '@angular/forms';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { FormQdPhanCongHdTapSuComponent } from '../../components/form-qd-phan-cong-hd-tap-su/form-qd-phan-cong-hd-tap-su.component';
import { IQuyetDinhPhanCongHuongDanTapSu } from '@themes/views/management/recruitment/_models/qd-phan-cong-hd-tap-su.model';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import { BaseRecruitmentComponent } from '../../_base/base-recruitment.component';
import { AscSelectOption } from '@shared/containers/asc-select';
import { TrangThaiKeHoachEnum } from '../../_models';
import { NotificationService } from '@core/services/common/notification.service';
import { FormQdPcHdTapSuComponent } from '../../components/form-qd-pc-hd-tap-su/form-qd-pc-hd-tap-su.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FileService } from '@core/services/common';

@Component({
    selector: 'app-qd-phan-cong-hd-tap-su',
    templateUrl: './qd-phan-cong-hd-tap-su.component.html',
    styleUrls: ['./qd-phan-cong-hd-tap-su.component.scss'],
})
export class QdPhanCongHdTapSuComponent extends BaseRecruitmentComponent<any> implements OnInit, OnDestroy {
    selectionItems: IQuyetDinhPhanCongHuongDanTapSu[] = [];
    itemTapSu: IQuyetDinhPhanCongHuongDanTapSu;
    form: FormGroup;

    modelFilter = {
        keyword: '',
        idKeHoachTuyenDung: null,
        tapSuTuNgay: null,
        tapSuDenNgay: null,
        baoCaoTuNgay: null,
        baoCaoDenNgay: null,
    };
    listOfOption: AscSelectOption[] = [];

    constructor(
        private apiService: ApiService,
        private windowService: WindowService,
        protected menuQuery: MenuQuery,
        private modal: NzModalService,
        private translate: CustomTranslateService,
        private notification: NotificationService,
        private fileService: FileService
    ) {
        super(menuQuery);
    }

    ngOnInit() {
        super.ngOnInit();
        this.loadKeHoachTuyenDungBanDuyet();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    disabledNgayKetThucTS = (current: Date): boolean => {
        if (!this.modelFilter.tapSuTuNgay) {
            return;
        }
        // Can not select days before today and today
        return differenceInCalendarDays(current, new Date(this.modelFilter.tapSuTuNgay)) < 0;
    };

    disabledNgayBatDauTS = (current: Date): boolean => {
        if (!this.modelFilter.tapSuDenNgay) {
            return;
        }
        // Can not select days before today and today
        return differenceInCalendarDays(current, new Date(this.modelFilter.tapSuDenNgay)) > 0;
    };

    disabledNgayKetThucBC = (current: Date): boolean => {
        if (!this.modelFilter.baoCaoTuNgay) {
            return;
        }
        // Can not select days before today and today
        return differenceInCalendarDays(current, new Date(this.modelFilter.baoCaoTuNgay)) < 0;
    };

    disabledNgayBatDauBC = (current: Date): boolean => {
        if (!this.modelFilter.baoCaoDenNgay) {
            return;
        }
        // Can not select days before today and today
        return differenceInCalendarDays(current, new Date(this.modelFilter.baoCaoDenNgay)) > 0;
    };

    onSearch() {
        if (this.modelFilter.idKeHoachTuyenDung && this.modelFilter.idKeHoachTuyenDung > 0) {
            this.gridState.skip = 0;
            this.loadItems();
        } else {
            this.notification.showWarningMessage(this.translate.get('RECRUITMENT.MES.09'));
        }
    }

    resetHandler() {
        this.modelFilter = {
            keyword: '',
            idKeHoachTuyenDung: null,
            tapSuTuNgay: null,
            tapSuDenNgay: null,
            baoCaoTuNgay: null,
            baoCaoDenNgay: null,
        };
    }

    onExportQD(id: number) {
        this.fileService.exportFile(
            UrlConstant.API.TD_QUYET_DINH_REPORTS + '/PhanCongHuongDanTapSu',
            {
                idPhanCongHuongDanTapSu: id,
            },
            'PhanCongHDTapSu'
        );
    }

    onLapQuyetDinh() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('RECRUITMENT.QD.TITLE'),
            content: FormQdPhanCongHdTapSuComponent,
            width: 1000,
            top: 10,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.model = this.selectionIds;
        param.listTapSu = this.selectionItems;
        param.action = ActionEnum.CREATE;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.selectionIds = [];
                this.selectionItems = [];
                this.opened = false;
            }
            this.loadItems();
        });
    }

    onInQuyetDinh() { }

    protected loadItems() {
        if (this.modelFilter.idKeHoachTuyenDung && this.modelFilter.idKeHoachTuyenDung > 0) {
            this.loading = true;
            this.gridView$ = this.apiService.read(UrlConstant.API.TD_QUYET_DINH + '/PhanCongHuongDanTapSu/List', this.queryOptions).pipe(
                map(res => {
                    if (res.result && res.result.items) {
                        this.selectionItems = res.result.items;
                        return {
                            data: res.result.items as IQuyetDinhPhanCongHuongDanTapSu[],
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
            );
        }
    }

    private get queryOptions() {
        return {
            pageSize: this.gridState.take,
            pageNumber: this.gridState.skip / this.gridState.take + 1,
            sortCol: this.gridState.sort[0].field,
            sortASC: this.gridState.sort[0].dir === 'asc',
            keyword: this.modelFilter.keyword,
            tapSuTuNgay: this.modelFilter.tapSuTuNgay,
            tapSuDenNgay: this.modelFilter.tapSuDenNgay,
            baoCaoTuNgay: this.modelFilter.baoCaoTuNgay,
            baoCaoDenNgay: this.modelFilter.baoCaoDenNgay,
            idKeHoachTuyenDung: this.modelFilter.idKeHoachTuyenDung,
        };
    }

    onChangeKeHoach(e) {
        this.selectionIds = [];
        this.onSearch();
    }

    private loadKeHoachTuyenDungBanDuyet() {
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
                const items = res.items;
                this.listOfOption = items.map(m => {
                    return {
                        id: m.id,
                        text: `${m.maKeHoach} - ${m.tenKeHoach}`,
                    };
                });
            });
    }

    onTaoQdPcHdTs(dataItem: IQuyetDinhPhanCongHuongDanTapSu) {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('RECRUITMENT.QD.TITLE'),
            content: FormQdPcHdTapSuComponent,
            width: 1300,
            top: 10,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.action = ActionEnum.CREATE;
        param.model = dataItem;
        param.idKeHoachTuyenDung = this.modelFilter.idKeHoachTuyenDung;
        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.selectionIds = [];
                this.selectionItems = [];
                this.opened = false;
            }
            this.loadItems();
        });
    }

    editTaoQdPcHdTs(dataItem: IQuyetDinhPhanCongHuongDanTapSu) {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('RECRUITMENT.QD.TITLE'),
            content: FormQdPcHdTapSuComponent,
            width: 1300,
            top: 10,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.action = ActionEnum.UPDATE;
        param.model = dataItem;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.selectionIds = [];
                this.selectionItems = [];
                this.opened = false;
            }
            this.loadItems();
        });
    }

    viewTaoQdPcHdTs(dataItem: IQuyetDinhPhanCongHuongDanTapSu) {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('RECRUITMENT.QD.TITLE'),
            content: FormQdPcHdTapSuComponent,
            width: 1300,
            top: 10,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.action = ActionEnum.VIEW;
        param.model = dataItem;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.selectionIds = [];
                this.selectionItems = [];
                this.opened = false;
            }
            this.loadItems();
        });
    }

    onHuy(idPhanCongHuongDanTapSu: number) {
        this.modal.confirm({
            nzTitle: this.translate.get('RECRUITMENT.TEXT.26'),
            nzContent: this.translate.get('RECRUITMENT.TEXT.27'),
            nzOkText: ModalDeleteConfig.yes,
            nzOkType: 'danger',
            nzOnOk: () => {
                this.apiService
                    .delete(UrlConstant.API.TD_QUYET_DINH + '/PhanCongHuongDanTapSu', {
                        idsPhanCongHuongDanTapSu: [idPhanCongHuongDanTapSu],
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
            nzOnCancel: () => { },
        });
    }
}
