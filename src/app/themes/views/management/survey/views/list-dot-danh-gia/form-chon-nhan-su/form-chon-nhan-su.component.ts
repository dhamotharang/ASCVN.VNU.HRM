import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalDeleteConfig, PageConfig, ReziseTable } from '@core/constants/app.constant';
import { ApiService } from '@core/data-services/api.service';
import { GridDataResult, SelectionEvent } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { UrlConstant } from '@core/constants/url.constant';
import { IPagedResult } from '@core/models/common/response-data.model';
import { IDotDanhGiaChiTiet, INhanSuDanhGiaChiTiet, INhanSuDanhGiaChiTietDelete, } from '@themes/views/management/survey/_models/survey.model';
import { ActionEnum } from '@core/constants/enum.constant';
import { NotificationService } from '@core/services/common/notification.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { DropDownListEnum } from '@shared/containers/asc-select/asc-select.enum';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';

@Component({
    selector: 'app-form-chon-nhan-su',
    templateUrl: './form-chon-nhan-su.component.html',
    styleUrls: ['./form-chon-nhan-su.component.scss'],
})
export class FormChonNhanSuComponent implements OnInit, OnDestroy {
    @Input() action: ActionEnum;
    @Input() model: IDotDanhGiaChiTiet;
    dropdownListEnum = DropDownListEnum;
    gridViewUser: GridDataResult;
    isLoading = false;
    public gridState: State = {
        sort: [{ field: 'id', dir: 'desc' }],
        skip: 0,
        take: 20,
    };
    public modelSearch = {
        keyword: '',
        donViId: null,
        gioiTinhId: null,
    };
    public searchAdvance = false;
    openFirstTime = false;
    public chonDonVi: number[] = [];
    public pageConfig = PageConfig;
    public selectionNhanSu: INhanSuDanhGiaChiTietDelete[] = [];
    public selectionNhanSus: any[] = [];
    public selectionNhanSuDanhGiaChiTietId: number[] = [];

    public chonNhanSu: number[] = [];
    public listNhanSu: any[] = [];

