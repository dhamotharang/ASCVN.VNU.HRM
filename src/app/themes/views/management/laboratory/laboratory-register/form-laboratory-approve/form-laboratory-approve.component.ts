import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FOLDER, ModalDeleteConfig } from '@core/constants/app.constant';
import { MessageConstant, MessageErrorVI } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService, UtilService } from '@core/services/common';
import { FormUtil } from '@core/utils/form';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { NzModalService } from 'ng-zorro-antd';
import { takeUntil } from 'rxjs/operators';
import { BaseLaboratoryFormComponent } from '../../_base/base-laboratory-form.component';
import { ETrangThaiDangKyPhong } from '../../_models/ptn.enum';
import { IDangKySuDungPhong } from '../../_models/ptn.model';

@Component({
    selector: 'app-form-laboratory-approve',
    templateUrl: './form-laboratory-approve.component.html',
    styleUrls: ['./form-laboratory-approve.component.scss'],
    animations: [],
})
export class FormLaboratoryApproveComponent extends BaseLaboratoryFormComponent<IDangKySuDungPhong> implements OnInit, OnDestroy {

    folder = FOLDER;
    trangDangKyPhongEnum = ETrangThaiDangKyPhong;
    idTrangThai: boolean;
    ids: number[] = [];
    constructor(
        protected apiService: ApiService,
        private formBuilder: FormBuilder,
        private notification: NotificationService,
        protected windowRef: WindowRef,
        private util: UtilService,
        private modal: NzModalService,
    ) {
        super(windowRef, null);
    }

    ngOnInit() {
        super.ngOnInit();
        if(this.idTrangThai != null &&  this.idTrangThai !== undefined)
        {
            this.form.get("idTrangThaiDangKy").setValue(this.idTrangThai);
        }
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    createForm() {
        this.form = this.formBuilder.group({
            ids: [[]],
            idTrangThaiDangKy: [null, Validators.required],
            idFileDinhKem: [null],
            ghiChu:['']
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
                        .put(UrlConstant.API.PTN_DANG_KY_SD_PTN + '/Duyet', this.form.value)
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
        // if( (this.idDangKy != null && this.idDangKy > 0)) {
        //     this.form.get("ids").setValue([this.idDangKy]);
        //     if (this.form.invalid) {
        //         FormUtil.validateAllFormFields(this.form);
        //         return;
        //     }
        //     this.modal.confirm({
        //         nzTitle: '<i>Xác nhận</i>',
        //         nzContent: '<b>Bạn có chắc chuyển trạng thái?</b>',
        //         nzOkText: 'Đồng ý',
        //         nzCancelText: 'Không',
        //         nzOnOk: () => {
        //             const duyetKhongDuyet$ = this.apiService
        //                 .put(UrlConstant.API.PTN_DANG_KY_SD_PTN + '/Duyet', this.form.value)
        //                 .pipe(takeUntil(this.destroyed$));

        //             duyetKhongDuyet$.subscribe(res => {
        //                 this.notification.showSuccessMessage(MessageConstant.COMMON.MSG_UPDATE_DONE);
        //                 this.closeForm();
        //             });
        //         },
        //     });

        // }
        // else {

        //     this.notification.showErrorMessage(MessageErrorVI.PTN02);
        //     return;

        // }
    }
}
