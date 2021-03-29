import { Input, OnDestroy, OnInit } from '@angular/core';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { Observable, Subject } from 'rxjs';
import { ActionEnum } from '@core/constants/enum.constant';
import { FormGroup } from '@angular/forms';
import { DropDownListEnum } from '@shared/containers/asc-select/asc-select.enum';
import { IFile, IFileAttach } from '@core/models/common/file.model';
import { AuthenticateService, IUserInfo } from '@core/auth';
import { ApiService } from '@core/data-services/api.service';
import { UrlConstant } from '@core/constants/url.constant';
import { map, takeUntil, tap } from 'rxjs/operators';
import { Directive } from '@angular/core';
import { ICoQuanByNhanSu } from '../_models/ptn.model';
import { StringDecoder } from 'string_decoder';

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
    idsFileDinhKem?: any[];
}
export interface IParamGenCode {
    codeType: number;
    prefix: string;
    padLeft: number;
    iDRef: number;
}
@Directive()
export abstract class BaseLaboratoryFormComponent<T extends IGenericeLaboratory> implements OnInit, OnDestroy {
    @Input() action: ActionEnum;
    @Input() model: T;
    @Input() nhanSuId: number;
    coQuanNhanSu$: Observable<ICoQuanByNhanSu>;
    user: IUserInfo;
    form: FormGroup;
    dropdownListEnum = DropDownListEnum;
    fileInput: IFileAttach[] = [];
    protected destroyed$ = new Subject();

    constructor(protected windowRef: WindowRef, protected apiService: ApiService) {}

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
                    };
                });

                const dataFile = this.model.idsFileDinhKem.map(m => m.idFileDinhKem);
                this.form.get('idsFileDinhKem').setValue(dataFile);
            }
        }

        /* Lấy cơ quan theo nhân sự */
        this.coQuanNhanSu$ = this.apiService.read(UrlConstant.API.HRM_DANH_MUC_CO_QUAN + '/ByNhanSu', {}).pipe(map(res => res.result));

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


    async genMaTuDongAsync(param: IParamGenCode): Promise<string> {
        const valueCode = await this.apiService
        .post(`${UrlConstant.API.PTN_READPHONGTHINGHIEM}/GenCode`, {
            // tslint:disable-next-line: object-literal-shorthand
            codeType: param.codeType,
            // tslint:disable-next-line: object-literal-shorthand
            prefix: param.prefix,
            // tslint:disable-next-line: object-literal-shorthand
            padLeft: param.padLeft,
            // tslint:disable-next-line: object-literal-shorthand
            iDRef: param.iDRef
        })
        .pipe(
            // tslint:disable-next-line: no-unsafe-any
            map(res => res.result)
        )
        .pipe(takeUntil(this.destroyed$))
        .toPromise();

        // tslint:disable-next-line: no-unsafe-any
        return valueCode;
    }

}
