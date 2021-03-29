import { Component, OnInit } from '@angular/core';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { DropDownListEnum } from '@shared/containers/asc-select';

@Component({
    selector: 'app-duyet-cham-dut-hdld',
    templateUrl: './duyet-cham-dut-hdld.component.html',
    styleUrls: ['./duyet-cham-dut-hdld.component.scss']
})
export class DuyetChapDutHdldComponent implements OnInit {
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
