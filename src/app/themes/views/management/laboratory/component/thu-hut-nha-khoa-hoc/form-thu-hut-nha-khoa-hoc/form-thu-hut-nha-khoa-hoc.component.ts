import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActionEnum } from '@core/constants/enum.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService } from '@core/services/common';
import { FormUtil } from '@core/utils/form';
import { MenuQuery } from '@management-state/menu/menu.query';
import { WindowService, WindowRef } from '@progress/kendo-angular-dialog';
import { takeUntil } from 'rxjs/operators';
import { BaseLaboratoryFormComponent } from '../../../_base/base-laboratory-form.component';
import { IThuHutNhaKhoaHoc } from '../../../_models/ptn.model';

@Component({
    selector: 'app-form-thu-hut-nha-khoa-hoc',
    templateUrl: './form-thu-hut-nha-khoa-hoc.component.html',
    styleUrls: ['./form-thu-hut-nha-khoa-hoc.component.scss'],
})
export class FormThuHutNhaKhoaHocComponent extends BaseLaboratoryFormComponent<IThuHutNhaKhoaHoc> implements OnInit, OnDestroy {
    url: string = UrlConstant.API.THU_HUT_NHA_KHOA_HOC;
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

        if (this.action === ActionEnum.CREATE) {
            /*Default Quốc gia: 1 - Việt Nam*/
            this.form.get('idQuocTich').setValue(1);
        }
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    createForm() {
        this.form = this.formBuilder.group({
            id: [0],
            idPhongThiNghiem: [null, Validators.required],
            hoTen: ['', Validators.required],
            idQuocTich: [null, Validators.required],
            chucVuNghienCuu: ['', Validators.required],
            donViDoiTac: ['', Validators.required],
            isVisible: [true],
            moTa: [''],
            ghiChu: [''],
        });
    }

    onSubmit() {
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
