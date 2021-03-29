import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '@core/auth/authenticate.service';
import { UrlConstant } from '@core/constants/url.constant';
import { SecurityUtil } from '@core/utils/security';
import { DuLieuNhanSuEnum, IDataSearch } from '../../_models';

@Component({
    selector: 'app-redirect-profile',
    templateUrl: './redirect-profile.component.html',
    styleUrls: ['./redirect-profile.component.scss'],
})
export class RedirectProfileComponent implements OnInit {
    constructor(private auth: AuthenticateService, private router: Router, private location: Location) {}

    ngOnInit() {
        if (this.auth.getUserInfo() && this.auth.getUserInfo().doiTuongId) {
            const data = {
                idNhanSu: parseInt(this.auth.getUserInfo().doiTuongId, 10),
                manHinh: DuLieuNhanSuEnum.DE_XUAT,
            } as IDataSearch;
            this.router.navigate([UrlConstant.ROUTE.HRM_LY_LICH_NHAN_SU], {
                queryParams: {
                    k: encodeURIComponent(SecurityUtil.set(JSON.stringify(data))),
                },
            });
        } else {
            this.router.navigate([UrlConstant.ROUTE.LOGIN_NS]);
        }
    }
}
