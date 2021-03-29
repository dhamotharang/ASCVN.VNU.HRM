import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ModalDeleteConfig, PageConfig } from '@core/constants/app.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { MenuQuery } from '@management-state/menu/menu.query';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { ActionEnum } from '@core/constants/enum.constant';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import { BaseRecruitmentComponent } from '../../_base/base-recruitment.component';
import { FormBaoCaoTapSuComponent } from '../../components/form-bao-cao-tap-su/form-bao-cao-tap-su.component';
import { ViewFileComponent } from '@shared/controls/view-file';
import { IListBaoCaoTapSu } from '../../_models/bao-cao-tap-su.model';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NotificationService } from '@core/services/common';

@Component({
    selector: 'app-bao-cao-tap-su',
    templateUrl: './bao-cao-tap-su.component.html',
    styleUrls: ['./bao-cao-tap-su.component.scss'],
})
export class BaoCaoTapSuComponent extends BaseRecruitmentComponent<any> implements OnInit, OnDestroy {
    modelFilter = {
        keyword: '',
        ngayBatDau: null,
        ngayKetThuc: null,
    };

    constructor(
        private apiService: ApiService,
        private windowService: WindowService,
        private translate: CustomTranslateService,
        private notification: NotificationService,
        private modal: NzModalService,
        protected menuQuery: MenuQuery
    ) {
        super(menuQuery);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    disabledNgayKetThuc = (current: Date): boolean => {
        if (!this.modelFilter.ngayBatDau) {
            return;
        }
        // Can not select days before today and today
        return differenceInCalendarDays(current, new Date(this.modelFilter.ngayBatDau)) < 0;
    };

    disabledNgayBatDau = (current: Date): boolean => {
        if (!this.modelFilter.ngayKetThuc) {
            return;
        }
        // Can not select days before today and today
        return differenceInCalendarDays(current, new Date(this.modelFilter.ngayKetThuc)) > 0;
    };

    onSearchHandler() {
        this.gridState.skip = 0;
        this.loadItems();
    }

    resetHandler() {
        this.modelFilter = {
            keyword: '',
            ngayBatDau: null,
            ngayKetThuc: null,
        };
    }

    onExportExcel() {}

    onNopBaoCao(data: IListBaoCaoTapSu) {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('RECRUITMENT.BC.TITLE'),
            content: FormBaoCaoTapSuComponent,
            width: 600,
            top: 10,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.model = data.idPhanCongHuongDanTapSu;
        param.action = ActionEnum.CREATE;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
            }
            this.loadItems();
        });
    }

    openViewFile(data: IListBaoCaoTapSu) {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('RECRUITMENT.TEXT.12'),
            content: ViewFileComponent,
            width: 1200,
            height: 800,
            top: 10,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.key = data.guidId;
        param.fileName = data.fileName;

        windowRef.result.subscribe(result => {
            this.opened = false;
        });
    }

    onHuy(idBaoCao: number) {
        this.modal.confirm({
            nzTitle: this.translate.get('RECRUITMENT.TEXT.29'),
            nzContent: this.translate.get('RECRUITMENT.TEXT.27'),
            nzOkText: ModalDeleteConfig.yes,
            nzOkType: 'danger',
            nzOnOk: () => {
                this.apiService
                    .delete(UrlConstant.API.TD_QUA_TRINH_TAP_SU + '/BaoCao', {
                        ids: [idBaoCao],
                    })
                    .subscribe(res => {
                        // show notification
                        this.notification.showSuccessMessage(this.translate.get('RECRUITMENT.MES.11'));
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

    protected loadItems() {
        this.loading = true;
        this.gridView$ = this.apiService.read(UrlConstant.API.TD_QUA_TRINH_TAP_SU + '/NopBaoCao', this.queryOptions).pipe(
            map(res => {
                if (res.result && res.result.items) {
                    return {
                        data: res.result.items as IListBaoCaoTapSu[],
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
                this.loading = false;
            })
        );
    }

    private get queryOptions() {
        return {
            pageSize: this.gridState.take,
            pageNumber: this.gridState.skip / this.gridState.take + 1,
            keyword: this.modelFilter.keyword,
            tuNgay: this.modelFilter.ngayBatDau,
            denNgay: this.modelFilter.ngayKetThuc,
        };
    }
}
