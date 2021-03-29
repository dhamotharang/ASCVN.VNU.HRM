import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { MenuQuery } from '@management-state/menu/menu.query';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { State } from '@progress/kendo-data-query';
import { DropDownListEnum } from '@shared/containers/asc-select';
import { CacLoaiDonEnum } from '../../_models/quan-ly-don-tu.enum';
import { ILocDonNhan } from '../../_models/quan-ly-don-tu.model';

@Component({
    selector: 'app-bo-loc-don',
    templateUrl: './bo-loc-don.component.html',
    styleUrls: ['./bo-loc-don.component.scss'],
})
export class BoLocDonComponent implements OnInit {
    @Output() itemFilter = new EventEmitter<ILocDonNhan>();
    @Input() keyWord: string;
    @Input() idLoaiDon: CacLoaiDonEnum;
    cacLoaiDonEnum = CacLoaiDonEnum;
    dropdownListEnum = DropDownListEnum;
    modelFilter: ILocDonNhan = {
        keyWord: '',
        idPhanLoaiDon: null,
        idTrangThaiXuLy: null,
        idTrangThaiQuyetDinh: null,
        idNguoiGuiHoacNhan: null,
        thoiGianTu: null,
        thoiGianDen: null,
        duocDanhSao: false,
    };

    constructor(protected menuQuery: MenuQuery) {}

    ngOnInit() {}

    ngOnChanges(changes: SimpleChanges): void {
      if (changes){
        if (this.keyWord !== undefined){
          this.itemFilter.emit(this.queryOptions);
        }
      }
    }
    
    disabledNgayKetThuc = (current: Date): boolean => {
        if (!this.modelFilter.thoiGianTu) {
            return;
        }
        // Can not select days before today and today
        return differenceInCalendarDays(current, new Date(this.modelFilter.thoiGianTu)) < 0;
    };

    disabledNgayBatDau = (current: Date): boolean => {
        if (!this.modelFilter.thoiGianDen) {
            return;
        }
        // Can not select days before today and today
        return differenceInCalendarDays(current, new Date(this.modelFilter.thoiGianDen)) > 0;
    };

    resetHandler() {
        this.modelFilter = {
            keyWord: '',
            idPhanLoaiDon: null,
            idTrangThaiXuLy: null,
            idTrangThaiQuyetDinh: null,
            idNguoiGuiHoacNhan: null,
            thoiGianTu: null,
            thoiGianDen: null,
            duocDanhSao: false,
        };
    }

    filterHandler() {
        this.itemFilter.emit(this.queryOptions);
    }

    get queryOptions(): ILocDonNhan {
        return {
            keyWord: this.keyWord,
            idPhanLoaiDon: this.modelFilter.idPhanLoaiDon,
            idTrangThaiXuLy: this.modelFilter.idTrangThaiXuLy,
            idTrangThaiQuyetDinh: this.modelFilter.idTrangThaiQuyetDinh,
            idNguoiGuiHoacNhan: this.modelFilter.idNguoiGuiHoacNhan,
            thoiGianTu: this.modelFilter.thoiGianTu,
            thoiGianDen: this.modelFilter.thoiGianDen,
            duocDanhSao: this.modelFilter.duocDanhSao,
        };
    }
}
