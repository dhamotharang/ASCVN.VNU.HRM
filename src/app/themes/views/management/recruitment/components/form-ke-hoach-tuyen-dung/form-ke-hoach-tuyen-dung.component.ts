import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDeleteConfig, PageConfig } from '@core/constants/app.constant';
import { ActionEnum } from '@core/constants/enum.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { IKeHoachTuyenDung, IKeHoachTuyenDungChiTiet } from '@themes/views/management/recruitment/_models/ke-hoach-tuyen-dung.model';
import { NotificationService } from '@core/services/common/notification.service';
import { UtilService } from '@core/services/common/util.service';
import { WindowCloseResult, WindowRef, WindowService } from '@progress/kendo-angular-dialog';
import { GridDataResult, PagerSettings } from '@progress/kendo-angular-grid';
import { GroupDescriptor, SortDescriptor, State, process } from '@progress/kendo-data-query';
import { DropDownListEnum } from '@shared/containers/asc-select/asc-select.enum';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { FormKeHoachDeXuatComponent } from '../form-ke-hoach-de-xuat/form-ke-hoach-de-xuat.component';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import { FormUtil } from '@core/utils/form';
import { TrangThaiKeHoachEnum } from '../../_models';
import { DuyetKeHoachComponent } from '../duyet-ke-hoach/duyet-ke-hoach.component';

class YeuCauTuyenDung {
    public idTieuChuanTuyenDung: number;
    public yeuCau: string;
    public ghiChu: string;
}
@Component({
    selector: 'app-form-ke-hoach-tuyen-dung',
    templateUrl: './form-ke-hoach-tuyen-dung.component.html',
    styleUrls: ['./form-ke-hoach-tuyen-dung.component.scss'],
})
export class FormKeHoachTuyenDungComponent implements OnInit {
    @Input() action: ActionEnum;
    @Input() model: IKeHoachTuyenDung;

    form: FormGroup;
    loading = false;
    isSubmit = false;
    gridViewTieuChuanTuyenDung = [];
    gridState: State = {
        sort: [{ field: 'id', dir: 'desc' }],
        skip: 0,
        take: 20,
    };
    coQuanUser: any;
    dropdownListEnum = DropDownListEnum;
    trangThaiKeHoachEnum = TrangThaiKeHoachEnum;
    actionEnum = ActionEnum;
    tabCurrentIndex = 0;
    formGroup: FormGroup;
    lstChiTiet: IKeHoachTuyenDungChiTiet[] = [];
    selectionChiTietViTriCanTuyenIds: number[] = [];
    private destroyed$ = new Subject();
    private modelChiTiet: IKeHoachTuyenDungChiTiet;
    gridChiTietViTriCanTuyen: GridDataResult;
    pageConfig: PagerSettings | boolean = PageConfig;
    groups: GroupDescriptor[] = [{ field: 'tenNhomViTriViecLam', dir: null }];
    constructor(
        private apiService: ApiService,
        private formBuilder: FormBuilder,
        private util: UtilService,
        private notification: NotificationService,
        private window: WindowRef,
        private windowService: WindowService,
        private modalService: NzModalService,
        private translate: CustomTranslateService
    ) {
        this.createFormGroupTieuChuan = this.createFormGroupTieuChuan.bind(this);
    }

    ngOnInit() {
        this.getCoQuanNhanSuLogin();
        this.initFormKeHoachTuyenDung();
        if ((this.action === ActionEnum.UPDATE || this.action === ActionEnum.VIEW || this.action === ActionEnum.APPROVE) && this.model) {
            this.getById(this.model.id);
            this.loadChiTietItems();
            this.loadViTriCanTuyen();
        }
    }

    getById(idKeHoachTuyenDung: number) {
        this.apiService
            .read(UrlConstant.API.HRM_TD_KE_HOACH_TUYEN_DUNG + '/ById', {
                id: idKeHoachTuyenDung,
            })
            .subscribe(res => {
                if (res.result) {
                    const keHoach = res.result as IKeHoachTuyenDung;
                    this.form.patchValue(keHoach);
                    this.apiService
                        .read(UrlConstant.API.HRM_DM_TIEU_CHUAN_TUYEN_DUNG, {
                            pageSize: 0,
                            pageNumber: 0,
                        })
                        .pipe(takeUntil(this.destroyed$))
                        .subscribe(response => {
                            const tieuChuans = response.result;
                            if (keHoach.keHoachTuyenDungTieuChuans.length > 0) {
                                this.gridViewTieuChuanTuyenDung = keHoach.keHoachTuyenDungTieuChuans.map(x => {
                                    const itemTieuChuan = tieuChuans.find(m => m.id === x.idTieuChuanTuyenDung);
                                    if (itemTieuChuan) {
                                        return {
                                            id: x.id,
                                            idTieuChuanTuyenDung: x.idTieuChuanTuyenDung,
                                            tenYeuCau: itemTieuChuan.ten,
                                            yeuCau: x.yeuCau,
                                            ghiChu: x.ghiChu,
                                        };
                                    } else {
                                        return {
                                            id: x.id,
                                            idTieuChuanTuyenDung: x.idTieuChuanTuyenDung,
                                            yeuCau: x.yeuCau,
                                            ghiChu: x.ghiChu,
                                        };
                                    }
                                });
                            } else {
                                this.loadTieuChuanTuyenDung();
                            }
                        });
                }
            });
    }

