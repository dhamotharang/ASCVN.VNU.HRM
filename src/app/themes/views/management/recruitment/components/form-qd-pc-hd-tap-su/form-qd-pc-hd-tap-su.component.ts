import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionEnum } from '@core/constants/enum.constant';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService } from '@core/services/common/notification.service';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { DateUtil } from '@core/utils/date';
import { FormUtil } from '@core/utils/form';
import { Observable, of, Subject } from 'rxjs';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { IQuyetDinhPhanCongHuongDanTapSu } from '@themes/views/management/recruitment/_models/qd-phan-cong-hd-tap-su.model';
import { UrlConstant } from '@core/constants/url.constant';
import { IFile, IFileAttach } from '@core/models/common/file.model';
import { takeUntil } from 'rxjs/operators';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import { FOLDER } from '@core/constants/app.constant';
import { DuLieuNhanSuEnum } from '@themes/views/management/human-resource/_models';
@Component({
    selector: 'app-form-qd-pc-hd-tap-su',
    templateUrl: './form-qd-pc-hd-tap-su.component.html',
    styleUrls: ['./form-qd-pc-hd-tap-su.component.scss'],
})
export class FormQdPcHdTapSuComponent implements OnInit, OnDestroy {
    @Input() action: ActionEnum;
    @Input() model: IQuyetDinhPhanCongHuongDanTapSu;
    @Input() idKeHoachTuyenDung: number;

    form: FormGroup;
    folder = FOLDER;
    isAction = ActionEnum;
    chonNhanSu: number[] = [];
    chonNguoiXetDuyet: number[] = [];
    fileInput$: Observable<IFileAttach[]>;
    gridView: GridDataResult;
    tenNhanSuTapSu: string;
    tenViTriViecLam: string;
    idCoQuanCap1: number;
    private destroyed$ = new Subject();

    constructor(
        private apiService: ApiService,
        private formBuilder: FormBuilder,
        private notification: NotificationService,
        private translate: CustomTranslateService,
        private windowRef: WindowRef
    ) {}

