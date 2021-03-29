import { ChangeDetectorRef, Component, Inject, Input, LOCALE_ID, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';
import { DateChangeEvent, SchedulerEvent } from '@progress/kendo-angular-scheduler';
import { GridDataResult, PagerSettings } from '@progress/kendo-angular-grid';
import { PageConfig } from '@core/constants/app.constant';
import { Observable, Subject } from 'rxjs';
import { UrlConstant } from '@core/constants/url.constant';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { State } from '@progress/kendo-data-query';
import { BaseCheckPermission } from '@core/auth';
import { WindowService } from '@progress/kendo-angular-dialog';
import { CustomTranslateService, NotificationService } from '@core/services/common';
import { NzModalService } from 'ng-zorro-antd';
import { MenuQuery } from '@management-state/menu/menu.query';
import { ApiService } from '@core/data-services/api.service';
import { DateUtil } from '@core/utils/date';
import { IScheduler, ITheoDoiTrangThai } from '../../_models/ptn.model';

import '@progress/kendo-angular-intl/locales/vi/all';
import { BaseLaboratoryComponent } from '../../_base';

export function generateColumn() {
    const hours = [];
    for (let i = 0; i < 25; i++) {
        hours.push({
            name: `${i}:00`,
            field: `h${i}`
        })
    }

    return hours;
}
@Component({
    selector: 'app-theo-doi-trang-thai',
    templateUrl: './theo-doi-trang-thai.component.html',
    styleUrls: ['./theo-doi-trang-thai.component.scss'],
    providers: [
    ],
})
export class TheoDoiTrangThaiComponent extends BaseLaboratoryComponent<ITheoDoiTrangThai> implements OnInit, OnDestroy {
    @ViewChild(TooltipDirective) public tooltipDir: TooltipDirective;
    @Input() isMain: boolean;
    opened = false;
    title: string;
    tabName: string;
    loading = false;
    gridView$: Observable<GridDataResult>;
    pageConfig: PagerSettings | boolean = PageConfig;
    pageConfigScheduler: PagerSettings | boolean = PageConfig;
    model: ITheoDoiTrangThai;
    gridState: State = {
        sort: [
            {
                field: 'id',
                dir: 'desc',
            },
        ],
        skip: 0,
        take: 20,
    };

    gridStateScheduler: State = {
        sort: [{ field: 'id', dir: 'desc' }],
        skip: 0,
        take: 20,
    };

    listItems: IScheduler[] = [];
    selectedDate: Date = new Date();
    events: GridDataResult;

    cols = generateColumn();

    constructor(
        protected apiService: ApiService,
        protected windowService: WindowService,
        private modal: NzModalService,
        private notificationService: NotificationService,
        protected menuQuery: MenuQuery,
        private translate: CustomTranslateService,
        private cd: ChangeDetectorRef
    ) {
        super(menuQuery, windowService);
    }

    modelSearch = {
        keyword: '',
        ngayDangKy: null,
        ngayDangKyBieuDo: null,
        idsCoQuan: [],
        idsThietBi: [],
        idsTrangThaiDangKy: [],
        idsPhongThiNghiem: [],
    };

    private get extendQueryOptions() {
        return {
            idsCoQuan: this.modelSearch.idsCoQuan != null ? this.modelSearch.idsCoQuan.join(',') : '',
            idsThietBi: this.modelSearch.idsThietBi != null ? this.modelSearch.idsThietBi.join(',') : '',
            idsTrangThaiDangKy: this.modelSearch.idsTrangThaiDangKy != null ? this.modelSearch.idsTrangThaiDangKy.join(',') : '',
            idsPhongThiNghiem: this.modelSearch.idsPhongThiNghiem != null ? this.modelSearch.idsPhongThiNghiem.join(',') : '',
            pageNumber: this.gridStateScheduler.skip / this.gridStateScheduler.take + 1,
            pageSize: this.gridStateScheduler.take,
        };
    }

    ngOnInit() {
        super.ngOnInit();
        this.tabName = this.menuQuery.getTitleWithCurrentUrl();
        this.modelSearch.ngayDangKyBieuDo = new Date();
        this.loadItemsGrid();
        // this.loadItems();
        this.loadSchedulers();
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    loadItems() {}

    changeDatePicker($event) {
        this.loadSchedulers();
    }

    onSchedulerChange(state: State) {
        this.gridStateScheduler = state;
        this.loadSchedulers();
    }

    loadSchedulers() {
        this.isLoading = true;
        this.apiService
            .post(
                UrlConstant.API.PTN_READPHONGTHINGHIEM + '/GetTheoDoiDangKyThietBi',
                {
                    ...this.extendQueryOptions,
                    ngayDangKy: this.modelSearch.ngayDangKyBieuDo,
                },
                true
            )
            .pipe(
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
                    if (res.total <= this.gridStateScheduler.take) {
                        this.pageConfigScheduler = false;
                    } else {
                        this.pageConfigScheduler = PageConfig;
                    }
                }),
                finalize(() => {
                    this.isLoading = false;
                })
            )
            .subscribe(res => {
                this.events = res;
                this.events.data.map((m: ITheoDoiTrangThai) => {
                    const start = m.tuGio.split(':').map((x: string) => Number.parseInt(x, 10)) as Array<number>;
                    const end = m.denGio.split(':').map((x: string) => Number.parseInt(x, 10)) as Array<number>;

                    let startHours: number = start[0];
                    let endHours: number = end[0];

                    if (end[1] > 30) {
                        endHours++;
                    }

                    for (let i = startHours; i <= endHours; i++) {
                        m[`h${i}`] = {
                            start: i === startHours && start[1] >= 30  ? false : true,
                            end: i === endHours && end[1] <= 30 ? false : true
                        };
                    }
                    return m;
                });
            });
    }

    loadItemsGrid() {
        this.isLoading = true;
        this.gridView$ = this.apiService
            .post(
                UrlConstant.API.PTN_READPHONGTHINGHIEM + '/GetTheoDoiDangKyThietBi',
                {
                    idsCoQuan: this.modelSearch.idsCoQuan != null ? this.modelSearch.idsCoQuan.join(',') : '',
                    idsThietBi: this.modelSearch.idsThietBi != null ? this.modelSearch.idsThietBi.join(',') : '',
                    idsTrangThaiDangKy: this.modelSearch.idsTrangThaiDangKy != null ? this.modelSearch.idsTrangThaiDangKy.join(',') : '',
                    idsPhongThiNghiem: this.modelSearch.idsPhongThiNghiem != null ? this.modelSearch.idsPhongThiNghiem.join(',') : '',
                    pageNumber: this.gridState.skip / this.gridState.take + 1,
                    pageSize: this.gridState.take,
                    ngayDangKy: this.modelSearch.ngayDangKy,
                },
                true
            )
            .pipe(
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

    onDateChange(args: DateChangeEvent): void {
        this.modelSearch.ngayDangKyBieuDo = DateUtil.getFullDateTime(args.selectedDate, 'T');
        // this.loadItems();
        //this.loadItemsGrid();
        this.cd.detectChanges();
    }

    showFormCreateOrUpdate() { }

    refreshHandler() {
        this.modelSearch = {
            keyword: '',
            ngayDangKy: null,
            ngayDangKyBieuDo: null,
            idsCoQuan: [],
            idsThietBi: [],
            idsTrangThaiDangKy: [],
            idsPhongThiNghiem: [],
        };
    }

    searchHandler() {
        this.gridState.skip = 0;
        this.loadItemsGrid();
    }

    openAdvanceSearch() {
        this.refreshHandler();
        this.openFirstTime = true;
        const el = document.querySelector('.search-backdrop');
        this.searchAdvance = !this.searchAdvance;
        if (this.searchAdvance) {
            el.classList.add('search-overlay');
        } else {
            el.classList.remove('search-overlay');
        }
    }
}