    private destroyed$ = new Subject();
    pageHeight = window.innerHeight - 240;
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.pageHeight = event.target.innerHeight - 240;
    }
    constructor(
        public apiService: ApiService,
        private notificationService: NotificationService,
        private translate: CustomTranslateService,
        private modal: NzModalService
    ) {}

    ngOnInit() {
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

    createNhanSuThamGiaDanhGia() {
        if (this.listNhanSu.length > 0) {
            const nhanSuDanhGiaChiTiet = {
                dotDanhGiaChiTietId: this.model.dotDanhGiaChiTietId,
                nhanSuDanhGiaChiTiets: this.listNhanSu.map(m => {
                    return {
                        nhanSuId: m.nhanSuId,
                        coQuanId: m.coQuanId,
                    };
                }),
            };
            this.apiService.put(UrlConstant.API.PKS_NHAN_SU_DANH_GIA_CHI_TIET, nhanSuDanhGiaChiTiet).subscribe(res => {
                this.notificationService.showSuccessMessage('Thêm nhân sự tham gia đánh giá thành công !');
                this.chonNhanSu = [];
                this.loadItems();
            });
        }
    }

    loadItems() {
        this.isLoading = true
        const gridView$ = this.apiService
            .read(UrlConstant.API.PKS_NHAN_SU_DANH_GIA_CHI_TIET + '/ByDotDanhGiaChiTiet', this.queryOptions)
            .pipe(
                finalize(() => this.isLoading = false),
                takeUntil(this.destroyed$));
        gridView$.subscribe(res => {
            if (res.result) {
                const result = res.result as IPagedResult<INhanSuDanhGiaChiTiet[]>;
                this.gridViewUser = {
                    data: result.items,
                    total: result.pagingInfo.totalItems,
                };
            } else {
                this.gridViewUser = {
                    data: [],
                    total: 0,
                };
            }
        });
    }

    private get queryOptions() {
        return {
            pageNumber: this.gridState.skip / this.gridState.take + 1,
            pageSize: this.gridState.take,
            dotDanhGiaChiTietId: this.model.dotDanhGiaChiTietId,
            keyword: this.modelSearch.keyword,
            coQuanIds: this.modelSearch.donViId,
            gioiTinhId: this.modelSearch.gioiTinhId,
            sortName: this.gridState.sort[0].field,
            sortASC: this.gridState.sort[0].dir === 'asc',
        };
    }

    removeNhanSuThamGiaDanhGia(dataItem: INhanSuDanhGiaChiTiet) {
        const body = {
            dotDanhGiaChiTietId: this.model.dotDanhGiaChiTietId,
            nhanSuDanhGiaChiTiets: [
                {
                    nhanSuDanhGiaChiTietId: dataItem.nhanSuDanhGiaChiTietId,
                    nhanSuId: dataItem.nhanSuId,
                    coQuanId: dataItem.coQuanId,
                    isDeleted: true,
                },
            ],
        };
        this.modal.confirm({
            nzTitle: ModalDeleteConfig.title,
            nzContent: ModalDeleteConfig.content,
            nzOkText: ModalDeleteConfig.yes,
            nzOkType: 'danger',
            nzOnOk: () => {
                const removeNhanhSuThamGiaDanhGias$ = this.apiService
                    .put(UrlConstant.API.PKS_NHAN_SU_DANH_GIA_CHI_TIET, body)
                    .pipe(takeUntil(this.destroyed$));
                removeNhanhSuThamGiaDanhGias$.subscribe(() => {
                    // reset
                    this.selectionNhanSu = [];

                    // reload data
                    this.loadItems();
                    // show notification
                    this.notificationService.showSuccessMessage(this.translate.get('MES.DELETE_DONE'));
                    // set current page
                    this.gridState.skip = 0;
                });
            },
            nzCancelText: ModalDeleteConfig.no,
            nzOnCancel: () => {},
        });
    }

    removeSelectedHandler() {
        if (this.selectionNhanSus.length > 0) {
            const listDelete: INhanSuDanhGiaChiTietDelete[] = [];
            this.selectionNhanSus.map(x => {
                listDelete.push({
                    nhanSuDanhGiaChiTietId: x.nhanSuDanhGiaChiTietId,
                    nhanSuId: x.nhanSuId,
                    coQuanId: x.coQuanId,
                    isDeleted: true,
                });
            });
            const body = {
                dotDanhGiaChiTietId: this.model.dotDanhGiaChiTietId,
                nhanSuDanhGiaChiTiets: listDelete,
            };
            this.modal.confirm({
                nzTitle: ModalDeleteConfig.title,
                nzContent: ModalDeleteConfig.content,
                nzOkText: ModalDeleteConfig.yes,
                nzOkType: 'danger',
                nzOnOk: () => {
                    const removeNhanhSuThamGiaDanhGias$ = this.apiService
                        .put(UrlConstant.API.PKS_NHAN_SU_DANH_GIA_CHI_TIET, body)
                        .pipe(takeUntil(this.destroyed$));
                    removeNhanhSuThamGiaDanhGias$.subscribe(() => {
                        // reset
                        this.selectionNhanSu = [];

                        // reload data
                        this.loadItems();
                        // show notification
                        this.notificationService.showSuccessMessage(this.translate.get('MES.DELETE_DONE'));
                        // set current page
                        this.gridState.skip = 0;
                    });
                },
                nzCancelText: ModalDeleteConfig.no,
                nzOnCancel: () => {},
            });
        }
    }

    selectRow(e: SelectionEvent) {
        // kt list bo chon
        if (e.deselectedRows.length > 0) {
            const listBoChon = e.deselectedRows;
            listBoChon.map(x => {
                const index = this.selectionNhanSus.findIndex(y => x.dataItem.nhanSuDanhGiaChiTietId === y.nhanSuDanhGiaChiTietId);
                if (index > -1) {
                    this.selectionNhanSus.splice(index, 1);
                }
            });
        }
        // kt list chon
        if (e.selectedRows.length > 0) {
            const listChon = e.selectedRows;
            listChon.map(x => {
                this.selectionNhanSus.push(x.dataItem);
            });
        }
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

    searchHandler() {
        this.chonDonVi.length > 0 ? (this.modelSearch.donViId = this.chonDonVi.toString()) : (this.modelSearch.donViId = null);
        this.loadItems();
    }

    refresSearchhHandler() {
        this.modelSearch = {
            keyword: '',
            donViId: null,
            gioiTinhId: null,
        };
    }

    changeNhanSu(data) {
        this.listNhanSu = data;
    }
}
