import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlConstant } from '@core/constants/url.constant';
import { INhanSuChiTiet } from '@themes/views/management/human-resource/_models/human-resource.model';
import { Subject, Subscription } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ApiService } from '@core/data-services/api.service';
import { DuLieuNhanSuEnum, HRM_URL } from '@themes/views/management/human-resource/_models';
import { EventBus, EventBusService } from '@core/services/common';
import { LocalStorageUtil } from '@core/utils/localstorage';

@Component({
    selector: 'app-popup-view-ho-so-ca-nhan',
    templateUrl: './popup-view-ho-so-ca-nhan.component.html',
    styleUrls: ['./popup-view-ho-so-ca-nhan.component.scss']
})
export class PopupViewHoSoCaNhanComponent implements OnInit, OnDestroy {
    @Input() isView: boolean;
    @Input() nhanSuId: number;
    @Input() duLieuNhanSuEnum: DuLieuNhanSuEnum;

    userDetail: INhanSuChiTiet;

    isViewTuyenDung = false;
    isViewQTCT = false;
    isViewDTBD = false;
    isViewCTXH = false;
    isViewLuong = false;
    isViewThiDua = false;
    isViewSucKhoe = false;
    isViewQHGD = false;
    isViewKhac = false;

    private avatarSubscription: Subscription;
    private destroyed$ = new Subject();

    constructor(
        private router: Router,
        private apiService: ApiService,
        private eventBus: EventBusService
    ) { }

    ngOnInit() {
        if (this.isView) {
            this.loadItem();
            // subcripble update avatar
            this.loadAvatar();
        }
    }

    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();

        if (this.avatarSubscription) {
            this.avatarSubscription.unsubscribe();
        }
    }

    loadItem() {
        this.apiService
            .read(UrlConstant.API.HRM_NHAN_SU + '/ById', {
                idNhanSu: this.nhanSuId,
                manHinh: this.duLieuNhanSuEnum,
            })
            .pipe(map(res => res.result))
            .subscribe(res => {
                this.userDetail = res;
                const arrayUrl = location.pathname.split('/');
                if (arrayUrl.includes(HRM_URL.LY_LICH_NHAN_SU)) {
                    if (LocalStorageUtil.getAvatar()) {
                        this.userDetail.pathHinhNhanSu = LocalStorageUtil.getAvatar();
                    }
                }
            });
    }

    private loadAvatar() {
        this.avatarSubscription = this.eventBus.on(EventBus.UpdateAvatarEnum, avatar => {
            this.loadItem();
        });
    }
}
