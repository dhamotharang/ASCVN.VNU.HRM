import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@core/data-services/api.service';
import { GridDataResult, PagerSettings } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { UrlConstant } from '@core/constants/url.constant';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { IPagedResult, IResponseData } from '@core/models/common/response-data.model';
import { ModalDeleteConfig, PageConfig } from '@core/constants/app.constant';
import { SecurityUtil } from '@core/utils/security';
import { DuLieuNhanSuEnum, HRM_URL, INhanSuThongTinLuong } from '../../../_models';
import { ListRoleOption } from '@core/auth/user-role-option';
import { ActionEnum } from '@core/constants/enum.constant';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { CustomTranslateService, NotificationService } from '@core/services/common';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BaseCheckPermission } from '@core/auth/base-check-permission';
import { MenuQuery } from '@management-state/menu/menu.query';
import { FormThongTinLuongComponent } from '../form-thong-tin-luong/form-thong-tin-luong.component';

@Component({
    selector: 'app-lich-su-luong',
    templateUrl: './lich-su-luong.component.html',
    styleUrls: ['./lich-su-luong.component.scss'],
})
export class LichSuLuongComponent extends BaseCheckPermission implements OnInit {
    model: INhanSuThongTinLuong;
    action: ActionEnum;

    gridView$: Observable<GridDataResult>;
    gridState: State = {
        sort: [{ field: 'id', dir: 'desc' }],
        skip: 0,
        take: 10,
    };

    pageConfig: PagerSettings | boolean = false;
    opened = false;
    loading = false;
    isChinhSua = false;
    isTraCuuNhanSu = false;
    selectionIds: number[] = [];
    duLieuNhanSuEnum: DuLieuNhanSuEnum;
    listRoleOption = ListRoleOption;
    private nhanSuId: number;
    private destroyed$ = new Subject();

    constructor(
        private route: ActivatedRoute,
        private modal: NzModalService,
        private windowService: WindowService,
        private translate: CustomTranslateService,
        private notificationService: NotificationService,
        protected menuQuery: MenuQuery,
        private apiService: ApiService
    ) {
        super(menuQuery);
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            if (params.k) {
                const data = JSON.parse(SecurityUtil.get(decodeURIComponent(params.k)));
                this.nhanSuId = Number.parseInt(data.idNhanSu, 10);
                this.duLieuNhanSuEnum = Number.parseInt(data.manHinh, 10) as DuLieuNhanSuEnum;

                if (this.nhanSuId) {
                    this.loadItems();
                }
            }
        });

        const pathName = location.pathname;
        const urlArray = pathName.split('/');
        Object.values(HRM_URL).forEach(key => {
            if (urlArray.includes(key)) {
                switch (key) {
                    case HRM_URL.HO_SO_CA_NHAN:
                        this.isTraCuuNhanSu = true;
                        break;
                }
            }
        });

        this.isChinhSua = this.isHasPermission(ListRoleOption.HRM_0006);
    }

    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    onStateChange(state: State) {
        this.gridState = state;
        this.loadItems();
    }


    addHandler() {
        this.model = undefined;
        this.action = ActionEnum.CREATE;
        this.showFormCapNhatLuong();
    }

    editHandler(dataItem) {
        this.model = dataItem;
        this.action = ActionEnum.UPDATE;
        this.showFormCapNhatLuong();
    }

    showFormCapNhatLuong() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('HR.MES.09'),
            content: FormThongTinLuongComponent,
            width: 600,
            top: 10,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.model = this.model;
        param.action = this.action;
        param.nhanSuId = this.nhanSuId;
        param.isNhatKy = true;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.loadItems();
            }
        });
    }

    removeHandler(idNhatKy: number) {
        this.modal.confirm({
            nzTitle: ModalDeleteConfig.title,
            nzContent: ModalDeleteConfig.content,
            nzOkText: ModalDeleteConfig.yes,
            nzOkType: 'danger',
            nzOnOk: () => {
                this.apiService
                    .delete(UrlConstant.API.HRM_NS_LUONG, {ids: [idNhatKy]})
                    .pipe(takeUntil(this.destroyed$))
                    .subscribe(() => {
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

    private loadItems() {
        this.loading = true;
        this.gridView$ = this.apiService.read(UrlConstant.API.HRM_NS_LUONG + '/LichSuLuong', this.queryOptions).pipe(
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
            finalize(() => (this.loading = false))
        );
    }

    private get queryOptions() {
        return {
            pageNumber: this.gridState.skip / this.gridState.take + 1,
            pageSize: this.gridState.take,
            sortName: this.gridState.sort[0].field,
            sortASC: this.gridState.sort[0].dir === 'asc',
            idNhanSu: this.nhanSuId,
            manHinh: this.duLieuNhanSuEnum
        };
    }
}
