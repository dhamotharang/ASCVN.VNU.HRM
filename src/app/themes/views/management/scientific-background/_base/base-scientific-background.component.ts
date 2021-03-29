import { Observable, Subject } from 'rxjs';
import { GridDataResult, PagerSettings } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActionEnum, ActionType } from '@core/constants/enum.constant';
import { MenuQuery } from '@management-state/menu/menu.query';
import { BaseCheckPermission } from '@core/auth/base-check-permission';
import { AuthenticateService } from '@core/auth';

export abstract class BaseScientificBackgroundComponent<T> extends BaseCheckPermission implements OnInit, OnDestroy {
    loading = false;
    opened = false;
    gridView$: Observable<GridDataResult>;
    gridState: State = {
        sort: [{ field: 'id', dir: 'desc' }],
        skip: 0,
        take: 20,
    };

    pageConfig: PagerSettings | boolean = false;
    selectionIds: number[] = [];

    model: T;
    action: ActionEnum;
    protected destroyed$ = new Subject();

    constructor(
        protected menuQuery: MenuQuery,
        protected auth: AuthenticateService,
    ) {
        super(menuQuery);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.loadItems();
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    /**
     * Adds handler
     */
    addHandler() {
        this.model = undefined;
        this.action = ActionEnum.CREATE;
        this.openForm();
    }

    /**
     * Edits handler
     * @param dataItem
     */
    editHandler(dataItem) {
        this.model = dataItem;
        this.action = ActionEnum.UPDATE;
        this.openForm();
    }

    onStateChange(state: State) {
        this.gridState = state;
        this.loadItems();
    }

    onSearchChange() {
        this.gridState.skip = 0;
        this.loadItems();
    }

    protected abstract openForm();

    protected abstract loadItems();

    protected get queryOptions() {
        return {
            pageNumber: this.gridState.skip / this.gridState.take + 1,
            pageSize: this.gridState.take,
            sortCol: this.gridState.sort[0].field,
            sortByASC: this.gridState.sort[0].dir === 'asc',
        };
    }
}
