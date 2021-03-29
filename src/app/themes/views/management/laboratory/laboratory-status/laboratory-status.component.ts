import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseCheckPermission } from '@core/auth';
import { MenuQuery } from '@management-state/menu/menu.query';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-laboratory-status',
    templateUrl: './laboratory-status.component.html',
    styleUrls: ['./laboratory-status.component.scss'],
})
export class LaboratoryStatusComponent extends BaseCheckPermission implements OnInit, OnDestroy {
    opened = false;
    private destroyed$ = new Subject();

    constructor(protected menuQuery: MenuQuery) {
        super(menuQuery);
    }

    ngOnInit() {}

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}
