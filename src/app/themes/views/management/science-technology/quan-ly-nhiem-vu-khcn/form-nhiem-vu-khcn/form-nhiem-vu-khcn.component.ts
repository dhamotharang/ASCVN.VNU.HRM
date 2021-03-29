import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService } from '@core/services/common';
import { MenuQuery } from '@management-state/menu/menu.query';
import { WindowRef, WindowService } from '@progress/kendo-angular-dialog';
import { BaseScienceTechnologyFormComponent } from '../../_base/base-science-technology-form.component';
import { INhiemVuKHCN } from '../../_models/science-technology.model';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { DateUtil } from '@core/utils/date';
import { MessageConstant, MessageErrorVI } from '@core/constants/message.constant';
import { FormUtil } from '@core/utils/form';
import { ActionEnum } from '@core/constants/enum.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { map, takeUntil } from 'rxjs/operators';
import { AuthenticateService } from '@core/auth';
@Component({
    selector: 'app-form-nhiem-vu-khcn',
    templateUrl: './form-nhiem-vu-khcn.component.html',
    styleUrls: ['./form-nhiem-vu-khcn.component.scss'],
})
export class FormNhiemVuKhcnComponent extends BaseScienceTechnologyFormComponent<INhiemVuKHCN> implements OnInit, OnDestroy {
    url: string = UrlConstant.API.NHIEM_VU_KHCN;
    thanhViens: string = 'thanhViens';
    thanhVienNgoais: string = 'thanhVienNgoais';
    isQuanLy: false;
    tenCoQuanCap1: string;

    fketQuaDuKien = [];
    fthanhPhanThamGia = [];
    fthanhPhanThamGiaNgoai = [];
    fnhiemVuKhoaHoc:INhiemVuKHCN;
    constructor(
        private apiService: ApiService,
        private notification: NotificationService,
        private formBuilder: FormBuilder,
        protected windowService: WindowService,
        protected menuQuery: MenuQuery,
        protected windowRef: WindowRef
    ) {
        super(windowRef);
    }

