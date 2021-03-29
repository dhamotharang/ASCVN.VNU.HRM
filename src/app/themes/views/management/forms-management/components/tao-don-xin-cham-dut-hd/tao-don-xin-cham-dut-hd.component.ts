import { Component, OnInit } from '@angular/core';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { DropDownListEnum } from '@shared/containers/asc-select';

@Component({
  selector: 'app-tao-don-xin-cham-dut-hd',
  templateUrl: './tao-don-xin-cham-dut-hd.component.html',
  styleUrls: ['./tao-don-xin-cham-dut-hd.component.scss']
})
export class TaoDonXinChamDutHdComponent implements OnInit {
  dropdownListEnum = DropDownListEnum;
  constructor(public windowRef: WindowRef) { }

  ngOnInit() {
  }
  closeForm() {
    this.windowRef.close();
  }
}
