import { WindowRef } from '@progress/kendo-angular-dialog';
import { NotificationService } from '@core/services/common/notification.service';
import { UtilService } from '@core/services/common/util.service';
import { ApiService } from '@core/data-services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActionEnum } from '@core/constants/enum.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { Component, OnInit, Input } from '@angular/core';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import { DropDownListEnum } from '@shared/containers/asc-select';

@Component({
    selector: 'app-form-sao-chep-dinh-bien',
    templateUrl: './form-sao-chep-dinh-bien.component.html',
    styleUrls: ['./form-sao-chep-dinh-bien.component.scss'],
})
export class FormSaoChepDinhBienComponent implements OnInit {
    @Input() action: ActionEnum;
    @Input() namHienTai: number;
    @Input() model: number[];

    form: FormGroup;
    listOfOption = [];

    constructor(
        private apiService: ApiService,
        private formBuilder: FormBuilder,
        private util: UtilService,
        private notification: NotificationService,
        private translate: CustomTranslateService,
        private window: WindowRef
    ) {}

    ngOnInit() {
        this.loadNams(10);
        this.initFormSaoChepDinhBien();
        if (this.model && this.model.length > 0) {
            this.form.get('idsDinhBien').setValue(this.model);
        }
    }

    initFormSaoChepDinhBien() {
        this.form = this.formBuilder.group({
            idsDinhBien: [null, Validators.required],
            nam: [null, Validators.required],
            ghiChu: [''],
        });
    }

    onSubmit() {
        if (this.form.invalid) {
            this.util.validateAllFormFields(this.form);
            return;
        }
        if (this.form.valid) {
            this.apiService.post(UrlConstant.API.TD_DINH_BIEN + '/SaoChep', this.form.value).subscribe(res => {
                this.notification.showSuccessMessage(this.translate.get('MES.DUPLICATE_DONE'));
                this.closeForm();
            });
        }
    }

    closeForm() {
        this.window.close();
    }

    private loadNams(numberOfYear: number) {
        const nyear = numberOfYear != null && numberOfYear > 0 ? numberOfYear : 10;
        const year = new Date().getFullYear();
        const min = year - nyear;
        const max = year + 1;
        for (let i = max; i >= min; i--) {
            if (i !== this.namHienTai) {
                this.listOfOption.push({
                    id: i,
                    text: i.toString(),
                });
            }
        }
    }
}
