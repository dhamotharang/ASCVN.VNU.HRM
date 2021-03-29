import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BaseCheckPermission } from '@core/auth';
import { MenuQuery } from '@management-state/menu/menu.query';
import {  Subject } from 'rxjs';

@Component({
  selector: 'app-quan-ly-doi-ngu',
  templateUrl: './quan-ly-doi-ngu.component.html',
  styleUrls: ['./quan-ly-doi-ngu.component.scss']
})
export class QuanLyDoiNguComponent extends BaseCheckPermission implements OnInit, OnDestroy {
    private destroyed$ = new Subject();
    opened = false;
    constructor(
        protected menuQuery: MenuQuery,

    ) {
        super(menuQuery);
    }

    ngOnInit() {
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}
