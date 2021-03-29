import { NotificationService } from '@core/services/common/notification.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActionEnum } from '@core/constants/enum.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '@core/data-services/api.service';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { IBangSoHuuTriTue } from '@themes/views/management/scientific-background/_models/scientific-background.model';
import { takeUntil } from 'rxjs/operators';
import { FormUtil } from '@core/utils/form';
import { BaseScientificBackgroundFormComponent } from '../../_base/base-scientific-background-form.component';
import { ReziseTable } from '@core/constants/app.constant';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';

@Component({
    selector: 'app-form-bang-so-huu-tri-tue',
    templateUrl: './form-bang-so-huu-tri-tue.component.html',
    styleUrls: ['./form-bang-so-huu-tri-tue.component.scss'],
})
export class FormBangSoHuuTriTueComponent extends BaseScientificBackgroundFormComponent<IBangSoHuuTriTue> implements OnInit, OnDestroy {
    pageHeight = window.innerHeight - ReziseTable;
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.pageHeight = event.target.innerHeight - ReziseTable - 20;
    }

    constructor(
        private apiService: ApiService,
        private formBuilder: FormBuilder,
        private notification: NotificationService,
        private translate: CustomTranslateService,
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

    onSubmit() {
        if (this.form.invalid) {
            // trigger validate all field
            FormUtil.validateAllFormFields(this.form);
            return;
        }
        if (this.form.get('namXuatBan').value === '') {
            this.form.get('namXuatBan').setValue(null);
        }
        if (this.form.valid) {
            switch (this.action) {
                case ActionEnum.CREATE:
                    this.apiService
                        .post(UrlConstant.API.LLKH_BANG_SO_HUU_TRI_TUE, this.form.value)
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
                        .put(UrlConstant.API.LLKH_BANG_SO_HUU_TRI_TUE, this.form.value)
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
            tenVanBang: ['', Validators.required],
            noiDungVanBang: [''],
            soKyMaHieu: ['', Validators.required],
            idLinhVuc: [null],
            noiCap: [''],
            namXuatBan: [null],
            ghiChu: [''],
        });
    }
}
