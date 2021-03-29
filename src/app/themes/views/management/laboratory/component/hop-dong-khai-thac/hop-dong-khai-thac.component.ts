import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalDeleteConfig, PageConfig } from '@core/constants/app.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService, CustomTranslateService, FileService } from '@core/services/common';
import { MenuQuery } from '@management-state/menu/menu.query';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { NzModalService } from 'ng-zorro-antd';
import { map, tap, finalize, takeUntil } from 'rxjs/operators';
import { BaseLaboratoryComponent } from '../../_base/base-laboratory.component';
import { IHopDongKhaiThac } from '../../_models/ptn.model';
import { FormHopDongKhaiThacComponent } from './form-hop-dong-khai-thac/form-hop-dong-khai-thac.component';

@Component({
  selector: 'app-hop-dong-khai-thac',
  templateUrl: './hop-dong-khai-thac.component.html',
  styleUrls: ['./hop-dong-khai-thac.component.scss']
})
export class HopDongKhaiThacComponent extends BaseLaboratoryComponent<IHopDongKhaiThac> implements OnInit, OnDestroy {
    @Input() isMain: boolean;
    @Input() isQuanLy: boolean;
    @Input() idPhongThiNghiem: number;

    url: string = UrlConstant.API.HOP_DONG_KHAI_THAC;

  constructor(
        private apiService: ApiService,
        private modal: NzModalService,
        private notification: NotificationService,
        protected windowService: WindowService,
        private translate: CustomTranslateService,
        protected menuQuery: MenuQuery,
        private fileService: FileService

    ) {
        super(menuQuery, windowService);
    }


    extendModelSearch = {
        permissionType: null,
        idPhongThiNghiem: [],
        thoiGianThucHienTu: null,
        thoiGianThucHienDen: null,
        tongKinhPhiTu: null,
        tongKinhPhiDen: null,
        idCoQuan: [],
    };

    private get extendQueryOptions() {
        return {
            permissionType: this.extendModelSearch.permissionType,
            idsPhongThiNghiem: this.extendModelSearch.idPhongThiNghiem ? this.extendModelSearch.idPhongThiNghiem.join(',') : null,
            idsCoQuan: this.extendModelSearch.idCoQuan ? this.extendModelSearch.idCoQuan.join(',') : null,
            thoiGianThucHienTu: this.extendModelSearch.thoiGianThucHienTu,
            thoiGianThucHienDen: this.extendModelSearch.thoiGianThucHienDen,
            tongKinhPhiTu: this.extendModelSearch.tongKinhPhiTu,
            tongKinhPhiDen: this.extendModelSearch.tongKinhPhiDen,

            ...this.queryOptions,
        };
    }

    ngOnInit() {
        if (this.isMain == null) {
            this.isMain = true;
        }
        this.tabName = this.menuQuery.getTitleWithCurrentUrl();
        if (this.idPhongThiNghiem) {
            this.extendModelSearch.idPhongThiNghiem.push(this.idPhongThiNghiem);
        }
        /*
            0 - Cá nhân
            1 - Quản lý
         */
        this.extendModelSearch.permissionType = 0;
        if (this.isQuanLy === true) {
            this.extendModelSearch.permissionType = 1;
        }

        super.ngOnInit();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    showFormCreateOrUpdate() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('PTN.HDKT'),
            content: FormHopDongKhaiThacComponent,
            width: 900,
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

    loadItems() {
        this.isLoading = true;
        this.gridView$ = this.apiService.post(this.url + '/GetList', this.extendQueryOptions, true).pipe(
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


    removeHandler(dataItem: IHopDongKhaiThac) {
        this.selectionIds = [];
        this.selectionIds.push(dataItem.id);
        this.removeSelectedHandler();
    }
    refreshHandler() {
        this.extendModelSearch = {
            permissionType: null,
            idPhongThiNghiem: [],
            thoiGianThucHienTu: null,
            thoiGianThucHienDen: null,
            tongKinhPhiTu: null,
            tongKinhPhiDen: null,
            idCoQuan: [],

        };
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
                    const remove$ = this.apiService.delete(this.url, body).pipe(takeUntil(this.destroyed$));
                    remove$.subscribe(() => {
                        this.selectionIds = [];
                        this.notification.showSuccessMessage(MessageConstant.COMMON.MSG_DELETE_DONE);
                        this.gridState.skip = 0;
                        this.loadItems();
                    });
                },
                nzCancelText: ModalDeleteConfig.no,
                nzOnCancel: () => {},
            });
        }
    }

}
