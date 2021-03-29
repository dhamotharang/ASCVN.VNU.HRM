import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PageConfig } from '@core/constants/app.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { EmitEvent, EventBus, EventBusService } from '@core/services/common';
import { MenuQuery } from '@management-state/menu/menu.query';
import { WindowService } from '@progress/kendo-angular-dialog';
import { Observable } from 'rxjs';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { BaseLaboratoryComponent } from '../../_base/base-laboratory.component';
import { ICoQuanByNhanSu, IPhongThiNghiem } from '../../_models/ptn.model';

@Component({
    selector: 'app-list-phong-thi-nghiem',
    templateUrl: './list-phong-thi-nghiem.component.html',
    styleUrls: ['./list-phong-thi-nghiem.component.scss'],
})
export class ListPhongThiNghiemComponent extends BaseLaboratoryComponent<IPhongThiNghiem> implements OnInit, OnDestroy {
    coQuanNhanSu$: Observable<ICoQuanByNhanSu>;
    modelSearch = {
        ...this.modelSearch,
        idNhanSu: null,
        idCoQuan: [],
        idsCoQuan: '',
        idLoaiHinhPhong: null,
        dsIdNganh: '',
        dsIdChuyenNganh: '',
        idNganh: [],
        idChuyenNganh: [],
        permissionType: null,
    };

    constructor(
        private apiService: ApiService,
        protected menuQuery: MenuQuery,
        protected windowService: WindowService,
        private eventBus: EventBusService
    ) {
        super(menuQuery, windowService);
    }
    ngOnInit() {
        this.tabName = this.menuQuery.getTitleWithCurrentUrl();
        /* Lấy cơ quan theo nhân sự */
        this.coQuanNhanSu$ = this.apiService.read(UrlConstant.API.HRM_DANH_MUC_CO_QUAN + '/ByNhanSu', {}).pipe(map(res => res.result));
        this.coQuanNhanSu$.subscribe(res => {
            if (res.idCoQuanCap1) {
                this.modelSearch.idCoQuan.push(res.idCoQuanCap1);
            }
        });

        /*
            0 - Cá nhân
            1 - Quản lý
         */
        this.modelSearch.permissionType = 1;

        super.ngOnInit();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }
    loadItems() {
        this.isLoading = true;
        this.gridView$ = this.apiService
            .post(
                UrlConstant.API.PTN_READPHONGTHINGHIEM + '/GetDanhSachPhongThiNghiem',
                {
                    ...this.queryOptions,
                    idNhanSu: null,
                    idsCoQuan: this.modelSearch.idCoQuan != null ? this.modelSearch.idCoQuan.join(',') : '',
                    idLoaiHinhPhong: this.modelSearch.idLoaiHinhPhong,
                    dsIdNganh: this.modelSearch.idNganh != null ? this.modelSearch.idNganh.join(',') : '',
                    dsIdChuyenNganh: this.modelSearch.idChuyenNganh != null ? this.modelSearch.idChuyenNganh.join(',') : '',
                    permissionType: this.modelSearch.permissionType,
                },
                true
            )
            .pipe(
                map(res => {
                    if (res.result && res.result.items) {
                        this.selectionIds.push(res.result.items[0].id);
                        this.selectRow({});
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

    showFormCreateOrUpdate() {}

    selectRow({}) {
        this.eventBus.emit(new EmitEvent(EventBus.SelectPhongThiNghiem, this.selectionIds));
    }
}
