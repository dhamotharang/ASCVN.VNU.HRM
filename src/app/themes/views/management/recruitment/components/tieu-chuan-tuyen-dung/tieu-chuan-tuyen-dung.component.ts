import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-tieu-chuan-tuyen-dung',
    templateUrl: './tieu-chuan-tuyen-dung.component.html',
    styleUrls: ['./tieu-chuan-tuyen-dung.component.scss'],
})
export class TieuChuanTuyenDungComponent implements OnInit {
    @Input() keHoachTuyenDungTieuChuans: any;

    constructor() {}

    ngOnInit() {}
}
