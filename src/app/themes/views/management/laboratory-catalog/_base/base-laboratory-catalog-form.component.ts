import { OnInit, OnDestroy, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActionEnum } from "@core/constants/enum.constant";
import { IFileAttach, IFile } from "@core/models/common";
import { WindowRef } from "@progress/kendo-angular-dialog";
import { DropDownListEnum } from "@shared/containers/asc-select";
import { Subject } from "rxjs";
import { IGenericeLaboratory } from "../../laboratory/_base";

export interface IGenericeLaboratoryCatalog {
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
    idsFileDinhKem?: any[];

}

export abstract class BaseLaboratoryCatalogFormComponent<T extends IGenericeLaboratory> implements OnInit, OnDestroy {
    @Input() action: ActionEnum;
    @Input() model: T;
    @Input() nhanSuId: number;

    form: FormGroup;

    dropdownListEnum = DropDownListEnum;

    fileInput: IFileAttach[] = [];

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
            if (this.model && this.model.idsFileDinhKem != null && this.model.idsFileDinhKem.length > 0) {
                this.fileInput = this.model.idsFileDinhKem.map(m => {
                    return {
                        fileDinhKemId: m.idFileDinhKem,
                        name: m.tenFile,
                        size: m.size,
                        path: m.path,
                        guidId: m.guidId,
                        fileAttachId: null,
                        type: m.type,
                    }
                });
            }
        }
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    onSelectFile(files: IFile[]) {
        if (files.length > 0) {
            try {
                this.form.get('idFileDinhKem').setValue(files[0].fileId);
            } catch {}
            try {
                const dataFile = files.map(m => m.fileId);
                this.form.get('idsFileDinhKem').setValue(dataFile);
            } catch {}
        } else {
            try {
                this.form.get('idFileDinhKem').setValue(null);
            } catch {}
            try {
                this.form.get('idsFileDinhKem').setValue(null);
            } catch {}
        }
    }

    closeForm() {
        this.windowRef.close();
    }

    protected abstract onSubmit();

    protected abstract createForm();
}
