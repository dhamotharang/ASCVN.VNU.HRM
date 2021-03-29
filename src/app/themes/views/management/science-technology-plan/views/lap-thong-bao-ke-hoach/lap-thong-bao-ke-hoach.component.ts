import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalDeleteConfig, PageConfig } from '@core/constants/app.constant';
import { ActionEnum } from '@core/constants/enum.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { CustomTranslateService, FileService, NotificationService } from '@core/services/common';
import { MenuQuery } from '@management-state/menu/menu.query';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { SelectionEvent } from '@progress/kendo-angular-grid';
import { NzModalService } from 'ng-zorro-antd';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { BaseScienceTechnologyPlanComponent } from '../../_base/base-science-technology-plan.component';
import { ILapThongBaoKeHoach } from '../../_models/science-technology-plan.model';
import { FormLapThongBaoKeHoachComponent } from './form-lap-thong-bao-ke-hoach/form-lap-thong-bao-ke-hoach.component';

@Component({
  selector: 'app-lap-thong-bao-ke-hoach',
  templateUrl: './lap-thong-bao-ke-hoach.component.html',
  styleUrls: ['./lap-thong-bao-ke-hoach.component.scss']
})
export class LapThongBaoKeHoachComponent extends BaseScienceTechnologyPlanComponent<ILapThongBaoKeHoach> implements OnInit, OnDestroy {
    @Input() isMain: boolean;
    @Input() isQuanLy: boolean;

    url: string = UrlConstant.API.LKH_KHCN_LAP_KE_HOACH_THONG_BAO;
    sub_url_getList: string = '/GetList';
    sub_url_getID: string = '/GetById';

    extendModelSearch = {
        keyWord:'',
        ngayBatDau: null,
        ngayKetThuc: null,
        permisionType: 0
    };

    refreshHandler() {
        this.extendModelSearch = {
            keyWord:'',
            ngayBatDau: null,
            ngayKetThuc: null,
            permisionType: this.extendModelSearch.permisionType
        };
        this.loadItems();
    }

    private get extendQueryOptions() {
        return {
            keyWord: this.extendModelSearch.keyWord,
            ngayBatDau: this.extendModelSearch.ngayBatDau,
            ngayKetThuc: this.extendModelSearch.ngayKetThuc,
            permisionType: this.extendModelSearch.permisionType,
            ...this.queryOptions,
        };
    }

    

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

    ngOnInit() {
        this.roles.isCreate = true;
        this.roles.isDelete = true;
        this.roles.isUpdate = true;
        if (this.isMain == null) {
            this.isMain = true;
        }
        if(this.isQuanLy != null && this.isQuanLy){
            this.extendModelSearch.permisionType = 1;
        }
        this.tabName = this.menuQuery.getTitleWithCurrentUrl();
        this.loadItems();
    }

    addHandler() {
        this.action = ActionEnum.CREATE;
        this.title = this.translate.get('NV.TITLE.C');
        this.loadOneItems(0);
    }

    editHandler(dataItem) {
        this.action = ActionEnum.UPDATE;
        this.title = this.translate.get('NV.TITLE.M');
        this.loadOneItems(dataItem.id);
    }

    loadOneItems(id) {
        this.apiService
            .post(this.url + this.sub_url_getID, { id: id }, true)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                this.model = res.result;
                this.showFormCreateOrUpdate();
            });
    }

    loadItems() {
        this.isLoading = true;
        this.gridView$ = this.apiService.post(this.url + this.sub_url_getList, this.extendQueryOptions, true).pipe(
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

    selectRow(e: SelectionEvent) {
        if (e.selectedRows.length > 0) {
            const listChon = e.selectedRows;
            listChon.map(x => {
                this.selectionIds.push(x.dataItem.id);
            });
        }
        if (e.deselectedRows.length > 0) {
            const listBoChon = e.deselectedRows;
            listBoChon.map(x => {
                const index = this.selectionIds.findIndex(y => x.dataItem.id === y);
                if (index > -1) {
                    this.selectionIds.splice(index, 1);
                }
            });
        }
    }

    showFormCreateOrUpdate() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('SCIPLN.LKH.LAP_KE_HOACH'),
            content: FormLapThongBaoKeHoachComponent,
            width: 1200,
            top: 50,
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

    removeHandler(dataItem: ILapThongBaoKeHoach) {
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

    onExportExcel() {
        this.fileService.exportFile(this.url + '/ExportExcel', this.extendQueryOptions, 'du-an-dau-tu');
    }
}
