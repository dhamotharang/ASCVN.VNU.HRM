import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActionEnum } from '@core/constants/enum.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { IFile } from '@core/models/common/file.model';
import { INhanSuTrinhDoChuyenMon } from '@themes/views/management/human-resource/_models/trinh-do.model';
import { NotificationService } from '@core/services/common/notification.service';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { DateUtil } from '@core/utils/date';
import { BaseHumanResourceFormComponent } from '@themes/views/management/human-resource/_base/base-human-resource-form.component';
import { FormUtil } from '@core/utils/form';
import { TrangThaiDuLieuEnum } from '@themes/views/management/human-resource/_models/human-resource.enum';
import { ITrinhDoChuyenMon } from '@themes/views/management/catalogs/_models/catalog.model';
import { EmitEvent, EventBus, EventBusService } from '@core/services/common';

@Component({
    selector: 'app-form-trinh-do-chuyen-mon',
    templateUrl: './form-trinh-do-chuyen-mon.component.html',
    styleUrls: ['./form-trinh-do-chuyen-mon.component.scss'],
})
export class FormTrinhDoChuyenMonComponent extends BaseHumanResourceFormComponent<INhanSuTrinhDoChuyenMon> implements OnInit, OnDestroy {

    @Input() lstTrinhDoChuyenMonUsed: INhanSuTrinhDoChuyenMon[];
    listDMTrinhDoChuyenMon: any[] = [];
    actionEnum = ActionEnum;

    constructor(
        private apiService: ApiService,
        private formBuilder: FormBuilder,
        private notification: NotificationService,
        private eventBus: EventBusService,
        protected windowRef: WindowRef
    ) {
        super(windowRef);
    }

    ngOnInit() {
        super.ngOnInit();
        this.loadTrinhDoChuyenMons();
        if (this.action === ActionEnum.UPDATE) {
            // set ngày tháng
            if (this.model.batDau_Thang != null && this.model.batDau_Nam != null) {
                this.form.get('batDau').setValue(DateUtil.convertMonthYearToDateTime(this.model.batDau_Thang - 1, this.model.batDau_Nam));
            }

            if (this.model.batDau_Thang != null && this.model.batDau_Nam != null) {
                this.form
                    .get('ketThuc')
                    .setValue(DateUtil.convertMonthYearToDateTime(this.model.ketThuc_Thang - 1, this.model.ketThuc_Nam));
            }
            this.preModel = { ...this.form.value };
        }
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    createForm() {
        this.form = this.formBuilder.group({
            id: [0],
            idNhanSu: [null, Validators.required],
            idTrinhDoChuyenMon: [null, Validators.required],
            idHinhThucDaoTao: [null],
            idLinhVuc: [null],
            batDau: [null],
            ketThuc: [null],
            batDau_Nam: [null],
            batDau_Thang: [null],
            ketThuc_Nam: [null],
            ketThuc_Thang: [null],
            maXepLoai: [''],
            noiDaoTao: [''],
            idQuocGia: [null],
            idVanBang: [null],
            tenChuyenNganh: [''],
            soQuyetDinh: [''],
            ngayQuyetDinh: [null],
            xepLoaiVanBang: [''],
            ghiChu: [''],
            idFileDinhKem: [null],
            idTrangThaiDuLieu: [TrangThaiDuLieuEnum.SU_DUNG_CHINH],
        });
    }

    onSelectFile(files: IFile[]) {
        if (files.length > 0) {
            this.form.get('idFileDinhKem').setValue(files[0].fileId);
        } else {
            this.form.get('idFileDinhKem').setValue(null);
        }
    }

    onSubmit() {
        if (this.form.get('batDau').value) {
            const batDau = new Date(this.form.get('batDau').value);
            // set
            this.form.get('batDau_Nam').setValue(batDau.getFullYear());
            this.form.get('batDau_Thang').setValue(batDau.getMonth() + 1);
        }

        if (this.form.get('ketThuc').value) {
            const ketThuc = new Date(this.form.get('ketThuc').value);
            // set
            this.form.get('ketThuc_Nam').setValue(ketThuc.getFullYear());
            this.form.get('ketThuc_Thang').setValue(ketThuc.getMonth() + 1);
        }

        // set nhanSuId
        if (this.nhanSuId) {
            this.form.get('idNhanSu').setValue(this.nhanSuId);
        }
        if (this.form.invalid) {
            FormUtil.validateAllFormFields(this.form);
            return;
        } else {
            if (this.preModel && (Object.entries(this.form.value).toString() === Object.entries(this.preModel).toString())) {
                this.closeForm();
            } else {
                this.apiUrl = UrlConstant.API.HRM_NS_TRINH_DO_CHUYEN_MON;
                if (this.isPersonal) {
                    this.apiUrl += '/DeXuat';
                }
                this.apiService
                    .put(this.apiUrl, this.form.value)
                    .pipe(takeUntil(this.destroyed$))
                    .subscribe(() => {
                        this.notification.showSuccessMessage(
                            this.action === ActionEnum.CREATE ? MessageConstant.COMMON.MSG_CREATE_DONE : MessageConstant.COMMON.MSG_UPDATE_DONE
                        );
                        if (this.isPersonal) {
                            this.eventBus.emit(new EmitEvent(EventBus.DuyetTabThongTinNhanSu, true));
                        }
                        this.closeForm();
                    });
            }
        }
    }

    private loadTrinhDoChuyenMons() {
        this.apiService
            .read(`${UrlConstant.API.DM_TRINH_DO_CHUYEN_MON}/List`, {
                pageSize: 0,
                pageNumber: 0,
                sortCol: 'stt',
                sortByASC: true,
            })
            .pipe(
                map(res => {
                    const listData = res.result.items as ITrinhDoChuyenMon[]
                    if (listData.length > 0) {
                        const dataResult = []
                        listData.map(x => {
                            const temp = this.lstTrinhDoChuyenMonUsed.findIndex(item => item.idTrinhDoChuyenMon === x.trinhDoChuyenMonId
                                && item.idTrangThaiDuLieu !== TrangThaiDuLieuEnum.KHONG_SU_DUNG && item.idTrangThaiDuLieu !== TrangThaiDuLieuEnum.KHONG_DUYET);
                            if (temp === -1 || (this.action === ActionEnum.UPDATE && temp !== -1)) {
                                dataResult.push({
                                    value: x.trinhDoChuyenMonId,
                                    label: x.ten
                                });
                            }
                        });
                        return dataResult;
                    }
                }),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                this.listDMTrinhDoChuyenMon = res;
            });
    }
}
