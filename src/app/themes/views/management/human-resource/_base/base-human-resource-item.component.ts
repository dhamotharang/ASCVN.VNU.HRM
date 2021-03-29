import { OnDestroy, OnInit } from '@angular/core';
import { BaseCheckPermission, ListRoleOption } from '@core/auth';
import { Subject } from 'rxjs';
import { SecurityUtil } from '@core/utils/security';
import { ActivatedRoute } from '@angular/router';
import { MenuQuery } from '@management-state/menu/menu.query';
import { DuLieuNhanSuEnum, HRM_URL, TrangThaiDuLieuDescription, TrangThaiDuLieuEnum } from '@themes/views/management/human-resource/_models';

export abstract class BaseHumanResourceItem<T> extends BaseCheckPermission implements OnInit, OnDestroy {
    opened = false;
    nhanSuId: number;

    // Nếu là trang lý lịch nhân sự
    isPersonal = false;

    // Nếu là trang duyệt lý lịch nhân sự
    isDuyetLyLichNhanSu = false;

    isTraCuuNhanSu = false;
    isCapNhatLuong = false;
    isCapNhatTuyenDung = false;

    // visible popover
    visible = false;

    model: T;
    duLieuNhanSuEnum: DuLieuNhanSuEnum;
    trangThaiDuLieus = TrangThaiDuLieuDescription;
    trangThaiDuLieuEnum = TrangThaiDuLieuEnum;
    protected destroyed$ = new Subject();

    constructor(protected route: ActivatedRoute, protected menuQuery: MenuQuery) {
        super(menuQuery);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.route.queryParams.subscribe(params => {
            if (params.k) {
                const data = JSON.parse(SecurityUtil.get(decodeURIComponent(params.k)));
                this.nhanSuId = Number.parseInt(data.idNhanSu, 10);
                this.duLieuNhanSuEnum =  Number.parseInt(data.manHinh, 10) as DuLieuNhanSuEnum;

                if (this.nhanSuId) {
                    this.loadData();
                }
            }
        });

        const pathName = location.pathname;
        const urlArray = pathName.split('/');
        Object.values(HRM_URL).forEach(key => {
            if (urlArray.includes(key)) {
                switch (key) {
                    case HRM_URL.HO_SO_CA_NHAN:
                        this.isPersonal = false;
                        this.isDuyetLyLichNhanSu = false;
                        this.isTraCuuNhanSu = true;
                        break;
                    case HRM_URL.LY_LICH_NHAN_SU:
                        this.isPersonal = true;
                        this.isDuyetLyLichNhanSu = false;
                        this.isTraCuuNhanSu = false;
                        break;
                    case HRM_URL.HO_SO_UNG_VIEN:
                    case HRM_URL.DUYET_HO_SO_CA_NHAN:
                        this.isPersonal = false;
                        this.isDuyetLyLichNhanSu = true;
                        this.isTraCuuNhanSu = false
                        break;
                }
            }
        });

        // set role
        this.roles.isUpdate = true;
        this.isCapNhatLuong = this.isHasPermission(ListRoleOption.HRM_0006);
        this.isCapNhatTuyenDung = this.isHasPermission(ListRoleOption.HRM_0007);
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    closePopover() {
        this.visible = false;
        this.loadData();
    }

    protected abstract loadData();
}
