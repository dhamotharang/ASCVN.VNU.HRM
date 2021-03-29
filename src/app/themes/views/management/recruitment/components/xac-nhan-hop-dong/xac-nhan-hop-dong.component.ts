import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from '@core/data-services/api.service';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { UrlConstant } from '@core/constants/url.constant';
import { FormBuilder, FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { CustomTranslateService, NotificationService } from '@core/services/common';
import { XacNhanHopDongEnum } from '../../_models/recruitment.enum';

@Component({
    selector: 'app-xac-nhan-hop-dong',
    templateUrl: './xac-nhan-hop-dong.component.html',
    styleUrls: ['./xac-nhan-hop-dong.component.scss'],
})
export class XacNhanHopDongComponent implements OnInit, OnDestroy {
    @Input() idHopDongChiTiet: number;
    form: FormGroup;
    xacNhanHopDongEnum = XacNhanHopDongEnum;
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
            idHopDongChiTiet: [this.idHopDongChiTiet],
            xacNhanHopDong: [1],
            lyDoXacNhanHopDong: [''],
        });
    }

    onSubmit() {
        this.apiService
            .put(UrlConstant.API.TD_HOP_DONG + '/XacNhan', this.form.value)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(() => {
                this.notification.showSuccessMessage(this.translate.get('RECRUITMENT.MES.08'));
                this.closeForm();
            });
    }

    closeForm() {
        this.windowRef.close();
    }
}
