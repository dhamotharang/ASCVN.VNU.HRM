import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActionEnum } from '@core/constants/enum.constant';
import { MessageConstant, MessageErrorVI } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService } from '@core/services/common';
import { DateUtil } from '@core/utils/date';
import { FormUtil } from '@core/utils/form';
import { MenuQuery } from '@management-state/menu/menu.query';
import { WindowService, WindowRef } from '@progress/kendo-angular-dialog';
import { takeUntil } from 'rxjs/operators';
import { BaseLaboratoryFormComponent } from '../../../_base';
import { IHopDongKhaiThac } from '../../../_models/ptn.model';

@Component({
    selector: 'app-form-hop-dong-khai-thac',
    templateUrl: './form-hop-dong-khai-thac.component.html',
    styleUrls: ['./form-hop-dong-khai-thac.component.scss'],
})
export class FormHopDongKhaiThacComponent extends BaseLaboratoryFormComponent<IHopDongKhaiThac> implements OnInit, OnDestroy {
    url: string = UrlConstant.API.HOP_DONG_KHAI_THAC;
    constructor(
        protected apiService: ApiService,
        private notification: NotificationService,
        private formBuilder: FormBuilder,
        protected windowService: WindowService,
        protected menuQuery: MenuQuery,
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
            id: [0],
            idPhongThiNghiem: [null, Validators.required],
            tenHopDongKhaiThac: ['', Validators.required],
            soHopDongKhaiThac: ['', Validators.required],
            tenDoiTac: ['', Validators.required],
            thoiGianThucHien: [null, Validators.required],
            tongKinhPhi: [null, Validators.required],
            isVisible: [true],
            moTa: [''],
            ghiChu: [''],
        });
    }

    onSubmit() {

        if (this.form.get('thoiGianThucHien').value) {
            this.form.get('thoiGianThucHien').setValue(DateUtil.getFullDateTime(this.form.get('thoiGianThucHien').value, 'T'));
        }

        let lgthTongKinhPhi = this.form.get('tongKinhPhi').value ? this.form.get('tongKinhPhi').value.toLocaleString().replace(/[^\w\s]/g,'').length : 0;
        if (lgthTongKinhPhi > 15){
            this.notification.showErrorMessage(MessageErrorVI.KHCN05);
            return;
        }

        if (this.form.invalid) {
            FormUtil.validateAllFormFields(this.form);
            return;
        }

        switch (this.action) {
            case ActionEnum.CREATE:
                const create$ = this.apiService.post(this.url, this.form.value).pipe(takeUntil(this.destroyed$));

                create$.subscribe(() => {
                    this.notification.showSuccessMessage(MessageConstant.COMMON.MSG_CREATE_DONE);
                    this.closeForm();
                });
                break;
            case ActionEnum.UPDATE:
                const update$ = this.apiService.put(this.url, this.form.value).pipe(takeUntil(this.destroyed$));

                update$.subscribe(() => {
                    this.notification.showSuccessMessage(MessageConstant.COMMON.MSG_UPDATE_DONE);
                    this.closeForm();
                });
                break;
        }
    }
}
