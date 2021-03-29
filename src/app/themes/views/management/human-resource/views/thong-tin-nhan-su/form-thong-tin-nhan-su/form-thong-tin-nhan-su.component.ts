import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { NumberValidator } from '@core/helpers/validator.helper';
import { INhanSuChiTiet } from '@themes/views/management/human-resource/_models/human-resource.model';
import { NotificationService } from '@core/services/common/notification.service';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { takeUntil } from 'rxjs/operators';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { TrangThaiDuLieuEnum } from '@themes/views/management/human-resource/_models/human-resource.enum';
import { FormUtil } from '@core/utils/form';
import { BaseHumanResourceFormComponent } from '@themes/views/management/human-resource/_base';
import { DateUtil } from '@core/utils/date';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import { EmitEvent, EventBus, EventBusService } from '@core/services/common';

const fieldRequired = {
    soCMND: 'Số CMND',
    ngayCapCMND: 'Ngày cấp CMND',
    noiCapCMND: 'Nơi cấp CMND'
}

@Component({
    selector: 'app-form-thong-tin-nhan-su',
    templateUrl: './form-thong-tin-nhan-su.component.html',
    styleUrls: ['./form-thong-tin-nhan-su.component.scss'],
    animations: [fadeInOnEnterAnimation(), fadeOutOnLeaveAnimation()],
})
export class FormThongTinNhanSuComponent extends BaseHumanResourceFormComponent<INhanSuChiTiet> implements OnInit, OnDestroy {
    constructor(
        private apiService: ApiService,
        private formBuilder: FormBuilder,
        private notification: NotificationService,
        private translate: CustomTranslateService,
        private eventBus: EventBusService,
        protected window: WindowRef
    ) {
        super(window);
    }

