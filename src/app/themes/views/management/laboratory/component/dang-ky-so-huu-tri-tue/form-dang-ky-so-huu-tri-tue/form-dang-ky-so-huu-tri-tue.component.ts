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
import { IDangKySoHuuTriTue } from '../../../_models/ptn.model';

@Component({
    selector: 'app-form-dang-ky-so-huu-tri-tue',
    templateUrl: './form-dang-ky-so-huu-tri-tue.component.html',
    styleUrls: ['./form-dang-ky-so-huu-tri-tue.component.scss'],
})
export class FormDangKySoHuuTriTueComponent extends BaseLaboratoryFormComponent<IDangKySoHuuTriTue> implements OnInit, OnDestroy {
    url: string = UrlConstant.API.DANG_KY_SO_HUU_TRI_TUE;
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
        /*Default Năm sử dụng: - Hiện tại*/
        const year = new Date().getFullYear();
        this.form.get('namSuDung').setValue(year);
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    createForm() {
        this.form = this.formBuilder.group({
            id: [0],
            idPhongThiNghiem: [null, Validators.required],
            maSoHuuTriTue: ['', Validators.required],
            tenSoHuuTriTue: ['', Validators.required],
            tenTacGia: ['', Validators.required],
            tinhTrang: ['', Validators.required],
            namDangKy: [null, Validators.required],
            thietBiSuDung: ['', Validators.required],
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
