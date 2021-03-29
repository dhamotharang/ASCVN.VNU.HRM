import { OnDestroy } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { ModalDeleteConfig, PageConfig, ReziseTable } from '@core/constants/app.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { CustomTranslateService, FileService, NotificationService, UtilService } from '@core/services/common';
import { MenuQuery } from '@management-state/menu/menu.query';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { NzModalService } from 'ng-zorro-antd';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { BaseLaboratoryComponent } from '../../_base/base-laboratory.component';
import { ISanPhamKHCN } from '../../_models/ptn.model';
import { FormThemSanPhamKhcnComponent } from './form-them-san-pham-khcn/form-them-san-pham-khcn.component';

@Component({
    selector: 'app-danh-sach-san-pham-khcn',
    templateUrl: './danh-sach-san-pham-khcn.component.html',
    styleUrls: ['./danh-sach-san-pham-khcn.component.scss']
})
export class DanhSachSanPhamKhcnComponent extends BaseLaboratoryComponent<ISanPhamKHCN> implements OnInit, OnDestroy {
    @Input() idPhongThiNghiem: number;
    @Input() isMain: boolean;
    chonNhanSu: number[] = [];
    extendModelSearch = {
        idCoQuan: [],
        idPhongThiNghiem: null,
        namHoanThanh: null,
        isChuyenGiao: null,
        tenSanPham: null,
        tenTacGia: null
    };

    private get extendQueryOptions() {
        return {
            tenSanPham: this.extendModelSearch.tenSanPham != null ? this.extendModelSearch.tenSanPham.toString() : '',
            tenTacGia: this.extendModelSearch.tenTacGia != null ? this.extendModelSearch.tenTacGia.toString() : '',
            idsCoQuanNhanChuyenGiao: this.extendModelSearch.idCoQuan != null ? this.extendModelSearch.idCoQuan.join(',') : '',
            idsPhongThiNghiem: this.extendModelSearch.idPhongThiNghiem != null ? this.extendModelSearch.idPhongThiNghiem.toString() : '',
            namHoanThanh: this.extendModelSearch.namHoanThanh,
            isChuyenGiao: this.extendModelSearch.isChuyenGiao,
            ...this.queryOptions,
        };
    }

    constructor(
        private apiService: ApiService,
        private modal: NzModalService,
        private notification: NotificationService,
        protected windowService: WindowService,
        private translate: CustomTranslateService,
        protected menuQuery: MenuQuery

    ) {
        super(menuQuery, windowService);
    }

    ngOnInit() {
        if (this.idPhongThiNghiem != null && this.idPhongThiNghiem > 0 && this.idPhongThiNghiem != undefined) {
            this.extendModelSearch.idPhongThiNghiem.push(this.idPhongThiNghiem);
        }
        super.ngOnInit();
    }

    loadItems() {
        this.isLoading = true;
        this.gridView$ = this.apiService
            .post(UrlConstant.API.SAN_PHAM_KHCN + '/GetList', this.extendQueryOptions, true)
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

    showFormCreateOrUpdate() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('PTN.SP.TITLE_SAN_PHAM_KHCN'),
            content: FormThemSanPhamKhcnComponent,
            width: 1200,
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

    removeHandler(dataItem: ISanPhamKHCN) {
        this.selectionIds = [];
        this.selectionIds.push(dataItem.id);
        this.removeSelectedHandler();
    }

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
                    this.apiService.delete(UrlConstant.API.SAN_PHAM_KHCN, body).subscribe(res => {
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
                nzOnCancel: () => { },
            });
        }
    }

    refreshHandler() {
        this.extendModelSearch = {
            idCoQuan: [],
            idPhongThiNghiem: null,
            namHoanThanh: null,
            isChuyenGiao: null,
            tenSanPham: null,
            tenTacGia: null
        };
    }

    changeNhanSu(data) {
        this.chonNhanSu = data.map(x => {
            return x.nhanSuId;
        });
    }
}

