import { EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { PageConfig, ReziseTable } from '@core/constants/app.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { MenuQuery } from '@management-state/menu/menu.query';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { GridDataResult, SelectionEvent } from '@progress/kendo-angular-grid';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';
import { PagerSettings } from '@progress/kendo-angular-treelist';
import { State } from '@progress/kendo-data-query';
import { ViewFileComponent } from '@shared/controls/view-file';
import { Observable } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { IQuyetDinh } from '../../_models/quan-ly-quyet-dinh.model';
import { LoaiQuyetDinhEnum } from '../../_models/quyet-dinh-enum.enum';

@Component({
  selector: 'app-danh-sach-quyet-dinh',
  templateUrl: './danh-sach-quyet-dinh.component.html',
  styleUrls: ['./danh-sach-quyet-dinh.component.scss']
})
export class DanhSachQuyetDinhComponent implements OnInit {
  @ViewChild(TooltipDirective) public tooltipDir: TooltipDirective;
  @Input() idLoaiQD: LoaiQuyetDinhEnum;
  @Input() filter: any;
  @Output() itemQuyetDinh = new EventEmitter<IQuyetDinh>();
  cacLoaiQuyetDinhEnum = LoaiQuyetDinhEnum;
  gridView$: Observable<GridDataResult>;
  opened = false;
  selectionIds: number[] = [];
  pageConfig: PagerSettings | boolean = false;
  pageHeight = window.innerHeight - ReziseTable - 130;
  listData: IQuyetDinh[] = [];
  isLoading = false;
  donNhanData: IQuyetDinh[] = [
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
donGuiData: IQuyetDinh[] = [
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
  constructor(
    private apiService: ApiService, protected menuQuery: MenuQuery,
    private windowService: WindowService
  ) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
        if (this.filter) {
            // this.modelSearch = this.filter;
            this.gridState.skip = 0;
        }
        switch (this.idLoaiQD) {
            case this.cacLoaiQuyetDinhEnum.CHUA_CO_QD:
                this.listData = this.donGuiData;
                // this.loadItems();
                break;
            case this.cacLoaiQuyetDinhEnum.DA_CO_QD:
                this.listData = this.donNhanData;
                // this.loadItems();
                break; 
        }
        this.selectionIds = [];
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
  selectRow(e: SelectionEvent) {
    if (e.selectedRows.length > 0) {
      const itemQD: IQuyetDinh = e.selectedRows[0].dataItem;
      this.itemQuyetDinh.emit(itemQD);
    }
  }
  onStateChange(state: State) {
    this.gridState = state;
    // this.loadItems();
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
        // keyword: this.modelSearch?.keyWord ? this.modelSearch.keyWord : null,

    };
}
}
