import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActionEnum } from '@core/constants/enum.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService } from '@core/services/common';
import { DateUtil } from '@core/utils/date';
import { FormUtil } from '@core/utils/form';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { takeUntil } from 'rxjs/operators';
import { BaseLaboratoryFormComponent } from '../../_base/base-laboratory-form.component';
import { IThietBi } from '../../_models/ptn.model';

@Component({
  selector: 'app-form-device',
  templateUrl: './form-device.component.html',
  styleUrls: ['./form-device.component.scss'],
  animations: [],
})
export class FormDeviceComponent extends BaseLaboratoryFormComponent<IThietBi> implements OnInit, OnDestroy {

    constructor(
        protected apiService: ApiService,
        private formBuilder: FormBuilder,
        private notification: NotificationService,
        protected windowRef: WindowRef
    ) {
        super(windowRef, apiService);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    createForm() {
        this.form = this.formBuilder.group({
            id: [null],
            idNhomCongCu: [null, Validators.required],
            idCongCu: [null, Validators.required],
            idCoQuan: [null],
            idTinhTrangThietBi: [null],
            maThietBi: ['', Validators.required],
            nguyenGia: [null],
            khauHao: [null],
            giaTriConLai: [null],
            isVisible: [null],
            moTa: [''],
            nhaCungCap:  [''],
            ghiChu:  [''],
            idPhongThiNghiem: [null],
            tenThietBi: ['', Validators.required],
            idQuocGia: [null],
            thongTinKyThuat:  [''],
            dieuKienVanHanh:  [''],
            namSuDung: [null],
            soNamSuDung: [null],
            tyLeKhauHao: [null],
            ngayBatDauTinhKhauHao: [null]

        });
    }

    onSubmit() {

        if (this.form.invalid) {
            FormUtil.validateAllFormFields(this.form);
            return;
        }

        if (this.form.get('idCoQuan').value) {
            this.form.get('idCoQuan').setValue(parseInt(this.form.get('idCoQuan').value),10);
        }

        switch (this.action) {
            case ActionEnum.CREATE:
                const create$ = this.apiService.post(UrlConstant.API.PTN_THIETBI, this.form.value).pipe(takeUntil(this.destroyed$));

                create$.subscribe(() => {
                    this.notification.showSuccessMessage(MessageConstant.COMMON.MSG_CREATE_DONE);
                    this.closeForm();
                });
                break;
            case ActionEnum.UPDATE:
                const update$ = this.apiService.put(UrlConstant.API.PTN_THIETBI, this.form.value).pipe(takeUntil(this.destroyed$));

                update$.subscribe(() => {
                    this.notification.showSuccessMessage(MessageConstant.COMMON.MSG_UPDATE_DONE);
                    this.closeForm();
                });
                break;
        }
    }
}
