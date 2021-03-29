import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionEnum } from '@core/constants/enum.constant';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService } from '@core/services/common/notification.service';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { DateUtil } from '@core/utils/date';
import { FormUtil } from '@core/utils/form';
import { Subject } from 'rxjs';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { IQuyetDinhPhanCongHuongDanTapSu } from '@themes/views/management/recruitment/_models/qd-phan-cong-hd-tap-su.model';
import { UrlConstant } from '@core/constants/url.constant';
import { IFile, IFileAttach } from '@core/models/common/file.model';
import { takeUntil } from 'rxjs/operators';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import { FOLDER } from '@core/constants/app.constant';
import { IBaoCaoTapSuCaNhan } from '../../_models/bao-cao-tap-su.model';
import { DuLieuNhanSuEnum } from '@themes/views/management/human-resource/_models/human-resource.enum';

@Component({
    selector: 'app-form-bao-cao-tap-su',
    templateUrl: './form-bao-cao-tap-su.component.html',
    styleUrls: ['./form-bao-cao-tap-su.component.scss'],
})
export class FormBaoCaoTapSuComponent implements OnInit {
    @Input() action: ActionEnum;
    @Input() model: number[];
    @Input() itemTapSu: IBaoCaoTapSuCaNhan;
    actionEnum = ActionEnum;
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
        if (this.action === this.actionEnum.CREATE) {
            this.getNhanSuById(this.itemTapSu.idNhanSuTapSu);
        }
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
                this.tenNguoiTapSu = res.result.hoDem + ' ' + res.result.ten;
                this.viTriViecLam = res.result.tenViTriViecLam;
            }
        });
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
        if (this.itemTapSu.id > 0) {
            this.form.get('idPhanCongHuongDanTapSu').setValue(this.itemTapSu.id);
        }
        if (this.form.invalid) {
            FormUtil.validateAllFormFields(this.form);
            return;
        }

        const create$ = this.apiService
            .put(UrlConstant.API.TD_QUA_TRINH_TAP_SU + '/NopBaoCao', this.form.value)
            .pipe(takeUntil(this.destroyed$));
        create$.subscribe(() => {
            this.notification.showSuccessMessage(this.translate.get('MES.CREATE_DONE'));
            this.closeForm();
        });
    }

    closeForm() {
        this.windowRef.close();
    }
}
