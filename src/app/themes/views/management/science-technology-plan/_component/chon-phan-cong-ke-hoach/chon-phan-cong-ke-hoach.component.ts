import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthenticateService } from '@core/auth';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { MenuQuery } from '@management-state/menu/menu.query';
import { NhanSuService } from '@management-state/nhan-su/nhan-su.service';
import { WindowService } from '@progress/kendo-angular-dialog';
import { ICoQuanByNhanSu } from '@themes/views/management/laboratory/_models/ptn.model';
import { Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { BaseScienceTechnologyPlanComponent } from '../../_base/base-science-technology-plan.component';
import { IChonPhanCong, ILoaiKeHoach, IPhanCongThucHien } from '../../_models/science-technology-plan.model';
import { INhanSuCoQuanChucVu } from '@themes/views/management/human-resource/_models/human-resource.model';

@Component({
    selector: 'app-chon-phan-cong-ke-hoach',
    templateUrl: './chon-phan-cong-ke-hoach.component.html',
    styleUrls: ['./chon-phan-cong-ke-hoach.component.scss']
})
export class ChonPhanCongKeHoachComponent extends BaseScienceTechnologyPlanComponent<IChonPhanCong> implements OnInit, OnDestroy {
    @Input() idThongBao: number;
    @Output() changedData = new EventEmitter<any>();

    url_loai_ke_hoach: string = UrlConstant.API.DM_LOAI_KE_HOACH;
    url_phan_cong_ns: string = UrlConstant.API.LKH_KHCN_PHAN_CONG_THUC_HIEN;
    coQuanNhanSu$: Observable<ICoQuanByNhanSu>;
    listLoaiKeHoach: ILoaiKeHoach[];
    nhanSuCoQuanChucVus: INhanSuCoQuanChucVu[];
    arrNhanSu: IPhanCongThucHien[];
    idCoQuan: number;
    
    constructor(
        private apiService: ApiService,
        protected windowService: WindowService,
        protected menuQuery: MenuQuery,
        private nhanSuService: NhanSuService,
        protected auth: AuthenticateService,
    ) {
        super(menuQuery, windowService);
    }

    ngOnInit() {
        this.loadNhanSus();
        this.loadItemPhanCongNhanSu(this.idThongBao);
    }
    
    showFormCreateOrUpdate() { }

    loadItemPhanCongNhanSu(idThongBao){
        const $getList = this.apiService.post(this.url_phan_cong_ns + "/ListByThongBaoId", {
            id: idThongBao
        }, true);
        $getList.subscribe(res => {
            if(res){
                this.arrNhanSu = res.result.items as IPhanCongThucHien[];
                this.loadItems();
            }
        })
    }

    loadItems() { 
        const selectNS = this.arrNhanSu as IPhanCongThucHien[];
        this.apiService
            .post(
                this.url_loai_ke_hoach + '/GetList',
                {
                    pageNumber: this.gridState.skip / this.gridState.take + 1,
                    pageSize: this.gridState.take,
                    sortCol: "id",
                    isAsc: true
                },
                true
            )
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                this.listLoaiKeHoach = res.result.items.map(el => {
                    return {
                        ...el,
                        idNhanSu: selectNS.find(pc => pc.idLoaiKeHoach == el.id) ? selectNS.find(pc => pc.idLoaiKeHoach == el.id).idNhanSu : null,
                    }
                });
            });
        this.sendData();
    }

    loadNhanSus() {
        this.coQuanNhanSu$ = this.apiService.read(UrlConstant.API.HRM_DANH_MUC_CO_QUAN + '/ByNhanSu', {}).pipe(map(res => res.result));
        this.coQuanNhanSu$.subscribe(res => {
            if (res.idCoQuanCap1) {
                if (res.idCoQuanCap1) {
                    this.idCoQuan = res.idCoQuanCap1;
                    this.nhanSuService
                        .getNhanSuByCoQuan(0, 0, null, this.idCoQuan)
                        .pipe(takeUntil(this.destroyed$))
                        .subscribe(res => (this.nhanSuCoQuanChucVus = res));
                }
            }
        });

    }

    onChange(idNhanSu, idLoaiKeHoach) {
        let chonPhanCong = {
            idCoQuan: this.idCoQuan,
            idThongBao: this.idThongBao,
            idLoaiKeHoach: idLoaiKeHoach,
            idNhanSu: idNhanSu,
            ghiChu: "",
        } as IPhanCongThucHien;

        const index = this.arrNhanSu.findIndex(el => el.idLoaiKeHoach == chonPhanCong.idLoaiKeHoach);
        if (index > -1) {
            this.arrNhanSu.splice(index, 1);
        }

        this.arrNhanSu.push(chonPhanCong);
        this.sendData();
    }

    sendData(){
        this.model = {
            idThongBao: this.idThongBao,
            phanCongItems: this.arrNhanSu
        }
        const body = this.model;
        this.changedData.emit(body);
    }
}
