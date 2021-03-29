import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PageConfig, ReziseTable } from '@core/constants/app.constant';
import { MessageConstant, MessageErrorVI } from '@core/constants/message.constant';
import { ApiService } from '@core/data-services/api.service';
import { CustomTranslateService, NotificationService } from '@core/services/common';
import { FormUtil } from '@core/utils/form';
import { MenuQuery } from '@management-state/menu/menu.query';
import { WindowService, WindowRef } from '@progress/kendo-angular-dialog';
import { GridDataResult, PagerSettings } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { BaseScienceTechnologyFormComponent } from '../../_base/base-science-technology-form.component';
import { EKHCN } from '../../_models/science-technology.enum';
import { INhiemVuKHCN } from '../../_models/science-technology.model';

@Component({
    selector: 'app-form-duyet',
    templateUrl: './form-duyet.component.html',
    styleUrls: ['./form-duyet.component.scss'],
})
export class FormDuyetComponent extends BaseScienceTechnologyFormComponent<INhiemVuKHCN> implements OnInit, OnDestroy {
    @Input() enumView: number;
    ids: number[] = [];
    names: string[] = [];
    url: string;
    sub_url_getList: string = '/FindLikely'

    idManHinh: number;
    isLoading = false;
    gridView$: Observable<GridDataResult>;
    gridState: State = {
        sort: [{ field: 'Ma', dir: 'desc' }],
        skip: 0,
        take: 10,
    };
    pageConfig: PagerSettings | boolean = false;
    pageHeight = window.innerHeight - ReziseTable + 30;

    arrayHasID = [EKHCN.BAI_BAO, EKHCN.BAO_CAO, EKHCN.NHIEM_VU, EKHCN.SACH_CHUYEN_KHAO];
    tableFieldName: string;
    values: String[] = [];
    type: boolean = true;
    isVisibleGrid: boolean = true;
    constructor(
        private apiService: ApiService,
        private notification: NotificationService,
        private formBuilder: FormBuilder,
        protected windowService: WindowService,
        protected menuQuery: MenuQuery,
        protected windowRef: WindowRef,
        private translate: CustomTranslateService,
        private modal: NzModalService
    ) {
        super(windowRef);
    }

    ngOnInit() {
        super.ngOnInit();
        
        if(this.arrayHasID.includes(this.idManHinh)){
            this.type = true;
        }else{
            if(this.idManHinh == EKHCN.SAN_PHAM){
                this.isVisibleGrid = false;
            }
            this.type = false;
        }
        if(this.names.length > 0){
            this.values = this.names;
            this.loadItems();
        }  
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    onStateChange(state: State) {
        this.gridState = state;
        this.loadItems();
    }

    createForm() {
        this.form = this.formBuilder.group({
            idThamChieus: [[], Validators.required],
            trangThai: [null, Validators.required],
            // idFileDinhKem: [null],
            // ghiChu: [''],
        });
    }

    onSubmit() {
        if (this.ids != null && this.ids.length > 0) {
            this.form.get('idThamChieus').setValue(this.ids);

            if (this.form.invalid) {
                FormUtil.validateAllFormFields(this.form);
                return;
            }
            this.modal.confirm({
                nzTitle: '<i>' + this.translate.get('SCI.XAC_NHAN') + '</i>',
                nzContent: '<b>' + this.translate.get('SCI.YC_CHUYEN_TRANG_THAI') + '</b>',
                nzOkText: this.translate.get('SCI.DONG_Y'),
                nzCancelText: this.translate.get('SCI.HUY'),
                nzOnOk: () => {
                    const duyetKhongDuyet$ = this.apiService
                        .post(this.url + '/ChangeStatus', this.form.value)
                        .pipe(takeUntil(this.destroyed$));

                    duyetKhongDuyet$.subscribe(res => {
                        this.ids = [];
                        this.notification.showSuccessMessage(MessageConstant.COMMON.MSG_UPDATE_DONE);
                        this.closeForm();
                    });
                },
            });
        } else {
            this.notification.showErrorMessage(MessageErrorVI.PTN02);
            return;
        }
    }

    loadItems() {
        this.isLoading = true;
        this.gridView$ = this.apiService.post(this.url + this.sub_url_getList, this.queryOptions, true).pipe(
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

    protected get queryOptions() {
        return {
            tableFieldName:  this.type ? 'ma' : 'ten',
            values: this.values,
            pageNumber: this.gridState.skip / this.gridState.take + 1,
            pageSize: this.gridState.take,
        };
    }
    onSearchChange() {
        this.gridState.skip = 0;
        if(this.tableFieldName != undefined && this.tableFieldName != ''){
            this.values = [];
            this.values.push(this.tableFieldName);
        }else{
            this.values = this.names;
            this.tableFieldName = '';
        }
        this.loadItems();
    }
}


