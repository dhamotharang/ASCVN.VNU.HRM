import { FormBuilder, Validators } from '@angular/forms';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService } from '@core/services/common/notification.service';
import { UrlConstant } from '@core/constants/url.constant';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { INhanSuThongTinLuong } from '@themes/views/management/human-resource/_models/thong-tin-luong.model';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { BaseHumanResourceFormComponent } from '@themes/views/management/human-resource/_base/base-human-resource-form.component';
import { FormUtil } from '@core/utils/form';
import { DateUtil } from '@core/utils/date';
import { TrangThaiDuLieuEnum } from '@themes/views/management/human-resource/_models/human-resource.enum';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import { IBacLuong, INgachCongChuc } from '@themes/views/management/catalogs/_models/catalog.model';
import { ActionEnum } from '@core/constants/enum.constant';
import { EmitEvent, EventBus, EventBusService } from '@core/services/common';

@Component({
    selector: 'app-form-thong-tin-luong',
    templateUrl: './form-thong-tin-luong.component.html',
    styleUrls: ['./form-thong-tin-luong.component.scss'],
})
export class FormThongTinLuongComponent extends BaseHumanResourceFormComponent<INhanSuThongTinLuong> implements OnInit, OnDestroy {
    @Input() isNhatKy: boolean;

    ngachCongChucs: INgachCongChuc[];
    bacLuongs: IBacLuong[] = [];
    nhomNgachId: number;
    constructor(
        private apiService: ApiService,
        private formBuilder: FormBuilder,
        private notification: NotificationService,
        private translate: CustomTranslateService,
        private eventBus: EventBusService,
        protected window: WindowRef
    ) {
        super(window);
    }