    ngOnInit() {
        this.createForm();
        if (this.model) {
            if (this.model.idQuyetDinh && this.model.idNhanSuTapSu) {
                this.getById(this.model.idQuyetDinh, this.model.idNhanSuTapSu);
            }
            if (this.model?.idCoQuanCap1 && this.model?.idCoQuanCap1 > 0) {
                this.idCoQuanCap1 = this.model?.idCoQuanCap1;
            }
            this.tenNhanSuTapSu = this.model.hoDem + ' ' + this.model.ten;
            this.tenViTriViecLam = this.model.tenViTriViecLam;
        }
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    createForm() {
        this.form = this.formBuilder.group({
            idQuyetDinh: [0],
            idNhanSuTapSu: [null, Validators.required],
            idKeHoachTuyenDung: [null],
            soQuyetDinh: [''],
            ngayQuyetDinh: [null],
            ngayHieuLuc: [null],
            idNhanSuNhanQuyetDinh: [null, Validators.required],
            idNguoiXetDuyet: [null],
            heSoTrachNhiem: [null],
            tapSuTuNgay: [null, Validators.required],
            tapSuDenNgay: [null, Validators.required],
            nopBaoCaoTuNgay: [null],
            nopBaoCaoDenNgay: [null],
            ghiChu: [''],
            idFileDinhKem: [null],
            hienLa: [''],
            trinhDoChuyenMon: [''],
            maSoChucDanhNgheNghiep: [''],
            heSoLuong: [''],
        });
    }

    onSelectFile(files: IFile[]) {
        if (files.length > 0) {
            this.form.get('idFileDinhKem').setValue(files[0].fileId);
        } else {
            this.form.get('idFileDinhKem').setValue(null);
        }
    }

    disabledTapSuNgayKetThuc = (current: Date): boolean => {
        if (!this.form.get('tapSuTuNgay').value) {
            return;
        }
        return differenceInCalendarDays(current, new Date(this.form.get('tapSuTuNgay').value)) < 0;
    };

    disabledTapSuNgayBatDau = (current: Date): boolean => {
        if (!this.form.get('tapSuDenNgay').value) {
            return;
        }
        return differenceInCalendarDays(current, new Date(this.form.get('tapSuDenNgay').value)) > 0;
    };

    disabledBaoCaoNgayKetThuc = (current: Date): boolean => {
        if (!this.form.get('nopBaoCaoTuNgay').value) {
            return;
        }
        return differenceInCalendarDays(current, new Date(this.form.get('nopBaoCaoTuNgay').value)) < 0;
    };

    disabledBaoCaoNgayBatDau = (current: Date): boolean => {
        if (!this.form.get('nopBaoCaoDenNgay').value) {
            return;
        }
        return differenceInCalendarDays(current, new Date(this.form.get('nopBaoCaoDenNgay').value)) > 0;
    };

    onSubmit() {
        if (this.model.idNhanSuTapSu) {
            this.form.get('idNhanSuTapSu').setValue(this.model.idNhanSuTapSu);
        }
        if (this.idKeHoachTuyenDung) {
            this.form.get('idKeHoachTuyenDung').setValue(this.idKeHoachTuyenDung);
        }

        if (this.form.invalid) {
            FormUtil.validateAllFormFields(this.form);
            return;
        }

        if (this.form.get('ngayQuyetDinh').value) {
            this.form.get('ngayQuyetDinh').setValue(DateUtil.getFullDate(this.form.get('ngayQuyetDinh').value));
        }
        if (this.form.get('ngayHieuLuc').value) {
            this.form.get('ngayHieuLuc').setValue(DateUtil.getFullDate(this.form.get('ngayHieuLuc').value));
        }
        if (this.form.get('tapSuTuNgay').value) {
            this.form.get('tapSuTuNgay').setValue(DateUtil.getFullDate(this.form.get('tapSuTuNgay').value));
        }
        if (this.form.get('tapSuDenNgay').value) {
            this.form.get('tapSuDenNgay').setValue(DateUtil.getFullDate(this.form.get('tapSuDenNgay').value));
        }
        if (this.form.get('nopBaoCaoTuNgay').value) {
            this.form.get('nopBaoCaoTuNgay').setValue(DateUtil.getFullDate(this.form.get('nopBaoCaoTuNgay').value));
        }
        if (this.form.get('nopBaoCaoDenNgay').value) {
            this.form.get('nopBaoCaoDenNgay').setValue(DateUtil.getFullDate(this.form.get('nopBaoCaoDenNgay').value));
        }
        if (this.model && this.model.idQuyetDinh != null) {
            this.form.get('idQuyetDinh').setValue(this.model.idQuyetDinh);
        }

        this.apiService
            .post(UrlConstant.API.TD_QUYET_DINH + '/PhanCongHuongDanTapSu', this.form.value)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(() => {
                this.notification.showSuccessMessage(
                    this.action === ActionEnum.CREATE ? this.translate.get('MES.CREATE_DONE') : this.translate.get('MES.UPDATE_DONE')
                );
                this.closeForm();
            });
    }

    closeForm() {
        this.windowRef.close();
    }

    changeNguoiHuongDan(data: any) {
        if (data.length > 0) {
            this.getInforNhanSu(data[0].nhanSuId);
        }
    }

    private getById(idQD: number, idNSTapSu: number) {
        this.apiService
            .read(UrlConstant.API.TD_QUYET_DINH + '/PhanCongHuongDanTapSu/ById', {
                idQuyetDinh: idQD,
                idNhanSuTapSu: idNSTapSu,
            })
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                if (res.result) {
                    const itemTapSu = res.result as IQuyetDinhPhanCongHuongDanTapSu;
                    this.mapFileDinhKem(itemTapSu);
                    this.form.patchValue(itemTapSu);
                    if (itemTapSu.idNhanSuNhanQuyetDinh && itemTapSu.idNhanSuNhanQuyetDinh > 0) {
                        this.getInforNhanSu(itemTapSu.idNhanSuNhanQuyetDinh);
                        this.chonNhanSu = [itemTapSu.idNhanSuNhanQuyetDinh];
                    }
                    if (itemTapSu.idNguoiXetDuyet && itemTapSu.idNguoiXetDuyet > 0) {
                        this.chonNguoiXetDuyet = [itemTapSu.idNguoiXetDuyet];
                    }
                }
            });
    }

    private getInforNhanSu(idNS: number) {
        this.apiService
            .read(UrlConstant.API.HRM_NHAN_SU + '/ById', {
                idNhanSu: idNS,
                manHinh: DuLieuNhanSuEnum.SU_DUNG_CHINH,
            })
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                if (res.result) {
                    const itemNhanSu = res.result as any;
                    this.form.get('hienLa').setValue(itemNhanSu.tenChucVu);
                    this.form.get('trinhDoChuyenMon').setValue(itemNhanSu.tenTrinhDoChuyenMon);
                    this.form.get('maSoChucDanhNgheNghiep').setValue(itemNhanSu.maNgach);
                    this.form.get('heSoLuong').setValue(itemNhanSu.heSoLuong);
                }
            });
    }
    mapFileDinhKem(itemHopDong: IQuyetDinhPhanCongHuongDanTapSu) {
        const fileInput = [];
        if (itemHopDong.idFileDinhKem && itemHopDong.idFileDinhKem > 0) {
            fileInput.push({
                fileDinhKemId: itemHopDong.idFileDinhKem,
                name: itemHopDong.nameFileDinhKem,
                size: itemHopDong.sizeFileDinhKem,
                path: itemHopDong.pathFileDinhKem,
                guidId: itemHopDong.guidIdFileDinhKem,
                fileAttachId: null,
                type: itemHopDong.typeFileDinhKem,
            });
        }
        this.fileInput$ = of(fileInput);
    }
}
