import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '@core/data-services/api.service';
import { UrlConstant } from '@core/constants/url.constant';
import { BaseRecruitmentComponent } from '@themes/views/management/recruitment/_base/base-recruitment.component';
import { MenuQuery } from '@management-state/menu/menu.query';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { PageConfig } from '@core/constants/app.constant';
import { TrangThaiKeHoachEnum } from '../../_models/recruitment.enum';
import { IKeHoachTuyenDung } from '../../_models/ke-hoach-tuyen-dung.model';
import { WindowService } from '@progress/kendo-angular-dialog';
import { CustomTranslateService } from '@core/services/common';
import { ActionEnum } from '@core/constants/enum.constant';
import { DataResult, GroupDescriptor, process } from '@progress/kendo-data-query';
import { FormThongTinNhanSuChungComponent } from '@themes/views/management/human-resource/components';

@Component({
    selector: 'app-vi-tri-can-tuyen',
    templateUrl: './vi-tri-can-tuyen.component.html',
    styleUrls: ['./vi-tri-can-tuyen.component.scss'],
})
export class ViTriCanTuyenComponent extends BaseRecruitmentComponent<any> implements OnInit, OnDestroy {
    @Input() itemKeHoach: IKeHoachTuyenDung;
    @Input() isNhapLyLich: boolean;
    gridView: DataResult;
    trangThaiKeHoachEnum = TrangThaiKeHoachEnum;
    public groups: GroupDescriptor[] = [{ field: 'tenNhomViTriViecLam', dir: null }];
    constructor(
        private apiService: ApiService,
        private windowService: WindowService,
        private translate: CustomTranslateService,
        protected menuQuery: MenuQuery
    ) {
        super(menuQuery);
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    nhapLyLich(data, keHoach: IKeHoachTuyenDung) {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('RECRUITMENT.KE_HOACH.TITLE'),
            // content: KhaiBaoTaiKhoanNhanSuComponent,
            content: FormThongTinNhanSuChungComponent,
            width: 1150,
            top: 10,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.action = ActionEnum.CREATE;
        param.model = undefined;
        param.modelViTriTuyenDung = data;
        param.idCoQuan = keHoach.idCoQuan;

        windowRef.result.subscribe(result => {
            this.opened = false;
        });
    }

    protected loadItems() {
        this.loading = true;
        this.apiService
            .read(UrlConstant.API.HRM_TD_KE_HOACH_DE_XUAT + '/ListCreated', this.queryOptions)
            .pipe(
                map(res => {
                    if (res.result) {
                        return {
                            data: res.result,
                            total: res.result.length,
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
                }),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                this.gridView = process(res.data, {
                    group: this.groups,
                });
            });
    }

    private get queryOptions() {
        return {
            ...this.queryString,
            idKeHoachTuyenDung: this.itemKeHoach.id,
        };
    }
}
