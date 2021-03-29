import { Component, OnInit } from '@angular/core';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { DropDownListEnum } from '@shared/containers/asc-select';

@Component({
    selector: 'app-nhap-y-kien',
    templateUrl: './nhap-y-kien.component.html',
    styleUrls: ['./nhap-y-kien.component.scss']
})
export class NhapYKienComponent implements OnInit {

    dropdownListEnum = DropDownListEnum;
    constructor(
        public windowRef: WindowRef
    ) { }

    ngOnInit() {
    }
    closeForm() {
        this.windowRef.close();
    }
}