    ngOnInit() {
        super.ngOnInit();
        // this.action = this.model && this.model.idNhanSuChiTiet ? ActionEnum.UPDATE : ActionEnum.CREATE;
        if (this.model) {
            this.form.patchValue(this.model);
            this.form.get('ghiChu').setValue(this.model.ghiChuNhanSuChiTiet);
            if (this.model.idNhanSuChiTiet) {
                this.form.get('id').setValue(this.model.idNhanSuChiTiet);
            }
            this.preModel = { ...this.form.value };
        }
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    disabledDate = (current: Date): boolean => {
        // Can not select days before today and today
        return differenceInCalendarDays(current, new Date()) > 0;
    };

    createForm() {
        this.form = this.formBuilder.group({
            id: [0],
            idNhanSu: [null, Validators.required],
            soCMND: ['', [Validators.required, NumberValidator]],
            ngayCapCMND: [null, Validators.required],
            noiCapCMND: ['', Validators.required],
            idDanToc: [null],
            idTonGiao: [null],
            idGiaDinhChinhSach: [null],
            noiSinh_IDTinh: [null],
            noiSinh_IDHuyen: [null],
            noiSinh_IDPhuongXa: [null],
            queQuan_IDQuocGia: [null],
            queQuan_SoNha: [''],
            queQuan_IDTinh: [null],
            queQuan_IDHuyen: [null],
            queQuan_IDPhuongXa: [null],
            hktT_IDQuocGia: [null],
            hktT_IDTinh: [null],
            hktT_IDHuyen: [null],
            hktT_IDPhuongXa: [null],
            hktT_SoNha: [''],
            dclL_IDTinh: [null],
            dclL_IDHuyen: [null],
            dclL_IDPhuongXa: [null],
            dclL_SoNha: [''],
            ghiChu: [''],
            hoChieu: [''],
            ngayCapHoChieu: [null],
            noiCapHoChieu: [''],
            noiSinh_IDQuocGia: [null],
            noiSinh_SoNha: [''],
            dclL_IDQuocGia: [null],
            dienThoaiNhaRieng: ['', [NumberValidator]],
            dienThoaiCoQuan: ['', [NumberValidator]],
            soBHXH: [''],
            idTinhTrangHonNhan: [null],
            idFileDinhKem: [null],
            idTrangThaiDuLieu: [TrangThaiDuLieuEnum.SU_DUNG_CHINH],
        });
    }

    onSubmit() {
        if (this.form.invalid) {
            FormUtil.validateAllFormFields(this.form);
            this.showErrorMessage(this.form);
            return;
        } else {
            if (this.preModel && (Object.entries(this.form.value).toString() === Object.entries(this.preModel).toString())) {
                this.closeForm();
            } else {
                if (this.form.get('ngayCapCMND').value) {
                    this.form.get('ngayCapCMND').setValue(DateUtil.getFullDate(this.form.get('ngayCapCMND').value));
                }
    
                if (this.form.get('ngayCapHoChieu').value) {
                    this.form.get('ngayCapHoChieu').setValue(DateUtil.getFullDate(this.form.get('ngayCapHoChieu').value));
                }
    
                // call api
                this.apiUrl = UrlConstant.API.HRM_NHAN_SU_CHI_TIET;
                if (this.isPersonal) {
                    this.apiUrl += '/DeXuat';
                }
                this.apiService
                    .put(this.apiUrl, this.form.value)
                    .pipe(takeUntil(this.destroyed$))
                    .subscribe(() => {
                        this.notification.showSuccessMessage(this.translate.get('MES.UPDATE_DONE'));
                        if (this.isPersonal) {
                            this.eventBus.emit(new EmitEvent(EventBus.DuyetTabThongTinNhanSu, true));
                        }
                        this.closeForm();
                    });
            }
        }
    }

    closeForm() {
        this.window.close();
    }

    showErrorMessage(form: FormGroup) {
        const messages = Object.keys(form.controls)
            .filter(field => form.get(field).errors && form.get(field).errors.required)
            .map(field => {
                const control = form.get(field);
                if (control.errors && control.errors.required) {
                    return `${fieldRequired[field]} không được bỏ trống`
                }
            }).join('<br/>');
        this.notification.showWarningMessage(messages);
    }

    changeQuocGia_QueQuan(e) {
        this.form.get('queQuan_IDHuyen').setValue(null);
        this.form.get('queQuan_IDPhuongXa').setValue(null);
        this.form.get('queQuan_SoNha').setValue('');
    }
    changeTinhThanh_QueQuan(e) {
        this.form.get('queQuan_IDPhuongXa').setValue(null);
        this.form.get('queQuan_SoNha').setValue('');
    }
    changeQuanHuyen_QueQuan(e) {
        this.form.get('queQuan_SoNha').setValue('');
    }
    changeQuocGia_NoiSinh(e) {
        this.form.get('noiSinh_IDHuyen').setValue(null);
        this.form.get('noiSinh_IDPhuongXa').setValue(null);
        this.form.get('noiSinh_SoNha').setValue('');
    }
    changeTinhThanh_NoiSinh(e) {
        this.form.get('noiSinh_IDPhuongXa').setValue(null);
        this.form.get('noiSinh_SoNha').setValue('');
    }
    changeQuanHuyen_NoiSinh(e) {
        this.form.get('noiSinh_SoNha').setValue('');
    }
    changeQuocGia_Hktt(e) {
        this.form.get('hktT_IDHuyen').setValue(null);
        this.form.get('hktT_IDPhuongXa').setValue(null);
        this.form.get('hktT_SoNha').setValue('');
    }
    changeTinhThanh_Hktt(e) {
        this.form.get('hktT_IDPhuongXa').setValue(null);
        this.form.get('hktT_SoNha').setValue('');
    }
    changeQuanHuyen_Hktt(e) {
        this.form.get('hktT_SoNha').setValue('');
    }
    changeQuocGia_Dcll(e) {
        this.form.get('dclL_IDHuyen').setValue(null);
        this.form.get('dclL_IDPhuongXa').setValue(null);
        this.form.get('dclL_SoNha').setValue('');
    }
    changeTinhThanh_Dcll(e) {
        this.form.get('dclL_IDPhuongXa').setValue(null);
        this.form.get('dclL_SoNha').setValue('');
    }
    changeQuanHuyen_Dcll(e) {
        this.form.get('dclL_SoNha').setValue('');
    }
}
