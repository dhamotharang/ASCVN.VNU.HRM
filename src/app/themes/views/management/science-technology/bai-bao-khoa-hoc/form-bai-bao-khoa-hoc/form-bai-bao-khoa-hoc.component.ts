import { keyframes } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticateService } from '@core/auth';
import { ActionEnum } from '@core/constants/enum.constant';
import { MessageConstant, MessageErrorVI } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService } from '@core/services/common';
import { FormUtil } from '@core/utils/form';
import { MenuQuery } from '@management-state/menu/menu.query';
import { WindowRef, WindowService } from '@progress/kendo-angular-dialog';
import { map, takeUntil } from 'rxjs/operators';
import { BaseScienceTechnologyFormComponent } from '../../_base/base-science-technology-form.component';
import { IBaiBaoKhoaHoc } from '../../_models/science-technology.model';

@Component({
    selector: 'app-form-bai-bao-khoa-hoc',
    templateUrl: './form-bai-bao-khoa-hoc.component.html',
    styleUrls: ['./form-bai-bao-khoa-hoc.component.scss'],
})
export class FormBaiBaoKhoaHocComponent extends BaseScienceTechnologyFormComponent<IBaiBaoKhoaHoc> implements OnInit, OnDestroy {
    url: string = UrlConstant.API.BAI_BAO_KHCN;
    thanhViens: string = 'thanhViens';
    thanhVienNgoais: string = 'thanhVienNgoais';
    suDungPhongThiNghiems: string = 'suDungPhongThiNghiems';
    isQuanLy: false;
    tenCoQuanCap1: string;

    fthanhPhanThamGia = [];
    fthanhPhanThamGiaNgoai = [];
    fsuDung = [];
    fbaiBaoKhoaHoc:IBaiBaoKhoaHoc;
    constructor(
        private apiService: ApiService,
        private notification: NotificationService,
        private formBuilder: FormBuilder,
        protected windowService: WindowService,
        protected menuQuery: MenuQuery,
        protected windowRef: WindowRef,
        protected auth: AuthenticateService,
    ) {
        super(windowRef);
    }

    ngOnInit() {
        super.ngOnInit();
        switch(this.action){
            case ActionEnum.CREATE:
                this.coQuanNhanSu$ = this.apiService.read(UrlConstant.API.HRM_DANH_MUC_CO_QUAN + '/ByNhanSu', {}).pipe(map(res => res.result));
                /*Default Năm: - Hiện tại*/
                const year = new Date().getFullYear();
                this.form.get('namCongBo').setValue(year);

                /*Default Nguồc gốc: - Trong nước*/
                this.form.get('isTrongNuoc').setValue(true);
                
                this.coQuanNhanSu$.subscribe(res => {
                    if (res.idCoQuanCap1) {
                        if (res.idCoQuanCap1) {
                            this.form.get('idCoQuan').setValue(res.idCoQuanCap1);
                            this.tenCoQuanCap1 = res.tenCoQuanCap1;
                        }
                    }
                });
                break;

            case ActionEnum.UPDATE:
                if (this.model) {
                    this.fthanhPhanThamGia = this.model.thanhViens;
                    this.fthanhPhanThamGiaNgoai = this.model.thanhVienNgoais;
                    this.fbaiBaoKhoaHoc = this.model.baiBaoKhoaHoc;
                    this.fsuDung = this.model.suDungPhongThiNghiems;   
                    if(this.action == ActionEnum.UPDATE){
                        this.setFormValue(this.fbaiBaoKhoaHoc);
                    }
                    if(this.model.baiBaoKhoaHoc && this.model.baiBaoKhoaHoc.tenCoQuan){
                        this.tenCoQuanCap1 = this.model.baiBaoKhoaHoc.tenCoQuan;
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
            idDeTai: [null, Validators.required],
            maBaiBaoKhoaHoc: [null, Validators.required],
            tenBaiBaoKhoaHoc: [null, Validators.required],
            idTapChi: [null, Validators.required],
            soTrichDan: [null],
            tapSo: [''],
            viTriTrang: [''],
            isTrongNuoc: [null],
            phamViBaiBao: [null],
            namCongBo: [null],
            idTrangThaiDuyet: [null],
            isVisible: [true],
            ghiChu: [null],
            suDungPhongThiNghiems: [null],
            thanhViens: [null],
            thanhVienNgoais: [null],
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
