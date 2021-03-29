import { NotificationService } from '@core/services/common/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UrlConstant } from '@core/constants/url.constant';
import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '@core/data-services/api.service';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TypeManagementSurveyEnum } from '../../_models';
import { FormUtil } from '@core/utils/form';
import { CustomTranslateService } from '@core/services/common';

@Component({
    selector: 'app-form-chuyen-danh-gia',
    templateUrl: './form-chuyen-danh-gia.component.html',
    styleUrls: ['./form-chuyen-danh-gia.component.scss'],
})
export class FormChuyenDanhGiaComponent implements OnInit {
    @Input() model: any;
    @Input() type: TypeManagementSurveyEnum;

    form: FormGroup;
    userSelected = [];

    private destroyed$ = new Subject();
    constructor(
        private apiService: ApiService,
        private formBuilder: FormBuilder,
        private notification: NotificationService,
        private translate: CustomTranslateService,
        private window: WindowRef
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            nhanSuDanhGiaChiTietIds: [this.model, Validators.required],
            nhanSuId: [null, Validators.required],
            noiDung: [''],
            manHinh: [this.type]
        });
    }

    onSubmit() {
        if (this.form.invalid) {
            FormUtil.validateAllFormFields(this.form);
            return;
        }
        // if (this.form.valid) {
        // switch (this.type) {
        //     case TypeManagementSurveyEnum.QUAN_LY_DANH_GIA:
        //         const saveNhanSuCap2$ = this.apiService
        //             .put(UrlConstant.API.PKS_NHAN_SU_DANH_GIA_CHI_TIET + '/MoveNhanSuDanhGiaCap2', this.form.value)
        //             .pipe(takeUntil(this.destroyed$));

        //         saveNhanSuCap2$.subscribe(res => {
        //             if (res.result === null && res.errorMessages.length > 0) {
        //                 const messages = res.errorMessages
        //                     .map(x => {
        //                         return x.errorMessage + ' <b>' + x.errorValues.join(',') + '</b>';
        //                     })
        //                     .join('<br/>');
        //                 this.notification.showWarningMessage(messages);
        //             } else {
        //                 this.notification.showSuccessMessage(this.translate.get('SURVEY.MES.01'));
        //             }

        //             this.closeForm();
        //         });
        //         break;
        //     case TypeManagementSurveyEnum.DON_VI_DANH_GIA:
        //         const saveNhanSuCap3$ = this.apiService
        //             .put(UrlConstant.API.PKS_NHAN_SU_DANH_GIA_CHI_TIET + '/MoveNhanSuDanhGiaCap3', this.form.value)
        //             .pipe(takeUntil(this.destroyed$));

        //         saveNhanSuCap3$.subscribe(res => {
        //             if (res.result === null && res.errorMessages.length > 0) {
        //                 const messages = res.errorMessages
        //                     .map(x => {
        //                         return x.errorMessage + ' <b>' + x.errorValues.join(',') + '</b>';
        //                     })
        //                     .join('<br/>');
        //                 this.notification.showWarningMessage(messages);
        //             } else {
        //                 this.notification.showSuccessMessage(this.translate.get('SURVEY.MES.01'));
        //             }

        //             this.closeForm();
        //         });
        //         break;
        // }
        // }
        const danhGiaNhanSu$ = this.apiService
            .put(UrlConstant.API.PKS_NHAN_SU_DANH_GIA_CHI_TIET + '/MoveNhanSuDanhGia', this.form.value)
            .pipe(takeUntil(this.destroyed$));

        danhGiaNhanSu$.subscribe(res => {
            if (res.result === null && res.errorMessages.length > 0) {
                const messages = res.errorMessages
                    .map(x => {
                        return x.errorMessage + ' <b>' + x.errorValues.join(',') + '</b>';
                    })
                    .join('<br/>');
                this.notification.showWarningMessage(messages);
            } else {
                this.notification.showSuccessMessage(this.translate.get('SURVEY.MES.01'));
            }

            this.closeForm();
        });
    }

    closeForm() {
        this.window.close();
    }
}
