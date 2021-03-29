import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticateService } from '@core/auth';
import { ActionEnum } from '@core/constants/enum.constant';
import { MessageConstant, MessageErrorVI } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService } from '@core/services/common';
import { FormUtil } from '@core/utils/form';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { ICongCu } from '@themes/views/management/laboratory-catalog/_models/ptn.model';
import { map, takeUntil, tap } from 'rxjs/operators';
import { BaseLaboratoryFormComponent } from '../../../_base/base-laboratory-form.component';
import { IThietBi } from '../../../_models/ptn.model';

@Component({
    selector: 'app-form-them-thiet-bi',
    templateUrl: './form-them-thiet-bi.component.html',
    styleUrls: ['./form-them-thiet-bi.component.scss'],
    animations: [],
})
export class FormThemThietBiComponent extends BaseLaboratoryFormComponent<IThietBi> implements OnInit, OnDestroy {
    tabCurrentIndex = 0;
    idPhongThiNghiem: number;
    isDisabled = false;
    congCus: ICongCu[] = [];
    tenCoQuanCap1: string;
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
        this.form.get('idTinhTrangThietBi').setValue(1);
        if (this.idPhongThiNghiem != null && this.idPhongThiNghiem > 0) {
            this.form.get('idPhongThiNghiem').setValue(this.idPhongThiNghiem);
            this.isDisabled = true;
        }
        this.user = this.auth.getUserInfo();
        if (this.action === ActionEnum.CREATE) {
            /*Default Quốc gia: 1 - Việt Nam*/
            this.form.get('idQuocGia').setValue(1);
            /*Default Năm sử dụng: - Hiện tại*/
            const year = new Date().getFullYear();
            this.form.get('namSuDung').setValue(year);
            if (this.user.doiTuongId) {
                this.coQuanNhanSu$.subscribe(res => {
                    this.form.get('idCoQuan').setValue(res.idCoQuanCap1);
                    this.tenCoQuanCap1 = res.tenCoQuanCap1;
                });
            }
        }
        if (this.action === ActionEnum.UPDATE) {
            if (this.model) {
                this.tenCoQuanCap1 = this.model.tenDonVi;
            }
        }
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
    createForm() {
        this.form = this.formBuilder.group({
            id: [null],
            idNhomCongCu: [null, Validators.required],
            idCongCu: [null, Validators.required],
            idCoQuan: [null, Validators.required],
            idTinhTrangThietBi: [null, Validators.required],
            maThietBi: ['', Validators.required],
            nguyenGia: [null, Validators.required],
            khauHao: [null],
            giaTriConLai: [null],
            isVisible: [null],
            moTa: [''],
            nhaCungCap: [''],
            ghiChu: [''],
            idPhongThiNghiem: [null, Validators.required],
            tenThietBi: ['', Validators.required],
            idQuocGia: [null],
            thongTinKyThuat: [''],
            dieuKienVanHanh: [''],
            namSuDung: [null],
            soNamSuDung: [null],
            tyLeKhauHao: [null],
            ngayBatDauTinhKhauHao: [null],
        });
    }

    onSubmit() {
        let lgthNguyenGia = this.form.get('nguyenGia').value
            ? this.form
                  .get('nguyenGia')
                  .value.toLocaleString()
                  .replace(/[^\w\s]/g, '').length
            : 0;
        if (lgthNguyenGia > 15) {
            this.notification.showErrorMessage(MessageErrorVI.KHCN05);
            return;
        }

        let lgthGiaTriConLai = this.form.get('giaTriConLai').value
            ? this.form
                  .get('giaTriConLai')
                  .value.toLocaleString()
                  .replace(/[^\w\s]/g, '').length
            : 0;
        if (lgthGiaTriConLai > 15) {
            this.notification.showErrorMessage(MessageErrorVI.KHCN05);
            return;
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
                const create$ = this.apiService.post(UrlConstant.API.PTN_THIETBI, this.form.value).pipe(takeUntil(this.destroyed$));

                create$.subscribe(() => {
                    this.notification.showSuccessMessage(MessageConstant.COMMON.MSG_CREATE_DONE);
                    this.closeForm();
                });
                break;
            case ActionEnum.UPDATE:
                const update$ = this.apiService.put(UrlConstant.API.PTN_THIETBI, this.form.value).pipe(takeUntil(this.destroyed$));

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

    loadCongCus(idRef: number) {
        this.apiService
            .post(`${UrlConstant.API.DM_CONG_CU}/GetList`, {
                pageSize: 0,
                pageNumber: 0,
                idRef: idRef,
            })
            .pipe(
                map(res => {
                    if (res.result) {
                        return res.result.items;
                    }
                    return [];
                }),
                tap((res: ICongCu[]) => {
                    this.congCus = res;
                })
            )
            .pipe(takeUntil(this.destroyed$))
            .subscribe();
    }

    async onChageCongCu(id: number) {
        if (id) {
            const item = this.congCus.find(m => m.id === id);
            if (item) {
                this.form.get('tenThietBi').setValue(item.ten);
                const ma = await this.genMaTuDongAsync({
                    // tslint:disable-next-line: object-literal-shorthand
                    codeType: 1,
                    // tslint:disable-next-line: object-literal-shorthand
                    prefix: item.ma,
                    // tslint:disable-next-line: object-literal-shorthand
                    padLeft: 3,
                    // tslint:disable-next-line: object-literal-shorthand
                    iDRef: item.id,
                });
                if (ma) {
                    this.form.get('maThietBi').setValue(ma);
                }
            }
        } else {
            this.form.get('maThietBi').setValue('');
            this.form.get('tenThietBi').setValue('');
        }
    }

    onChageNhomCongCu(id: number) {
        this.form.get('maThietBi').setValue('');
        this.form.get('tenThietBi').setValue('');
        this.loadCongCus(id);
    }
}
