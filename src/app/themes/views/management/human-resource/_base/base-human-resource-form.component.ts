import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { Subject } from 'rxjs';
import { ActionEnum } from '@core/constants/enum.constant';
import { FormGroup } from '@angular/forms';
import { DropDownListEnum } from '@shared/containers/asc-select/asc-select.enum';
import { IFile, IFileAttach } from '@core/models/common/file.model';
import { HRM_URL } from '@themes/views/management/human-resource/_models';
import { FOLDER } from '@core/constants/app.constant';

export interface IGenericeHumanResource {
    id?: number;
    idNhanSu?: number;
    idNhanSuChiTiet?: number;
    idFileDinhKem?: number;
    tenFile?: string;
    type?: number;
    size?: number;
    path?: string;
    forWeb?: boolean;
    checkSum?: string;
    guidId?: string;
}

export abstract class BaseHumanResourceFormComponent<T extends IGenericeHumanResource> implements OnInit, OnDestroy {
    @Input() action: ActionEnum;
    @Input() model: T;
    @Input() nhanSuId: number;

    form: FormGroup;
    preModel: any;
    opened = false;
    dropdownListEnum = DropDownListEnum;

    fileInput: IFileAttach[] = [];

    // Nếu là trang lý lịch nhân sự
    isPersonal = true;

    // Nếu là trang duyệt lý lịch nhân sự
    isDuyetLyLichNhanSu = false;

    // visible popover
    visible = false;

    apiUrl: string;

    // folder name
    folder = FOLDER;

    protected destroyed$ = new Subject();

    constructor(protected windowRef: WindowRef) { }

    ngOnInit(): void {
        this.createForm();

        // this.action = this.model && (this.model.id || this.model.idNhanSuChiTiet) ? ActionEnum.UPDATE : ActionEnum.CREATE;
        if (this.action === ActionEnum.UPDATE) {
            this.preModel = { ...this.form.value };
            if (this.model) {
                this.form.patchValue(this.model);
            }
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
        }

        const pathName = location.pathname;
        const urlArray = pathName.split('/');
        Object.values(HRM_URL).forEach(key => {
            if (urlArray.includes(key)) {
                switch (key) {
                    case HRM_URL.HO_SO_CA_NHAN:
                        this.isPersonal = false;
                        this.isDuyetLyLichNhanSu = false;
                        break;
                    case HRM_URL.LY_LICH_NHAN_SU:
                        this.isPersonal = true;
                        this.isDuyetLyLichNhanSu = false;
                        break;
                    case HRM_URL.HO_SO_UNG_VIEN:
                    case HRM_URL.DUYET_HO_SO_CA_NHAN:
                        this.isPersonal = false;
                        this.isDuyetLyLichNhanSu = true;
                        break;
                    case HRM_URL.TRA_CUU_NHAN_SU:
                        this.isPersonal = false;
                        break;
                }
            }
        });
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    onSelectFile(files: IFile[]) {
        if (files.length > 0) {
            this.form.get('idFileDinhKem').setValue(files[0].fileId);
        } else {
            this.form.get('idFileDinhKem').setValue(null);
        }
    }

    closeForm() {
        this.windowRef.close();
    }

    protected abstract onSubmit();

    protected abstract createForm();
}