    initFormKeHoachTuyenDung() {
        this.form = this.formBuilder.group({
            id: [0],
            nam: [null, Validators.required],
            ngayBatDau: [null, Validators.required],
            ngayKetThuc: [null, Validators.required],
            maKeHoach: ['', Validators.required],
            tenKeHoach: ['', Validators.required],
            tomTatMonThi: [''],
            nguonTuyenDung: [''],
            hoiDongThamGia: [''],
            ghiChu: [''],
            keHoachTuyenDungTieuChuans: [],
        });
    }

    createFormGroupTieuChuan(args: any): FormGroup {
        const item = args.isNew ? new YeuCauTuyenDung() : args.dataItem;
        this.formGroup = this.formBuilder.group({
            idTieuChuanTuyenDung: item.idTieuChuanTuyenDung,
            yeuCau: item.yeuCau,
            ghiChu: item.ghiChu,
        });
        return this.formGroup;
    }

    disabledNgayKetThuc = (current: Date): boolean => {
        if (!this.form.get('ngayBatDau').value) {
            return;
        }
        return differenceInCalendarDays(current, new Date(this.form.get('ngayBatDau').value)) < 0;
    };

    disabledNgayBatDau = (current: Date): boolean => {
        if (!this.form.get('ngayKetThuc').value) {
            return;
        }
        return differenceInCalendarDays(current, new Date(this.form.get('ngayKetThuc').value)) > 0;
    };

    onSubmitKeHoach() {
        if (this.form.invalid) {
            FormUtil.validateAllFormFields(this.form);
            return;
        }
        this.isSubmit = true;
        this.form.get('ngayBatDau').setValue(this.util.convertFullDate(this.form.get('ngayBatDau').value));
        this.form.get('ngayKetThuc').setValue(this.util.convertFullDate(this.form.get('ngayKetThuc').value));
        switch (this.action) {
            case ActionEnum.CREATE:
                this.apiService
                    .post(UrlConstant.API.HRM_TD_KE_HOACH_TUYEN_DUNG, this.form.value)
                    .pipe(
                        takeUntil(this.destroyed$),
                        finalize(() => {
                            this.isSubmit = false;
                        })
                    )
                    .subscribe(res => {
                        this.notification.showSuccessMessage(this.translate.get('MES.CREATE_DONE'));
                        if (res.result) {
                            this.action = ActionEnum.UPDATE;
                            this.model = res.result;
                            this.form.patchValue(res.result);
                            this.tabCurrentIndex = 1;
                            this.loadTieuChuanTuyenDung();
                        }
                    });
                break;
            case ActionEnum.UPDATE:
                this.apiService
                    .put(UrlConstant.API.HRM_TD_KE_HOACH_TUYEN_DUNG, this.form.value)
                    .pipe(
                        takeUntil(this.destroyed$),
                        finalize(() => {
                            this.isSubmit = false;
                        })
                    )
                    .subscribe(() => {
                        this.notification.showSuccessMessage(this.translate.get('MES.UPDATE_DONE'));
                        this.closeForm();
                    });
                break;
        }
    }

    onSubmitTieuChuan() {
        this.isSubmit = true;
        const dataSubmit = {
            idKeHoachTuyenDung: this.model.id ?? 0,
            keHoachTuyenDungTieuChuans: this.gridViewTieuChuanTuyenDung,
        };

        if (this.form.valid) {
            this.apiService
                .put(UrlConstant.API.HRM_TD_KE_HOACH_TIEU_CHUAN, dataSubmit)
                .pipe(
                    takeUntil(this.destroyed$),
                    finalize(() => {
                        this.isSubmit = false;
                    })
                )
                .subscribe(res => {
                    this.notification.showSuccessMessage(this.translate.get('MES.UPDATE_DONE'));
                    this.tabCurrentIndex = 2;
                    this.getById(this.model.id);
                });
        }
    }

    closeForm() {
        this.window.close();
    }

    changeTabIndex(event) {
        this.tabCurrentIndex = event.index;
    }

