import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '@core/data-services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { EmitEvent, EventBus, EventBusService, NotificationService } from '@core/services/common';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { FormUtil } from '@core/utils/form';
import { DateUtil } from '@core/utils/date';
import { UrlConstant } from '@core/constants/url.constant';
import { takeUntil } from 'rxjs/operators';
import { ActionEnum } from '@core/constants/enum.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { BaseHumanResourceFormComponent } from '../../../_base';
import { IDanhHieuThiDuaKhenThuong } from '../../../_models/thong-tin-khen-thuong.model';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import { IDanhHieu } from '@themes/views/management/catalogs/_models/catalog.model';

@Component({
    selector: 'app-form-danh-hieu-thi-dua-khen-thuong',
    templateUrl: './form-danh-hieu-thi-dua-khen-thuong.component.html',
    styleUrls: ['./form-danh-hieu-thi-dua-khen-thuong.component.scss'],
})
export class FormDanhHieuThiDuaKhenThuongComponent
    extends BaseHumanResourceFormComponent<IDanhHieuThiDuaKhenThuong>
    implements OnInit, OnDestroy {
    danhHieuAll: IDanhHieu[] = [];
    danhHieuList: IDanhHieu[] = [];
    constructor(
        private apiService: ApiService,
        private formBuilder: FormBuilder,
        private notification: NotificationService,
        private translate: CustomTranslateService,
        private eventBus: EventBusService,
        protected windowRef: WindowRef
    ) {
        super(windowRef);
    }

    ngOnInit() {
        super.ngOnInit();
        this.loadDanhHieus();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    createForm() {
        this.form = this.formBuilder.group({
            id: [0],
            idDanhHieu: [null, Validators.required],
            idNhanSu: [null, Validators.required],
            isTapThe: [false, Validators.required],
            donVi: [''],
            idQuyetDinh: [null],
            soQuyetDinh: [null],
            isDanhHieuCaoNhat: [null],
            ngayQuyetDinh: [null],
            ngayHieuLuc: [null],
            idCapQuyetDinh: [null],
            idFileDinhKem: [null],
            noiDung: [''],
            ghiChu: [''],
        });
    }

    onSubmit() {
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
                if (this.form.get('ngayQuyetDinh').value) {
                    this.form.get('ngayQuyetDinh').setValue(DateUtil.getFullDate(this.form.get('ngayQuyetDinh').value));
                }

                if (this.form.get('ngayHieuLuc').value) {
                    this.form.get('ngayHieuLuc').setValue(DateUtil.getFullDate(this.form.get('ngayHieuLuc').value));
                }

                this.apiUrl = UrlConstant.API.HRM_NS_DANH_HIEU_THI_DUA_KHEN_THUONG;
                if (this.isPersonal) {
                    this.apiUrl += '/DeXuat';
                }
                this.apiService
                    .put(this.apiUrl, this.form.value)
                    .pipe(takeUntil(this.destroyed$))
                    .subscribe(() => {
                        this.notification.showSuccessMessage(
                            this.action === ActionEnum.CREATE ? this.translate.get('MES.CREATE_DONE') : this.translate.get('MES.UPDATE_DONE')
                        );
                        if (this.isPersonal) {
                            this.eventBus.emit(new EmitEvent(EventBus.DuyetTabThongTinNhanSu, true));
                        }
                        this.closeForm();
                    });
            }
        }
    }

    handleChange(value: boolean) {
        this.form.get('idDanhHieu').setValue(null);
        if (value) {
            this.danhHieuList = this.danhHieuAll.filter(item => item.idLoaiDanhHieu === 2);
        } else {
            this.danhHieuList = this.danhHieuAll.filter(item => item.idLoaiDanhHieu === 1);
        }
    }

    private loadDanhHieus() {
        this.apiService
            .read(`${UrlConstant.API.DM_DANH_HIEU}/List`, {
                pageSize: 0,
                pageNumber: 0,
                sortCol: 'stt',
                sortByASC: true
            })
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                if (res.result) {
                    const danhHieus = res.result.items as IDanhHieu[];
                    this.danhHieuAll = danhHieus;
                    if (this.model && this.model.isTapThe) {
                        this.danhHieuList = danhHieus.filter(item => item.idLoaiDanhHieu === 2);
                    } else {
                        this.danhHieuList = danhHieus.filter(item => item.idLoaiDanhHieu === 1);
                    }
                }
            });
    }
}
