import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FOLDER } from '@core/constants/app.constant';
import { ActionEnum } from '@core/constants/enum.constant';
import { MessageConstant, MessageErrorVI } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService, UtilService } from '@core/services/common';
import { DateUtil } from '@core/utils/date';
import { FormUtil } from '@core/utils/form';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { takeUntil } from 'rxjs/operators';
import { BaseLaboratoryFormComponent } from '../../../_base/base-laboratory-form.component';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { AuthenticateService, IUserInfo } from '@core/auth';
import { IDangKySuDungThietBi, INhatKySuDungPhong, INhatKySuDungPhongChiTiet } from '../../../_models/ptn.model';
import { DisabledTimeFn } from 'ng-zorro-antd/date-picker';

@Component({
    selector: 'app-form-nhat-ky-su-dung-thiet-bi',
    templateUrl: './form-nhat-ky-su-dung-thiet-bi.component.html',
    styleUrls: ['./form-nhat-ky-su-dung-thiet-bi.component.scss'],
})
export class FormNhatKySuDungThietBiComponent extends BaseLaboratoryFormComponent<INhatKySuDungPhong> implements OnInit, OnDestroy {
    userSelected: number[] = [];
    listNhanSu: any[] = [];
    tabCurrentIndex = 0;
    // tslint:disable-next-line: variable-name
    dangKySuDung_ThietBi: INhatKySuDungPhongChiTiet[] = [];
    modelOneDangKySuDung: INhatKySuDungPhong;
    folder = FOLDER;
    idDangKySuDung: number;
    isDisabled: boolean;
    user: IUserInfo;
    ngayBatDauGioiHan: Date;
    ngayKetThucGioiHan: Date;
    idsThietBiDaChon: number[] = [];

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
            this.userSelected.push(this.form.get('idNguoiSuDung').value);
        }
        if (this.idDangKySuDung != null && this.idDangKySuDung > 0 && this.idDangKySuDung != undefined) {
            this.form.get('idDangKySuDung').setValue(this.idDangKySuDung);
            this.isDisabled = true;
        }
        if (this.modelOneDangKySuDung) {
            this.ngayBatDauGioiHan = this.modelOneDangKySuDung.ngayBatDau;
            this.ngayKetThucGioiHan = this.modelOneDangKySuDung.ngayKetThuc;
            this.form.get('ngayBatDau').setValue(this.modelOneDangKySuDung.ngayBatDau);
            this.form.get('ngayKetThuc').setValue(this.modelOneDangKySuDung.ngayKetThuc);
            this.form.get('soNguoiThamGia').setValue(this.modelOneDangKySuDung.soNguoiThamGia);
            if (this.modelOneDangKySuDung.dangKySuDung_ThietBis) {
                this.form.get('dangKySuDung_NhatKySuDung_ChiTiets').setValue(this.modelOneDangKySuDung.dangKySuDung_ThietBis);
                this.modelOneDangKySuDung.dangKySuDung_ThietBis.map((r: IDangKySuDungThietBi) => {this.idsThietBiDaChon.push(r.idThietBi)});
            }
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
        const dateNow = new Date(new Date(Date.now()).setHours(0, 0, 0, 0));
        const dateBatDauGioiHan = new Date(new Date(this.ngayBatDauGioiHan).setHours(0, 0, 0, 0));
        const dateKetThucGioiHan = new Date(new Date(this.ngayKetThucGioiHan).setHours(0, 0, 0, 0));
        if (dateBatDauGioiHan || dateKetThucGioiHan) {
            const dateKetThuc = this.form.get('ngayKetThuc').value;
            /*Nếu đã chọn ngày kết thúc*/
            if (dateKetThuc) {
                /* Ẩn ngày nhỏ hơn ngày bắt đầu đăng ký */
                if (current < dateBatDauGioiHan) {
                    return differenceInCalendarDays(current, dateBatDauGioiHan) < 0;
                } else {
                    // tslint:disable-next-line: no-unsafe-any
                    return differenceInCalendarDays(current, new Date(dateKetThuc)) > 0;
                }
            }
            /* Ẩn ngày lớn hơn ngày kết thúc đăng ký */
            if (current >= dateKetThucGioiHan) {
                return differenceInCalendarDays(dateKetThucGioiHan, current) < 0;
            }
            /* Ẩn ngày nhỏ hơn ngày bắt đầu đăng ký */
            if (current < dateBatDauGioiHan) {
                return differenceInCalendarDays(current, dateBatDauGioiHan) < 0;
            }
        } else {
            if (current >= dateNow) {
                if (!this.form.get('ngayKetThuc').value) {
                    return differenceInCalendarDays(current, new Date()) < 0;
                }
                // tslint:disable-next-line: no-unsafe-any
                return differenceInCalendarDays(current, new Date(this.form.get('ngayKetThuc').value)) > 0;
            }
            return differenceInCalendarDays(current, new Date()) < 0;
        }
    };

    disabledNgayKetThuc = (current: Date): boolean => {
        const dateNow = new Date(new Date(Date.now()).setHours(0, 0, 0, 0));
        const dateBatDauGioiHan = new Date(new Date(this.ngayBatDauGioiHan).setHours(0, 0, 0, 0));
        const dateKetThucGioiHan = new Date(new Date(this.ngayKetThucGioiHan).setHours(0, 0, 0, 0));
        if (dateBatDauGioiHan || dateKetThucGioiHan) {
            const dateBatDau = this.form.get('ngayBatDau').value;
            /*Nếu đã chọn ngày bắt đầu*/
            if (dateBatDau) {
                /* Ẩn ngày lớn hơn ngày kết thúc đăng ký */
                if (current >= dateKetThucGioiHan) {
                    return differenceInCalendarDays(dateKetThucGioiHan, current) < 0;
                } else {
                    // tslint:disable-next-line: no-unsafe-any
                    return differenceInCalendarDays(current, new Date(dateBatDau)) < 0;
                }
            }
            /* Ẩn ngày lớn hơn ngày kết thúc đăng ký */
            if (current >= dateKetThucGioiHan) {
                return differenceInCalendarDays(dateKetThucGioiHan, current) < 0;
            }
            /* Ẩn ngày nhỏ hơn ngày bắt đầu đăng ký */
            if (current < dateBatDauGioiHan) {
                return differenceInCalendarDays(current, dateBatDauGioiHan) < 0;
            }
        } else {
            if (current >= dateNow) {
                if (!this.form.get('ngayBatDau').value) {
                    return differenceInCalendarDays(current, new Date()) < 0;
                } else {
                    // tslint:disable-next-line: no-unsafe-any
                    if (current > new Date(this.form.get('ngayBatDau').value)) {
                        return differenceInCalendarDays(current, new Date()) < 0;
                    } else {
                        // tslint:disable-next-line: no-unsafe-any
                        return differenceInCalendarDays(current, new Date(this.form.get('ngayBatDau').value)) < 0;
                    }
                }
            }
            return differenceInCalendarDays(current, new Date()) < 0;
        }
    };

    disabledTimeBatDau: DisabledTimeFn = (current: Date) => {
        const dateBatDauGioiHan: Date = new Date(this.ngayBatDauGioiHan);
        if (dateBatDauGioiHan) {
            const hoursGioiHan: number = dateBatDauGioiHan.getHours();
            let minutesGioiHan: number = dateBatDauGioiHan.getMinutes();
            if (current) {
                const hoursBatDau: number = current.getHours();
                if (hoursBatDau > hoursGioiHan){
                    minutesGioiHan = 0;
                }
            }
            return {
                nzDisabledHours: () => this.range(0, hoursGioiHan),
                nzDisabledMinutes: () => this.range(0, minutesGioiHan),
                nzDisabledSeconds: () => [0, 0],
            };
        }
    };

    disabledTimeKetThuc: DisabledTimeFn = (current: Date) => {
        const dateKetThucGioiHan = new Date(this.ngayKetThucGioiHan);
        if (dateKetThucGioiHan) {
            let minutesLimit = 60;

            const hoursGioiHan: number = dateKetThucGioiHan.getHours();
            let minutesGioiHan: number = dateKetThucGioiHan.getMinutes() + 1;

            if (current) {
                const hoursKetThuc: number = current.getHours();
                if (hoursKetThuc < hoursGioiHan){
                    minutesGioiHan = 0;
                    minutesLimit = 0;
                }
            }
            return {
                nzDisabledHours: () => this.range(hoursGioiHan + 1, 60),
                nzDisabledMinutes: () => this.range(minutesGioiHan, minutesLimit),
                nzDisabledSeconds: () => [0, 0],
            };
        }
    };

    range(start: number, end: number): number[] {
        const result: number[] = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    }

    onSubmit() {
        // tslint:disable-next-line: no-unsafe-any
        if (new Date(this.form.get('ngayBatDau').value) > new Date(this.form.get('ngayKetThuc').value)) {
            this.notification.showErrorMessage(MessageErrorVI.PTN03);
            return;
        }
        // tslint:disable-next-line: variable-name
        const v_dangKySuDung_ThietBis = this.form.get('dangKySuDung_NhatKySuDung_ChiTiets').value;
        // tslint:disable-next-line: no-unsafe-any
        if (v_dangKySuDung_ThietBis != null && v_dangKySuDung_ThietBis.length > 0) {
            // tslint:disable-next-line: no-unsafe-any
            v_dangKySuDung_ThietBis.forEach(e => {
                // tslint:disable-next-line: no-unsafe-any
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

        if (this.form.invalid) {
            FormUtil.validateAllFormFields(this.form);
            return;
        }

        switch (this.action) {
            case ActionEnum.CREATE:
                const create$ = this.apiService
                    .post(UrlConstant.API.NHAT_KY_SU_DUNG_PHONG, this.form.value)
                    .pipe(takeUntil(this.destroyed$));

                // tslint:disable-next-line: deprecation
                create$.subscribe(() => {
                    this.notification.showSuccessMessage(MessageConstant.COMMON.MSG_CREATE_DONE);
                    this.closeForm();
                });
                break;
            case ActionEnum.UPDATE:
                const update$ = this.apiService
                    .put(UrlConstant.API.NHAT_KY_SU_DUNG_PHONG, this.form.value)
                    .pipe(takeUntil(this.destroyed$));

                // tslint:disable-next-line: deprecation
                update$.subscribe(() => {
                    this.notification.showSuccessMessage(MessageConstant.COMMON.MSG_UPDATE_DONE);
                    this.closeForm();
                });
                break;
        }
    }

    changeTabIndex(event) {
        // tslint:disable-next-line: no-unsafe-any
        this.tabCurrentIndex = event.index;
    }
}
