import { Component, Input, OnInit } from '@angular/core';
import { IHopDong } from '@themes/views/management/recruitment/_models';

@Component({
    selector: 'app-che-do-lam-viec',
    templateUrl: './che-do-lam-viec.component.html',
    styleUrls: ['./che-do-lam-viec.component.scss'],
})
export class CheDoLamViecComponent implements OnInit {
    @Input() model: IHopDong;
    constructor() {}

    ngOnInit(): void {}
}
