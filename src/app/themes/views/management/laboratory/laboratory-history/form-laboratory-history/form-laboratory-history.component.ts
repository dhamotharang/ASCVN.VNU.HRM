import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FOLDER } from '@core/constants/app.constant';
import { ActionEnum } from '@core/constants/enum.constant';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService, UtilService } from '@core/services/common';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { BaseLaboratoryFormComponent } from '../../_base/base-laboratory-form.component';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { MessageConstant, MessageErrorVI } from '@core/constants/message.constant';
import { DateUtil } from '@core/utils/date';
import { FormUtil } from '@core/utils/form';
import { UrlConstant } from '@core/constants/url.constant';
import { takeUntil } from 'rxjs/operators';
import { INhatKySuDungPhong, INhatKySuDungPhongChiTiet } from '../../_models/ptn.model';
import { AuthenticateService, IUserInfo } from '@core/auth';

@Component({
    selector: 'app-form-laboratory-history',
    templateUrl: './form-laboratory-history.component.html',
    styleUrls: ['./form-laboratory-history.component.scss'],
    animations: [],
})
export class FormLaboratoryHistoryComponent extends BaseLaboratoryFormComponent<INhatKySuDungPhong> implements OnInit, OnDestroy {
    user: IUserInfo;
    userSelected: number[] = [];
    listNhanSu: any[] = [];
    tabCurrentIndex = 0;
    dangKySuDung_ThietBi: INhatKySuDungPhongChiTiet[] = [];
    folder = FOLDER;

    constructor(
        protected apiService: ApiService,
        private formBuilder: FormBuilder,
        private notification: NotificationService,
        protected windowRef: WindowRef,
        private util: UtilService,
        private auth: AuthenticateService
    ) {
        super(windowRef, null);
    }

    ngOnInit() {
        super.ngOnInit();
        this.user = this.auth.getUserInfo();

        if (this.action === ActionEnum.CREATE) {
            if (this.user.doiTuongId) {
                const idUser = parseInt(this.user.doiTuongId, 10);
                this.userSelected.push(idUser);
                this.form.get('idNguoiSuDung').setValue(idUser);
            }
        }
        if (this.action === ActionEnum.UPDATE && this.form.get('idNguoiSuDung').value) {
            // set value
            this.userSelected.push(this.form.get('idNguoiSuDung').value);
        }
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    createForm() {
        this.form = this.formBuilder.group({
            id: [null],
            idDangKySuDung: [null, Validators.required],
            ngayBatDau: [null, Validators.required],
            ngayKetThuc: [null, Validators.required],
            ketQuaSuDung: [''],
            chatThai: [''],
            vanDeAnToan: [''],
            kienNghi: [''],
            ghiChu: [''],
            idNguoiSuDung: [null, Validators.required],
            mucDichSuDung: [''],
            soNguoiThamGia: [null],
            dangKySuDung_NhatKySuDung_ChiTiets: [[]],
            idPhongThiNghiem: [null],
        });
    }

    disabledNgayBatDau = (current: Date): boolean => {
        if (!this.form.get('ngayKetThuc').value) {
            return;
        }
        return differenceInCalendarDays(current, new Date(this.form.get('ngayKetThuc').value)) > 0;
    };

    disabledNgayKetThuc = (current: Date): boolean => {
        if (!this.form.get('ngayBatDau').value) {
            return;
        }
        return differenceInCalendarDays(current, new Date(this.form.get('ngayBatDau').value)) < 0;
    };

    onSubmit() {
        if (this.form.invalid) {
            FormUtil.validateAllFormFields(this.form);
            return;
        }
        let v_dangKySuDung_ThietBis = this.form.get('dangKySuDung_NhatKySuDung_ChiTiets').value;
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

        if (this.form.get('ngayBatDau').value) {
            this.form.get('ngayBatDau').setValue(DateUtil.getFullDateTime(this.form.get('ngayBatDau').value, 'T'));
        }
        if (this.form.get('ngayKetThuc').value) {
            this.form.get('ngayKetThuc').setValue(DateUtil.getFullDateTime(this.form.get('ngayKetThuc').value, 'T'));
        }

        switch (this.action) {
            case ActionEnum.CREATE:
                const create$ = this.apiService
                    .post(UrlConstant.API.NHAT_KY_SU_DUNG_PHONG, this.form.value)
                    .pipe(takeUntil(this.destroyed$));

                create$.subscribe(() => {
                    this.notification.showSuccessMessage(MessageConstant.COMMON.MSG_CREATE_DONE);
                    this.closeForm();
                });
                break;
            case ActionEnum.UPDATE:
                const update$ = this.apiService
                    .put(UrlConstant.API.NHAT_KY_SU_DUNG_PHONG, this.form.value)
                    .pipe(takeUntil(this.destroyed$));

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
