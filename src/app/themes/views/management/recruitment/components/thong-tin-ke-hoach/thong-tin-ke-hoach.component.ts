import { Component, Input, OnInit } from '@angular/core';
import { IKeHoachTuyenDung } from '../../_models';

@Component({
    selector: 'app-thong-tin-ke-hoach',
    templateUrl: './thong-tin-ke-hoach.component.html',
    styleUrls: ['./thong-tin-ke-hoach.component.scss'],
})
export class ThongTinKeHoachComponent implements OnInit {
    @Input() itemKeHoach: IKeHoachTuyenDung;

    constructor() {}

    ngOnInit() {}
}
