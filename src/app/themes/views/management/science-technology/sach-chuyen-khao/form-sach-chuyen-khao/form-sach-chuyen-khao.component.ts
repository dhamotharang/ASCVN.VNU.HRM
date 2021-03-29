import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActionEnum } from '@core/constants/enum.constant';
import { MessageConstant, MessageErrorVI } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService } from '@core/services/common';
import { FormUtil } from '@core/utils/form';
import { MenuQuery } from '@management-state/menu/menu.query';
import { WindowService, WindowRef } from '@progress/kendo-angular-dialog';
import { map, takeUntil } from 'rxjs/operators';
import { ISachChuyenKhao } from '../../_models/science-technology.model';
import { BaseScienceTechnologyFormComponent } from '../../_base/base-science-technology-form.component';

@Component({
    selector: 'app-form-sach-chuyen-khao',
    templateUrl: './form-sach-chuyen-khao.component.html',
    styleUrls: ['./form-sach-chuyen-khao.component.scss'],
})
export class FormSachChuyenKhaoComponent extends BaseScienceTechnologyFormComponent<ISachChuyenKhao> implements OnInit, OnDestroy {
    url: string = UrlConstant.API.KHCN_SACH_CHUYEN_KHAO;
    thanhViens: string = 'thanhViens';
    thanhVienNgoais: string = 'thanhVienNgoais';
    suDungPhongThiNghiems: string = 'suDungPhongThiNghiems';
    thongTinCoQuan: [];
    isQuanLy: false;
    tenCoQuanCap1: string;

    fthanhPhanThamGia = [];
    fthanhPhanThamGiaNgoai = [];
    fsuDung = [];
    fsachChuyenKhao:ISachChuyenKhao;
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
                 /*Default Năm sử dụng: - Hiện tại*/
                const year = new Date().getFullYear();
                this.form.get('namXuatBan').setValue(year);
                this.coQuanNhanSu$ = this.apiService.read(UrlConstant.API.HRM_DANH_MUC_CO_QUAN + '/ByNhanSu', {}).pipe(map(res => res.result));
                this.coQuanNhanSu$.subscribe(res => {
                    if (res.idCoQuanCap1) {
                        this.form.get('idCoQuan').setValue(res.idCoQuanCap1);
                        this.tenCoQuanCap1 = res.tenCoQuanCap1;
                    }});
                break;

            case ActionEnum.UPDATE:
                if (this.model) {
                    this.fthanhPhanThamGia = this.model.thanhViens;
                    this.fthanhPhanThamGiaNgoai = this.model.thanhVienNgoais;
                    this.fsachChuyenKhao = this.model.sachChuyenKhao;
                    this.fsuDung = this.model.suDungPhongThiNghiems;
                    this.setFormValue(this.fsachChuyenKhao);
                }
                if(this.model.sachChuyenKhao && this.model.sachChuyenKhao.tenCoQuan){
                    this.tenCoQuanCap1 = this.model.sachChuyenKhao.tenCoQuan;
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
            idCoQuan: [null],
            maSachChuyenKhao: ['', Validators.required],
            tenSachChuyenKhao: ['', Validators.required],
            idDeTai: [null, Validators.required],
            nhaXuatBan: ['', Validators.required],
            namXuatBan: [null, Validators.required],
            idTrangThaiDuyet: [null],
            isTiengViet: [null, Validators.required],
            isGiaoTrinh: [null],
            isChuyenKhao: [null],
            isThamKhao: [null],
            thanhViens: [],
            thanhVienNgoais: [],
            suDungPhongThiNghiems: [],
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
