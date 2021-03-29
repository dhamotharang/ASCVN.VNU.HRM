import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '@core/data-services/api.service';
import { UrlConstant } from '@core/constants/url.constant';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { INhanSuTrinhDo } from '@themes/views/management/human-resource/_models/trinh-do.model';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { ViewFileComponent } from '@shared/controls/view-file/view-file.component';
import { DuLieuNhanSuEnum, TrangThaiDuLieuDescription, TrangThaiDuLieuEnum } from '@themes/views/management/human-resource/_models';
import { CustomTranslateService } from '@core/services/common';
import { Observable, Subject } from 'rxjs';
import { GridDataResult, PagerSettings } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';
import { PageConfig } from '@core/constants/app.constant';
import { IResponseData, IPagedResult } from '@core/models/common';

@Component({
    selector: 'app-tab-view-trinh-do-chuyen-mon',
    templateUrl: './tab-view-trinh-do-chuyen-mon.component.html',
    styleUrls: ['./tab-view-trinh-do-chuyen-mon.component.scss']
})
export class TabViewTrinhDoChuyenMonComponent implements OnInit, OnDestroy {
    @ViewChild(TooltipDirective) public tooltipDir: TooltipDirective;
    
    @Input() nhanSuId: number;
    @Input() duLieuNhanSuEnum: DuLieuNhanSuEnum;

    opened = false;
    model: INhanSuTrinhDo;

    gridViewTDCM$: Observable<GridDataResult>;
    gridStateTDCM: State = {
        sort: [{ field: 'id', dir: 'desc' }],
        skip: 0,
        take: 10,
    };
    pageConfigTDCM: PagerSettings | boolean = false;
    loadingTDCM = false; 

    gridViewDTBD$: Observable<GridDataResult>;
    gridStateDTBD: State = {
        sort: [{ field: 'id', dir: 'desc' }],
        skip: 0,
        take: 10,
    };
    pageConfigDTBD: PagerSettings | boolean = false;
    loadingDTBD = false;

    gridViewNN$: Observable<GridDataResult>;
    gridStateNN: State = {
        sort: [{ field: 'id', dir: 'desc' }],
        skip: 0,
        take: 10,
    };
    pageConfigNN: PagerSettings | boolean = false;
    loadingNN = false;

    gridViewTH$: Observable<GridDataResult>;
    gridStateTH: State = {
        sort: [{ field: 'id', dir: 'desc' }],
        skip: 0,
        take: 10,
    };
    pageConfigTH: PagerSettings | boolean = false;
    loadingTH = false;

    gridViewCDKH$: Observable<GridDataResult>;
    gridStateCDKH: State = {
        sort: [{ field: 'id', dir: 'desc' }],
        skip: 0,
        take: 10,
    };
    pageConfigCDKH: PagerSettings | boolean = false;
    loadingCDKH = false;    
   
    trangThaiDuLieuEnum = TrangThaiDuLieuEnum;
    trangThaiDuLieus = TrangThaiDuLieuDescription;

    protected destroyed$ = new Subject();

    constructor(
        private apiService: ApiService,
        private windowService: WindowService,
        private translate: CustomTranslateService,
    ) {
    }

