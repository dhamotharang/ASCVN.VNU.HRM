import { NotificationService } from '@core/services/common/notification.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UrlConstant } from '@core/constants/url.constant';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '@core/data-services/api.service';
import { UtilService } from '@core/services/common/util.service';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { PagerSettings, SelectionEvent } from '@progress/kendo-angular-grid';
import { State, process, GroupDescriptor, DataResult } from '@progress/kendo-data-query';
import { PageConfig } from '@core/constants/app.constant';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import { Subject } from 'rxjs/internal/Subject';

class DeXuatNhanSuTCCB {
    public id: number;
    public idViTriViecLam: number;
    public capLuong: number;
    public tuTra: number;
    public ghiChu: string;
    public nguonTuyen: string;
}

@Component({
    selector: 'app-form-ke-hoach-de-xuat',
    templateUrl: './form-ke-hoach-de-xuat.component.html',
    styleUrls: ['./form-ke-hoach-de-xuat.component.scss'],
})
export class FormKeHoachDeXuatComponent implements OnInit, OnDestroy {
    @Input() idKeHoach: number;
    groups: GroupDescriptor[] = [{ field: 'tenNhomViTriViecLam', dir: null }];
    formGroup: FormGroup;
    loading = false;
    gridState: State = {
        sort: [
            {
                field: 'id',
                dir: 'desc',
            },
        ],
        skip: 0,
        take: 20,
    };
    pageConfig: PagerSettings | boolean = PageConfig;
    selectionIds: number[] = [];
    selectionViTriNhanSus: any[] = [];
    gridViewDeXuatNhanSu: DataResult;
    private destroyed$ = new Subject();
    constructor(
        private apiService: ApiService,
        private formBuilder: FormBuilder,
        private util: UtilService,
        private notification: NotificationService,
        private translate: CustomTranslateService,
        private window: WindowRef
    ) {
        this.createFormGroupTieuChuan = this.createFormGroupTieuChuan.bind(this);
    }

    ngOnInit() {
        this.loadItems();
    }

    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    onSubmit() {
        if (this.selectionIds.length > 0) {
            const listdata = this.selectionViTriNhanSus.map(x => {
                return {
                    id: 0,
                    idViTriViecLam: x.idViTriViecLam,
                    capLuong: x.capLuong > 0 ? x.capLuong : 0,
                    tuTra: x.tuTra > 0 ? x.tuTra : 0,
                    ghiChu: '',
                    nguonTuyen: x.nguonTuyen,
                };
            });
            const dataSubmit = {
                idKeHoachTuyenDung: this.idKeHoach,
                keHoachTuyenDungDeXuats: listdata,
            };
            this.apiService.post(UrlConstant.API.HRM_TD_KE_HOACH_DE_XUAT, dataSubmit).subscribe(res => {
                this.notification.showSuccessMessage(this.translate.get('MES.CREATE_DONE'));
                this.closeChiTietForm();
            });
        } else {
            this.notification.showWarningMessage('Vui lòng chọn dữ liệu vị trí việc làm muốn thêm!');
        }
    }

    closeChiTietForm() {
        this.window.close();
    }

    onStateChange(state: State) {
        this.gridState = state;
        this.loadItems();
    }

    createFormGroupTieuChuan(args: any): FormGroup {
        const item = args.isNew ? new DeXuatNhanSuTCCB() : args.dataItem;
        this.formGroup = this.formBuilder.group({
            id: item.id,
            idViTriViecLam: item.idViTriViecLam,
            capLuong: item.capLuong,
            tuTra: item.tuTra,
            ghiChu: item.ghiChu,
            nguonTuyen: item.nguonTuyen,
        });
        return this.formGroup;
    }

    selectRow(e: SelectionEvent) {
        // kt list bo chon
        if (e.deselectedRows.length > 0) {
            const listBoChon = e.deselectedRows;
            listBoChon.map(x => {
                const index = this.selectionViTriNhanSus.findIndex(y => x.dataItem.idViTriViecLam === y.idViTriViecLam);
                if (index > -1) {
                    this.selectionViTriNhanSus.splice(index, 1);
                }
            });
        }
        // kt list chon
        if (e.selectedRows.length > 0) {
            const listChon = e.selectedRows;
            listChon.map(x => {
                this.selectionViTriNhanSus.push(x.dataItem);
            });
        }
    }

    private loadItems() {
        this.loading = true;
        this.apiService
            .read(UrlConstant.API.HRM_TD_KE_HOACH_DE_XUAT + '/List', this.queryOptions)
            .pipe(
                map(res => {
                    const resultData = res.result.map(x => {
                        return {
                            idViTriViecLam: x.idViTriViecLam,
                            tenViTriViecLam: x.tenViTriViecLam,
                            tenNhomViTriViecLam: x.tenNhomViTriViecLam,
                            nguonTuyen: x.nguonTuyen,
                            dinhBienCapLuong: x.dinhBienCapLuong ?? 0,
                            dinhBienTuTra: x.dinhBienTuTra ?? 0,
                            hienTaiCapLuong: x.hienTaiCapLuong ?? 0,
                            hienTaiTuTra: x.hienTaiTuTra ?? 0,
                            capLuong: x.dinhBienCapLuong - x.hienTaiCapLuong > 0 ? x.dinhBienCapLuong - x.hienTaiCapLuong : 0,
                            tuTra: x.dinhBienTuTra - x.hienTaiTuTra > 0 ? x.dinhBienTuTra - x.hienTaiTuTra : 0,
                        };
                    });
                    if (res && res.result) {
                        return {
                            data: resultData,
                            total: 0,
                        };
                    } else {
                        return {
                            data: [],
                            total: 0,
                        };
                    }
                }),
                tap(res => {
                    if (res.total <= this.gridState.take) {
                        this.pageConfig = false;
                    } else {
                        this.pageConfig = PageConfig;
                    }
                }),
                finalize(() => {
                    this.loading = false;
                }),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                this.gridViewDeXuatNhanSu = process(res.data, {
                    group: this.groups,
                });
            });
    }

    private get queryOptions() {
        return {
            pageSize: 0,
            pageNumber: 0,
            idKeHoachTuyenDung: this.idKeHoach,
        };
    }
}
