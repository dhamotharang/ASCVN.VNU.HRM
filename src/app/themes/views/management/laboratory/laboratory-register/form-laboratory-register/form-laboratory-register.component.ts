import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FOLDER } from '@core/constants/app.constant';
import { ActionEnum } from '@core/constants/enum.constant';
import { MessageConstant, MessageErrorVI } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService } from '@core/services/common';
import { DateUtil } from '@core/utils/date';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { takeUntil } from 'rxjs/operators';
import { BaseLaboratoryFormComponent } from '../../_base/base-laboratory-form.component';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { FormUtil } from '@core/utils/form';
import { AuthenticateService, IUserInfo } from '@core/auth';
import { IDangKySuDungPhong, IDangKySuDungThietBi } from '../../_models/ptn.model';

@Component({
    selector: 'app-form-laboratory-register',
    templateUrl: './form-laboratory-register.component.html',
    styleUrls: ['./form-laboratory-register.component.scss'],
    animations: [],
})
export class FormLaboratoryRegisterComponent extends BaseLaboratoryFormComponent<IDangKySuDungPhong> implements OnInit, OnDestroy {
    defaultGioBatDau = new Date().setHours(7, 0);
    defaultGioKetThuc = new Date().setHours(17, 0);
    user: IUserInfo;
    userSelected: number[] = [];
    listNhanSu: any[] = [];
    tabCurrentIndex = 0;
    isQuanLy: false;
    dangKySuDung_ThietBi: IDangKySuDungThietBi[] = [];
    folder = FOLDER;
    tenCoQuanCap1: string;
    idsThietBiDaChon: number[] = [];
    constructor(
        private formBuilder: FormBuilder,
        private notification: NotificationService,
        protected windowRef: WindowRef,
        protected auth: AuthenticateService,
        protected apiService: ApiService
    ) {
        super(windowRef, apiService);
    }

    ngOnInit() {
        super.ngOnInit();

        this.user = this.auth.getUserInfo();
        this.tenCoQuanCap1 = '';
        if (this.action === ActionEnum.CREATE) {
            if (this.user.doiTuongId) {
                const idUser = parseInt(this.user.doiTuongId, 10);
                this.userSelected.push(idUser);
                this.form.get('idNhanSu').setValue(idUser);
                this.coQuanNhanSu$.subscribe(res => {
                    this.form.get('idCoQuanNhanSu').setValue(res.idCoQuanCap1);
                    this.tenCoQuanCap1 = res.tenCoQuanCap1;
                });
            }
        }
        if (this.action === ActionEnum.UPDATE && this.form.get('idNhanSu').value) {
            this.userSelected.push(this.form.get('idNhanSu').value);
            if (this.user.doiTuongId) {
                this.coQuanNhanSu$.subscribe(res => {
                    this.tenCoQuanCap1 = res.tenCoQuanCap1;
                });
            }
            if (this.model && this.model.dangKySuDung_ThietBis){
                this.model.dangKySuDung_ThietBis.map((r: IDangKySuDungThietBi) => {this.idsThietBiDaChon.push(r.idThietBi)});
            }
        }
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    createForm() {
        this.form = this.formBuilder.group({
            id: [null],
            idPhongThiNghiem: [null, Validators.required],
            idNhanSu: [null, Validators.required],
            idCoQuanNhanSu: [null, Validators.required],
            ngayBatDau: [null, Validators.required],
            ngayKetThuc: [null, Validators.required],
            mucTieu: [''],
            nangLucSuDung: [''],
            soNguoiThamGia: [null],
            idTrangThaiDangKy: [null],
            idFileDinhKem: [null],
            ghiChu: [''],
            dangKySuDung_ThietBis: [[]],
        });
    }

    disabledNgayBatDau = (current: Date): boolean => {
        if (current >= new Date(new Date(Date.now()).setHours(0, 0, 0, 0))) {
            // if (current >= new Date()) {
            if (!this.form.get('ngayKetThuc').value) {
                return differenceInCalendarDays(current, new Date()) < 0;
            }
            return differenceInCalendarDays(current, new Date(this.form.get('ngayKetThuc').value)) > 0;
        }
        return differenceInCalendarDays(current, new Date()) < 0;
    };

    disabledNgayKetThuc = (current: Date): boolean => {
        if (current >= new Date(new Date(Date.now()).setHours(0, 0, 0, 0))) {
            if (!this.form.get('ngayBatDau').value) {
                return differenceInCalendarDays(current, new Date()) < 0;
            } else {
                if (current > new Date(this.form.get('ngayBatDau').value)) {
                    return differenceInCalendarDays(current, new Date()) < 0;
                } else {
                    return differenceInCalendarDays(current, new Date(this.form.get('ngayBatDau').value)) < 0;
                }
            }
        }
        return differenceInCalendarDays(current, new Date()) < 0;
    };

    onSubmit() {
        if (new Date(this.form.get('ngayBatDau').value) > new Date(this.form.get('ngayKetThuc').value)) {
            this.notification.showErrorMessage(MessageErrorVI.PTN03);
            return;
        }

        if (this.form.invalid) {
            FormUtil.validateAllFormFields(this.form);
            return;
        }

        let v_dangKySuDung_ThietBis = this.form.get('dangKySuDung_ThietBis').value;
        if (v_dangKySuDung_ThietBis != null && v_dangKySuDung_ThietBis.length > 0) {
            v_dangKySuDung_ThietBis.forEach(e => {
                if (e.idThietBi <= 0) {
                    this.notification.showErrorMessage(MessageErrorVI.PTN01);
                    return;
                }
            });
        } else {
            this.notification.showErrorMessage(MessageErrorVI.PTN01);
            return;
        }

        if (this.form.get('idCoQuanNhanSu').value) {
            this.form.get('idCoQuanNhanSu').setValue(parseInt(this.form.get('idCoQuanNhanSu').value), 10);
        } else {
            this.form.get('idCoQuanNhanSu').setValue(null);
        }
        if (this.form.get('ngayBatDau').value) {
            this.form.get('ngayBatDau').setValue(DateUtil.getFullDateTime(this.form.get('ngayBatDau').value, 'T'));
        }
        if (this.form.get('ngayKetThuc').value) {
            this.form.get('ngayKetThuc').setValue(DateUtil.getFullDateTime(this.form.get('ngayKetThuc').value, 'T'));
        }

        switch (this.action) {
            case ActionEnum.CREATE:
                /* Truyền idTrangThaiDangKy = 1 => Đăng ký mới */
                this.form.get('idTrangThaiDangKy').setValue(1);
                const create$ = this.apiService.post(UrlConstant.API.PTN_DANG_KY_SD_PTN, this.form.value).pipe(takeUntil(this.destroyed$));

                create$.subscribe(() => {
                    this.notification.showSuccessMessage(MessageConstant.COMMON.MSG_CREATE_DONE);
                    this.closeForm();
                });
                break;
            case ActionEnum.UPDATE:
                const update$ = this.apiService.put(UrlConstant.API.PTN_DANG_KY_SD_PTN, this.form.value).pipe(takeUntil(this.destroyed$));

                update$.subscribe(() => {
                    this.notification.showSuccessMessage(MessageConstant.COMMON.MSG_UPDATE_DONE);
                    this.closeForm();
                });
                break;
        }
    }

    changeTabIndex(event) {
        this.tabCurrentIndex = event.index;
    }
}
