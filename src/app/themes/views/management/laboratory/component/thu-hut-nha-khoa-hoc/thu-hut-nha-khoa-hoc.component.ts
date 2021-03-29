import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PageConfig, ModalDeleteConfig } from '@core/constants/app.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService, CustomTranslateService, FileService } from '@core/services/common';
import { MenuQuery } from '@management-state/menu/menu.query';
import { WindowService, WindowCloseResult } from '@progress/kendo-angular-dialog';
import { NzModalService } from 'ng-zorro-antd';
import { map, tap, finalize } from 'rxjs/operators';
import { BaseLaboratoryComponent } from '../../_base/base-laboratory.component';
import { IThuHutNhaKhoaHoc } from '../../_models/ptn.model';
import { FormThuHutNhaKhoaHocComponent } from './form-thu-hut-nha-khoa-hoc/form-thu-hut-nha-khoa-hoc.component';

@Component({
  selector: 'app-thu-hut-nha-khoa-hoc',
  templateUrl: './thu-hut-nha-khoa-hoc.component.html',
  styleUrls: ['./thu-hut-nha-khoa-hoc.component.scss']
})
export class ThuHutNhaKhoaHocComponent extends BaseLaboratoryComponent<IThuHutNhaKhoaHoc> implements OnInit, OnDestroy {
    @Input() isMain: boolean;
    @Input() isQuanLy: boolean;
    @Input() idPhongThiNghiem: number;

    url: string = UrlConstant.API.THU_HUT_NHA_KHOA_HOC;

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
        idQuocTich: null
    };

    private get extendQueryOptions() {
        return {
            permissionType: this.extendModelSearch.permissionType,
            idsPhongThiNghiem: this.extendModelSearch.idPhongThiNghiem ? this.extendModelSearch.idPhongThiNghiem.join(',') : null,
            idQuocTich: this.extendModelSearch.idQuocTich,

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
            title: this.translate.get('PTN.THNKH'),
            content: FormThuHutNhaKhoaHocComponent,
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


    removeHandler(dataItem: IThuHutNhaKhoaHoc) {
        this.selectionIds = [];
        this.selectionIds.push(dataItem.id);
        this.removeSelectedHandler();
    }
    refreshHandler() {
        this.extendModelSearch = {
            permissionType: null,
            idPhongThiNghiem: [],
            idQuocTich: null

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
                    this.apiService.delete(this.url, body).subscribe(res => {
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


}
