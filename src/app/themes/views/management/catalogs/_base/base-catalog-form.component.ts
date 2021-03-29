import { Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ActionEnum } from '@core/constants/enum.constant';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { FormGroup } from '@angular/forms';
import { DropDownListEnum } from '@shared/containers/asc-select/asc-select.enum';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';

export abstract class BaseCatalogFormComponent<T> implements OnInit, OnDestroy {
    @Input() action: ActionEnum;
    @Input() model: T;

    form: FormGroup;

    dropdownListEnum = DropDownListEnum;
    protected destroyed$ = new Subject();

    constructor(protected windowRef: WindowRef) {}

    ngOnInit(): void {
        this.createForm();
        if (this.model) {
            this.form.patchValue(this.model);
        }
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    closeForm() {
        this.windowRef.close();
    }

    abstract onSubmit();

    abstract createForm();
}
