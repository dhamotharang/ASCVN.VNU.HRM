import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActionEnum } from '@core/constants/enum.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { INhanSuTrinhDoTinHoc } from '@themes/views/management/human-resource/_models/trinh-do.model';
import { NotificationService } from '@core/services/common/notification.service';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { takeUntil } from 'rxjs/operators';
import { BaseHumanResourceFormComponent } from '@themes/views/management/human-resource/_base/base-human-resource-form.component';
import { FormUtil } from '@core/utils/form';
import { TrangThaiDuLieuEnum } from '@themes/views/management/human-resource/_models/human-resource.enum';
import { EmitEvent, EventBus, EventBusService } from '@core/services/common';

@Component({
    selector: 'app-form-trinh-do-tin-hoc',
    templateUrl: './form-trinh-do-tin-hoc.component.html',
    styleUrls: ['./form-trinh-do-tin-hoc.component.scss'],
})
export class FormTrinhDoTinHocComponent extends BaseHumanResourceFormComponent<INhanSuTrinhDoTinHoc> implements OnInit, OnDestroy {
    constructor(
        private apiService: ApiService,
        private formBuilder: FormBuilder,
        private notification: NotificationService,
        private eventBus: EventBusService,
        protected windowRef: WindowRef
    ) {
        super(windowRef);
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
            idNhanSu: [null, Validators.required],
            idTrinhDoTinHoc: [null, Validators.required],
            namCongNhan: [null],
            soNamCongNhan: [null],
            ghiChu: [''],
            idFileDinhKem: [null],
            idTrangThaiDuLieu: [TrangThaiDuLieuEnum.SU_DUNG_CHINH],
        });
    }

    onSubmit() {
        // set nhanSuId
        if (this.nhanSuId) {
            this.form.get('idNhanSu').setValue(this.nhanSuId);
        }
        if (this.form.invalid) {
            FormUtil.validateAllFormFields(this.form);
            return;
        } else {
            if (this.preModel && (Object.entries(this.form.value).toString() === Object.entries(this.preModel).toString())) {
                this.closeForm();
            } else {
                this.apiUrl = UrlConstant.API.HRM_NS_TRINH_DO_TIN_HOC;
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
