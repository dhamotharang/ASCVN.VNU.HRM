import { NotificationService } from '@core/services/common/notification.service';
import { FormBuilder, Validators } from '@angular/forms';
import { UrlConstant } from '@core/constants/url.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '@core/data-services/api.service';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { INhanSuQuanHeGiaDinh } from '@themes/views/management/human-resource/_models/nhan-su-quan-he-gia-dinh.model';
import { BaseHumanResourceFormComponent } from '@themes/views/management/human-resource/_base/base-human-resource-form.component';
import { FormUtil } from '@core/utils/form';
import { takeUntil } from 'rxjs/operators';
import { TrangThaiDuLieuEnum } from '@themes/views/management/human-resource/_models/human-resource.enum';
import { ActionEnum } from '@core/constants/enum.constant';
import { PhoneNumberValidator } from '@core/helpers/validator.helper';
import { EmitEvent, EventBus, EventBusService } from '@core/services/common';

@Component({
    selector: 'app-form-nhan-su-quan-he-gia-dinh',
    templateUrl: './form-nhan-su-quan-he-gia-dinh.component.html',
    styleUrls: ['./form-nhan-su-quan-he-gia-dinh.component.scss'],
})
export class FormNhanSuQuanHeGiaDinhComponent extends BaseHumanResourceFormComponent<INhanSuQuanHeGiaDinh> implements OnInit, OnDestroy {
    @Input() flagCaNhan: boolean;
    constructor(
        private apiService: ApiService,
        private formBuilder: FormBuilder,
        private notification: NotificationService,
        private eventBus: EventBusService,
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

    createForm() {
        this.form = this.formBuilder.group({
            id: [0],
            idNhanSu: [this.nhanSuId, Validators.required],
            idQuanHe: ['', Validators.required],
            hoTen: ['', Validators.required],
            namSinh: [''],
            ngheNghiep: [''],
            tenChucVu: [''],
            noiCongTac: [''],
            diaChi: [''],
            soDienThoai: ['', PhoneNumberValidator],
            queQuan: [''],
            ngayVaoDoan: [null],
            noiKetNapDoan: [''],
            ngayVaoDang: [null],
            noiKetNapDang: [''],
            idQuocGia: [0],
            ghiChu: [''],
            isCaNhan: [this.flagCaNhan],
        });
    }

    onSubmit() {
        this.form.get('namSinh').setValue(this.form.get('namSinh').value.toString());
        if (this.form.invalid) {
            // trigger validate all field
            FormUtil.validateAllFormFields(this.form);
            return;
        } else {
            if (this.preModel && (Object.entries(this.form.value).toString() === Object.entries(this.preModel).toString())) {
                this.closeForm();
            } else {
                // call api
                this.apiUrl = UrlConstant.API.HRM_NS_QUAN_HE_GIA_DINH;
                if (this.isPersonal) {
                    this.apiUrl += '/DeXuat';
                }
                this.apiService
                    .put(this.apiUrl, this.form.value)
                    .pipe(takeUntil(this.destroyed$))
                    .subscribe(() => {
                        this.notification.showSuccessMessage(
                            this.action === ActionEnum.CREATE ? MessageConstant.COMMON.MSG_CREATE_DONE : MessageConstant.COMMON.MSG_UPDATE_DONE
                        );
                        if (this.isPersonal) {
                            this.eventBus.emit(new EmitEvent(EventBus.DuyetTabThongTinNhanSu, true));
                        }
                        this.closeForm();
                    });
            }
        }
    }
}
