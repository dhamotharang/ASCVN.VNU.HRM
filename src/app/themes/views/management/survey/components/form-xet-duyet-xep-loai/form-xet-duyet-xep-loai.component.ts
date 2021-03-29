import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { IXepLoaiKetQuaDanhGia } from '@themes/views/management/catalogs/_models/catalog.model';
import { NotificationService } from '@core/services/common/notification.service';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

class KetQuaDanhGiaModal {
    isDongYKetQua: boolean;
    yKien: string;
    idKetQuaDanhGia: number;
    idsNhanSuDanhGiaChiTiet: number[];
    constructor() {
        this.isDongYKetQua = true;
        this.idKetQuaDanhGia = 0;
        this.idsNhanSuDanhGiaChiTiet = [];
    }
}

@Component({
    selector: 'app-form-xet-duyet-xep-loai',
    templateUrl: './form-xet-duyet-xep-loai.component.html',
    styleUrls: ['./form-xet-duyet-xep-loai.component.scss'],
})
export class FormXetDuyetXepLoaiComponent implements OnInit, OnDestroy {
    @Input() type: number;
    @Input() model: number[];
    // form: FormGroup;
    modelXepLoai: KetQuaDanhGiaModal = new KetQuaDanhGiaModal();
    xepLoaiKetQuaDanhGias: IXepLoaiKetQuaDanhGia[] = [];

    private destroyed$ = new Subject();
    constructor(
        private apiService: ApiService,
        private formBuilder: FormBuilder,
        private notification: NotificationService,
        private window: WindowRef
    ) {}

    ngOnInit() {
        this.loadXepLoai();
        if (this.model.length > 0) {
            this.modelXepLoai.idsNhanSuDanhGiaChiTiet = [...this.model];
        }
    }

    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    loadXepLoai() {
        this.apiService
            .read(UrlConstant.API.DM_XEP_LOAI_KET_QUA_DANH_GIA + '/List', {
                pageSize: 0,
                pageNumber: 0,
            })
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                if (res.result && res.result.items) {
                    this.xepLoaiKetQuaDanhGias = res.result?.items;
                }
            });
    }

    onSubmit() {
        if (!this.modelXepLoai.isDongYKetQua && this.modelXepLoai.idKetQuaDanhGia === 0) {
            this.notification.showErrorMessage('Vui lòng chọn xếp loại!');
        } else {
            switch (this.type) {
                case 2:
                    this.apiService
                        .put(UrlConstant.API.PKS_NHAN_SU_DANH_GIA_CHI_TIET + '/DuyetNhanSuDanhGiaCap2', this.modelXepLoai)
                        .pipe(takeUntil(this.destroyed$))
                        .subscribe(res => {
                            if (res.result === null && res.errorMessages.length > 0) {
                                // this.notification.showSuccessMessage(res.errorMessages[0].errorMessage + res.errorMessages[0].errorValues);
                                const messages = res.errorMessages
                                    .map(x => {
                                        return x.errorMessage + ' ' + x.errorValues.join(',');
                                    })
                                    .join('<br/>');
                                this.notification.showWarningMessage(messages);
                            } else {
                                this.notification.showSuccessMessage('Xét duyệt thành công !');
                            }
                            this.closeForm(true);
                        });
                    break;
                case 3:
                case 9:
                    this.apiService
                        .put(UrlConstant.API.PKS_NHAN_SU_DANH_GIA_CHI_TIET + '/DuyetNhanSuDanhGiaCap3', this.modelXepLoai)
                        .pipe(takeUntil(this.destroyed$))
                        .subscribe(res => {
                            if (res.result === null && res.errorMessages.length > 0) {
                                // this.notification.showSuccessMessage(res.errorMessages[0].errorMessage + res.errorMessages[0].errorValues);
                                const messages = res.errorMessages
                                    .map(x => {
                                        return x.errorMessage + ' ' + x.errorValues.join(',');
                                    })
                                    .join('<br/>');
                                this.notification.showWarningMessage(messages);
                            } else {
                                this.notification.showSuccessMessage('Xét duyệt thành công !');
                            }
                            this.closeForm(true);
                        });
                    break;
            }
        }
    }

    closeForm(flag: boolean) {
        this.window.close(flag ? null : 1);
    }

    clear() {
        this.modelXepLoai.yKien = '';
        this.modelXepLoai.idKetQuaDanhGia = 0;
    }
}
