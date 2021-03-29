import { NotificationService } from '@core/services/common/notification.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActionEnum } from '@core/constants/enum.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '@core/data-services/api.service';
import { UtilService } from '@core/services/common/util.service';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { IThamGiaDaoTaoSdh } from '@themes/views/management/scientific-background/_models/scientific-background.model';
import { takeUntil } from 'rxjs/operators';
import { FormUtil } from '@core/utils/form';
import { BaseScientificBackgroundFormComponent } from '../../_base/base-scientific-background-form.component';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';

@Component({
    selector: 'app-form-tham-gia-dao-tao-sdh',
    templateUrl: './form-tham-gia-dao-tao-sdh.component.html',
    styleUrls: ['./form-tham-gia-dao-tao-sdh.component.scss'],
})
export class FormThamGiaDaoTaoSdhComponent extends BaseScientificBackgroundFormComponent<IThamGiaDaoTaoSdh> implements OnInit, OnDestroy {
    @Input() flagNCS: boolean;
    constructor(
        private apiService: ApiService,
        private formBuilder: FormBuilder,
        private util: UtilService,
        private notification: NotificationService,
        private translate: CustomTranslateService,
        protected window: WindowRef
    ) {
        super(window);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    disabledThoiGianKetThuc = (current: Date): boolean => {
        if (!this.form.get('thoiGianBatDau').value) {
            return;
        }
        return differenceInCalendarDays(current, new Date(this.form.get('thoiGianBatDau').value)) < 0;
    };

    disabledThoiGianBatDau = (current: Date): boolean => {
        if (!this.form.get('thoiGianKetThuc').value) {
            return;
        }
        return differenceInCalendarDays(current, new Date(this.form.get('thoiGianKetThuc').value)) > 0;
    };

    onSubmit() {
        if (this.form.invalid) {
            // trigger validate all field
            FormUtil.validateAllFormFields(this.form);
            return;
        }
        if (this.form.valid) {
            if (this.form.get('thoiGianBatDau').value) {
                this.form.get('thoiGianBatDau').setValue(this.util.convertFullDate(this.form.get('thoiGianBatDau').value));
            }
            if (this.form.get('thoiGianKetThuc').value) {
                this.form.get('thoiGianKetThuc').setValue(this.util.convertFullDate(this.form.get('thoiGianKetThuc').value));
            }

            switch (this.action) {
                case ActionEnum.CREATE:
                    this.apiService
                        .post(UrlConstant.API.LLKH_THAM_GIA_DAO_TAO_SDH, this.form.value)
                        .pipe(takeUntil(this.destroyed$))
                        .subscribe(res => {
                            // show notification
                            this.notification.showSuccessMessage(this.translate.get('MES.CREATE_DONE'));
                            // close form
                            this.closeForm();
                        });
                    break;
                case ActionEnum.UPDATE:
                    this.apiService
                        .put(UrlConstant.API.LLKH_THAM_GIA_DAO_TAO_SDH, this.form.value)
                        .pipe(takeUntil(this.destroyed$))
                        .subscribe(res => {
                            // show notification
                            this.notification.showSuccessMessage(this.translate.get('MES.UPDATE_DONE'));
                            // close form
                            this.closeForm();
                        });
                    break;
            }
        }
    }

    createForm() {
        this.form = this.formBuilder.group({
            id: [0],
            idLinhVuc: [null],
            hoTen: ['', Validators.required],
            tenLuanAn: ['', Validators.required],
            idVaiTroHuongDan: [null],
            thoiGianBatDau: [null],
            thoiGianKetThuc: [null],
            coQuanCongTac: [''],
            ghiChu: [''],
            isDaBaoVeThanhCong: [null],
            isNghienCuuSinh: [this.flagNCS],
        });
    }
}
