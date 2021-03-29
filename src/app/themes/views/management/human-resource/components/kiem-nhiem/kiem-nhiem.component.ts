import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDeleteConfig, PageConfig } from '@core/constants/app.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { IPagedResult, IResponseData } from '@core/models/common/response-data.model';
import { INhanSuKiemNhiem } from '@themes/views/management/human-resource/_models/kiem-nhiem.model';
import { INhanSuDaoTaoBoiDuong } from '@themes/views/management/human-resource/_models/nhan-su-dao-tao-boi-duong.model';
import { NotificationService } from '@core/services/common/notification.service';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { NzModalService } from 'ng-zorro-antd/modal';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { FormKiemNhiemComponent } from './form-kiem-nhiem/form-kiem-nhiem.component';
import { MenuQuery } from '@management-state/menu/menu.query';
import { BaseHumanResourceComponent } from '@themes/views/management/human-resource/_base/base-human-resource.component';
import { IDuyetThongTinNhanSuModel } from '@themes/views/management/human-resource/_models/duyet-thong-tin-nhan-su.model';
import { HRM_KEY, TrangThaiDuLieuEnum } from '@themes/views/management/human-resource/_models';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import {DuyetThongTinNhanSuComponent} from '@themes/views/management/human-resource/components/duyet-thong-tin-nhan-su/duyet-thong-tin-nhan-su.component';

@Component({
    selector: 'app-kiem-nhiem',
    templateUrl: './kiem-nhiem.component.html',
    styleUrls: ['./kiem-nhiem.component.scss'],
})
export class KiemNhiemComponent extends BaseHumanResourceComponent<INhanSuKiemNhiem> implements OnInit, OnDestroy {
    isShowInfo = false;
    constructor(
        private apiService: ApiService,
        private modal: NzModalService,
        private notificationService: NotificationService,
        private translate: CustomTranslateService,
        protected menuQuery: MenuQuery,
        protected route: ActivatedRoute,
        protected windowService: WindowService
    ) {
        super(null, null, null);
    }

    ngOnInit() {
        super.ngOnInit();
        // this.isShowInfo = (this.isShowTabHRM(HRM_KEY.KiemNhiem) && this.isDuyetLyLichNhanSu) || !this.isDuyetLyLichNhanSu;
        this.isShowInfo = this.isShowTabHRM(HRM_KEY.KiemNhiem);
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    removeHandler(dataItem: INhanSuDaoTaoBoiDuong) {
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
                    this.apiService
                        .delete(UrlConstant.API.HRM_NS_KIEM_NHIEM, body)
                        .pipe(takeUntil(this.destroyed$))
                        .subscribe(() => {
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

    onApprove(flag: boolean) {
        const body: IDuyetThongTinNhanSuModel = {
            duyetToanBo: false,
            idNhanSu: this.nhanSuId,
            idTrangThaiDuLieu: flag ? TrangThaiDuLieuEnum.SU_DUNG_CHINH : TrangThaiDuLieuEnum.KHONG_DUYET,
            idsNhanSuKiemNhiem: this.selectionIds,
        };
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('LB.CONFIRM'),
            content: DuyetThongTinNhanSuComponent,
            width: 600,
            top: 10,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.body = body;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.selectionIds = [];
                this.loadItems();
            }
        });
    }

    protected showFormCreateOrUpdate() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: 'Cập nhập Kiêm nhiệm',
            content: FormKiemNhiemComponent,
            width: 750,
            top: 100,
            autoFocusedElement: 'body',
        });
        const param = windowRef.content.instance;
        param.action = this.action;
        param.model = this.model;
        param.nhanSuId = this.nhanSuId;
        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.loadItems();
            }
        });
    }

    protected loadItems() {
        this.loading = true;
        this.gridView$ = this.apiService.read(UrlConstant.API.HRM_NS_KIEM_NHIEM, this.queryOptions).pipe(
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
