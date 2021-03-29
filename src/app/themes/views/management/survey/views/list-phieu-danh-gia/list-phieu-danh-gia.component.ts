import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ModalDeleteConfig, PageConfig, ReziseTable } from '@core/constants/app.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { IPhieuDanhGia } from '@themes/views/management/survey/_models/survey.model';
import { NotificationService } from '@core/services/common/notification.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { debounceTime, finalize, map, takeUntil, tap } from 'rxjs/operators';
import { FileService } from '@core/services/common/file.service';
import { MenuQuery } from '@management-state/menu/menu.query';
import { IPagedResult, IResponseData } from '@core/models/common/response-data.model';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { BaseSurveyListComponent } from '@themes/views/management/survey/_base/base-survey-list.component';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';

@Component({
    selector: 'app-list-phieu-danh-gia',
    templateUrl: './list-phieu-danh-gia.component.html',
    styleUrls: ['./list-phieu-danh-gia.component.scss'],
    animations: [fadeInOnEnterAnimation(), fadeOutOnLeaveAnimation()],
})
export class ListPhieuDanhGiaComponent extends BaseSurveyListComponent<IPhieuDanhGia> implements OnInit, OnDestroy {
    pageHeight = window.innerHeight - ReziseTable;
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.pageHeight = event.target.innerHeight - ReziseTable;
    }

    constructor(
        private apiService: ApiService,
        private notification: NotificationService,
        private translate: CustomTranslateService,
        private modal: NzModalService,
        private fileService: FileService,
        protected menuQuery: MenuQuery
    ) {
        super(menuQuery);
    }

    ngOnInit() {
        super.ngOnInit();
        // value change when search
        this.searchControl.valueChanges.pipe(debounceTime(500)).subscribe(value => {
            this.loadItems();
        });
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    removeHandler(dataItem: IPhieuDanhGia) {
        this.selectionIds = [];
        this.selectionIds.push(dataItem.phieuDanhGiaId);
        this.removeSelectedHandler();
    }

    removeSelectedHandler() {
        if (this.selectionIds.length > 0) {
            const body = {
                phieuDanhGiaIds: this.selectionIds,
            };
            this.modal.confirm({
                nzTitle: ModalDeleteConfig.title,
                nzContent: ModalDeleteConfig.content,
                nzOkText: ModalDeleteConfig.yes,
                nzOkType: 'danger',
                nzOnOk: () => {
                    const removePhieuDanhGia$ = this.apiService
                        .delete(UrlConstant.API.PKS_PHIEU_DANH_GIA, body)
                        .pipe(takeUntil(this.destroyed$));
                    removePhieuDanhGia$.subscribe(() => {
                        // reset
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

    changeStatus(dataItem: IPhieuDanhGia) {
        this.modal.confirm({
            nzTitle: 'Xác nhận',
            nzContent: 'Bạn có muốn cập nhật trạng thái phiếu đánh giá ?',
            nzOkText: ModalDeleteConfig.yes,
            nzOkType: 'danger',
            nzOnOk: () => {
                const updateStatus$ = this.apiService
                    .put(UrlConstant.API.PKS_PHIEU_DANH_GIA + '/Status', {
                        phieuDanhGiaId: dataItem.phieuDanhGiaId,
                        isVisible: !dataItem.isVisible,
                    })
                    .pipe(takeUntil(this.destroyed$));
                updateStatus$.subscribe(res => {
                    this.notification.showSuccessMessage('Cập nhật phiếu đánh giá thành công !');
                    this.loadItems();
                });
            },
            nzCancelText: ModalDeleteConfig.no,
            nzOnCancel: () => {},
        });
    }

    onExportExcel() {
        this.fileService.exportFile(
            UrlConstant.API.PKS_PHIEU_DANH_GIA + '/ExportExcel',
            {
                pageNumber: 0,
                pageSize: 0,
                keyWord: this.searchControl.value,
                sortCol: this.gridState.sort[0].field,
                sortByASC: this.gridState.sort[0].dir === 'asc',
            },
            'DanhSachPhieuDanhGia'
        );
    }

    loadItems() {
        this.isLoading = true;
        this.gridView$ = this.apiService.read(UrlConstant.API.PKS_PHIEU_DANH_GIA + '/Search', this.queryOptions).pipe(
            map((res: IResponseData<IPagedResult<any>>) => {
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
