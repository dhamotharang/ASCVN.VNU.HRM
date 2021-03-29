import { Observable, Subject } from 'rxjs';
import { GridDataResult, PagerSettings } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { ReziseTable } from '@core/constants/app.constant';
import { Directive, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActionEnum, ActionType } from '@core/constants/enum.constant';
import { MenuQuery } from '@management-state/menu/menu.query';
import { BaseCheckPermission } from '@core/auth/base-check-permission';

@Directive()
export abstract class BaseCatalogComponent<T> extends BaseCheckPermission implements OnInit, OnDestroy {
    isLoading = false;

    // action type for permission
    actionType = ActionType;

    opened = false;
    gridView$: Observable<GridDataResult>;
    gridState: State = {
        sort: [{ field: 'stt', dir: 'asc' }],
        skip: 0,
        take: 20,
    };

    pageConfig: PagerSettings | boolean = false;
    selectionIds: number[] = [];

    searchControl = new FormControl();

    model: T;
    action: ActionEnum;
    protected destroyed$ = new Subject();

    pageHeight = window.innerHeight - ReziseTable + 30;
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.pageHeight = event.target.innerHeight - ReziseTable + 30;
    }

    constructor(protected menuQuery: MenuQuery) {
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
        this.showFormCreateOrUpdate();
    }

    /**
     * Edits handler
     * @param dataItem
     */
    editHandler(dataItem) {
        this.model = dataItem;
        this.action = ActionEnum.UPDATE;
        this.showFormCreateOrUpdate();
    }

    onStateChange(state: State) {
        this.gridState = state;
        this.loadItems();
    }

    onSearchChange() {
        this.gridState.skip = 0;
        this.loadItems();
    }

    protected abstract showFormCreateOrUpdate();

    protected abstract loadItems();

    protected get queryOptions() {
        return {
            pageNumber: this.gridState.skip / this.gridState.take + 1,
            pageSize: this.gridState.take,
            keyword: this.searchControl.value,
            sortCol: this.gridState.sort[0].field,
            sortByASC: this.gridState.sort[0].dir === 'asc',
        };
    }
}
