import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '@core/data-services/api.service';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { PageConfig } from '@core/constants/app.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { finalize, map, tap } from 'rxjs/operators';
import { IPagedResult, IResponseData } from '@core/models/common/response-data.model';
import { BaseHumanResourceComponent } from '@themes/views/management/human-resource/_base/base-human-resource.component';
import { INhanSuKhenThuong } from '@themes/views/management/human-resource/_models/thong-tin-khen-thuong.model';
import { DuLieuNhanSuEnum, TrangThaiDuLieuDescription } from '@themes/views/management/human-resource/_models';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';
import { Observable } from 'rxjs/internal/Observable';
import { GridDataResult, PagerSettings } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { Subject } from 'rxjs';
import { ViewFileComponent } from '@shared/controls/view-file';
import { CustomTranslateService } from '@core/services/common';

@Component({
    selector: 'app-tab-view-khen-thuong-ky-luat',
    templateUrl: './tab-view-khen-thuong-ky-luat.component.html',
    styleUrls: ['./tab-view-khen-thuong-ky-luat.component.scss']
})
export class TabViewKhenThuongKyLuatComponent implements OnInit, OnDestroy {
    @ViewChild(TooltipDirective) public tooltipDir: TooltipDirective;

    @Input() nhanSuId: number;
    @Input() duLieuNhanSuEnum: DuLieuNhanSuEnum;

    opened = false;
    gridViewKT$: Observable<GridDataResult>;
    gridStateKT: State = {
        sort: [{ field: 'id', dir: 'desc' }],
        skip: 0,
        take: 10,
    };
    pageConfigKT: PagerSettings | boolean = false;
    loadingKT = false;    
    gridViewKL$: Observable<GridDataResult>;
    gridStateKL: State = {
        sort: [{ field: 'id', dir: 'desc' }],
        skip: 0,
        take: 10,
    };
    pageConfigKL: PagerSettings | boolean = false;
    loadingKL = false;    
    gridViewTD$: Observable<GridDataResult>;
    gridStateTD: State = {
        sort: [{ field: 'id', dir: 'desc' }],
        skip: 0,
        take: 10,
    };
    pageConfigTD: PagerSettings | boolean = false;
    loadingTD = false;    
   
    trangThaiDuLieus = TrangThaiDuLieuDescription;
    protected destroyed$ = new Subject();
    
    constructor(
        private apiService: ApiService,
        private translate: CustomTranslateService,
        protected windowService: WindowService
    ) {
    }

    ngOnInit(): void {
        if (this.nhanSuId) {
            this.loadKTItems();
            this.loadKLItems();
            this.loadTDItems();
        }
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    showTooltip(e: MouseEvent): void {
        const element = e.target as HTMLElement;
        if ((element.nodeName === 'TD' || element.nodeName === 'TH') && element.offsetWidth < element.scrollWidth) {
            this.tooltipDir.toggle(element);
        } else {
            this.tooltipDir.hide();
        }
    }

    showModalViewFile(guidId, name) {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('LB.VIEW_FILE'),
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

    onStateChangeKT(state: State) {
        this.gridStateKT = state;
        this.loadKTItems();
    }

    onStateChangeKL(state: State) {
        this.gridStateKL = state;
        this.loadKLItems();
    }

    onStateChangeTD(state: State) {
        this.gridStateTD = state;
        this.loadTDItems();
    }

    protected loadKTItems() {
        this.loadingKT = true;
        this.gridViewKT$ = this.apiService.read(UrlConstant.API.HRM_NS_KHEN_THUONG, {
            pageNumber: this.gridStateKT.skip / this.gridStateKT.take + 1,
            pageSize: this.gridStateKT.take,
            sortName: this.gridStateKT.sort[0].field,
            sortASC: this.gridStateKT.sort[0].dir === 'asc',
            idNhanSu: this.nhanSuId,
            manHinh: this.duLieuNhanSuEnum
        }).pipe(
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
                if (res.total <= this.gridStateKT.take) {
                    this.pageConfigKT = false;
                } else {
                    this.pageConfigKT = PageConfig;
                }
            }),
            finalize(() => (this.loadingKT = false))
        );
    }

    protected loadKLItems() {
        this.loadingKL = true;
        this.gridViewKL$ = this.apiService.read(UrlConstant.API.HRM_NS_KY_LUAT, {
            pageNumber: this.gridStateKL.skip / this.gridStateKL.take + 1,
            pageSize: this.gridStateKL.take,
            sortName: this.gridStateKL.sort[0].field,
            sortASC: this.gridStateKL.sort[0].dir === 'asc',
            idNhanSu: this.nhanSuId,
            manHinh: this.duLieuNhanSuEnum
        }).pipe(
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
                if (res.total <= this.gridStateKL.take) {
                    this.pageConfigKL = false;
                } else {
                    this.pageConfigKL = PageConfig;
                }
            }),
            finalize(() => (this.loadingKL = false))
        );
    }

    protected loadTDItems() {
        this.loadingTD = true;
        this.gridViewTD$ = this.apiService.read(UrlConstant.API.HRM_NS_DANH_HIEU_THI_DUA_KHEN_THUONG, {
            pageNumber: this.gridStateTD.skip / this.gridStateTD.take + 1,
            pageSize: this.gridStateTD.take,
            sortName: this.gridStateTD.sort[0].field,
            sortASC: this.gridStateTD.sort[0].dir === 'asc',
            idNhanSu: this.nhanSuId,
            manHinh: this.duLieuNhanSuEnum
        }).pipe(
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
                if (res.total <= this.gridStateTD.take) {
                    this.pageConfigTD = false;
                } else {
                    this.pageConfigTD = PageConfig;
                }
            }),
            finalize(() => (this.loadingTD = false))
        );
    }
}
