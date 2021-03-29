import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { AppConfig } from '@core/config/app.config';
import { FOLDER } from '@core/constants/app.constant';
import { ViewFileComponent } from '@shared/controls/view-file';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';

@Component({
  selector: 'ke-hoach-khcn-upload',
  templateUrl: './ke-hoach-khcn-upload.component.html',
  styleUrls: ['./ke-hoach-khcn-upload.component.scss']
})

export class KeHoachKhcnUploadComponent implements OnInit, OnChanges, ControlValueAccessor {

    @Input() file?: NzUploadFile[] = [];
    @Input() typeOfFile?: string;
    @Input() multiple = true;
    @Input() placeholder = 'Đính kèm';
    @Input() isDisabled = false;
    @Input() folderName?: string;
    @Input() fileSize?: number;
    @Output() fileInput = new EventEmitter<any>();

    uploading = false;
    fileList: NzUploadFile[] = [];
    value: IFileInfo[] = [];
    uploadUrl: string;
    previewImage: string | undefined = '';
    previewVisible = false;
    private config = AppConfig.settings;

    constructor(private modal: NzModalService, private viewContainerRef: ViewContainerRef) { }

    ngOnChanges(changes: SimpleChanges): void {
        const aFile = changes.file.currentValue;
        // tslint:disable-next-line: no-unsafe-any
        if ((aFile && aFile.length < 1) || aFile == null) {
            this.fileList = [];
        }
    }

    ngOnInit() {
        const params = {
            FolderFunction: this.folderName ?? FOLDER.FOLDER_FUNCTION,
            FileSize: 0,
        };

        const qs = Object.keys(params)
            .map(key => `${key}=${params[key]}`)
            .join('&');
        this.uploadUrl = `${this.config.apiServer}/api/cmd/${this.config.version}/KHCN/Medias/UploadFile?${qs}`;
        if (this.file && this.file.length > 0) {
            this.fileList = this.fileList.concat(this.file);
            this.fileList.map((item, idx) => {
                item.uid = idx.toString();
            });
        } else {
            this.fileList = [];
        }
    }

    onChange(value) { }

    onTouched() { }

    writeValue(value): void {
        // tslint:disable-next-line: no-unsafe-any
        this.value = value;
    }

    registerOnChange(fn: any): void {
        // tslint:disable-next-line: no-unsafe-any
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        // tslint:disable-next-line: no-unsafe-any
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    changeFile({ file, fileList }: NzUploadChangeParam) {
        const status = file.status;
        switch (status) {
            case 'done':
                if (this.multiple) {
                    if (fileList && fileList.length > 0) {
                        const fileOutput = this.fileList.map(item => {
                            // tslint:disable-next-line: no-unsafe-any
                            if (item.response && item.response.result) {
                                return {
                                    // tslint:disable-next-line: no-unsafe-any
                                    fileId: item.response.result?.files[0].fileId,
                                    // tslint:disable-next-line: no-unsafe-any
                                    name: item.response.result?.files[0].name,
                                    type: 0,
                                    size: 0,
                                    // tslint:disable-next-line: no-unsafe-any
                                    path: item.response.result?.files[0].path,
                                    isDelete: false,
                                };
                            } else {
                                return {
                                    fileId: item.fileDinhKemId,
                                    name: item.name,
                                    type: 0,
                                    size: 0,
                                    path: item.path,
                                    isDelete: false,
                                    guidId: item.guidId,
                                };
                            }
                        });
                        this.fileInput.emit(fileOutput);
                        return;
                    }
                } else {
                    if (fileList.length > 1) {
                        this.fileList.splice(0, 1);
                    }
                    const fileOutput = this.fileList.map(item => {
                        // tslint:disable-next-line: no-unsafe-any
                        if (item.response && item.response.result) {
                            return {
                                // tslint:disable-next-line: no-unsafe-any
                                fileId: item.response.result?.files[0].fileId,
                                // tslint:disable-next-line: no-unsafe-any
                                name: item.response.result?.files[0].name,
                                type: 0,
                                size: 0,
                                // tslint:disable-next-line: no-unsafe-any
                                path: item.response.result?.files[0].path,
                                isDelete: false,
                            };
                        } else {
                            return {
                                fileId: item.fileDinhKemId,
                                name: item.name,
                                type: 0,
                                size: 0,
                                path: item.path,
                                isDelete: false,
                                guidId: item.guidId,
                            };
                        }
                    });
                    this.fileInput.emit(fileOutput);
                }

                break;
            case 'removed':
                const output = this.fileList
                    .filter(m => m.uid !== file.uid)
                    .map(item => {
                        return {
                            fileId: item.fileDinhKemId,
                            name: item.name,
                            type: 0,
                            size: 0,
                            path: item.path,
                            guidId: item.guidId,
                        };
                    });
                this.fileInput.emit(output);
                break;
        }
    }

    handlePreview = async (file: NzUploadFile) => {
        if (file && file.guidId) {
            this.modal.create({
                nzTitle: 'Xem tập tin đính kèm',
                nzContent: ViewFileComponent,
                nzViewContainerRef: this.viewContainerRef,
                nzWidth: 1100,
                nzWrapClassName: 'vertical-center-modal',
                nzGetContainer: () => document.body,
                nzComponentParams: {
                    // tslint:disable-next-line: no-unsafe-any
                    key: file.guidId,
                    fileName: file.name,
                },
                nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
                nzFooter: null,
            });
        }
    };

}

export interface IFileInfo {
    name: string;
    type: number;
    size: number;
    path: string;
}
