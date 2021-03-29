import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionEnum } from '@core/constants/enum.constant';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService } from '@core/services/common/notification.service';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { FormUtil } from '@core/utils/form';
import { Observable, Subject, of} from 'rxjs';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { GridDataResult } from '@progress/kendo-angular-grid';
import {
    IPhanCongBaoCaoTapSu,
    IQuyetDinhPhanCongHuongDanTapSu,
} from '@themes/views/management/recruitment/_models/qd-phan-cong-hd-tap-su.model';
import { UrlConstant } from '@core/constants/url.constant';
import { IFile, IFileAttach } from '@core/models/common/file.model';
import { takeUntil } from 'rxjs/operators';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import { FOLDER } from '@core/constants/app.constant';
import { TrangThaiDanhGiaTapSuEnum } from '../../_models/recruitment.enum';
import { IDanhGiaBaoCaoTapSu } from '../../_models/danh-gia-tap-su.model';
import { IDanhGiaBaoCao } from '../../_models/danh-gia-bao-cao.model';

@Component({
    selector: 'app-form-danh-gia-bao-cao-tap-su',
    templateUrl: './form-danh-gia-bao-cao-tap-su.component.html',
    styleUrls: ['./form-danh-gia-bao-cao-tap-su.component.scss'],
})
export class FormDanhGiaBaoCaoTapSuComponent implements OnInit {
    @Input() action: ActionEnum;
    @Input() model: number[];
    @Input() data: IDanhGiaBaoCaoTapSu;
    @Input() dataDanhGia: IDanhGiaBaoCao;
    @Input() listTapSu: IQuyetDinhPhanCongHuongDanTapSu[];
    fileInput$: Observable<IFileAttach[]>;
    
    fileInput: IFileAttach[] = [];
    folder = FOLDER;
    form: FormGroup;
    gridView: GridDataResult;
    trangThaiHopDongEnum = TrangThaiDanhGiaTapSuEnum;
    tenViTriViecLam: string;
    tenNguoiTapSu: string;
    isAction = ActionEnum;
    private destroyed$ = new Subject();

    constructor(
        private apiService: ApiService,
        private formBuilder: FormBuilder,
        private notification: NotificationService,
        private translate: CustomTranslateService,
        private windowRef: WindowRef
    ) {}

    ngOnInit() {
        this.getById(this.data.id);
        this.createForm();
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    createForm() {
        this.form = this.formBuilder.group({
            idsPhanCongBaoCaoTapSu: [[], Validators.required],
            congViecDuocPhanCong: [null],
            phamChatDaoDuc: [null],
            nangLuc: [null],
            yThucToChuc: [null],
            thamGiaCongTac: [null],
            ghiChu: [null],
            tapSuDenNgay: [null],
            ngayDanhGia: [null],
            nhanXet: [''],
            trangThai: [null],
            deXuatKhac: [''],
            ngayGiaHan: [null],
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
        this.form.get('idsPhanCongBaoCaoTapSu').setValue([this.data.id]);
        if (this.form.invalid) {
            FormUtil.validateAllFormFields(this.form);
            return;
        }

        const create$ = this.apiService
            .put(UrlConstant.API.TD_QUA_TRINH_TAP_SU + '/NhanXetBaoCao', this.form.value)
            .pipe(takeUntil(this.destroyed$));
        create$.subscribe(() => {
            this.notification.showSuccessMessage(this.translate.get('MES.CREATE_DONE'));
            this.closeForm();
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

    closeForm() {
        this.windowRef.close();
    }

    disabledNgayGiaHan = (current: Date): boolean => {
        if (!this.form.get('ngayGiaHan').value) {
            return;
        }
        // Can not select days before today and today
        return differenceInCalendarDays(current, new Date(this.form.get('ngayGiaHan').value)) < 0;
    };

    private getById(idPhanCongBCTS: number) {
        const nhanSu$ = this.apiService
            .read(UrlConstant.API.TD_QUA_TRINH_TAP_SU + '/BaoCaoTapSuById', {
                idPhanCongBaoCaoTapSu: idPhanCongBCTS,
            })
            .pipe(takeUntil(this.destroyed$));
        nhanSu$.subscribe(res => {
            if (res.result) {
                const itemTapSu = res.result as IPhanCongBaoCaoTapSu;
                this.tenViTriViecLam = itemTapSu.tenViTriViecLam;
                this.tenNguoiTapSu = itemTapSu.hoTenTapSu;
                this.mapFileDinhKem(itemTapSu);
                this.form.patchValue(itemTapSu);
            }
        });
    }
}