    // tab 2: Tiêu chuẩn tuyển dụng
    private loadTieuChuanTuyenDung() {
        this.apiService
            .read(UrlConstant.API.HRM_DM_TIEU_CHUAN_TUYEN_DUNG, {
                pageSize: 0,
                pageNumber: 0,
            })
            .pipe(
                map(res => {
                    const resultData = res.result;
                    let listData = [];
                    listData = resultData.map(x => {
                        return {
                            id: 0,
                            idTieuChuanTuyenDung: x.id,
                            tenYeuCau: x.ten,
                            yeuCau: '',
                            ghiChu: '',
                        };
                    });
                    return listData;
                }),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                this.gridViewTieuChuanTuyenDung = res;
            });
    }

    //// Tab3: Tiến độ thực hiện
    private loadChiTietItems() {
        this.loading = true;
        this.apiService
            .read(UrlConstant.API.HRM_TD_KE_HOACH_TUYEN_DUNG_CHI_TIET + '/List', {
                pageSize: 0,
                pageNumber: 0,
                idKeHoachTuyenDung: this.model.id ?? 0,
            })
            .pipe(
                map(res => {
                    if (res.result && res.result.items) {
                        return {
                            data: res.result.items,
                            total: res.result.pagingInfo.totalItems,
                        };
                    } else {
                        return {
                            data: [],
                            total: 0,
                        };
                    }
                }),
                finalize(() => {
                    this.loading = false;
                }),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                this.lstChiTiet = res.data;
            });
    }

    disabledDateFrom = (current: Date): boolean => {
        return differenceInCalendarDays(current, new Date(this.model.ngayBatDau)) < 0;
    };

    disabledDateTo = (current: Date): boolean => {
        return differenceInCalendarDays(current, new Date(this.model.ngayKetThuc)) > 0;
    };

    taoChiTiet() {
        this.lstChiTiet.push({
            id: 0,
            idKeHoachTuyenDung: this.model.id,
            noiDungCongViec: '',
            ngayBatDau: null,
            ngayKetThuc: null,
            ghiChu: '',
        });
    }

    xoaChiTiet(item: IKeHoachTuyenDungChiTiet, index: number) {
        if (item.id > 0) {
            const body = {
                ids: [this.lstChiTiet[index].id],
            };
            this.modalService.confirm({
                nzTitle: ModalDeleteConfig.title,
                nzContent: ModalDeleteConfig.content,
                nzOkText: ModalDeleteConfig.yes,
                nzOkType: 'danger',
                nzOnOk: () => {
                    this.apiService
                        .delete(UrlConstant.API.HRM_TD_KE_HOACH_TUYEN_DUNG_CHI_TIET, body)
                        .pipe(takeUntil(this.destroyed$))
                        .subscribe(res => {
                            this.notification.showSuccessMessage(this.translate.get('MES.DELETE_DONE'));
                            this.loadChiTietItems();
                        });
                },
                nzCancelText: ModalDeleteConfig.no,
                nzOnCancel: () => {},
            });
        } else {
            this.lstChiTiet.splice(index, 1);
        }
    }

    // luuChiTiet(index: number) {
    //     const item = this.lstChiTiet[index];
    //     if (item.noiDungCongViec === '') {
    //         this.notification.showErrorMessage('Không bỏ trống nội dung công việc!');
    //         return;
    //     }
    //     if (!item.ngayBatDau) {
    //         this.notification.showErrorMessage('Không bỏ trống ngày bắt đầu!');
    //         return;
    //     }
    //     if (!item.ngayKetThuc) {
    //         this.notification.showErrorMessage('Không bỏ trống ngày kết thúc!');
    //         return;
    //     }
    //     if (!this.util.checkDateFromDateTo(item.ngayBatDau, item.ngayKetThuc)) {
    //         this.notification.showErrorMessage('Ngày bắt đầu và ngày kết thúc không hợp lệ!');
    //         return;
    //     }
    //     item.ngayBatDau = this.util.convertFullDate(item.ngayBatDau);
    //     item.ngayKetThuc = this.util.convertFullDate(item.ngayKetThuc);

    //     if (item.id === 0) {
    //         this.apiService
    //             .post(UrlConstant.API.HRM_TD_KE_HOACH_TUYEN_DUNG_CHI_TIET, {
    //                 idKeHoachTuyenDung: item.idKeHoachTuyenDung,
    //                 keHoachTuyenDungChiTiets: [
    //                     {
    //                         id: item.id,
    //                         noiDungCongViec: item.noiDungCongViec,
    //                         ngayBatDau: item.ngayBatDau,
    //                         ngayKetThuc: item.ngayKetThuc,
    //                         ghiChu: item.ghiChu,
    //                     },
    //                 ],
    //             })
    //             .pipe(takeUntil(this.destroyed$))
    //             .subscribe(res => {
    //                 this.notification.showSuccessMessage(this.translate.get('MES.CREATE_DONE'));
    //                 this.loadChiTietItems();
    //             });
    //     } else {
    //         this.apiService
    //             .put(UrlConstant.API.HRM_TD_KE_HOACH_TUYEN_DUNG_CHI_TIET, {
    //                 idKeHoachTuyenDung: item.idKeHoachTuyenDung,
    //                 keHoachTuyenDungChiTiets: [
    //                     {
    //                         id: item.id,
    //                         noiDungCongViec: item.noiDungCongViec,
    //                         ngayBatDau: item.ngayBatDau,
    //                         ngayKetThuc: item.ngayKetThuc,
    //                         ghiChu: item.ghiChu,
    //                     },
    //                 ],
    //             })
    //             .pipe(takeUntil(this.destroyed$))
    //             .subscribe(res => {
    //                 this.notification.showSuccessMessage(this.translate.get('MES.UPDATE_DONE'));
    //                 this.loadChiTietItems();
    //             });
    //     }
    // }
    onSubmitTienDo() {
        if (this.lstChiTiet.length > 0) {
            const flag = this.lstChiTiet.findIndex(x => x.noiDungCongViec === '');
            if (flag > -1) {
                this.notification.showErrorMessage('Không bỏ trống nội dung công việc!');
                return;
            }
            this.isSubmit = true;
            this.apiService
                .put(UrlConstant.API.HRM_TD_KE_HOACH_TUYEN_DUNG_CHI_TIET, {
                    idKeHoachTuyenDung: this.lstChiTiet[0].idKeHoachTuyenDung,
                    keHoachTuyenDungChiTiets: this.lstChiTiet,
                })
                .pipe(
                    takeUntil(this.destroyed$),
                    finalize(() => {
                        this.isSubmit = false;
                    })
                )
                .subscribe(res => {
                    this.notification.showSuccessMessage(this.translate.get('MES.UPDATE_DONE'));
                    this.loadChiTietItems();
                });
        }
    }

    ///// Tab4 Vi tri tuyen dung
    private loadViTriCanTuyen() {
        this.loading = true;
        this.apiService
            .read(UrlConstant.API.HRM_TD_KE_HOACH_DE_XUAT + '/ListCreated', {
                idKeHoachTuyenDung: this.model.id ?? 0,
            })
            .pipe(
                map(res => {
                    if (res && res.result) {
                        return {
                            data: res.result,
                            total: res.result.length,
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
                this.gridChiTietViTriCanTuyen = process(res.data, {
                    group: this.groups,
                });
            });
    }

    addChiTietViTriCanTuyenHandler() {
        const windowRef = this.windowService.open({
            title: this.translate.get('RECRUITMENT.TEXT.06'),
            content: FormKeHoachDeXuatComponent,
            width: 1200,
            top: 100,
            autoFocusedElement: 'body',
            state: 'maximized',
        });

        const param = windowRef.content.instance;
        param.idKeHoach = this.model.id;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.loadViTriCanTuyen();
            }
        });
    }

    removeSelectedChiTietViTriCanTuyenHandler() {
        if (this.selectionChiTietViTriCanTuyenIds.length > 0) {
            const body = {
                ids: this.selectionChiTietViTriCanTuyenIds,
            };
            this.modalService.confirm({
                nzTitle: ModalDeleteConfig.title,
                nzContent: ModalDeleteConfig.content,
                nzOkText: ModalDeleteConfig.yes,
                nzOkType: 'danger',
                nzOnOk: () => {
                    this.apiService
                        .delete(UrlConstant.API.HRM_TD_KE_HOACH_DE_XUAT, body)
                        .pipe(takeUntil(this.destroyed$))
                        .subscribe(res => {
                            this.notification.showSuccessMessage(this.translate.get('MES.DELETE_DONE'));
                            this.loadViTriCanTuyen();
                        });
                },
                nzCancelText: ModalDeleteConfig.no,
                nzOnCancel: () => {},
            });
        }
    }

    sortChange(sort: SortDescriptor[]): void {
        this.gridState.sort = sort;
        this.loadViTriCanTuyen();
    }

    onStateChange(state: State) {
        this.gridState = state;
        this.loadViTriCanTuyen();
    }

    onDuyet(flag: TrangThaiKeHoachEnum) {
        // this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('LB.CONFIRM'),
            content: DuyetKeHoachComponent,
            width: 600,
            top: 10,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.ids = [this.model.id];
        param.trangThaiKeHoachEnum = flag;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                // this.opened = false;
                this.closeForm();
            }
        });
    }

    private getCoQuanNhanSuLogin() {
        this.apiService
            .read(UrlConstant.API.HRM_DANH_MUC_CO_QUAN + '/ByNhanSu', {})
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                this.coQuanUser = res.result;
            });
    }
}
