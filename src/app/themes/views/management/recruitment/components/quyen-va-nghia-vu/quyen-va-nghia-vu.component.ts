import { Component, Input, OnInit } from '@angular/core';
import { IHopDong } from '@themes/views/management/recruitment/_models';

@Component({
    selector: 'app-quyen-va-nghia-vu',
    templateUrl: './quyen-va-nghia-vu.component.html',
    styleUrls: ['./quyen-va-nghia-vu.component.scss'],
})
export class QuyenVaNghiaVuComponent implements OnInit {
    @Input() model: IHopDong;
    constructor() {}

    ngOnInit(): void {}
}
