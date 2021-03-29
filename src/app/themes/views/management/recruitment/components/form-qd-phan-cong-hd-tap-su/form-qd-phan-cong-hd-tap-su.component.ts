import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionEnum } from '@core/constants/enum.constant';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService } from '@core/services/common/notification.service';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { DateUtil } from '@core/utils/date';
import { FormUtil } from '@core/utils/form';
import { Subject } from 'rxjs';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { IQuyetDinhPhanCongHuongDanTapSu } from '@themes/views/management/recruitment/_models/qd-phan-cong-hd-tap-su.model';
import { UrlConstant } from '@core/constants/url.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { takeUntil } from 'rxjs/operators';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';

@Component({
    selector: 'app-form-qd-phan-cong-hd-tap-su',
    templateUrl: './form-qd-phan-cong-hd-tap-su.component.html',
    styleUrls: ['./form-qd-phan-cong-hd-tap-su.component.scss'],
})
export class FormQdPhanCongHdTapSuComponent implements OnInit, OnDestroy {
    @Input() action: ActionEnum;
    @Input() model: number[];
    @Input() listTapSu: IQuyetDinhPhanCongHuongDanTapSu[];

    form: FormGroup;
    gridView: GridDataResult;

    private destroyed$ = new Subject();
    constructor(
        private apiService: ApiService,
        private formBuilder: FormBuilder,
        private notification: NotificationService,
        private translate: CustomTranslateService,
        private windowRef: WindowRef
    ) {}

    ngOnInit() {
        this.createForm();
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    createForm() {
        this.form = this.formBuilder.group({
            soQuyetDinh: ['', Validators.required],
            idNhanSuNhanQuyetDinh: [null, Validators.required],
            noiDung: ['', Validators.required],
            idNguoiTapSus: [[], Validators.required],
            idNguoiKy: [null],
            chucVuNguoiKy: [''],
            tapSuTuNgay: [null, Validators.required],
            tapSuDenNgay: [null, Validators.required],
            nopBaoCaoTuNgay: [null, Validators.required],
            nopBaoCaoDenNgay: [null, Validators.required],
            ngayHieuLuc: [null, Validators.required],
            ghiChu: [''],
        });
    }

    disabledTapSuNgayKetThuc = (current: Date): boolean => {
        if (!this.form.get('tapSuTuNgay').value) {
            return;
        }
        return differenceInCalendarDays(current, new Date(this.form.get('tapSuTuNgay').value)) < 0;
    };

    disabledTapSuNgayBatDau = (current: Date): boolean => {
        if (!this.form.get('tapSuDenNgay').value) {
            return;
        }
        return differenceInCalendarDays(current, new Date(this.form.get('tapSuDenNgay').value)) > 0;
    };

    disabledBaoCaoNgayKetThuc = (current: Date): boolean => {
        if (!this.form.get('nopBaoCaoTuNgay').value) {
            return;
        }
        return differenceInCalendarDays(current, new Date(this.form.get('nopBaoCaoTuNgay').value)) < 0;
    };

    disabledBaoCaoNgayBatDau = (current: Date): boolean => {
        if (!this.form.get('nopBaoCaoDenNgay').value) {
            return;
        }
        return differenceInCalendarDays(current, new Date(this.form.get('nopBaoCaoDenNgay').value)) > 0;
    };

    onSubmit() {
        if (this.model.length > 0) {
            this.form.get('idNguoiTapSus').setValue(this.model);
        }

        if (this.form.invalid) {
            FormUtil.validateAllFormFields(this.form);
            return;
        }

        if (this.form.get('ngayHieuLuc').value) {
            this.form.get('ngayHieuLuc').setValue(DateUtil.getFullDate(this.form.get('ngayHieuLuc').value));
        }
        if (this.form.get('tapSuTuNgay').value) {
            this.form.get('tapSuTuNgay').setValue(DateUtil.getFullDate(this.form.get('tapSuTuNgay').value));
        }
        if (this.form.get('tapSuDenNgay').value) {
            this.form.get('tapSuDenNgay').setValue(DateUtil.getFullDate(this.form.get('tapSuDenNgay').value));
        }
        if (this.form.get('nopBaoCaoTuNgay').value) {
            this.form.get('nopBaoCaoTuNgay').setValue(DateUtil.getFullDate(this.form.get('nopBaoCaoTuNgay').value));
        }
        if (this.form.get('nopBaoCaoDenNgay').value) {
            this.form.get('nopBaoCaoDenNgay').setValue(DateUtil.getFullDate(this.form.get('nopBaoCaoDenNgay').value));
        }

        const create$ = this.apiService
            .post(UrlConstant.API.TD_QUYET_DINH + '/PhanCongHuongDanTapSu', this.form.value)
            .pipe(takeUntil(this.destroyed$));
        create$.subscribe(() => {
            this.notification.showSuccessMessage(this.translate.get('MES.CREATE_DONE'));
            this.closeForm();
        });
    }

    closeForm() {
        this.windowRef.close();
    }
}
