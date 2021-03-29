import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReziseTable } from '@core/constants/app.constant';
import { ActionEnum } from '@core/constants/enum.constant';
import { MessageConstant, MessageErrorVI } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService } from '@core/services/common';
import { FormUtil } from '@core/utils/form';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { GridDataResult, PagerSettings } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { takeUntil } from 'rxjs/operators';
import { BaseLaboratoryFormComponent } from '../../../_base/base-laboratory-form.component';
import { IChonNhanSu, IPhanQuyenPhuTrach } from '../../../_models/ptn.model';
@Component({
    selector: 'app-form-them-nhan-su',
    templateUrl: './form-them-nhan-su.component.html',
    styleUrls: ['./form-them-nhan-su.component.scss'],
})
export class FormThemNhanSuComponent extends BaseLaboratoryFormComponent<IPhanQuyenPhuTrach> implements OnInit, OnDestroy {
    idsPhongThiNghiem: number[] = [];
    chonNhanSu: number[] = [];
    listNhanSu: IChonNhanSu[] = [];
    viewNhanSu: IChonNhanSu[] = [];
    idsNhanSu: number[] = [];

    isLoading = false;
    opened = false;
    gridState: State = {
        sort: [{ field: 'id', dir: 'desc' }],
        skip: 0,
        take: 20,
    };
    selectionIds: number[] = [];
    pageConfig: PagerSettings | boolean = false;

    constructor(
        protected apiService: ApiService,
        private formBuilder: FormBuilder,
        private notification: NotificationService,
        protected windowRef: WindowRef
    ) {
        super(windowRef, null);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    createForm() {
        this.form = this.formBuilder.group({
            id: [0, Validators.required],
            idNhanSu: [null],
            idsNhanSu: [null, Validators.required],
            idsPhongThiNghiem: [null, Validators.required],
            ghiChu: [''],
        });
    }

    onSubmit() {
        this.form.get('idsPhongThiNghiem').setValue(this.idsPhongThiNghiem);
        if (this.idsNhanSu && this.idsNhanSu.length > 0) {
            this.form.get('idsNhanSu').setValue(this.idsNhanSu);
        } else {
            this.notification.showErrorMessage(MessageErrorVI.PTN04);
            return;
        }

        if (this.form.invalid) {
            FormUtil.validateAllFormFields(this.form);
            return;
        }
        switch (this.action) {
            case ActionEnum.CREATE:
                const create$ = this.apiService
                    .post(UrlConstant.API.PHAN_QUYEN_PHU_TRACH, this.form.value)
                    .pipe(takeUntil(this.destroyed$));

                create$.subscribe(() => {
                    this.notification.showSuccessMessage(MessageConstant.COMMON.MSG_CREATE_DONE);
                    this.closeForm();
                });
                break;
            case ActionEnum.UPDATE:
                const update$ = this.apiService.put(UrlConstant.API.PHAN_QUYEN_PHU_TRACH, this.form.value).pipe(takeUntil(this.destroyed$));

                update$.subscribe(() => {
                    this.notification.showSuccessMessage(MessageConstant.COMMON.MSG_UPDATE_DONE);
                    this.closeForm();
                });
                break;
        }
    }

    changeNhanSu(data) {
        this.listNhanSu = data;
    }

    addNhanSuHandler() {
        if (this.listNhanSu) {
            this.listNhanSu.map(m => {
                if (!this.idsNhanSu.includes(m.nhanSuId)) {
                    this.viewNhanSu.push(m);
                    this.idsNhanSu.push(m.nhanSuId);
                }
            });
            this.listNhanSu = [];
            this.chonNhanSu = [];
        }
    }

    removeNhanSuHandler(item: IChonNhanSu, index: number) {
        this.viewNhanSu.splice(index, 1);
        this.idsNhanSu.splice(index, 1);
    }
}
