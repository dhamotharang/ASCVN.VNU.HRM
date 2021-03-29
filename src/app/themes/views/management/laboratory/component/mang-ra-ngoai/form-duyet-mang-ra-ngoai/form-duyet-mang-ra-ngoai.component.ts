import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageConstant, MessageErrorVI } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService, UtilService } from '@core/services/common';
import { FormUtil } from '@core/utils/form';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { NzModalService } from 'ng-zorro-antd';
import { takeUntil } from 'rxjs/operators';
import { BaseLaboratoryFormComponent } from '../../../_base/base-laboratory-form.component';
import { IMangRaNgoai } from '../../../_models/ptn.model';

@Component({
    selector: 'app-form-duyet-mang-ra-ngoai',
    templateUrl: './form-duyet-mang-ra-ngoai.component.html',
    styleUrls: ['./form-duyet-mang-ra-ngoai.component.scss'],
    animations: [],
})
export class FormDuyetMangRaNgoaiComponent extends BaseLaboratoryFormComponent<IMangRaNgoai> implements OnInit, OnDestroy {
    idTrangThai: boolean;
    ids: number[] = [];
    constructor(
        protected apiService: ApiService,
        private formBuilder: FormBuilder,
        private notification: NotificationService,
        protected windowRef: WindowRef,
        private util: UtilService,
        private modal: NzModalService
    ) {
        super(windowRef, null);
    }

    ngOnInit() {
        super.ngOnInit();
        if(this.idTrangThai != null &&  this.idTrangThai !== undefined)
        {
            this.form.get("idTrangThai").setValue(this.idTrangThai);
        }
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    createForm() {
        this.form = this.formBuilder.group({
            ids: [[]],
            idTrangThai: [null, Validators.required],
            idFileDinhKem: [null],
            lyDoDuyet: ['', Validators.required],
        });
    }

    onSubmit() {

        if( (this.ids != null && this.ids.length > 0)) {

            this.form.get("ids").setValue(this.ids);

            if (this.form.invalid) {
                FormUtil.validateAllFormFields(this.form);
                return;
            }
            this.modal.confirm({
                nzTitle: '<i>Xác nhận</i>',
                nzContent: '<b>Bạn có chắc chuyển trạng thái?</b>',
                nzOkText: 'Đồng ý',
                nzCancelText: 'Không',
                nzOnOk: () => {
                    const duyetKhongDuyet$ = this.apiService
                        .put(UrlConstant.API.MANG_RA_NGOAI + '/Duyet', this.form.value)
                        .pipe(takeUntil(this.destroyed$));

                    duyetKhongDuyet$.subscribe(res => {
                        this.ids = [];
                        this.notification.showSuccessMessage(MessageConstant.COMMON.MSG_UPDATE_DONE);
                        this.closeForm();
                    });
                },
            });

        }
        else {

            this.notification.showErrorMessage(MessageErrorVI.PTN02);
            return;

        }
    }
}
