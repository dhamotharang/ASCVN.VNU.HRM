import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActionEnum } from '@core/constants/enum.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { INhanSuKhenThuong } from '@themes/views/management/human-resource/_models/thong-tin-khen-thuong.model';
import { NotificationService } from '@core/services/common/notification.service';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { takeUntil } from 'rxjs/operators';
import { BaseHumanResourceFormComponent } from '@themes/views/management/human-resource/_base/base-human-resource-form.component';
import { DateUtil } from '@core/utils/date';
import { FormUtil } from '@core/utils/form';
import { TrangThaiDuLieuEnum } from '@themes/views/management/human-resource/_models/human-resource.enum';
import { IKhenThuong } from '@themes/views/management/catalogs/_models/catalog.model';
import { EmitEvent, EventBus, EventBusService } from '@core/services/common';

@Component({
    selector: 'app-form-khen-thuong',
    templateUrl: './form-khen-thuong.component.html',
    styleUrls: ['./form-khen-thuong.component.scss'],
})
export class FormKhenThuongComponent extends BaseHumanResourceFormComponent<INhanSuKhenThuong> implements OnInit, OnDestroy {
    khenThuongAll: IKhenThuong[] = [];
    khenThuongList: IKhenThuong[] = [];
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
        this.loadKhenThuongs();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    createForm() {
        this.form = this.formBuilder.group({
            id: [0],
            loaiKhenThuong: [1, Validators.required],
            idNhanSu: [null, Validators.required],
            // idQuyetDinh: [null],
            soQuyetDinh: [''],
            ngayQuyetDinh: [null],
            ngayHieuLuc: [null],
            idCapKhenThuong: [null],
            idKhenThuong: [null, Validators.required],
            idFileDinhKem: [null],
            hinhThucKhenThuongKhac: [''],
            isKhenThuongCaoNhat: [null],
            noiDung: [''],
            ghiChu: [''],
            idTrangThaiDuLieu: [TrangThaiDuLieuEnum.SU_DUNG_CHINH],
            donViKhenThuong: [''],
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

                this.apiUrl = UrlConstant.API.HRM_NS_KHEN_THUONG;
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

    handleChange(value){
        this.form.get('idKhenThuong').setValue(null)
        this.khenThuongList =  this.khenThuongAll .filter(item => item.idLoaiKhenThuong === value);
    }

    private loadKhenThuongs() {
        this.apiService
            .read(`${UrlConstant.API.DM_KHEN_THUONG}/List`, {
                pageSize: 0,
                pageNumber: 0,
                sortCol: 'stt',
                sortByASC: true
            })
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                if (res.result) {
                    const khenThuongs = res.result.items as IKhenThuong[];
                    this.khenThuongAll = khenThuongs;
                    this.khenThuongList = khenThuongs.filter(item => item.idLoaiKhenThuong === 1);
                }
            });
    }
}
