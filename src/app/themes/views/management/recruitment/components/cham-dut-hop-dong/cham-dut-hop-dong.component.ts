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
    selector: 'app-cham-dut-hop-dong',
    templateUrl: './cham-dut-hop-dong.component.html',
    styleUrls: ['./cham-dut-hop-dong.component.scss'],
})
export class ChamDutHopDongComponent implements OnInit, OnDestroy {
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
            idTrangThaiHopDong: [TrangThaiHopDongEnum.CHAM_DUT_HOP_DONG],
            ghiChu: [''],
        });
    }

    onSubmit() {
        this.apiService
            .put(UrlConstant.API.TD_HOP_DONG + '/Duyet', this.form.value)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(() => {
                this.notification.showSuccessMessage(this.translate.get('RECRUITMENT.MES.07'));
                this.closeForm();
            });
    }

    closeForm() {
        this.windowRef.close();
    }
}
