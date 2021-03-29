import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActionEnum } from '@core/constants/enum.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService } from '@core/services/common';
import { FormUtil } from '@core/utils/form';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { takeUntil } from 'rxjs/operators';
import { BaseLaboratoryFormComponent } from '../../../_base/base-laboratory-form.component';
import { IPhanQuyenPhuTrach } from '../../../_models/ptn.model';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { DateUtil } from '@core/utils/date';

@Component({
    selector: 'app-form-cap-nhat-nhan-su',
    templateUrl: './form-cap-nhat-nhan-su.component.html',
    styleUrls: ['./form-cap-nhat-nhan-su.component.scss'],
})
export class FormCapNhatNhanSuComponent extends BaseLaboratoryFormComponent<IPhanQuyenPhuTrach> implements OnInit, OnDestroy {
    idPhongThiNghiem: number;
    constructor(
        protected apiService: ApiService,
        private formBuilder: FormBuilder,
        private notification: NotificationService,
        protected windowRef: WindowRef
    ) {
        super(windowRef, null);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    disabledTuNgay = (current: Date): boolean => {
        if (!this.form.get('denNgay').value) {
            return;
        }
        return differenceInCalendarDays(current, new Date(this.form.get('denNgay').value)) > 0;
    };

    disabledDenNgay = (current: Date): boolean => {
        if (!this.form.get('tuNgay').value) {
            return;
        }
        return differenceInCalendarDays(current, new Date(this.form.get('tuNgay').value)) < 0;
    };

    createForm() {
        this.form = this.formBuilder.group({
            id: [null, Validators.required],
            idNhanSu: [null, Validators.required],
            idPhongThiNghiem: [null, Validators.required],
            tuNgay: [null, Validators.required],
            denNgay: [null, Validators.required],
            ghiChu: [''],
        });
    }

    onSubmit() {

        if (this.form.get('tuNgay').value) {
            this.form.get('tuNgay').setValue(DateUtil.getFullDate(this.form.get('tuNgay').value));
        }

        if (this.form.get('denNgay').value) {
            this.form.get('denNgay').setValue(DateUtil.getFullDate(this.form.get('denNgay').value));
        }

        this.form.get('idPhongThiNghiem').setValue(this.idPhongThiNghiem);

        if (this.form.invalid) {
            FormUtil.validateAllFormFields(this.form);
            return;
        }
        switch (this.action)
        {
            case ActionEnum.CREATE:
                const create$ = this.apiService
                    .post(UrlConstant.API.PHAN_QUYEN_PHU_TRACH, this.form.value)
                    .pipe(takeUntil(this.destroyed$));

                create$.subscribe(() => {
                    this.notification.showSuccessMessage(MessageConstant.COMMON.MSG_CREATE_DONE);
                    this.closeForm();
                });
                break;
            case ActionEnum.UPDATE:
                const update$ = this.apiService.put(UrlConstant.API.PHAN_QUYEN_PHU_TRACH, this.form.value).pipe(takeUntil(this.destroyed$));

                update$.subscribe(() => {
                    this.notification.showSuccessMessage(MessageConstant.COMMON.MSG_UPDATE_DONE);
                    this.closeForm();
                });
                break;

        }
    }
}
