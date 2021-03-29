import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { ApiService } from '@core/data-services/api.service';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { CustomTranslateService, NotificationService } from '@core/services/common';
import { takeUntil } from 'rxjs/operators';
import { TrangThaiHopDongEnum } from '@themes/views/management/recruitment/_models';
import { UrlConstant } from '@core/constants/url.constant';

@Component({
    selector: 'app-duyet-hop-dong-ca-nhan',
    templateUrl: './duyet-hop-dong-ca-nhan.component.html',
    styleUrls: ['./duyet-hop-dong-ca-nhan.component.scss'],
})
export class DuyetHopDongCaNhanComponent implements OnInit, OnDestroy {
    @Input() ids: number[];
    form: FormGroup;

    trangThaiHopDong = TrangThaiHopDongEnum;

    private destroyed$ = new Subject();
    constructor(
        private apiService: ApiService,
        private formBuilder: FormBuilder,
        private windowRef: WindowRef,
        private notification: NotificationService,
        private translate: CustomTranslateService
    ) {}

    ngOnInit(): void {
        this.createForm();
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    createForm() {
        this.form = this.formBuilder.group({
            idsHopDong: [this.ids],
            idTrangThaiHopDong: [null],
            ghiChu: [''],
        });
    }

    onSubmit() {
        this.apiService
            .put(UrlConstant.API.TD_HOP_DONG + '/Duyet', this.form.value)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(() => {
                this.notification.showSuccessMessage(this.translate.get('RECRUITMENT.MES.06'));
                this.closeForm();
            });
    }

    closeForm() {
        this.windowRef.close();
    }
}
