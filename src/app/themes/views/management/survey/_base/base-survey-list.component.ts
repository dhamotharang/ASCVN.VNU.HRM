import { BaseCheckPermission } from '@core/auth';
import { OnDestroy, OnInit } from '@angular/core';
import { MenuQuery } from '@management-state/menu/menu.query';
import { Observable, Subject } from 'rxjs';
import { GridDataResult, PagerSettings } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { ActionEnum } from '@core/constants/enum.constant';
import { FormControl } from '@angular/forms';
import { DropDownListEnum } from '@shared/containers/asc-select';

export abstract class BaseSurveyListComponent<T> extends BaseCheckPermission implements OnInit, OnDestroy {
    opened = false;

    gridView$: Observable<GridDataResult>;
    gridState: State = {
        sort: [
            {
                field: 'id',
                dir: 'desc',
            },
        ],
        skip: 0,
        take: 20,
    };
    pageConfig: PagerSettings | boolean = false;
    isLoading = false;

    model: T;
    action: ActionEnum;
    selectionIds: number[] = [];

    searchControl = new FormControl();
    dropdownListEnum = DropDownListEnum;

    searchAdvance = false;

    tabName: string;

    protected destroyed$ = new Subject();
    constructor(protected menuQuery: MenuQuery) {
        super(menuQuery);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.tabName = this.menuQuery.getTitleWithCurrentUrl();
        // load data
        this.loadItems();
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    onStateChange(state: State) {
        this.gridState = state;
        this.loadItems();
    }

    onSearchChange() {
        this.gridState.skip = 0;
        this.loadItems();
    }

    searchAdvanced() {
        const el = document.querySelector('.search-backdrop');
        this.searchAdvance = !this.searchAdvance;
        if (this.searchAdvance) {
            el.classList.add('search-overlay');
        } else {
            el.classList.remove('search-overlay');
        }
    }

    protected get queryOptions() {
        return {
            pageNumber: this.gridState.skip / this.gridState.take + 1,
            pageSize: this.gridState.take,
            keyWord: this.searchControl.value,
            sortCol: this.gridState.sort[0].field,
            sortByASC: this.gridState.sort[0].dir === 'asc',
        };
    }

    protected abstract loadItems();
}
