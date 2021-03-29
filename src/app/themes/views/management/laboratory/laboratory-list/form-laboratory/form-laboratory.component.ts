import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService } from '@core/services/common';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { BaseLaboratoryFormComponent } from '../../_base/base-laboratory-form.component';
import { FormUtil } from '@core/utils/form';
import { ActionEnum } from '@core/constants/enum.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { map, takeUntil } from 'rxjs/operators';
import { FOLDER } from '@core/constants/app.constant';
import { IPhongThiNghiem } from '../../_models/ptn.model';
import { AuthenticateService } from '@core/auth';
@Component({
    selector: 'app-form-laboratory',
    templateUrl: './form-laboratory.component.html',
    styleUrls: ['./form-laboratory.component.scss'],
    animations: [],
})
export class FormLaboratoryComponent extends BaseLaboratoryFormComponent<IPhongThiNghiem> implements OnInit, OnDestroy {
    folder = FOLDER;
    fnganhs = [];
    chuyenNganhs = 'chuyenNganhs';
    tenCoQuanCap1 = '';

    constructor(
        protected apiService: ApiService,
        private formBuilder: FormBuilder,
        private notification: NotificationService,
        protected windowRef: WindowRef,
        protected auth: AuthenticateService
    ) {
        super(windowRef, apiService);
    }

    ngOnInit() {
        super.ngOnInit();
        this.user = this.auth.getUserInfo();
        // if (this.action === ActionEnum.CREATE) {
        //     if (this.user.doiTuongId) {
        //         this.coQuanNhanSu$.subscribe(res => {
        //             this.form.get('idCoQuan').setValue(res.idCoQuanCap1);
        //         });
        //     }
        // }
        if (this.action === ActionEnum.UPDATE) {
            if (this.model) {
                this.fnganhs = this.model.nganhs;
            }
        }
        if (this.user.doiTuongId) {
            if (this.coQuanNhanSu$) {
                this.coQuanNhanSu$.subscribe(res => {
                    this.form.get('idCoQuan').setValue(res.idCoQuanCap1);
                    this.tenCoQuanCap1 = res.tenCoQuanCap1;
                });
            }
        }

        if (this.tenCoQuanCap1 == null || this.tenCoQuanCap1 == '' || this.tenCoQuanCap1 == undefined) {
            this.tenCoQuanCap1 = '';
        }
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    createForm() {
        this.form = this.formBuilder.group({
            id: [null],
            idCoQuan: [null],
            idLoaiHinhPhong: [null, Validators.required],
            maPhongThiNghiem: ['', Validators.required],
            tenPhongThiNghiem: ['', Validators.required],
            moTa: [''],
            chungChi: [''],
            tuCachPhapNhan: [''],
            soTaiKhoan: [''],
            chuTaiKhoan: [''],
            nganHang: [''],
            diaChi: [''],
            soDienThoai: [''],
            stt: [null],
            idFileDinhKem: [null],
            isVisible: [null],
            ghiChu: [''],
            tenPhongThiNghiem_EN: [''],
            tenVietTat: [''],
            namThanhLap: [null],
            soQuyetDinhThanhLap: [''],
            noiDungQuyetDinhThanhLap: [''],
            mucTieu: [''],
            idCapDo: [null],
            idCapQuanLy: [null],
            idNganh: [null],
            idChuyenNganh: [[]],
            chuyenNganhs: [null],
        });
    }

    onSubmit() {
        const chuyenNganhs = this.form.get(this.chuyenNganhs).value;
        if (chuyenNganhs) {
            const convertData = [];
            const ids = [];
            // tslint:disable-next-line: no-unsafe-any
            chuyenNganhs.map(res => {
                // tslint:disable-next-line: no-unsafe-any
                if (res.idChuyenNganh) {
                    // tslint:disable-next-line: no-unsafe-any
                    res.idChuyenNganh.forEach((e: number) => {
                        if (e && e > 0) {
                            if (!ids.includes(e)) {
                                convertData.push({ idChuyenNganh: e });
                                ids.push(e);
                            }
                        }
                    });
                }
            });
            this.form.get(this.chuyenNganhs).setValue(convertData);
        }
        if (this.form.invalid) {
            FormUtil.validateAllFormFields(this.form);
            return;
        }

        if (this.form.get('idCoQuan').value) {
            this.form.get('idCoQuan').setValue(parseInt(this.form.get('idCoQuan').value), 10);
        }
        switch (this.action) {
            case ActionEnum.CREATE:
                const create$ = this.apiService.post(UrlConstant.API.PTN_PHONGTHINGHIEM, this.form.value).pipe(takeUntil(this.destroyed$));

                create$.subscribe(() => {
                    this.notification.showSuccessMessage(MessageConstant.COMMON.MSG_CREATE_DONE);
                    this.closeForm();
                });
                break;
            case ActionEnum.UPDATE:
                const update$ = this.apiService.put(UrlConstant.API.PTN_PHONGTHINGHIEM, this.form.value).pipe(takeUntil(this.destroyed$));

                update$.subscribe(() => {
                    this.notification.showSuccessMessage(MessageConstant.COMMON.MSG_UPDATE_DONE);
                    this.closeForm();
                });
                break;
        }
    }

    receiveDataChuyenNganh(data) {
        this.form.get(this.chuyenNganhs).setValue(data);
    }
}
