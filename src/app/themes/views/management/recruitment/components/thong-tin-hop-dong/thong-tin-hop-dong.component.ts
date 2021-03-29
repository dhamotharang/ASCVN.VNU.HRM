import { Component, Input, OnInit } from '@angular/core';
import { CustomTranslateService } from '@core/services/common';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { ViewFileComponent } from '@shared/controls/view-file';
import { IHopDong, IListHopDong } from '@themes/views/management/recruitment/_models';

@Component({
    selector: 'app-thong-tin-hop-dong',
    templateUrl: './thong-tin-hop-dong.component.html',
    styleUrls: ['./thong-tin-hop-dong.component.scss'],
})
export class ThongTinHopDongComponent implements OnInit {
    @Input() model: IHopDong;
    @Input() gridRow: IListHopDong;

    opened = false;

    constructor(private windowService: WindowService, private translate: CustomTranslateService) {}

    ngOnInit(): void {}

    openViewFile() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('LB.VIEW_FILE'),
            content: ViewFileComponent,
            width: 1200,
            height: 800,
            top: 10,
            autoFocusedElement: 'body',
            state: 'maximized',
        });

        const param = windowRef.content.instance;
        param.key = this.model.guidIdFileDinhKem;
        param.fileName = this.model.nameFileDinhKem;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
            }
        });
    }
}
