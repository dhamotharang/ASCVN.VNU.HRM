import { Component, HostListener, OnInit, ViewChild, OnDestroy, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { State } from '@progress/kendo-data-query';
import { GridDataResult, PagerSettings, SelectionEvent } from '@progress/kendo-angular-grid';
import { Observable, Subject } from 'rxjs';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';
import { ApiService } from '@core/data-services/api.service';
import { IKeHoachDeXuat } from '@themes/views/management/recruitment/_models';
import { UrlConstant } from '@core/constants/url.constant';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { PageConfig, ReziseTable } from '@core/constants/app.constant';
import { BaseCheckPermission } from '@core/auth/base-check-permission';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { MenuQuery } from '@management-state/menu/menu.query';
import { ViewFileComponent } from '@shared/controls/view-file';
import { IDonTu, ILocDonNhan } from '../../_models/quan-ly-don-tu.model';
import { CacLoaiDonEnum, PhanLoaiDonEnum } from '../../_models/quan-ly-don-tu.enum';
import { LoaiQuyetDinhEnum } from '../../_models/quyet-dinh-enum.enum';

@Component({
    selector: 'app-danh-sach-don',
    templateUrl: './danh-sach-don.component.html',
    styleUrls: ['./danh-sach-don.component.scss'],
})
export class DanhSachDonComponent extends BaseCheckPermission implements OnInit, OnDestroy {
    @ViewChild(TooltipDirective) public tooltipDir: TooltipDirective;
    @Input() idLoaiDon: CacLoaiDonEnum;
    @Input() filter: ILocDonNhan;
    @Output() itemDonTu = new EventEmitter<IDonTu>();
    cacLoaiDonEnum = CacLoaiDonEnum;
    modelViTriTuyenDung: IKeHoachDeXuat;
    gridView$: Observable<GridDataResult>;
    opened = false;
    selectionIds: number[] = [];
    pageConfig: PagerSettings | boolean = false;
    pageHeight = window.innerHeight - ReziseTable - 130;
    listData: IDonTu[] = [];
    donNhanData: IDonTu[] = [
        {
            id: 1,
            sao: true,
            tieuDe: 'V/V Xin thôi việc',
            noiDung: 'Cơ quan công tác cách xa nhà, môi trường làm việc chưa tốt, thu nhập,...',
            tenNguoiGui: 'Phạm văn Long',
            idNguoiGui: 1,
            thoiGianGui: '2015-03-25T12:00:00Z',
            idFileDinhKem: 1,
            trangThaiXuLy: 'Trình cấp trên',
            thoiGianXuLy: '2015-04-25T11:00:00Z',
            phanLoaiDon: 'Đơn xin chấm dứt HĐLĐ',
            idPhanLoaiDon: 3,
        },
        {
            id: 2,
            sao: true,
            tieuDe: 'Xin nghỉ dưỡng bệnh',
            noiDung: 'Tôi xin được phép nghỉ việc vì lý do XYZ...',
            tenNguoiGui: 'Trần Thị Tuyết',
            idNguoiGui: 1,
            thoiGianGui: '2015-03-25T12:00:00Z',
            idFileDinhKem: 1,
            trangThaiXuLy: 'Đề xuất',
            thoiGianXuLy: '2015-04-25T11:00:00Z',
            phanLoaiDon: 'Đơn xin nghỉ ốm',
            idPhanLoaiDon: 2,
        },
    ];
    donGuiData: IDonTu[] = [
        {
            id: 1,
            sao: true,
            tieuDe: 'V/V Khám tổng quát',
            noiDung: 'Tôi muốn đi khám tổng quát',
            tenNguoiGui: 'Phạm Văn Duy',
            idNguoiGui: 1,
            thoiGianGui: '2015-03-25T12:00:00Z',
            idFileDinhKem: 1,
            trangThaiXuLy: 'Trình cấp trên',
            thoiGianXuLy: '2015-04-25T11:00:00Z',
            phanLoaiDon: 'Đơn xin nghỉ ốm',
            idPhanLoaiDon: 1,
        },
        {
            id: 2,
            sao: true,
            tieuDe: 'Xin nghỉ phép',
            noiDung: 'Nghỉ phép năm',
            tenNguoiGui: 'Nguyễn Trọng Nghĩa',
            idNguoiGui: 1,
            thoiGianGui: '2015-03-25T12:00:00Z',
            idFileDinhKem: 1,
            trangThaiXuLy: 'Đề xuất',
            thoiGianXuLy: '2015-04-25T11:00:00Z',
            phanLoaiDon: 'Đơn xin nghỉ phép',
            idPhanLoaiDon: 2,
        },
    ];
    donNhapData: IDonTu[] = [
        {
            id: 1,
            sao: true,
            tieuDe: 'Đơn xin nghỉ ốm',
            noiDung: 'Tôi bận việc cá nhân xin nghỉ phép',
            tenNguoiGui: 'Tạ kim chi',
            idNguoiGui: 1,
            thoiGianGui: '2015-03-25T12:00:00Z',
            idFileDinhKem: 1,
            trangThaiXuLy: 'Lưu nháp',
            thoiGianXuLy: '2015-04-25T11:00:00Z',
            phanLoaiDon: 'Đơn xin chấm dứt HĐLĐ',
            idPhanLoaiDon: 1,
        },
        {
            id: 2,
            sao: true,
            tieuDe: 'Xin nghỉ dưỡng bệnh',
            noiDung: 'Tôi bận việc cá nhân xin nghỉ phép',
            tenNguoiGui: 'Tạ kim chi',
            idNguoiGui: 1,
            thoiGianGui: '2015-03-25T12:00:00Z',
            idFileDinhKem: 1,
            trangThaiXuLy: 'Lưu nháp',
            thoiGianXuLy: '2015-04-25T11:00:00Z',
            phanLoaiDon: 'Đơn xin nghỉ ốm',
            idPhanLoaiDon: 2,
        },
    ];
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.pageHeight = event.target.innerHeight - ReziseTable - 130;
    }
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
    modelSearch: ILocDonNhan;
    isLoading = false;
    private destroyed$ = new Subject();

    constructor(private apiService: ApiService, protected menuQuery: MenuQuery, private windowService: WindowService) {
        super(menuQuery);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes) {
            if (this.filter) {
                this.modelSearch = this.filter;
                this.gridState.skip = 0;
            }
            switch (this.idLoaiDon) {
                case this.cacLoaiDonEnum.DON_DA_GUI:
                    this.listData = this.donGuiData;
                    // this.loadItems();
                    break;
                case this.cacLoaiDonEnum.DON_DA_NHAN:
                    this.listData = this.donNhanData;
                    // this.loadItems();
                    break;
                case this.cacLoaiDonEnum.DON_NHAP:
                    this.listData = this.donNhapData;
                    // this.loadItems();
                    break;
            }
            this.selectionIds = [];
        }
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    onStateChange(state: State) {
        this.gridState = state;
        this.loadItems();
    }

    selectRow(e: SelectionEvent) {
        if (e.selectedRows.length > 0) {
            const itemDT: IDonTu = e.selectedRows[0].dataItem;
            this.itemDonTu.emit(itemDT);
        }
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

    private loadItems() {
        this.isLoading = true;
        this.gridView$ = this.apiService.read(UrlConstant.API.HRM_TD_KE_HOACH_TUYEN_DUNG + '/List', this.queryOptions).pipe(
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
            sortName: this.gridState.sort[0].field,
            sortASC: this.gridState.sort[0].dir === 'asc',
            keyword: this.modelSearch?.keyWord ? this.modelSearch.keyWord : null,

        };
    }
}