    ngOnInit() {
        super.ngOnInit();
        this.coQuanNhanSu$ = this.apiService.read(UrlConstant.API.HRM_DANH_MUC_CO_QUAN + '/ByNhanSu', {}).pipe(map(res => res.result));
        if (this.action === ActionEnum.CREATE) {

            /*Default Năm sử dụng: - Hiện tại*/
            const year = new Date().getFullYear();
            this.form.get('namThucHien').setValue(year);
            this.coQuanNhanSu$.subscribe(res => {
                if (res.idCoQuanCap1) {
                    this.form.get('idCoQuan').setValue(res.idCoQuanCap1);
                    this.tenCoQuanCap1 = res.tenCoQuanCap1;
                }
            });

            this.form.get("ngayBatDau").setValue(new Date());
        }
        if (this.model) {
            this.fketQuaDuKien = this.model.ketQuas;
            this.fthanhPhanThamGia = this.model.thanhViens;
            this.fthanhPhanThamGiaNgoai = this.model.thanhVienNgoais;
            this.fnhiemVuKhoaHoc = this.model.nhiemVuKhoaHoc;
            if (this.action === ActionEnum.UPDATE) {
                this.setFormValue(this.fnhiemVuKhoaHoc);
                if(this.model.nhiemVuKhoaHoc && this.model.nhiemVuKhoaHoc.tenCoQuan){
                    this.tenCoQuanCap1 = this.model.nhiemVuKhoaHoc.tenCoQuan;
                }
            }
        }

        if(this.action == ActionEnum.UPDATE){
            this.coQuanNhanSu$.subscribe(res => {
                this.tenCoQuanCap1 = res.tenCoQuanCap1;
            });
        }

        if(this.tenCoQuanCap1 === undefined){
            this.tenCoQuanCap1 = '';
        }
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    createForm() {
        this.form = this.formBuilder.group({
            id: [0, Validators.required],
            idCoQuan: [null],
            idLinhVuc: [null, Validators.required],
            idCapDo: [null, Validators.required],
            maNhiemVuKhoaHoc: ['', Validators.required],
            tenNhiemVuKhoaHoc: ['', Validators.required],
            tenVietTat: [''],
            tomTat: [''],
            mucTieu: [''],
            noiDungNghienCuu: [''],
            moTaSanPham: [''],
            ngayBatDau: [null, Validators.required],
            ngayKetThuc: [null, Validators.required],
            namThucHien: [null, Validators.required],
            idTrangThaiDuyet: [null],
            isVisible: [null],
            ghiChu: [''],
            thanhViens: [],
            thanhVienNgoais: [],
            ketQuas: [],
            fileDinhKems: [null],
        });
    }

    setFormValue(data) {
        this.form.patchValue(data);
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
        const thanhViens = this.form.get(this.thanhViens).value;
        if (thanhViens) {
            const convertData = [];
            let errTV = false;
            thanhViens.map(res => {
                if (res.idVaiTro <= 0 || res.idVaiTro == null) {
                    this.notification.showErrorMessage(MessageErrorVI.KHCN02 + res.hoTenNhanSu);
                    errTV = true;
                    return;
                } else {
                    convertData.push({
                        idNhanSu: res.nhanSuId,
                        idVaiTro: res.idVaiTro,
                    });
                }
            });
            if (errTV) {
                return;
            }
            this.form.get(this.thanhViens).setValue(convertData);
        }

        const thanhVienNgoais = this.form.get(this.thanhVienNgoais).value;
        if (thanhVienNgoais) {
            const convertData = [];
            let errTV = false;
            thanhVienNgoais.map(res => {
                if (res.idVaiTro <= 0 || res.idVaiTro == null) {
                    this.notification.showErrorMessage(MessageErrorVI.KHCN02 + res.hoTenThanhVien);
                    errTV = true;
                    return;
                }
                else{
                    convertData.push({
                        id: res.id,
                        idVaiTro: res.idVaiTro,
                    });
                }
            });
            if(errTV){
                return;
            }
            this.form.get(this.thanhVienNgoais).setValue(convertData);
        }

        if (this.form.get('ngayBatDau').value) {
            this.form.get('ngayBatDau').setValue(DateUtil.getFullDate(this.form.get('ngayBatDau').value));
        }
        if (this.form.get('ngayKetThuc').value) {
            this.form.get('ngayKetThuc').setValue(DateUtil.getFullDate(this.form.get('ngayKetThuc').value));
        }
        if (this.form.get('idCoQuan').value) {
            this.form.get('idCoQuan').setValue(parseInt(this.form.get('idCoQuan').value), 10);
        }

        if (this.form.invalid) {
            FormUtil.validateAllFormFields(this.form);
            return;
        }

        switch (this.action) {
            case ActionEnum.CREATE:
                const create$ = this.apiService.post(this.url + '/Save', this.form.value).pipe(takeUntil(this.destroyed$));

                create$.subscribe(() => {
                    this.notification.showSuccessMessage(MessageConstant.COMMON.MSG_CREATE_DONE);
                    this.closeForm();
                });
                break;
            case ActionEnum.UPDATE:
                const update$ = this.apiService.post(this.url + '/Save', this.form.value).pipe(takeUntil(this.destroyed$));

                update$.subscribe(() => {
                    this.notification.showSuccessMessage(MessageConstant.COMMON.MSG_UPDATE_DONE);
                    this.closeForm();
                });
                break;
        }
    }

    receiveDataKetQua(data) {
        const convertData = [];
        if (data) {
            // tslint:disable-next-line: no-unsafe-any
            data.map(res => {
                res['ketQuaDuKien'].forEach(item => {
                    convertData.push({
                        // tslint:disable-next-line: no-unsafe-any
                        idKetQuaDuKien: item.id,
                        // tslint:disable-next-line: no-unsafe-any
                        soLuong: item.ketQua,
                    });
                });
            });
        }
        this.form.get('ketQuas').setValue(convertData);
    }

    receiveDataThanhVien(data) {
        this.form.get(this.thanhViens).setValue(data);
    }

    receiveDataThanhVienNgoai(data) {
        this.form.get(this.thanhVienNgoais).setValue(data);
    }
}
