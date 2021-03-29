import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@core/data-services/api.service';
import { ActionCreateServeyEnum } from '@themes/views/management/survey/_models/survey.enum';
import { NotificationService } from '@core/services/common/notification.service';
import { UtilService } from '@core/services/common/util.service';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { DropDownListEnum } from '@shared/containers/asc-select/asc-select.enum';

@Component({
    selector: 'app-form-nhom-cau-hoi',
    templateUrl: './form-nhom-cau-hoi.component.html',
    styleUrls: ['./form-nhom-cau-hoi.component.scss'],
})
export class FormNhomCauHoiComponent implements OnInit {
    @Input() action: ActionCreateServeyEnum;
    @Input() model: any;
    form: FormGroup;
    dropdownListEnum = DropDownListEnum;
    flagGroup = false;

    constructor(
        private apiService: ApiService,
        private formBuilder: FormBuilder,
        private util: UtilService,
        private notification: NotificationService,
        private window: WindowRef
    ) {}

    ngOnInit() {
        this.form = this.formBuilder.group({
            id: [0],
            noiDung: ['', Validators.required],
            nhomNoiDung: [''],
            hinhThucTraLoiId: [null, Validators.required],
            doiTuongThucHienId: [null, Validators.required],
            stt: [null],
            ghiChu: [''],
            isDeleted: [false],
            cauHois: [[]],
            tieuChiDanhGia: [''],
        });
        switch (this.action) {
            case ActionCreateServeyEnum.CREATE_GROUP:
                this.form.get('hinhThucTraLoiId').setValue(1);
                this.flagGroup = true;
                break;
            case ActionCreateServeyEnum.UPDATE_GROUP:
                this.form.get('hinhThucTraLoiId').setValue(1);
                this.flagGroup = true;
                break;
            case ActionCreateServeyEnum.CREATE_ITEM:
                this.flagGroup = false;
                break;
            case ActionCreateServeyEnum.UPDATE_ITEM:
                this.flagGroup = false;
                break;
        }

        if (this.model) {
            this.form.patchValue(this.model);
        }
    }
    onSubmit() {
        if (this.form.invalid) {
            // trigger validate all field
            this.util.validateAllFormFields(this.form);
            return;
        }
        if (this.form.valid) {
            this.window.close(this.form.value);
        }
    }

    closeForm() {
        this.window.close();
    }
}
