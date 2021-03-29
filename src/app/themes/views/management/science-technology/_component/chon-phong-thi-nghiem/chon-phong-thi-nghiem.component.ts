import { Component, OnDestroy, OnInit, Input, forwardRef, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MenuQuery } from '@management-state/menu/menu.query';
import { WindowService } from '@progress/kendo-angular-dialog';
import { BaseScienceTechnologyComponent } from '../../_base/base-science-technology.component';
import { takeUntil } from 'rxjs/operators';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { IPhongThiNghiem } from '../../_models/science-technology.model';
import { AuthenticateService } from '@core/auth';

@Component({
    selector: 'app-chon-phong-thi-nghiem',
    templateUrl: './chon-phong-thi-nghiem.component.html',
    styleUrls: ['./chon-phong-thi-nghiem.component.scss']
})
export class ChonPhongThiNghiemComponent extends BaseScienceTechnologyComponent<IPhongThiNghiem>
    implements OnInit, OnDestroy, OnChanges {
    @Input() idThamChieu: number;
    @Input() suDungPTN: [];
    @Output() changedData = new EventEmitter<any>();
    isDisabled: boolean;
    chonPTN: number[] = [];
    listPTN: IPhongThiNghiem[] = [];
    viewPTN: IPhongThiNghiem[] = [];
    idsPTN: number[] = [];
    listDropPTN: IPhongThiNghiem[] = [];
    value: any[];

    constructor(
        protected menuQuery: MenuQuery, 
        protected windowService: WindowService, 
        protected apiService: ApiService,
        protected auth: AuthenticateService,
    ) 
    {
        super(menuQuery, windowService, auth);
    }

    ngOnChanges(c: SimpleChanges): void {
        this.idThamChieu = c.idThamChieu.currentValue;
    }

    ngOnInit() {
        super.ngOnInit();
        this.loadPTN();
        if (this.suDungPTN) {
            this.suDungPTN.map((m: IPhongThiNghiem) => {
                m.id = m.idPhongThiNghiem;
                this.viewPTN.push(m);
                this.idsPTN.push(m.idPhongThiNghiem);
            });
        }
        const body = this.viewPTN;
        this.changedData.emit(body);
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    showFormCreateOrUpdate() { }

    loadItems() { }

    changePhongThiNghiem(data) {
        this.listPTN = data;
    }

    addPhongThiNghiemHandler() {
        if (this.listPTN) {
            this.listPTN.map(m => {
                if (!this.idsPTN.includes(m.id)) {
                    this.viewPTN.push(m);
                    this.idsPTN.push(m.id);
                }
            });
            this.listPTN = [];
            this.chonPTN = [];
        }
    }

    removePhongThiNghiemHandler(item: IPhongThiNghiem, index: number) {
        this.viewPTN.splice(index, 1);
        this.idsPTN.splice(index, 1);
    }

    private loadPTN() {
        this.apiService
            .post(UrlConstant.API.PTN_READPHONGTHINGHIEM + '/GetDanhSachPhongThiNghiem', {
                pageSize: 0,
                pageNumber: 0,
                permissionType: 1,
            }, true)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                this.listDropPTN = res.result.items as IPhongThiNghiem[];
            });
    }

    onChange(event) {
        const body = this.viewPTN;
        this.changedData.emit(body);
    }
    parserPercent = (value: string) => value.replace(' %', '');

    formatterPercent(value: number){
        let result = value ? value : 0;
        return `${result} %`;
    }
}
