import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '@core/data-services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '@core/services/common/notification.service';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { TrangThaiDuLieuEnum } from '@themes/views/management/human-resource/_models/human-resource.enum';
import { FormUtil } from '@core/utils/form';
import { ActionEnum } from '@core/constants/enum.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { takeUntil } from 'rxjs/operators';
import { MessageConstant } from '@core/constants/message.constant';
import { Subject } from 'rxjs';
import { DropDownListEnum } from '@shared/containers/asc-select/asc-select.enum';

@Component({
    selector: 'app-form-update-loai-doi-tuong-danh-gia',
    templateUrl: './form-update-loai-doi-tuong-danh-gia.component.html',
    styleUrls: ['./form-update-loai-doi-tuong-danh-gia.component.scss'],
})
export class FormUpdateLoaiDoiTuongDanhGiaComponent implements OnInit {
    @Input() nhanSuSelectionIds: number[];
    form: FormGroup;
    dropdownListEnum = DropDownListEnum;

    private destroyed$ = new Subject();

    constructor(
        private apiService: ApiService,
        private formBuilder: FormBuilder,
        private notification: NotificationService,
        private windowRef: WindowRef
    ) {}

    ngOnInit() {
        this.createForm();
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    createForm() {
        this.form = this.formBuilder.group({
            idsNhanSu: [this.nhanSuSelectionIds],
            idDoiTuongDanhGia: [null],
            idLoaiNhanSuDanhGia: [null],

            idTrangThaiDuLieu: [TrangThaiDuLieuEnum.SU_DUNG_CHINH],
        });
    }

    onSubmit() {
        if (this.form.invalid) {
            FormUtil.validateAllFormFields(this.form);
            return;
        }

        this.apiService
            .put(UrlConstant.API.HRM_NHAN_SU + '/LoaiDoiTuongDanhGia', this.form.value)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(() => {
                this.notification.showSuccessMessage('Cập nhật thông tin thành công !');
                this.closeForm(true);
            });
    }

    closeForm(isLoad) {
        this.windowRef.close(isLoad);
    }
}
