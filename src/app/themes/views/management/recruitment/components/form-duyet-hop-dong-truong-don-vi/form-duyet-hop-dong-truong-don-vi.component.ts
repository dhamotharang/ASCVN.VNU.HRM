import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from '@core/data-services/api.service';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { UrlConstant } from '@core/constants/url.constant';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { CustomTranslateService, NotificationService } from '@core/services/common';
import { TrangThaiHopDongEnum } from '../../_models/recruitment.enum';
import { FormUtil } from '@core/utils/form';

@Component({
    selector: 'app-form-duyet-hop-dong-truong-don-vi',
    templateUrl: './form-duyet-hop-dong-truong-don-vi.component.html',
    styleUrls: ['./form-duyet-hop-dong-truong-don-vi.component.scss'],
})
export class FormDuyetHopDongTruongDonViComponent implements OnInit, OnDestroy {
    @Input() idsHopDong: number[];
    form: FormGroup;
    trangThaiHopDongEnum = TrangThaiHopDongEnum;
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
            idsHopDong: [this.idsHopDong, Validators.required],
            idTrangThaiHopDong: [TrangThaiHopDongEnum.DUYET],
            lyDoDuyet: [''],
        });
    }

    change(type) {
        if (type === TrangThaiHopDongEnum.DUYET) {
            this.form.get('lyDoDuyet').clearValidators();
            this.form.get('lyDoDuyet').updateValueAndValidity();
        } else {
            this.form.get('lyDoDuyet').setValidators([Validators.required]);
            this.form.get('lyDoDuyet').updateValueAndValidity();
            this.form.get('idTrangThaiHopDong').updateValueAndValidity();
        }
    }

    onSubmit() {
        if (this.form.invalid) {
            FormUtil.validateAllFormFields(this.form);
            return;
        }
        this.apiService
            .put(UrlConstant.API.TD_HOP_DONG + '/Duyet', this.form.value)
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
