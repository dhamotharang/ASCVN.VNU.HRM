import { EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { HinhThuTraLuongDescription, HRM_URL } from '@themes/views/management/human-resource/_models';
import { Subject } from 'rxjs';
import { DateUtil } from '@core/utils/date';

export interface IGenericeHumanResourceCompare {
    compareData?: Object;
}

// @ts-ignore
export abstract class BaseHumanResourceCompareComponent<T extends IGenericeHumanResourceCompare> implements OnInit, OnDestroy {
    @Input() compareData: T;
    @Output() closePopover = new EventEmitter<boolean>();
    arrayCompare = [];

    // Nếu là trang lý lịch nhân sự
    isPersonal = false;

    // Nếu là trang duyệt lý lịch nhân sự
    isDuyetLyLichNhanSu = false;

    // visible popover
    visible = false;

    opened = false;

    protected objectKeys: Object;
    protected exceptKeys: string[];
    protected destroyed$ = new Subject();

    constructor() {
    }

    ngOnInit(): void {
        this.loadCompareData();

        const pathName = location.pathname;
        const urlArray = pathName.split('/');
        Object.values(HRM_URL).forEach(key => {
            if (urlArray.includes(key)) {
                switch (key) {
                    case HRM_URL.HO_SO_CA_NHAN:
                        this.isPersonal = false;
                        this.isDuyetLyLichNhanSu = false;
                        break;
                    case HRM_URL.LY_LICH_NHAN_SU:
                        this.isPersonal = true;
                        this.isDuyetLyLichNhanSu = false;
                        break;
                    case HRM_URL.HO_SO_UNG_VIEN:
                    case HRM_URL.DUYET_HO_SO_CA_NHAN:
                        this.isPersonal = false;
                        this.isDuyetLyLichNhanSu = true;
                        break;
                }
            }
        });
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    loadCompareData() {
        if (this.compareData) {
            const sencondData = this.compareData.compareData;
            Object.keys(sencondData).forEach((field, index) => {
                let current = sencondData[field];
                let previous = this.compareData[field];
                if (current) {
                    current = current.toString().trim();
                    if (field === 'hinhThucTraLuong') {
                        current = HinhThuTraLuongDescription[sencondData[field]];
                    } else if (this.isDate(sencondData[field])) {
                        current = DateUtil.convertDateTime(sencondData[field]);
                    }
                }

                if (previous) {
                    previous = previous.toString().trim();
                    if (field === 'hinhThucTraLuong') {
                        previous = HinhThuTraLuongDescription[this.compareData[field]];
                    } else if (this.isDate(this.compareData[field])) {
                        previous = DateUtil.convertDateTime(this.compareData[field]);
                    }
                }

                if ((current || previous) && current !== previous && field !== 'compareData' && !this.exceptKeys.includes(field)) {
                    this.arrayCompare.push({
                        key: field,
                        title: this.objectKeys[field] ?? field,
                        currentValue: current,
                        previousValue: previous,
                    });
                }
            });
        }
    }

    isDate(input) {
        return input.length === 19 && Date.parse(input) > 0;
    }
}
