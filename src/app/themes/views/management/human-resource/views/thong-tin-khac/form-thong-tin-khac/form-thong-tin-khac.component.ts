import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { CustomTranslateService, NotificationService } from '@core/services/common';
import { FormUtil } from '@core/utils/form';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { forkJoin } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BaseHumanResourceFormComponent } from '../../../_base';
import { INhanSuHoanCanhKinhTe, INhanSuLichSuBanThan, INhanSuThongTinKhac, TrangThaiDuLieuEnum } from '../../../_models';

@Component({
    selector: 'app-form-thong-tin-khac',
    templateUrl: './form-thong-tin-khac.component.html',
    styleUrls: ['./form-thong-tin-khac.component.scss']
})
export class FormThongTinKhacComponent extends BaseHumanResourceFormComponent<INhanSuThongTinKhac> implements OnInit, OnDestroy {

    formLichSuBanThan: FormGroup;
    formHoanCanhKinhTe: FormGroup;

    constructor(
        private apiService: ApiService,
        private formBuilder: FormBuilder,
        private notification: NotificationService,
        private translate: CustomTranslateService,
        protected window: WindowRef
    ) {
        super(window);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.createFormLichSuBanThan();
        this.createFormHoanCanhKinhTe();
        if (this.model && this.model !== null) {
            this.form.patchValue(this.model);
            this.formLichSuBanThan.patchValue(this.model);
            this.formLichSuBanThan.get('id').setValue(this.model.idLichSuBanThan);
            this.formLichSuBanThan.get('idTrangThaiDuLieu').setValue(this.model.idTrangThaiDuLieuLichSuBanThan);
            
            this.formHoanCanhKinhTe.patchValue(this.model);
            this.formHoanCanhKinhTe.get('id').setValue(this.model.idHoanCanhKinhTe);
            this.formHoanCanhKinhTe.get('idTrangThaiDuLieu').setValue(this.model.idTrangThaiDuLieuHoanCanhKinhTe);

            this.preModel = { ...this.form.value };
        }
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    createForm() {
        this.form = this.formBuilder.group({
            id: [0],
            idHoanCanhKinhTe: [0],
            idLichSuBanThan: [0],
            idNhanSu: [this.nhanSuId, Validators.required],
            idTrangThaiDuLieuLichSuBanThan: [TrangThaiDuLieuEnum.SU_DUNG_CHINH],
            idTrangThaiDuLieuHoanCanhKinhTe: [TrangThaiDuLieuEnum.SU_DUNG_CHINH],
            nguonThuNhapChinh: [''],
            nguonKhac: [''],
            tenNhaOTuMua: [''],
            tenNhaODuocCap: [''],
            dienTichNhaOTuMua: [null],
            dienTichNhaODuocCap: [null],
            dienTichDatODuocCap: [null],
            dienTichDatOTuMua: [null],
            datSanXuatKinhDoanh: [''],
            dienTichDatSanXuatKinhDoanh: [null],
            tienAnTienSu: [''],
            lamViecCheDoCu: [''],
            thamGiaToChucChinhTri: [''],
            thamGiaToChucNuocNgoai: [''],
            thanNhanNuocNgoai: [''],
            nhanXet: [''],
            ghiChu: [''],
        });
    }

    createFormLichSuBanThan() {
        this.formLichSuBanThan = this.formBuilder.group({
            id: [0],
            idNhanSu: [this.nhanSuId, Validators.required],
            idTrangThaiDuLieu: [TrangThaiDuLieuEnum.SU_DUNG_CHINH],
            tienAnTienSu: [''],
            lamViecCheDoCu: [''],
            thamGiaToChucChinhTri: [''],
            thamGiaToChucNuocNgoai: [''],
            thanNhanNuocNgoai: [''],
            nhanXet: [''],
        });
    }

    createFormHoanCanhKinhTe() {
        this.formHoanCanhKinhTe = this.formBuilder.group({
            id: [0],
            idNhanSu: [this.nhanSuId, Validators.required],
            idTrangThaiDuLieu: [TrangThaiDuLieuEnum.SU_DUNG_CHINH],
            nguonThuNhapChinh: [''],
            nguonKhac: [''],
            tenNhaOTuMua: [''],
            tenNhaODuocCap: [''],
            dienTichNhaOTuMua: [null],
            dienTichNhaODuocCap: [null],
            dienTichDatODuocCap: [null],
            dienTichDatOTuMua: [null],
            datSanXuatKinhDoanh: [''],
            dienTichDatSanXuatKinhDoanh: [null],
        });
    }

    onSubmit() {
        if (this.form.invalid) {
            FormUtil.validateAllFormFields(this.form);
            return;
        }
        const lichSuBanThanBody = {
            id: this.form.get('idLichSuBanThan').value,
            idNhanSu: this.form.get('idNhanSu').value,
            idTrangThaiDuLieu: this.form.get('idTrangThaiDuLieuLichSuBanThan').value,
            tienAnTienSu: this.form.get('tienAnTienSu').value,
            lamViecCheDoCu: this.form.get('lamViecCheDoCu').value,
            thamGiaToChucChinhTri: this.form.get('thamGiaToChucChinhTri').value,
            thamGiaToChucNuocNgoai: this.form.get('thamGiaToChucNuocNgoai').value,
            thanNhanNuocNgoai: this.form.get('thanNhanNuocNgoai').value,
            nhanXet: this.form.get('nhanXet').value
        } as INhanSuLichSuBanThan;

        const hoanCanhKinhTeBody = {
            id: this.form.get('idHoanCanhKinhTe').value,
            idNhanSu: this.form.get('idNhanSu').value,
            idTrangThaiDuLieu: this.form.get('idTrangThaiDuLieuHoanCanhKinhTe').value,
            nguonThuNhapChinh: this.form.get('nguonThuNhapChinh').value,
            nguonKhac: this.form.get('nguonKhac').value,
            tenNhaOTuMua: this.form.get('tenNhaOTuMua').value,
            tenNhaODuocCap: this.form.get('tenNhaODuocCap').value,
            dienTichNhaOTuMua: this.form.get('dienTichNhaOTuMua').value,
            dienTichNhaODuocCap: this.form.get('dienTichNhaODuocCap').value,
            dienTichDatODuocCap: this.form.get('dienTichDatODuocCap').value,
            dienTichDatOTuMua: this.form.get('dienTichDatOTuMua').value,
            datSanXuatKinhDoanh: this.form.get('datSanXuatKinhDoanh').value,
            dienTichDatSanXuatKinhDoanh: this.form.get('dienTichDatSanXuatKinhDoanh').value,
        } as INhanSuHoanCanhKinhTe;

        const flagLichSuBanThan = Object.entries(this.formLichSuBanThan.value).toString() === Object.entries(lichSuBanThanBody).toString();
        const flagHoanCanhKinhTe = Object.entries(this.formHoanCanhKinhTe.value).toString() === Object.entries(hoanCanhKinhTeBody).toString();

        if (flagLichSuBanThan && flagHoanCanhKinhTe) {
            this.closeForm();
        } else {
            // thay doi du lieu LichSuBanThan
            if (!flagLichSuBanThan && flagHoanCanhKinhTe) {
                this.apiService.put(UrlConstant.API.HRM_NS_LICH_SU_CA_NHAN + '/DeXuat', lichSuBanThanBody)
                    .pipe(takeUntil(this.destroyed$))
                    .subscribe((res) => {
                        this.notification.showSuccessMessage(this.translate.get('MES.UPDATE_DONE'));
                        this.closeForm();
                    });
            }
            // thay doi du lieu HoanCanhKinhTe
            if (flagLichSuBanThan && !flagHoanCanhKinhTe) {
                this.apiService.put(UrlConstant.API.HRM_NS_HOAN_CANH_KINH_TE + '/DeXuat', hoanCanhKinhTeBody)
                    .pipe(takeUntil(this.destroyed$))
                    .subscribe((res) => {
                        this.notification.showSuccessMessage(this.translate.get('MES.UPDATE_DONE'));
                        this.closeForm();
                    });
            }
            // thay doi du lieu LichSuBanThan & HoanCanhKinhTe
            if (!flagLichSuBanThan && !flagHoanCanhKinhTe) {
                const lichSuBanThan$ = this.apiService.put(UrlConstant.API.HRM_NS_LICH_SU_CA_NHAN + '/DeXuat', lichSuBanThanBody);

                const hoanCanhKinhTe$ = this.apiService.put(UrlConstant.API.HRM_NS_HOAN_CANH_KINH_TE + '/DeXuat', hoanCanhKinhTeBody);

                forkJoin([lichSuBanThan$, hoanCanhKinhTe$])
                    .pipe(takeUntil(this.destroyed$))
                    .subscribe(([lichSuBanThan, hoanCanhKinhTe]) => {

                        this.notification.showSuccessMessage(this.translate.get('MES.UPDATE_DONE'));
                        this.closeForm();
                    });
            }
        }
    }

}
