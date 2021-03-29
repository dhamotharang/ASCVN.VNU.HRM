import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlConstant } from '@core/constants/url.constant';
import { IDataSearch, INhanSuChiTiet } from '@themes/views/management/human-resource/_models/human-resource.model';
import { Subject, Subscription } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { ApiService } from '@core/data-services/api.service';
import { SecurityUtil } from '@core/utils/security';
import { DuLieuNhanSuEnum, HRM_KEY, HRM_URL, KEY_STORE_HRM } from '@themes/views/management/human-resource/_models';
import { EmitEvent, EventBus, EventBusService } from '@core/services/common';
import { LocalStorageUtil } from '@core/utils/localstorage';

@Component({
    selector: 'app-ho-so-ca-nhan',
    templateUrl: './ho-so-ca-nhan.component.html',
    styleUrls: ['./ho-so-ca-nhan.component.scss'],
    animations: [fadeInOnEnterAnimation(), fadeOutOnLeaveAnimation()],
})
export class HoSoCaNhanComponent implements OnInit, OnDestroy {
    @Input() isView: boolean;
    @Input() nhanSuId: number;

    userDetail: INhanSuChiTiet;
    userId: number;

    keyUrl: string;
    queryUrl: string;
    keyTabHRMs: string[] = [];
    currentUrl: string;
    duLieuNhanSuEnum = DuLieuNhanSuEnum;
    duLieuNhanSu: DuLieuNhanSuEnum;
    hrmkey = HRM_KEY;
    hrmkeyStore = KEY_STORE_HRM;
    goToDuyetHoSo = false;
    goToXacThucLyLich = false;
    goToTraCuuNhanSu = false;
    isDuyetHoSoNhanSu = false;

    private avatarSubscription: Subscription;
    private destroyed$ = new Subject();
    private eventBusSub: Subscription;

    tooltipTitle = 'Thông tin đã được thay đổi, chờ quản trị kiểm duyệt';

    constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService, private eventBus: EventBusService) { }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            if (params.k) {
                this.keyUrl = params.k;
                const data = JSON.parse(SecurityUtil.get(decodeURIComponent(params.k)));
                this.userId = Number.parseInt(data.idNhanSu, 10);
                this.duLieuNhanSu = Number.parseInt(data.manHinh, 10) as DuLieuNhanSuEnum;

                if (this.userId) {
                    this.loadItem();
                }

                if (this.duLieuNhanSu !== DuLieuNhanSuEnum.SU_DUNG_CHINH) {
                    this.loadTabDeXuat();
                }
            }

            // if (params.query) {
            //     this.queryUrl = params.query;
            //     this.keyTabHRMs = SecurityUtil.get(decodeURIComponent(params.query)).split(',');
            // }
        });
        if (this.isView) {
            this.userId = this.nhanSuId;
            this.duLieuNhanSu = DuLieuNhanSuEnum.DE_XUAT;
            this.loadItem();
            this.loadTabDeXuat();
        }

        const pathName = location.pathname;
        const urlArray = pathName.split('/');
        Object.values(HRM_URL).forEach(key => {
            if (urlArray.includes(key)) {
                this.currentUrl = key;
                if (key === HRM_URL.DUYET_HO_SO_CA_NHAN) {
                    this.isDuyetHoSoNhanSu = true;
                    this.goToXacThucLyLich = true;
                    this.goToDuyetHoSo = false;
                    this.goToTraCuuNhanSu = false;
                }
                if (key === HRM_URL.HO_SO_UNG_VIEN) {
                    this.isDuyetHoSoNhanSu = true;
                    this.goToDuyetHoSo = true;
                    this.goToXacThucLyLich = false;
                    this.goToTraCuuNhanSu = false;
                }
                if (key === HRM_URL.HO_SO_CA_NHAN) {
                    this.isDuyetHoSoNhanSu = false;
                    this.goToTraCuuNhanSu = true;
                    this.goToDuyetHoSo = false;
                    this.goToXacThucLyLich = false;
                }
            }
        });

        // subcripble update avatar
        this.loadAvatar();
        this.eventBusSub = this.eventBus.on(EventBus.DuyetTabThongTinNhanSu, (flag: boolean) => {
            if (flag) {
                this.loadTabDeXuat();
            }
        });
    }

    isShowTabHRM(key: string) {
        return this.keyTabHRMs.includes(key);
    }

    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();

        if (this.avatarSubscription) {
            this.avatarSubscription.unsubscribe();
        }
        this.eventBusSub.unsubscribe();
    }

    loadItem() {
        this.apiService
            .read(UrlConstant.API.HRM_NHAN_SU + '/ById', {
                idNhanSu: this.userId,
                manHinh: this.duLieuNhanSu,
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

    goBack() {
        if (this.goToXacThucLyLich) {
            this.router.navigate(['/management/human-resource/xac-thuc-thong-tin-nhan-su'], {
                queryParams: {
                    query: encodeURIComponent(SecurityUtil.set(localStorage.getItem(this.hrmkeyStore.XAC_THUC_NHAN_SU))),
                }
            });
        }
        if (this.goToDuyetHoSo) {
            this.router.navigate(['/management/tuyen-dung/duyet-ho-so-ung-vien'], {
                queryParams: {
                    query: encodeURIComponent(SecurityUtil.set(localStorage.getItem(this.hrmkeyStore.DUYET_HO_SO))),
                }
            });
        }
        if (this.goToTraCuuNhanSu) {
            this.router.navigate(['/management/human-resource/tra-cuu-nhan-su'], {
                queryParams: {
                    query: encodeURIComponent(SecurityUtil.set(localStorage.getItem(this.hrmkeyStore.TRA_CUU_NHAN_SU))),
                }
            });
        }
    }

    private loadAvatar() {
        // const arrayUrl = location.pathname.split('/');
        // if (arrayUrl.includes(HRM_URL.LY_LICH_NHAN_SU)) {
        //
        // }

        this.avatarSubscription = this.eventBus.on(EventBus.UpdateAvatarEnum, avatar => {
            this.loadItem();
        });
    }

    private loadTabDeXuat() {
        this.apiService
            .read(UrlConstant.API.HRM_NS_THONG_TIN_TAB_DE_XUAT, {
                idNhanSu: this.userId,
            })
            .pipe(
                map(res => {
                    const results = res.result as any[];
                    const listKeyChange = results.filter(x => x.viTriTab !== 111);
                    return listKeyChange.map(m => m.thongTinTabHienThi);
                }),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                this.keyTabHRMs = res;
                localStorage.setItem('_keyMenuChange', res.join(','));
            });
    }
}
