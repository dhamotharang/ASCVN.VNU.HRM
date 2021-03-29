import { WindowRef } from '@progress/kendo-angular-dialog';
import { NotificationService } from '@core/services/common/notification.service';
import { UtilService } from '@core/services/common/util.service';
import { ApiService } from '@core/data-services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActionEnum } from '@core/constants/enum.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { Component, OnInit, Input } from '@angular/core';
import { DropDownListEnum } from '@shared/containers/asc-select/asc-select.enum';
import { IDinhBien } from '@themes/views/management/recruitment/_models/recruitment.model';
import { DataResult, GroupDescriptor, process } from '@progress/kendo-data-query';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import { IFile, IFileAttach } from '@core/models/common';
import { FOLDER } from '@core/constants/app.constant';
import { from, Observable, of } from 'rxjs';

@Component({
    selector: 'app-form-dinh-bien',
    templateUrl: './form-dinh-bien.component.html',
    styleUrls: ['./form-dinh-bien.component.scss'],
})
export class FormDinhBienComponent implements OnInit {
    @Input() action: ActionEnum;
    @Input() model: IDinhBien;
    form: FormGroup;
    dropdownListEnum = DropDownListEnum;
    gridViTriViecLam: DataResult;
    chonDonVi: any;
    groups: GroupDescriptor[] = [{ field: 'tenNhomViecLam', dir: null }];
    fileInput$: Observable<IFileAttach[]>;
    // folder name
    folder = FOLDER;
    constructor(
        private apiService: ApiService,
        private formBuilder: FormBuilder,
        private util: UtilService,
        private notification: NotificationService,
        private translate: CustomTranslateService,
        private window: WindowRef
    ) {}

    ngOnInit() {
        this.initFormDinhBien();
        if (this.action !== ActionEnum.CREATE && this.model) {
            this.getById();
            this.chonDonVi = this.model.idCoQuan;
        } else {
            this.loadViTriViecLam();
        }
    }

    initFormDinhBien() {
        this.form = this.formBuilder.group({
            id: [0],
            idCoQuan: [null, Validators.required],
            nam: [new Date().getFullYear(), Validators.required],
            lH_CCVC: [null, Validators.required],
            lH_HDLD: [null, Validators.required],
            lH_HD68: [null, Validators.required],
            dinhBienChiTiets: [],
            idFileDinhKem: [null],
            pheDuyet: [''],
            ghiChu: [''],
        });
    }

    mapFile(model) {
        const fileInput = [];
        if (model && model.idFileDinhKem && model.idFileDinhKem > 0) {
            fileInput.push({
                fileDinhKemId: model.idFileDinhKem,
                name: model.tenFile,
                size: model.size,
                path: model.path,
                guidId: model.guidId,
                fileAttachId: null,
                type: model.type,
            });

            this.fileInput$ = of(fileInput);
        }
    }
    getById() {
        this.apiService
            .read(UrlConstant.API.TD_DINH_BIEN + '/ById', {
                id: this.model.id,
            })
            .subscribe(res => {
                if (res.result) {
                    const itemDinhBien = res.result;
                    this.form.patchValue(itemDinhBien);
                    this.mapFile(itemDinhBien);
                    this.apiService
                        .read(UrlConstant.API.DM_NHOM_VIEC_LAM + '/Grouping', {
                            pageSize: 0,
                            pageNumber: 0,
                        })
                        .subscribe(response => {
                            const viTriViecLams = [];
                            const viTriViecLamsTemp = response.result.map(x => {
                                x.viTriViecLams.map(y => {
                                    viTriViecLams.push({
                                        idNhomViTriViecLam: x.idNhomViTriViecLam,
                                        tenNhomViTriViecLam: x.tenNhomViTriViecLam,
                                        idViTriViecLam: y.idViTriViecLam,
                                        tenViTriViecLam: y.tenViTriViecLam,
                                    });
                                });
                            });

                            // set list viTri
                            const listData = itemDinhBien.dinhBienChiTiets.map(x => {
                                const itemViTriViecLam = viTriViecLams.find(m => m.idViTriViecLam === x.idViTriViecLam);
                                if (itemViTriViecLam) {
                                    return {
                                        id: x.id,
                                        idViTriViecLam: x.idViTriViecLam,
                                        ten: itemViTriViecLam.tenViTriViecLam,
                                        idNhomViecLam: itemViTriViecLam.idNhomViTriViecLam,
                                        tenNhomViecLam: itemViTriViecLam.tenNhomViTriViecLam,
                                        capLuong: x.capLuong,
                                        tuTra: x.tuTra,
                                    };
                                } else {
                                    return {
                                        id: x.id,
                                        idViTriViecLam: x.idViTriViecLam,
                                        capLuong: x.capLuong,
                                        tuTra: x.tuTra,
                                    };
                                }
                            });

                            this.gridViTriViecLam = process(listData, {
                                group: this.groups,
                            });
                        });
                }
            });
    }

    onSubmit() {
        if (this.chonDonVi) {
            this.form.get('idCoQuan').setValue(parseInt(this.chonDonVi, 10));
        }
        if (this.gridViTriViecLam.data.length > 0) {
            const dataSubmit = [];
            this.gridViTriViecLam.data.map(x => {
                if (x.items && x.items.length > 0) {
                    x.items.map(y => {
                        if (y.capLuong === '') {
                            y.capLuong = 0;
                        }
                        if (y.tuTra === '') {
                            y.tuTra = 0;
                        }
                        dataSubmit.push(y);
                    });
                }
            });
            this.form.get('dinhBienChiTiets').setValue(dataSubmit);
        }
        if (this.form.invalid) {
            // trigger validate all field
            this.util.validateAllFormFields(this.form);
            return;
        }
        if (this.form.valid) {
            switch (this.action) {
                case ActionEnum.CREATE:
                case ActionEnum.DUPLICATE:
                    this.apiService.post(UrlConstant.API.TD_DINH_BIEN, this.form.value).subscribe(res => {
                        // show notification
                        this.notification.showSuccessMessage(
                            this.translate.get(this.action === ActionEnum.CREATE ? 'MES.CREATE_DONE' : 'MES.DUPLICATE_DONE')
                        );
                        // close form
                        this.closeForm();
                    });
                    break;
                case ActionEnum.UPDATE:
                    this.apiService.put(UrlConstant.API.TD_DINH_BIEN, this.form.value).subscribe(res => {
                        // show notification
                        this.notification.showSuccessMessage(this.translate.get('MES.UPDATE_DONE'));
                        // close form
                        this.closeForm();
                    });
                    break;
            }
        }
    }

    closeForm() {
        this.window.close();
    }

    onSelectFile(files: IFile[]) {
        if (files.length > 0) {
            this.form.get('idFileDinhKem').setValue(files[0].fileId);
        } else {
            this.form.get('idFileDinhKem').setValue(null);
        }
    }

    private loadViTriViecLam() {
        this.apiService
            .read(UrlConstant.API.DM_NHOM_VIEC_LAM + '/Grouping', {
                pageSize: 0,
                pageNumber: 0,
            })
            .subscribe(res => {
                const listData = [];
                res.result.map(item => {
                    item.viTriViecLams.map(x => {
                        listData.push({
                            id: 0,
                            idViTriViecLam: x.idViTriViecLam,
                            idNhomViecLam: item.idNhomViTriViecLam,
                            tenNhomViecLam: item.tenNhomViTriViecLam,
                            ten: x.tenViTriViecLam,
                            capLuong: null,
                            tuTra: null,
                        });
                    });
                });
                this.gridViTriViecLam = process(listData, {
                    group: this.groups,
                });
            });
    }
}
