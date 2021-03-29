import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActionEnum } from '@core/constants/enum.constant';
import { ModalDeleteConfig, PageConfig } from '@core/constants/app.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { MenuQuery } from '@management-state/menu/menu.query';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { NotificationService } from '@core/services/common/notification.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FileService } from '@core/services/common/file.service';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { IDinhBien } from '@themes/views/management/recruitment/_models/recruitment.model';
import { BaseRecruitmentComponent } from '../../_base/base-recruitment.component';
import { FormDinhBienComponent } from '../../components/form-dinh-bien/form-dinh-bien.component';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import { FormSaoChepDinhBienComponent } from '../../components';

export enum ExportEnum {
    ExportExcelTongHopDinhBien = 0,
    ExportExcelDinhBienTheoViTriViecLam = 1,
}
@Component({
    selector: 'app-dinh-bien',
    templateUrl: './dinh-bien.component.html',
    styleUrls: ['./dinh-bien.component.scss'],
})
export class DinhBienComponent extends BaseRecruitmentComponent<IDinhBien> implements OnInit, OnDestroy {
    action: ActionEnum;
    exportEnum = ExportEnum;

    chonDonVi: number[] = [];
    girdViewNhomViTri = [];
    modelSearch = {
        keyword: '',
        nam: new Date().getFullYear(),
        coQuanId: null,
    };

    constructor(
        private apiService: ApiService,
        private windowService: WindowService,
        private notification: NotificationService,
        private modalService: NzModalService,
        private translate: CustomTranslateService,
        private fileService: FileService,
        protected menuQuery: MenuQuery
    ) {
        super(menuQuery);
    }

    ngOnInit() {
        super.ngOnInit();
        this.loadNhomViTriViecLam();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    searchHandler() {
        this.gridState.skip = 0;
        this.chonDonVi.length > 0 ? (this.modelSearch.coQuanId = this.chonDonVi.toString()) : (this.modelSearch.coQuanId = null);
        this.loadItems();
    }

    refreshHandler() {
        this.chonDonVi = [];
        this.modelSearch = {
            keyword: '',
            nam: null,
            coQuanId: null,
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

    copyHandler(dataItem) {
        this.model = dataItem;
        this.action = ActionEnum.DUPLICATE;
        this.openForm();
    }

    copyMultiHandler() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('RECRUITMENT.TEXT.23'),
            content: FormSaoChepDinhBienComponent,
            width: 600,
            top: 10,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.action = ActionEnum.DUPLICATE;
        param.namHienTai = this.modelSearch.nam;
        param.model = this.selectionIds;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.selectionIds = [];
            }
        });
    }

    openForm() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('RECRUITMENT.DINH_BIEN.TITLE_FORM'),
            content: FormDinhBienComponent,
            width: 1000,
            top: 10,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.action = this.action;
        param.model = this.model;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.loadItems();
            }
        });
    }

    removeHandler(dataItem: IDinhBien) {
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
                    this.apiService.delete(UrlConstant.API.TD_DINH_BIEN, body).subscribe(res => {
                        this.selectionIds = [];
                        // show notification
                        this.notification.showSuccessMessage(this.translate.get('MES.DELETE_DONE'));
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
    }

    onExportExcel(type: ExportEnum) {
        switch (type) {
            case this.exportEnum.ExportExcelTongHopDinhBien:
                this.fileService.exportFile(
                    UrlConstant.API.TD_DINH_BIEN + '/ExportExcelTongHopDinhBien',
                    this.exportQueryOptions,
                    'DanhSachTongHopDinhBien'
                );
                break;
            case this.exportEnum.ExportExcelDinhBienTheoViTriViecLam:
                this.fileService.exportFile(
                    UrlConstant.API.TD_DINH_BIEN + '/ExportExcelDinhBienTheoViTriViecLam',
                    this.exportQueryOptions,
                    'DanhSachDinhBienTheoViTriViecLam'
                );
                break;
        }
    }

    protected loadItems() {
        this.loading = true;
        this.gridView$ = this.apiService.read(UrlConstant.API.TD_DINH_BIEN, this.queryOptions).pipe(
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
                this.loading = false;
            })
        );
    }

    private get queryOptions() {
        return {
            pageSize: this.gridState.take,
            pageNumber: this.gridState.skip / this.gridState.take + 1,
            sortName: this.gridState.sort[0].field,
            sortASC: this.gridState.sort[0].dir === 'asc',
            keySearch: this.modelSearch.keyword,
            nam: this.modelSearch.nam,
            idsCoQuan: this.modelSearch.coQuanId,
        };
    }

    private get exportQueryOptions() {
        return {
            pageSize: 0,
            pageNumber: 0,
            sortName: this.gridState.sort[0].field,
            sortASC: this.gridState.sort[0].dir === 'asc',
            keySearch: this.modelSearch.keyword,
            nam: this.modelSearch.nam,
            idsCoQuan: this.modelSearch.coQuanId,
        };
    }

    private loadNhomViTriViecLam() {
        const loadViTri$ = this.apiService
            .read(UrlConstant.API.DM_NHOM_VIEC_LAM + '/Grouping', {
                pageSize: 0,
                pageNumber: 0,
            })
            .pipe(
                map(res => {
                    let index = 0;
                    if (res && res.result) {
                        const results = [];
                        res.result.map(x => {
                            const childs = [];
                            x.viTriViecLams.map(y => {
                                index++;
                                childs.push({
                                    idViTriViecLam: y.idViTriViecLam,
                                    isVisibleViTriViecLam: y.isVisibleViTriViecLam,
                                    tenViTriViecLam: y.tenViTriViecLam,
                                    capLuong: index < 10 ? 'cl0' + index : 'cl' + index,
                                    tuTra: index < 10 ? 'tT0' + index : 'tT' + index,
                                });
                            });
                            results.push({
                                idNhomViTriViecLam: x.idNhomViTriViecLam,
                                isVisibleNhomViTriViecLam: x.isVisibleNhomViTriViecLam,
                                tenNhomViTriViecLam: x.tenNhomViTriViecLam,
                                viTriViecLams: childs,
                            });
                        });
                        return results;
                    } else {
                        return [];
                    }
                }),
                takeUntil(this.destroyed$)
            );

        loadViTri$.subscribe(res => {
            this.girdViewNhomViTri = res;
        });
    }
}
