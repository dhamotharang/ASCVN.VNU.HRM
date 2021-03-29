import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { INhanSuSucKhoe } from '@themes/views/management/human-resource/_models/nhan-su-suc-khoe.model';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { ViewFileComponent } from '@shared/controls/view-file/view-file.component';
import { map, takeUntil } from 'rxjs/operators';
import { MenuQuery } from '@management-state/menu/menu.query';
import { DuLieuNhanSuEnum, TrangThaiDuLieuEnum } from '@themes/views/management/human-resource/_models';
import { CustomTranslateService } from '@core/services/common';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-tab-view-thong-tin-suc-khoe',
    templateUrl: './tab-view-thong-tin-suc-khoe.component.html',
    styleUrls: ['./tab-view-thong-tin-suc-khoe.component.scss']
})
export class TabViewThongTinSucKhoeComponent implements OnInit, OnDestroy {
    @Input() nhanSuId: number;
    @Input() duLieuNhanSuEnum: DuLieuNhanSuEnum;

    model: INhanSuSucKhoe;

    fileAttact: any[] = [];
    constructor(
        protected route: ActivatedRoute,
        protected menuQuery: MenuQuery,
        private apiService: ApiService,
        private windowService: WindowService,
        private translate: CustomTranslateService
    ) { }

    opened = false;
    trangThaiDuLieuEnum = TrangThaiDuLieuEnum;
    protected destroyed$ = new Subject();

    ngOnInit(): void {
        if (this.nhanSuId) {
            this.loadData();
        }
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

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
        param.key = this.model.guidId;
        param.fileName = this.model.tenFile;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
            }
        });
    }

    loadData() {
        this.apiService
            .read(UrlConstant.API.HRM_NS_SUC_KHOE, {
                idNhanSu: this.nhanSuId,
                manHinh: this.duLieuNhanSuEnum
            })
            .pipe(
                takeUntil(this.destroyed$),
                map(res => res.result)
            )
            .subscribe(res => {
                this.model = res;
                if (this.model && this.model.idFileDinhKem && this.model.idFileDinhKem > 0) {
                    const file = {
                        fileAttachId: this.model.idFileDinhKem,
                        fileDinhKemId: this.model.idFileDinhKem,
                        name: this.model.tenFile,
                        type: this.model.type,
                        size: this.model.size,
                        path: this.model.path,
                        isDelete: false,
                    };
                    this.fileAttact.push(file);
                }
            });
    }
}