    ngOnInit(): void {
        if (this.nhanSuId) {
            this.loadData();
            this.loadTDCMItems();
            this.loadDTBDItems();
            this.loadNNItems();
            this.loadTHItems();
            this.loadCDKHItems();
        }
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
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

    loadData() {
        this.apiService
            .read(UrlConstant.API.HRM_NS_TRINH_DO, {
                idNhanSu: this.nhanSuId,
                manHinh: this.duLieuNhanSuEnum
            })
            .pipe(
                map(res => res.result),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => (this.model = res));
    }

    showTooltip(e: MouseEvent): void {
        const element = e.target as HTMLElement;
        if ((element.nodeName === 'TD' || element.nodeName === 'TH') && element.offsetWidth < element.scrollWidth) {
            this.tooltipDir.toggle(element);
        } else {
            this.tooltipDir.hide();
        }
    }

    onStateChangeTDCM(state: State) {
        this.gridStateTDCM = state;
        this.loadTDCMItems();
    }

    onStateChangeDTBD(state: State) {
        this.gridStateDTBD = state;
        this.loadDTBDItems();
    }

    onStateChangeNN(state: State) {
        this.gridStateNN = state;
        this.loadNNItems();
    }

    onStateChangeTH(state: State) {
        this.gridStateTH = state;
        this.loadTHItems();
    }

    onStateChangeCDKH(state: State) {
        this.gridStateCDKH = state;
        this.loadCDKHItems();
    }

    protected loadTDCMItems() {
        this.loadingTDCM = true;
        this.gridViewTDCM$ = this.apiService.read(UrlConstant.API.HRM_NS_TRINH_DO_CHUYEN_MON, {
            pageNumber: this.gridStateTDCM.skip / this.gridStateTDCM.take + 1,
            pageSize: this.gridStateTDCM.take,
            sortName: this.gridStateTDCM.sort[0].field,
            sortASC: this.gridStateTDCM.sort[0].dir === 'asc',
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
                if (res.total <= this.gridStateTDCM.take) {
                    this.pageConfigTDCM = false;
                } else {
                    this.pageConfigTDCM = PageConfig;
                }
            }),
            finalize(() => (this.loadingTDCM = false))
        );
    }

    protected loadDTBDItems() {
        this.loadingDTBD = true;
        this.gridViewDTBD$ = this.apiService.read(UrlConstant.API.HRM_NS_DAO_TAO_BOI_DUONG, {
            pageNumber: this.gridStateDTBD.skip / this.gridStateDTBD.take + 1,
            pageSize: this.gridStateDTBD.take,
            sortName: this.gridStateDTBD.sort[0].field,
            sortASC: this.gridStateDTBD.sort[0].dir === 'asc',
            idNhanSu: this.nhanSuId,
            id: null,
            isCaNhan: false,
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
                if (res.total <= this.gridStateDTBD.take) {
                    this.pageConfigDTBD = false;
                } else {
                    this.pageConfigDTBD = PageConfig;
                }
            }),
            finalize(() => (this.loadingDTBD = false))
        );
    }

    protected loadNNItems() {
        this.loadingNN = true;
        this.gridViewNN$ = this.apiService.read(UrlConstant.API.HRM_NS_TRINH_DO_NGOAI_NGU, {
            pageNumber: this.gridStateNN.skip / this.gridStateNN.take + 1,
            pageSize: this.gridStateNN.take,
            sortName: this.gridStateNN.sort[0].field,
            sortASC: this.gridStateNN.sort[0].dir === 'asc',
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
                if (res.total <= this.gridStateNN.take) {
                    this.pageConfigNN = false;
                } else {
                    this.pageConfigNN = PageConfig;
                }
            }),
            finalize(() => (this.loadingNN = false))
        );
    }

    protected loadTHItems() {
        this.loadingTH = true;
        this.gridViewTH$ = this.apiService.read(UrlConstant.API.HRM_NS_TRINH_DO_TIN_HOC, {
            pageNumber: this.gridStateTH.skip / this.gridStateTH.take + 1,
            pageSize: this.gridStateTH.take,
            sortName: this.gridStateTH.sort[0].field,
            sortASC: this.gridStateTH.sort[0].dir === 'asc',
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
                if (res.total <= this.gridStateTH.take) {
                    this.pageConfigTH = false;
                } else {
                    this.pageConfigTH = PageConfig;
                }
            }),
            finalize(() => (this.loadingTH = false))
        );
    }

    protected loadCDKHItems() {
        this.loadingCDKH = true;
        this.gridViewCDKH$ = this.apiService.read(UrlConstant.API.HRM_NS_CHUC_DANH_KHOA_HOC, {
            pageNumber: this.gridStateCDKH.skip / this.gridStateCDKH.take + 1,
            pageSize: this.gridStateCDKH.take,
            sortName: this.gridStateCDKH.sort[0].field,
            sortASC: this.gridStateCDKH.sort[0].dir === 'asc',
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
                if (res.total <= this.gridStateCDKH.take) {
                    this.pageConfigCDKH = false;
                } else {
                    this.pageConfigCDKH = PageConfig;
                }
            }),
            finalize(() => (this.loadingCDKH = false))
        );
    }
}
