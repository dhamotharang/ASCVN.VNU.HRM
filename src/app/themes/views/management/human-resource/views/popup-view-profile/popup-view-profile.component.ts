import { Component, Input, OnInit } from '@angular/core';
import { DuLieuNhanSuEnum } from '../../_models';

@Component({
    selector: 'app-popup-view-profile',
    templateUrl: './popup-view-profile.component.html',
    styleUrls: ['./popup-view-profile.component.scss']
})
export class PopupViewProfileComponent implements OnInit {
    @Input() nhanSuId: number;
    @Input() duLieuNhanSuEnum: DuLieuNhanSuEnum;

    constructor() { }

    ngOnInit() {
    }

}
