import { IVaiTro } from './../../../laboratory-catalog/_models/ptn.model';
import { Component, OnDestroy, OnInit, Input, forwardRef, OnChanges, SimpleChanges, Output, EventEmitter, ElementRef } from '@angular/core';
import { MenuQuery } from '@management-state/menu/menu.query';
import { WindowCloseResult, WindowRef, WindowService } from '@progress/kendo-angular-dialog';
import { BaseScienceTechnologyComponent } from '../../_base/base-science-technology.component';
import { takeUntil } from 'rxjs/operators';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { IThanhVienNgoai } from '../../_models/science-technology.model';
import { CustomTranslateService, NotificationService } from '@core/services/common';
import { FormThanhVienNgoaiKhcnComponent } from '@themes/views/management/laboratory-catalog/thanh-vien-ngoai-khcn/form-thanh-vien-ngoai-khcn/form-thanh-vien-ngoai-khcn.component';
import { ActionEnum } from '@core/constants/enum.constant';
import { NzModalService } from 'ng-zorro-antd';
import { AuthenticateService } from '@core/auth';

@Component({
    selector: 'chon-thanh-vien-ngoai',
    templateUrl: './chon-thanh-vien-ngoai.component.html',
    styleUrls: ['./chon-thanh-vien-ngoai.component.scss'],
})
export class ChonThanhVienNgoaiComponent extends BaseScienceTechnologyComponent<IThanhVienNgoai> implements OnInit, OnDestroy, OnChanges {
    @Input() idThamChieu: number;
    @Output() changedData = new EventEmitter<any>();
    @Input() thanhPhanThamGiaNgoai: [];

    url: string = UrlConstant.API.DM_THANH_VIEN_NGOAI;
    chonNhanSu: number[] = [];
    listNhanSu: IThanhVienNgoai[] = [];
    viewNhanSu: IThanhVienNgoai[] = [];
    idsNhanSu: number[] = [];
    listDropVaiTro: IVaiTro[] = [];
    listDropThanhVienNgoai: IThanhVienNgoai[] = [];
    value: any[];

    constructor(
        protected menuQuery: MenuQuery,
        protected windowService: WindowService,
        protected apiService: ApiService,
        private translate: CustomTranslateService,
        protected windowRef: WindowRef,
        protected auth: AuthenticateService,
    ) {
        super(menuQuery, windowService, auth);
    }

    ngOnChanges(c: SimpleChanges): void {
        this.idThamChieu = c.idThamChieu.currentValue;
        this.loadVaiTro();
    }

    ngOnInit() {
        this.roles.isCreate = true;
        this.roles.isUpdate = false;
        super.ngOnInit();
        this.loadVaiTro();
        this.loadThanhVienNgoai();
        if (this.thanhPhanThamGiaNgoai) {
            this.thanhPhanThamGiaNgoai.map((m: IThanhVienNgoai) => {
                this.viewNhanSu.push(m);
                this.idsNhanSu.push(m.id);
            });
        }

        const body = this.viewNhanSu;
        this.changedData.emit(body);
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    loadItems() {}

    changeNhanSu(data) {
        this.listNhanSu = data;
    }

    addNhanSuHandler() {
        if (this.listNhanSu) {
            this.listNhanSu.map(m => {
                if (!this.idsNhanSu.includes(m.id)) {
                    m.idVaiTro = 2;
                    this.viewNhanSu.push(m);
                    this.idsNhanSu.push(m.id);
                }
            });
            this.listNhanSu = [];
            this.chonNhanSu = [];
        }
    }

    removeNhanSuHandler(item: IThanhVienNgoai, index: number) {
        this.viewNhanSu.splice(index, 1);
        this.idsNhanSu.splice(index, 1);
    }

    private loadVaiTro() {
        this.apiService
            .post(
                UrlConstant.API.DM_VAI_TRO_KHCN + '/GetList',
                {
                    pageSize: 0,
                    pageNumber: 0,
                    sortCol: 'id',
                    isAsc: false,
                },
                true
            )
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                this.listDropVaiTro = res.result.items as IVaiTro[];
            });
    }

    loadThanhVienNgoai() {
        this.isLoading = true;
        this.apiService
            .post(
                this.url + '/GetList',
                {
                    pageSize: 0,
                    pageNumber: 0,
                },
                true
            )
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                this.isLoading = false;
                this.listDropThanhVienNgoai = res.result.items.map(item => ({
                    donVi: item.donVi,
                    id: item.id,
                    maThanhVien: item.maThanhVien,
                    trinhDoChuyenMon: item.trinhDoChuyenMon,
                    hoTenThanhVien: item.hoDem + ' ' + item.ten,
                }));
            });
    }

    onChange(event) {
        const body = this.viewNhanSu;
        this.changedData.emit(body);
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
            .post(this.url + '/GetById', { id: id }, true)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                this.model = res.result;
                this.showFormCreateOrUpdate();
            });
    }

    showFormCreateOrUpdate() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('SCI.TVN.THANH_VIEN_NGOAI'),
            content: FormThanhVienNgoaiKhcnComponent,
            width: 1000,
            top: 250,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.action = this.action;
        param.model = this.model;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.loadThanhVienNgoai();
                this.listNhanSu = [];
            }
        });
    }
}
