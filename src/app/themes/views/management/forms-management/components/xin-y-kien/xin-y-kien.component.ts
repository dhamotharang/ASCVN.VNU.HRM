import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';
import { State } from '@progress/kendo-data-query';
import { DropDownListEnum } from '@shared/containers/asc-select';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-xin-y-kien',
    templateUrl: './xin-y-kien.component.html',
    styleUrls: ['./xin-y-kien.component.scss']
})
export class XinYKienComponent implements OnInit {
    @ViewChild(TooltipDirective) public tooltipDir: TooltipDirective;
    form: FormGroup;
    dropdownListEnum = DropDownListEnum;
    isLoadingHoSo = false;
    selectionHoSoIds: number;
    gridViewHoSo$: Observable<GridDataResult>;
    constructor(
        public windowRef: WindowRef,
        private formBuilder: FormBuilder,
    ) { }

    ngOnInit() {
        this.createForm();

    }
    gridStateHoSo: State = {
        sort: [
            {
                field: 'id',
                dir: 'desc',
            },
        ],
        skip: 0,
        take: 20,
    };
    createForm() {
        this.form = this.formBuilder.group({
            idNhanSu: [null],
        })
    }
    closeForm() {
        this.windowRef.close();
    }
    add() {
  
    }
    showTooltip(e: MouseEvent): void {
        const element = e.target as HTMLElement;
        if ((element.nodeName === 'TD' || element.nodeName === 'TH') && element.offsetWidth < element.scrollWidth) {
            this.tooltipDir.toggle(element);
        } else {
            this.tooltipDir.hide();
        }
    }

}
