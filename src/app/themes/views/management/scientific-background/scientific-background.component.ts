import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlConstant } from '@core/constants/url.constant';
import { IUserInfo } from '@core/auth/user-token.model';
import { AuthenticateService } from '@core/auth/authenticate.service';

@Component({
    selector: 'app-scientific-background',
    templateUrl: './scientific-background.component.html',
    styleUrls: ['./scientific-background.component.scss'],
})
export class ScientificBackgroundComponent implements OnInit {
    user: IUserInfo;

    constructor(private auth: AuthenticateService, private router: Router) {}

    ngOnInit() {
        this.user = this.auth.getUserInfo();
        if (!this.auth.getUserInfo() || !this.auth.getUserInfo().doiTuongId) {
            this.router.navigate([UrlConstant.ROUTE.LOGIN_NS]);
        }
    }
}
