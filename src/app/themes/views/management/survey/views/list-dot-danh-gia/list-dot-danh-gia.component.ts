import { Component, HostListener, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalDeleteConfig, PageConfig, ReziseTable } from '@core/constants/app.constant';
import { ActionEnum } from '@core/constants/enum.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService } from '@core/services/common/notification.service';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormDotDanhGiaComponent } from './form-dot-danh-gia/form-dot-danh-gia.component';
import { IDotDanhGia } from '@themes/views/management/survey/_models/survey.model';
import { MenuQuery } from '@management-state/menu/menu.query';
import { FileService } from '@core/services/common/file.service';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { IPagedResult, IResponseData } from '@core/models/common/response-data.model';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { BaseSurveyListComponent } from '@themes/views/management/survey/_base/base-survey-list.component';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';

@Component({
    selector: 'app-list-dot-danh-gia',
    templateUrl: './list-dot-danh-gia.component.html',
    styleUrls: ['./list-dot-danh-gia.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [fadeInOnEnterAnimation(), fadeOutOnLeaveAnimation()],
})
export class ListDotDanhGiaComponent extends BaseSurveyListComponent<IDotDanhGia> implements OnInit, OnDestroy {
    modelSearch = {
        keyword: '',
        nam: null,
        quy: null,
        tuNgay: null,
        denNgay: null,
    };

    pageHeight = window.innerHeight - ReziseTable;

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.pageHeight = event.target.innerHeight - ReziseTable;
    }
    constructor(
        private apiService: ApiService,
        private windowService: WindowService,
        private notificationService: NotificationService,
        private translate: CustomTranslateService,
        private modal: NzModalService,
        private fileService: FileService,
        protected menuQuery: MenuQuery
    ) {
        super(menuQuery);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    activeHandler(dataItem) {
        this.modal.confirm({
            nzTitle: 'Xác nhận',
            nzContent: 'Bạn có muốn cập nhật trạng thái đợt đánh giá ?',
            nzOkText: 'Đồng ý',
            nzOkType: 'danger',
            nzOnOk: () => {
                const active$ = this.apiService
                    .put(UrlConstant.API.PKS_DOT_DANH_GIA + '/Status', {
                        dotDanhGiaId: dataItem.dotDanhGiaId,
                        isKichHoat: !dataItem.isKichHoat,
                    })
                    .pipe(takeUntil(this.destroyed$));
                active$.subscribe(() => {
                    this.notificationService.showSuccessMessage('Cập nhật trạng thái đợt đánh giá thành công !');
                    this.gridState.skip = 0;
                    this.loadItems();
                });
            },
            nzCancelText: 'Không',
            nzOnCancel: () => {},
        });
    }

    /**
     * Adds handler
     */
    addHandler() {
        this.model = undefined;
        this.action = ActionEnum.CREATE;
        this.showFormCreateOrUpdate();
    }

    /**
     * Edits handler
     * @param dataItem
     */
    editHandler(dataItem) {
        this.model = dataItem;
        this.action = ActionEnum.UPDATE;
        this.showFormCreateOrUpdate();
    }

    showFormCreateOrUpdate() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: 'Kỳ đánh giá',
            content: FormDotDanhGiaComponent,
            width: 1000,
            top: 100,
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

    /**
     * Removes handler
     * @param dataItem
     */
    removeHandler(dataItem: IDotDanhGia) {
        this.selectionIds = [];
        this.selectionIds.push(dataItem.dotDanhGiaId);
        this.removeSelectedHandler();
    }

    /**
     * Removes multiple selected handler
     */
    removeSelectedHandler() {
        if (this.selectionIds.length > 0) {
            const body = {
                dotDanhGiaIds: this.selectionIds,
            };
            this.modal.confirm({
                nzTitle: ModalDeleteConfig.title,
                nzContent: ModalDeleteConfig.content,
                nzOkText: ModalDeleteConfig.yes,
                nzOkType: 'danger',
                nzOnOk: () => {
                    const removeDotDanhGia$ = this.apiService
                        .delete(UrlConstant.API.PKS_DOT_DANH_GIA, body)
                        .pipe(takeUntil(this.destroyed$));
                    removeDotDanhGia$.subscribe(() => {
                        // reset
                        this.selectionIds = [];

                        // show notification
                        this.notificationService.showSuccessMessage(this.translate.get('MES.DELETE_DONE'));
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

    refreshHandler() {
        this.modelSearch = {
            keyword: '',
            nam: null,
            quy: null,
            tuNgay: null,
            denNgay: null,
        };
    }

    onExportExcel() {
        this.fileService.exportFile(
            UrlConstant.API.PKS_DOT_DANH_GIA + '/ExportExcel',
            {
                pageNumber: 0,
                pageSize: 0,
                keyword: this.modelSearch.keyword,
                nam: this.modelSearch.nam,
                quy: this.modelSearch.quy,
                tuNgay: this.modelSearch.tuNgay,
                denNgay: this.modelSearch.denNgay,
                sortCol: this.gridState.sort[0].field,
                sortByASC: this.gridState.sort[0].dir === 'asc',
            },
            'DanhSachDotDanhGia'
        );
    }

    /**
     * Loads data via api service
     */
    protected loadItems() {
        this.isLoading = true;
        this.gridView$ = this.apiService
            .read(UrlConstant.API.PKS_DOT_DANH_GIA, {
                ...this.queryOptions,
                keyword: this.modelSearch.keyword,
                nam: this.modelSearch.nam,
                quy: this.modelSearch.quy,
                tuNgay: this.modelSearch.tuNgay,
                denNgay: this.modelSearch.denNgay,
            })
            .pipe(
                map((res: IResponseData<IPagedResult<any>>) => {
                    this.pageConfig = false;
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
                finalize(() => (this.isLoading = false))
            );
    }
}
