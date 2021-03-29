// import { HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
// import { BaseCheckPermission } from '@core/auth/base-check-permission';
// import { PageConfig, ReziseTable } from '@core/constants/app.constant';
// import { GridDataResult, PagerSettings } from '@progress/kendo-angular-grid';
// import { Observable, Subject } from 'rxjs';
// import { TooltipDirective } from '@progress/kendo-angular-tooltip';
// import { State } from '@progress/kendo-data-query';
// import { DropDownListEnum } from '@shared/containers/asc-select';

// export abstract class BaseFormManagermentComponent<T> extends BaseCheckPermission implements OnInit, OnDestroy {
//     @ViewChild(TooltipDirective) public tooltipDir: TooltipDirective;
//     tabName: string;

//     opened = false;
//     gridView$: Observable<GridDataResult>;
//     gridState: State = {
//         sort: [
//             {
//                 field: 'id',
//                 dir: 'desc',
//             },
//         ],
//         skip: 0,
//         take: 20,
//     };
//     pageConfig: PagerSettings | boolean = false;
//     selectionIds: number[] = [];
//     loading = false;

//     model: T;
//     dropdownListEnum = DropDownListEnum;

//     pageHeight = window.innerHeight - ReziseTable - 65;

//     @HostListener('window:resize', ['$event'])
//     onResize(event) {
//         this.pageHeight = event.target.innerHeight - ReziseTable - 65;
//     }

//     protected destroyed$ = new Subject();

//     ngOnInit(): void {
//         super.ngOnInit();
//         this.tabName = this.menuQuery.getTitleWithCurrentUrl();

//         // load
//         this.loadItems();
//     }

//     ngOnDestroy(): void {
//         this.destroyed$.next();
//         this.destroyed$.complete();
//     }

//     showTooltip(e: MouseEvent): void {
//         const element = e.target as HTMLElement;
//         if ((element.nodeName === 'TD' || element.nodeName === 'TH') && element.offsetWidth < element.scrollWidth) {
//             this.tooltipDir.toggle(element);
//         } else {
//             this.tooltipDir.hide();
//         }
//     }

//     onStateChange(state: State) {
//         this.gridState = state;
//         this.loadItems();
//     }

//     protected get queryString() {
//         return {
//             pageSize: this.gridState.take,
//             pageNumber: this.gridState.skip / this.gridState.take + 1,
//             sortName: this.gridState.sort[0].field,
//             sortASC: this.gridState.sort[0].dir === 'asc',
//         };
//     }

//     protected abstract loadItems();
// }