    ngOnInit() {
        super.ngOnInit();
        if (this.model) {
            if (this.model.heSoLuong) {
                this.form.get('heSoLuongText').setValue(this.model.heSoLuong.toString().replace('.', ','));
            }
            this.loadNgachCongChucs(this.model.idNhomNgach);
        }
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    disabledNgayKetThuc = (current: Date): boolean => {
        if (!this.form.get('ngayBatDau').value) {
            return;
        }
        // Can not select days before today and today
        return differenceInCalendarDays(current, new Date(this.form.get('ngayBatDau').value)) < 0;
    };

    disabledNgayBatDau = (current: Date): boolean => {
        if (!this.form.get('ngayKetThuc').value) {
            return;
        }
        // Can not select days before today and today
        return differenceInCalendarDays(current, new Date(this.form.get('ngayKetThuc').value)) > 0;
    };

    createForm() {
        this.form = this.formBuilder.group({
            id: [0],
            idNhanSu: [null, Validators.required],
            idNhomNgach: [null, Validators.required],
            idNgach: [null, Validators.required],
            maNgach: [null],
            idBacLuong: [null, Validators.required],
            bacLuong: [null],
            heSoLuong: [null],
            heSoLuongText: [null],
            vuotKhung: [null],
            phuCapNgheNghiep: [null],
            phuCapThamNien: [null],
            phuCapChucVu: [null],
            ngayBatDau: [null],
            ngayKetThuc: [null],
            ngayHuongHeSoLuong: [null],
            soQuyetDinh: [null],
            idQuyetDinh: [null],
            ngayTangLuongTiepTheo: [null],
            ghiChu: [''],
            tenNgach: [''],
            tenBac: [''],
            maQuyetDinh: [null],
            idTrangThaiDuLieu: [TrangThaiDuLieuEnum.SU_DUNG_CHINH],
        });
    }

    onSubmit() {
        this.form.get('idNhanSu').setValue(this.nhanSuId);
        if (this.form.invalid) {
            FormUtil.validateAllFormFields(this.form);
            return;
        } else {
            if (this.preModel && (Object.entries(this.form.value).toString() === Object.entries(this.preModel).toString())) {
                this.closeForm();
            } else {
                // convert fullDate()
                if (this.form.get('ngayBatDau').value) {
                    this.form.get('ngayBatDau').setValue(DateUtil.getFullDate(this.form.get('ngayBatDau').value));
                }

                if (this.form.get('ngayKetThuc').value) {
                    this.form.get('ngayKetThuc').setValue(DateUtil.getFullDate(this.form.get('ngayKetThuc').value));
                }

                if (this.form.get('ngayHuongHeSoLuong').value) {
                    this.form.get('ngayHuongHeSoLuong').setValue(DateUtil.getFullDate(this.form.get('ngayHuongHeSoLuong').value));
                }

                if (this.form.get('ngayTangLuongTiepTheo').value) {
                    this.form.get('ngayTangLuongTiepTheo').setValue(DateUtil.getFullDate(this.form.get('ngayTangLuongTiepTheo').value));
                }

                // convert number
                if (this.form.get('vuotKhung').value === '') {
                    this.form.get('vuotKhung').setValue(null);
                }

                if (this.form.get('phuCapNgheNghiep').value === '') {
                    this.form.get('phuCapNgheNghiep').setValue(null);
                }
                
                if (this.form.get('phuCapChucVu').value === '') {
                    this.form.get('phuCapChucVu').setValue(null);
                }

                // call api
                if (this.isNhatKy) {
                    this.apiUrl = UrlConstant.API.HRM_NS_LUONG + '/NhatKy';
                    this.apiService
                        .put(this.apiUrl, this.form.value)
                        .pipe(takeUntil(this.destroyed$))
                        .subscribe(() => {
                            this.notification.showSuccessMessage(this.translate.get('MES.UPDATE_DONE'));
                            this.closeForm();
                        });
                } else {
                    this.apiUrl = UrlConstant.API.HRM_NS_LUONG;
                    if (this.isPersonal) {
                        this.apiUrl += '/DeXuat';
                    }
                    this.apiService
                        .put(this.apiUrl, this.form.value)
                        .pipe(takeUntil(this.destroyed$))
                        .subscribe(() => {
                            this.notification.showSuccessMessage(this.translate.get('MES.UPDATE_DONE'));
                            if (this.isPersonal) {
                                this.eventBus.emit(new EmitEvent(EventBus.DuyetTabThongTinNhanSu, true));
                            }
                            this.closeForm();
                        });
                }
            }
        }
    }

    onSelectNhomNgach(idNhomNgach: number) {
        if (idNhomNgach) {
            this.loadNgachCongChucs(idNhomNgach);
            this.loadBacLuongs(idNhomNgach);
        } else {
            this.form.get('idNhomNgach').setValue(null);
        }
        this.form.get('idNgach').setValue(null);
        this.form.get('maNgach').setValue(null);
        this.form.get('idBacLuong').setValue(null);
        this.form.get('heSoLuong').setValue(null);
        this.form.get('heSoLuongText').setValue(null);
    }

    onSelectNgachCongChuc(idNgach: number) {
        if (idNgach) {
            const ngachCongChuc = this.ngachCongChucs.find(m => m.ngachCongChucId === idNgach);
            this.nhomNgachId = ngachCongChuc.nhomNgachId;
            // this.loadBacLuongs(ngachCongChuc.nhomNgachId);
            this.form.get('maNgach').setValue(ngachCongChuc.ma);
        } else {
            this.form.get('maNgach').setValue(null);
        }
        this.form.get('idBacLuong').setValue(null);
        this.form.get('heSoLuong').setValue(null);
        this.form.get('heSoLuongText').setValue(null);
    }

    onSelectBacLuong(id: number) {
        if (id) {
            const itemBacLuong = this.bacLuongs.find(m => m.bacLuongId === id);
            this.form.get('heSoLuong').setValue(itemBacLuong.heSoLuong);
            this.form.get('heSoLuongText').setValue(itemBacLuong.heSoLuong.toString().replace('.', ','));
        } else {
            this.form.get('heSoLuong').setValue(null);
            this.form.get('heSoLuongText').setValue(null);
        }
    }

    loadNgachCongChucs(idNhomNgach: number) {
        this.apiService
            .read(`${UrlConstant.API.DM_NGACH_CONG_CHUC}/List`, {
                pageSize: 0,
                pageNumber: 0,
                nhomNgachId: [idNhomNgach]
            })
            .pipe(
                map(res => {
                    if (res.result) {
                        return res.result.items;
                    }
                    return [];
                }),
                tap((res: INgachCongChuc[]) => {
                    this.ngachCongChucs = res;
                    if (this.model && this.model.idNgach) {
                        const ngachCongChuc = this.ngachCongChucs.find(m => m.ngachCongChucId === this.model.idNgach);
                        this.loadBacLuongs(ngachCongChuc.nhomNgachId);
                    }
                })
            )
            .pipe(takeUntil(this.destroyed$))
            .subscribe();
    }

    loadBacLuongs(idNhomNgach: number) {
        this.apiService
            .read(`${UrlConstant.API.DM_BAC_LUONG}/List`, {
                pageSize: 0,
                pageNumber: 0,
                sortCol: 'stt',
                sortByASC: true,
                nhomNgachId: [idNhomNgach],
            })
            .pipe(
                map(res => {
                    if (res.result) {
                        return res.result.items;
                    }
                    return [];
                }),
                tap((res: IBacLuong[]) => {
                    this.bacLuongs = res;
                }),
            )
            .pipe(takeUntil(this.destroyed$))
            .subscribe();
    }
}
