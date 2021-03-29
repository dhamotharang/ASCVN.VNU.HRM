import { Component, Input, OnInit, OnChanges, SimpleChanges, OnDestroy, forwardRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDeleteConfig, PageConfig } from '@core/constants/app.constant';
import { ActionEnum } from '@core/constants/enum.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { CustomTranslateService, NotificationService } from '@core/services/common';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { GridDataResult, PagerSettings } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { DropDownListEnum } from '@shared/containers/asc-select';
import { NzModalService } from 'ng-zorro-antd';
import { Observable, Subject } from 'rxjs';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { FormChonThietBiComponent } from './form-chon-thiet-bi/form-chon-thiet-bi.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IDangKySuDungThietBi, IThietBi } from '../../_models/ptn.model';
import { BaseCheckPermission } from '@core/auth';
import { MenuQuery } from '@management-state/menu/menu.query';

@Component({
    selector: 'app-danh-sach-chon-thiet-bi',
    templateUrl: './danh-sach-chon-thiet-bi.component.html',
    styleUrls: ['./danh-sach-chon-thiet-bi.component.scss'],
    providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          multi: true,
          useExisting: forwardRef(() => DanhSachChonThietBiComponent),
        },
      ],

})
export class DanhSachChonThietBiComponent extends BaseCheckPermission implements OnInit, OnDestroy, OnChanges, ControlValueAccessor {
    @Input() idDangKySuDung: number;
    @Input() idPhongThiNghiem: number;
    @Input() idsThietBiDaChon: string;
    @Input() idsThietBi: number[] = [];

    gridView$: Observable<GridDataResult>;
    private model: IDangKySuDungThietBi;
    protected destroyed$ = new Subject();
    protected action: ActionEnum;
    selectionIds: number[] = [];
    listThietBi: IDangKySuDungThietBi[] = [];
    listDropThietBi: IThietBi[] = [];
    loading = false;
    opened = false;
    pageConfig: PagerSettings | boolean = false;
    dropdownListEnum = DropDownListEnum;
    gridState: State = {
        sort: [
            {
                field: 'id',
                dir: 'desc',
            },
        ],
        skip: 0,
        take: 10,
    };
    modelSearch = {
        keyword: '',
    };
    value: any[];
    listChonThietBi: number[] = [];
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

    onChange(value?) {
        this.value = this.listThietBi;
    }

    onTouched() {}

    writeValue(obj: any): void {
        // this.value = obj;
        if  (obj != null){
            this.listThietBi = obj;
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    ngOnChanges(c: SimpleChanges): void {
        this.idPhongThiNghiem = c.idPhongThiNghiem.currentValue;
        this.loadThietBiTheoPTNs();
    }

    ngOnInit() {
        if (this.idDangKySuDung) {
            super.ngOnInit();
            this.loadItems();
        }
    }

    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    private loadItems() {
        this.loading = true;
        this.gridView$ = this.apiService.post(UrlConstant.API.PTN_DANG_KY_SD_PTN + '/GetListThietBi', this.queryOptions, true).pipe(
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
            finalize(() => (this.loading = false))
        );
    }

    private get queryOptions() {
        return {
            pageSize: this.gridState.take,
            pageNumber: this.gridState.skip / this.gridState.take + 1,
            sortCol: this.gridState.sort[0].field,
            isAsc: this.gridState.sort[0].dir === 'asc' ? true : false,
            keyword: this.modelSearch.keyword,
            //idsThietBi: this.idDangKySuDung != null ? this.idDangKySuDung.toString() : '',
        };
    }

    onStateChange(state: State) {
        this.gridState = state;
        this.loadItems();
    }

    addHandler() {
        this.model = undefined;
        this.action = ActionEnum.CREATE;
        this.showFormCreateOrUpdate();
    }

    editHandler(dataItem) {
        this.model = dataItem;
        this.action = ActionEnum.UPDATE;
        this.showFormCreateOrUpdate();
    }

    removeHandler(dataItem: IDangKySuDungThietBi) {
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
                        .delete(UrlConstant.API.PTN_DANG_KY_SD_PTN, body)
                        .pipe(takeUntil(this.destroyed$))
                        .subscribe(() => {
                            // reset
                            this.selectionIds = [];

                            // show notification
                            this.notificationService.showSuccessMessage(MessageConstant.COMMON.MSG_DELETE_DONE);
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

    protected showFormCreateOrUpdate() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: 'Chọn thiết bị',
            content: FormChonThietBiComponent,
            width: 850,
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


    private loadThietBiTheoPTNs() {

        // this.idsThietBiDaChon = this.listThietBi.filter(m=> m.idThietBi > 0).map(m=> m.idThietBi).join(',');
        this.idsThietBiDaChon = this.idsThietBi ? this.idsThietBi.join(',') : '';

        this.apiService
            .post(UrlConstant.API.PTN_DANG_KY_SD_PTN + '/GetListThietBi', {
                pageSize: 0,
                pageNumber: 0,
                sortCol: 'id',
                isAsc: false,
                idPhongThiNghiem: this.idPhongThiNghiem != null ? this.idPhongThiNghiem : null,
                idsThietBi: this.idsThietBiDaChon != null && this.idsThietBiDaChon !== '' ? this.idsThietBiDaChon : null,
            })
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                this.listDropThietBi = res.result.items as IThietBi[];
            });
    }


    addThietBiHandler() {
        if (this.listChonThietBi) {
            this.listChonThietBi.map(m => {
                if (!this.idsThietBi.includes(m)) {
                    const item =  this.listDropThietBi.find(x => x.id = m );
                    if (item){
                        this.listThietBi.push({
                            id: 0,
                            idThietBi: m,
                            idDangKySuDung: this.idDangKySuDung ?? 0,
                            mucTieuHao: null,
                            dieuKienVanHanh: null,
                            ghiChu: null,
                            maThietBi: item.maThietBi ? item.maThietBi : '',
                            tenThietBi: item.tenThietBi ? item.tenThietBi : '',
                        });
                        this.idsThietBi.push(m);
                    }
                }
            });
            this.listChonThietBi = [];
        }
        this.loadThietBiTheoPTNs();
        this.onChange(this.listThietBi);
    }


    removeThietBiHandler(item: IThietBi, index: number) {
        this.listThietBi.splice(index, 1);
        this.idsThietBi.splice(index, 1);
        this.loadThietBiTheoPTNs();
        this.onChange(this.listThietBi);
    }

    onChangeThietBi()
    {
        this.loadThietBiTheoPTNs();
    }
}
