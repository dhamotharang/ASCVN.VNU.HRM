import { OnInit, OnDestroy, Input, Directive } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IUserInfo } from '@core/auth';
import { FOLDER } from '@core/constants/app.constant';
import { ActionEnum } from '@core/constants/enum.constant';
import { IFileAttach, IFile } from '@core/models/common';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { DropDownListEnum } from '@shared/containers/asc-select';
import { Observable, Subject } from 'rxjs';
import { ICoQuanByNhanSu } from '../../laboratory/_models/ptn.model';

export interface IGenericeLaboratory {
    id?: number;
    idNhanSu?: number;
    idFileDinhKem?: number;
    tenFile?: string;
    type?: number;
    size?: number;
    path?: string;
    forWeb?: boolean;
    checkSum?: string;
    guidId?: string;
    fileDinhKems?: any[];
}
@Directive()
export abstract class BaseScienceTechnologyFormComponent<T extends IGenericeLaboratory> implements OnInit, OnDestroy {
    @Input() action: ActionEnum;
    @Input() model: T;
    @Input() nhanSuId: number;
    tabCurrentIndex = 0;
    form: FormGroup;
    isDisabled: false;
    dropdownListEnum = DropDownListEnum;
    fileInput: IFileAttach[] = [];
    user: IUserInfo;
    folder = FOLDER;
    userSelected: number[] = [];
    coQuanNhanSu$: Observable<ICoQuanByNhanSu>;
    protected destroyed$ = new Subject();

    constructor(protected windowRef: WindowRef) {}

    ngOnInit(): void {
        this.createForm();

        if (!this.action) {
            this.action = this.model && this.model.id ? ActionEnum.UPDATE : ActionEnum.CREATE;
        }

        if (this.action === ActionEnum.UPDATE) {
            this.form.patchValue(this.model);
            if (this.model && this.model.idFileDinhKem && this.model.idFileDinhKem > 0) {
                this.fileInput.push({
                    fileDinhKemId: this.model.idFileDinhKem,
                    name: this.model.tenFile,
                    size: this.model.size,
                    path: this.model.path,
                    guidId: this.model.guidId,
                    fileAttachId: null,
                    type: this.model.type,
                });
            }

            if (this.model && this.model.fileDinhKems != null && this.model.fileDinhKems.length > 0) {
                this.fileInput = this.model.fileDinhKems.map(m => {
                    return {
                        fileDinhKemId: m.idFileDinhKem,
                        // name: m.tenFile,
                        name: m.name,
                        size: m.size,
                        path: m.path,
                        guidId: m.guidId,
                        fileAttachId: null,
                        type: m.type,
                    };
                });

                const dataFile = this.model.fileDinhKems.map(m => {
                    return {
                        idFileDinhKem: m.idFileDinhKem,
                    };
                });
                this.form.get('fileDinhKems').setValue(dataFile);
            }
        }
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    setFormValue(data) {
        this.form.patchValue(data);
    }

    onSelectFile(files: IFile[]) {
        if (files.length > 0) {
            try {
                this.form.get('idFileDinhKem').setValue(files[0].fileId);
            } catch {}
            try {
                const dataFile = files.map(m => {
                    return {
                        idFileDinhKem: m.fileId,
                    };
                });
                this.form.get('fileDinhKems').setValue(dataFile);
            } catch {}
        } else {
            try {
                this.form.get('idFileDinhKem').setValue(null);
            } catch {}
            try {
                this.form.get('fileDinhKems').setValue(null);
            } catch {}
        }
    }

    closeForm() {
        this.windowRef.close();
    }

    protected abstract onSubmit();

    protected abstract createForm();

    changeTabIndex(event) {
        this.tabCurrentIndex = event.index;
    }
}
