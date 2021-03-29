import { Directive, HostListener, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { BaseCheckPermission } from "@core/auth";
import { ReziseTable } from "@core/constants/app.constant";
import { ActionEnum } from "@core/constants/enum.constant";
import { MenuQuery } from "@management-state/menu/menu.query";
import { WindowCloseResult, WindowService } from "@progress/kendo-angular-dialog";
import { GridDataResult, PagerSettings } from "@progress/kendo-angular-grid";
import { TooltipDirective } from "@progress/kendo-angular-tooltip";
import { State } from "@progress/kendo-data-query";
import { DropDownListEnum } from "@shared/containers/asc-select";
import { ViewFileComponent } from "@shared/controls/view-file";
import { Observable, Subject } from "rxjs";

@Directive()
export abstract class BaseLaboratoryCatalogComponent<T> extends BaseCheckPermission implements OnInit, OnDestroy {
    @ViewChild(TooltipDirective) public tooltipDir: TooltipDirective;
    isLoading = false;
    opened = false;
    gridView$: Observable<GridDataResult>;
    gridState: State = {
        sort: [{ field: 'id', dir: 'desc' }],
        skip: 0,
        take: 20,
    };
    nhanSuId: number;
    tabName: string;
    openFirstTime = false;
    searchAdvance = false;
    dropdownListEnum = DropDownListEnum;
    pageConfig: PagerSettings | boolean = false;
    loading = false;
    selectionIds: number[] = [];

    protected action: ActionEnum;
    protected model: T;
    protected destroyed$ = new Subject();
    searchControl = new FormControl();


    pageHeight = window.innerHeight - ReziseTable + 30;
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.pageHeight = event.target.innerHeight - ReziseTable + 30;
    }

    constructor(protected menuQuery: MenuQuery, protected windowService: WindowService) {
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

    showTooltip(e: MouseEvent): void {
        const element = e.target as HTMLElement;
        if ((element.nodeName === 'TD' || element.nodeName === 'TH') && element.offsetWidth < element.scrollWidth) {
            this.tooltipDir.toggle(element);
        } else {
            this.tooltipDir.hide();
        }
    }

    showModalViewFile(guidId, name) {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: 'Xem tập tin Đính kèm',
            content: ViewFileComponent,
            width: 1200,
            height: 800,
            top: 10,
            autoFocusedElement: 'body',
            state: 'maximized',
        });

        const param = windowRef.content.instance;
        param.key = guidId;
        param.fileName = name;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
            }
        });
    }

    addHandler() {
        this.model = undefined;
        this.action = ActionEnum.CREATE;
        this.showFormCreateOrUpdate();

    }

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

    openAdvanceSearch() {
        this.openFirstTime = true;
        const el = document.querySelector('.search-backdrop');
        this.searchAdvance = !this.searchAdvance;
        if (this.searchAdvance) {
            el.classList.add('search-overlay');
        } else {
            el.classList.remove('search-overlay');
        }
    }
    searchHandler() {
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
            isAsc: this.gridState.sort[0].dir === 'asc' ? true : false,
        };
    }
}
