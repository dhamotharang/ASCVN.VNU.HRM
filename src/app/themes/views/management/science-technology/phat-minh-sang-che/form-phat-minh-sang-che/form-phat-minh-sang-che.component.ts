import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActionEnum } from '@core/constants/enum.constant';
import { MessageConstant, MessageErrorVI } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService } from '@core/services/common';
import { DateUtil } from '@core/utils/date';
import { FormUtil } from '@core/utils/form';
import { MenuQuery } from '@management-state/menu/menu.query';
import { WindowService, WindowRef } from '@progress/kendo-angular-dialog';
import { map, takeUntil } from 'rxjs/operators';
import { BaseScienceTechnologyFormComponent } from '../../_base/base-science-technology-form.component';
import { IPhatMinhSangChe } from '../../_models/science-technology.model';

@Component({
    selector: 'app-form-phat-minh-sang-che',
    templateUrl: './form-phat-minh-sang-che.component.html',
    styleUrls: ['./form-phat-minh-sang-che.component.scss'],
})
export class FormPhatMinhSangCheComponent extends BaseScienceTechnologyFormComponent<IPhatMinhSangChe> implements OnInit, OnDestroy {
    url: string = UrlConstant.API.KHCN_PHAT_MINH_SANG_CHE;
    thanhViens: string = 'thanhViens';
    thanhVienNgoais: string = 'thanhVienNgoais';
    suDungPhongThiNghiems: string = 'suDungPhongThiNghiems';
    isQuanLy: false;
    tenCoQuanCap1: string;

    fthanhPhanThamGia = [];
    fthanhPhanThamGiaNgoai = [];
    fsuDung = [];
    fphatMinhSangChe:IPhatMinhSangChe;

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
        switch(this.action){
            case ActionEnum.CREATE:
                /*Default Quốc gia: 1 - Việt Nam*/
                this.form.get('idQuocGiaCapBang').setValue(1);
                this.coQuanNhanSu$ = this.apiService.read(UrlConstant.API.HRM_DANH_MUC_CO_QUAN + '/ByNhanSu', {}).pipe(map(res => res.result));
                // tslint:disable-next-line: deprecation
                this.coQuanNhanSu$.subscribe(res => {
                    if (res.idCoQuanCap1) {
                        this.form.get('idCoQuan').setValue(res.idCoQuanCap1);
                        this.tenCoQuanCap1 = res.tenCoQuanCap1;
                    }
                });
                break;

            case ActionEnum.UPDATE:
                if (this.model) {
                    this.fthanhPhanThamGia = this.model.thanhViens;
                    this.fthanhPhanThamGiaNgoai = this.model.thanhVienNgoais;
                    this.fphatMinhSangChe = this.model.phatMinhSangChe;
                    this.fsuDung = this.model.suDungPhongThiNghiems;
                    if (this.action === ActionEnum.UPDATE) {
                        this.setFormValue(this.fphatMinhSangChe);
                    }
                    if(this.model.phatMinhSangChe && this.model.phatMinhSangChe.tenCoQuan){
                        this.tenCoQuanCap1 = this.model.phatMinhSangChe.tenCoQuan;
                    }
                }
                break;
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
            id: [0],
            idCoQuan: [null, Validators.required],
            maCapBang: ['', Validators.required],
            tenPhatMinhSangChe: ['', Validators.required],
            idHinhThuc: [null, Validators.required],
            moTa: [''],
            idDeTai: [null, Validators.required],
            idTinhTrangDangKy: [null, Validators.required],
            ngayCapBang: [null, Validators.required],
            idQuocGiaCapBang: [null, Validators.required],
            idToChucCapBang: [null],
            idTinhTrangSanPham: [null],
            khaNangUngDung: [''],
            nhuCauChuyenGiao: [''],
            nhuCauGoiVon: [''],
            deNghiHoTro: [''],
            idTrangThaiDuyet: [null],
            currentUser: [null],
            thanhViens: [],
            thanhVienNgoais: [],
            suDungPhongThiNghiems: [],
            fileDinhKems: [[]],
            ghiChu: [''],
        });
    }

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
                } else {
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

        const suDungPTNs = this.form.get(this.suDungPhongThiNghiems).value;
        if (suDungPTNs) {
            const convertData = [];
            let errTV = false;
            if (suDungPTNs) {
                suDungPTNs.map(res => {
                    convertData.push({
                        idPhongThiNghiem: res.id,
                        mucDoSuDung: res.mucDoSuDung != '' ? res.mucDoSuDung : 0,
                    });
                });
                if (errTV) {
                    return;
                }
                this.form.get(this.suDungPhongThiNghiems).setValue(convertData);
            }
        }

        if (this.form.get('ngayCapBang').value) {
            this.form.get('ngayCapBang').setValue(DateUtil.getFullDate(this.form.get('ngayCapBang').value));
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

    receiveDataThanhVien(data) {
        this.form.get(this.thanhViens).setValue(data);
    }

    receiveDataThanhVienNgoai(data) {
        this.form.get(this.thanhVienNgoais).setValue(data);
    }

    receiveDataPhongThiNghiem(data) {
        this.form.get(this.suDungPhongThiNghiems).setValue(data);
    }
}
