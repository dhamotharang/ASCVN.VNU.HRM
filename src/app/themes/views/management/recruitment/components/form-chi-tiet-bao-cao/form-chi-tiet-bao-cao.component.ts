import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionEnum } from '@core/constants/enum.constant';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService } from '@core/services/common/notification.service';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { FormUtil } from '@core/utils/form';
import { Observable, of, Subject } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { UrlConstant } from '@core/constants/url.constant';
import { IFile, IFileAttach } from '@core/models/common/file.model';
import { takeUntil } from 'rxjs/operators';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import { FOLDER } from '@core/constants/app.constant';
import { DuLieuNhanSuEnum } from '@themes/views/management/human-resource/_models/human-resource.enum';

@Component({
    selector: 'app-form-chi-tiet-bao-cao',
    templateUrl: './form-chi-tiet-bao-cao.component.html',
    styleUrls: ['./form-chi-tiet-bao-cao.component.scss'],
})
export class FormChiTietBaoCaoComponent implements OnInit {
    @Input() action: ActionEnum;
    @Input() model: number[];
    @Input() idTapSu: number;
    @Input() id: number;
    actionEnum = ActionEnum;
    fileInput$: Observable<IFileAttach[]>;

    tenNguoiTapSu: string = '';
    viTriViecLam: string = '';
    fileInput: IFileAttach[] = [];
    folder = FOLDER;
    form: FormGroup;
    gridView: GridDataResult;

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
        this.getNhanSuById(this.idTapSu);
        this.getBaoCaoById(this.id);
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
    getNhanSuById(id: number) {
        const nhanSu$ = this.apiService
            .read(UrlConstant.API.HRM_NHAN_SU + '/ById', {
                idNhanSu: id,
                manHinh: DuLieuNhanSuEnum.SU_DUNG_CHINH,
            })
            .pipe(takeUntil(this.destroyed$));
        nhanSu$.subscribe(res => {
            if (res.result) {
                this.tenNguoiTapSu = res.result.hoTenTapSu;
                this.viTriViecLam = res.result.tenViTriViecLam;
            }
        });
    }
    getBaoCaoById(id: number) {
        const nhanSu$ = this.apiService
            .read(UrlConstant.API.TD_QUA_TRINH_TAP_SU + '/BaoCaoTapSuById', {
                idPhanCongBaoCaoTapSu: id,
                manHinh: DuLieuNhanSuEnum.SU_DUNG_CHINH,
            })
            .pipe(takeUntil(this.destroyed$));
        nhanSu$.subscribe(res => {
            if (res.result) {
                this.tenNguoiTapSu = res.result.hoTenTapSu;
                this.viTriViecLam = res.result.tenViTriViecLam;
                this.form.patchValue(res.result);
                this.mapFileDinhKem(res.result);
            }
        });
    }

    mapFileDinhKem(itemHopDong) {
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

    createForm() {
        this.form = this.formBuilder.group({
            id: [0],
            idPhanCongHuongDanTapSu: [0, Validators.required],
            congViecDuocPhanCong: [null, Validators.required],
            phamChatDaoDuc: [null, Validators.required],
            nangLuc: [null, Validators.required],
            yThucToChuc: [null, Validators.required],
            thamGiaCongTac: [null, Validators.required],
            ghiChu: [null],
            nhanXet: [null],
            deXuatKhac: [null],
            idFileDinhKem: [null],
        });
    }

    onSelectFile(files: IFile[]) {
        if (files.length > 0) {
            this.form.get('idFileDinhKem').setValue(files[0].fileId);
        } else {
            this.form.get('idFileDinhKem').setValue(null);
        }
    }

    onSubmit() {
        // if (this.id > 0) {
        //     this.form.get('idPhanCongHuongDanTapSu').setValue(this.id);
        // }
        if (this.form.invalid) {
            FormUtil.validateAllFormFields(this.form);
            return;
        }

        const create$ = this.apiService
            .put(UrlConstant.API.TD_QUA_TRINH_TAP_SU + '/NopBaoCao', this.form.value)
            .pipe(takeUntil(this.destroyed$));
        create$.subscribe(() => {
            this.notification.showSuccessMessage(this.translate.get('MES.UPDATE_DONE'));
            this.closeForm();
        });
    }

    closeForm() {
        this.windowRef.close();
    }
}
