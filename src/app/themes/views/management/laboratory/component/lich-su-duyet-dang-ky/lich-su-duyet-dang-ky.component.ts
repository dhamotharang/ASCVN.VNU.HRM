import { Component, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseCheckPermission } from '@core/auth';
import { PageConfig, ReziseTable } from '@core/constants/app.constant';
import { ActionEnum } from '@core/constants/enum.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { CustomTranslateService, NotificationService } from '@core/services/common';
import { MenuQuery } from '@management-state/menu/menu.query';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { GridDataResult, PagerSettings } from '@progress/kendo-angular-grid';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';
import { State } from '@progress/kendo-data-query';
import { DropDownListEnum } from '@shared/containers/asc-select';
import { ViewFileComponent } from '@shared/controls/view-file';
import { NzModalService } from 'ng-zorro-antd';
import { Observable, Subject } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { ETrangThaiDangKyPhong } from '../../_models/ptn.enum';
import { ILichSuDuyetDangKy } from '../../_models/ptn.model';

@Component({
    selector: 'app-lich-su-duyet-dang-ky',
    templateUrl: './lich-su-duyet-dang-ky.component.html',
    styleUrls: ['./lich-su-duyet-dang-ky.component.scss'],
})
export class LichSuDuyetDangKyComponent extends BaseCheckPermission implements OnInit, OnDestroy {
    @ViewChild(TooltipDirective) public tooltipDir: TooltipDirective;
    @Input() isMain: boolean;
    @Input() idDangKySuDung: number;
    opened = false;
    title: string;
    private destroyed$ = new Subject();
    searchAdvance = false;
    openFirstTime = false;
    isLoading = false;
    chonNhanSu: number[] = [];
    gridView$: Observable<GridDataResult>;
    pageConfig: PagerSettings | boolean = PageConfig;
    model: ILichSuDuyetDangKy;
    action: ActionEnum;
    selectionIds: number[] = [];
    dropdownListEnum = DropDownListEnum;
    searchControl = new FormControl();
    trangThaiDangKyPhongEnum = ETrangThaiDangKyPhong;
    tabName: string;
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

    modelSearch = {
        idDangKySuDung: null,
    };

    constructor(
        private apiService: ApiService,
        private windowService: WindowService,
        private modal: NzModalService,
        private notificationService: NotificationService,
        protected menuQuery: MenuQuery,
        private translate: CustomTranslateService
    ) {
        super(menuQuery);
    }

    pageHeight = window.innerHeight - ReziseTable + 32;
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.pageHeight = event.target.innerHeight - ReziseTable + 32;
    }

    ngOnInit() {
        this.tabName = this.menuQuery.getTitleWithCurrentUrl();
        if (this.idDangKySuDung != null && this.idDangKySuDung > 0 && this.idDangKySuDung != undefined) {
            this.modelSearch.idDangKySuDung = this.idDangKySuDung;
        }
        super.ngOnInit();
        this.loadItems();
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    loadItems() {
        this.isLoading = true;
        this.gridView$ = this.apiService
            .post(UrlConstant.API.PTN_READPHONGTHINGHIEM + '/GetDangKySuDung_LichSuDuyet', this.queryOptions, true)
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

    private get queryOptions() {
        return {
            pageSize: this.gridState.take,
            pageNumber: this.gridState.skip / this.gridState.take + 1,
            sortCol: this.gridState.sort[0].field,
            isAsc: this.gridState.sort[0].dir === 'asc' ? true : false,
            idDangKySuDung: this.modelSearch.idDangKySuDung,
        };
    }

    onStateChange(state: State) {
        this.gridState = state;
        this.loadItems();
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
            title: 'Xem tập tin Đính kèm',
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
}
