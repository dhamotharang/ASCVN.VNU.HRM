import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { IFile, IFileAttach, IFileList, IResponseData } from '@core/models/common';
import { IHopDong, IPhuCap } from '@themes/views/management/recruitment/_models/hop-dong.model';
import { UtilService } from '@core/services/common';
import { NotificationService } from '@core/services/common/notification.service';
import { FormUtil } from '@core/utils/form';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { DropDownListEnum } from '@shared/containers/asc-select/asc-select.enum';
import { NzModalService, NzUploadChangeParam } from 'ng-zorro-antd';
import { Subject } from 'rxjs';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { DateUtil } from '@core/utils/date';
import { IBacLuong, IKhoanPhuCap, INgachCongChuc } from '@themes/views/management/catalogs/_models/catalog.model';
import { FOLDER, ModalDeleteConfig } from '@core/constants/app.constant';
import { ActionEnum } from '@core/constants/enum.constant';
import { AppConfig } from '@core/config/app.config';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import { TrangThaiHopDongEnum } from '../../_models/recruitment.enum';

@Component({
    selector: 'app-form-tao-hop-dong',
    templateUrl: './form-tao-hop-dong.component.html',
    styleUrls: ['./form-tao-hop-dong.component.scss'],
})
export class FormTaoHopDongComponent implements OnInit, OnDestroy {
    @Input() action: ActionEnum;
    @Input() idNhanSu: number;
    @Input() idHopDong: number;
    @Input() idTrangThaiHopDong: TrangThaiHopDongEnum;
    @Input() isPhuLuc: boolean;

    loading = false;
    isLoading = false;
    form: FormGroup;
    dropdownListEnum = DropDownListEnum;
    trangThaiHopDongEnum = TrangThaiHopDongEnum;
    uploadMediaUrl: string;
    file: IFile;
    fileInput: IFileAttach[] = [];
    gridView: GridDataResult;
    listNgachCongChuc: any[] = [];
    listBacLuong: any[] = [];
    modelHopDong: IHopDong;
    listPhuCap: IPhuCap[] = [];
    listDMPhuCap: IKhoanPhuCap[] = [];
    tabCurrentIndex = 0;
    actionEnum = ActionEnum;
    // folder name
    folder = FOLDER;

    protected destroyed$ = new Subject();
    private config = AppConfig.settings;
    constructor(
        private apiService: ApiService,
        private formBuilder: FormBuilder,
        private notification: NotificationService,
        private translate: CustomTranslateService,
        private util: UtilService,
        private windowRef: WindowRef,
        private modalService: NzModalService
    ) {}

    ngOnInit() {
        this.createForm();
        this.loadNgachCongChucs();
        this.loadKhoangPhuCaps();
        if (this.idNhanSu) {
            this.loadItem();
        }
        this.uploadMediaUrl = `${this.config.apiServer}/api/cmd/${this.config.version}/${UrlConstant.API.HRM_MEDIA}?FolderFunction=${FOLDER.HINH_DAI_DIEN}&FileSize=0`;
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    private createForm() {
        this.form = this.formBuilder.group({
            id: [0],
            idHopDong: [0],
            idHopDongChiTiet: [null],
            // info user
            idNhanSu: [null, Validators.required],
            hoDem: [''],
            ten: [''],
            maNhanSu: [''],
            ngaySinh: [null],
            soDienThoai: [''],
            // tab1
            soHopDong: [''],
            idLoaiHopDong: [null, Validators.required],
            ngayHopDong: [null],
            ngayDuyet: [null],
            idNhanSuDuyet: [null],
            chucVuNguoiKy: [{ value: '', disabled: this.idTrangThaiHopDong !== TrangThaiHopDongEnum.DUYET }],
            idNguoiKy: [{ value: null, disabled: this.idTrangThaiHopDong !== TrangThaiHopDongEnum.DUYET }],
            chucVuNguoiKyThay: [{ value: '', disabled: this.idTrangThaiHopDong !== TrangThaiHopDongEnum.DUYET }],
            ngayKy: [null],
            hdTuNgay: [null, Validators.required],
            hdDenNgay: [null, Validators.required],
            tapSuTuNgay: [null],
            tapSuDenNgay: [null],
            giaHanTuNgay: [null, Validators.required],
            giaHanDenNgay: [null, Validators.required],
            // - dia diem lam viec
            idCoQuan: [null],
            tenCoQuan: [''],
            idTrinhDoChuyenMon: [null],
            idChucVu: [null],
            nhiemVu: [{ value: '', disabled: this.isPhuLuc || this.idTrangThaiHopDong === TrangThaiHopDongEnum.DUYET }],
            tenTrinhDoChuyenMon: [''],
            // tab2
            thoiGianLamViec: [{ value: '', disabled: this.isPhuLuc || this.idTrangThaiHopDong === TrangThaiHopDongEnum.DUYET }],
            phuongTienLamViec: [{ value: '', disabled: this.isPhuLuc || this.idTrangThaiHopDong === TrangThaiHopDongEnum.DUYET }],
            // tab3
            phuongTienDiLai: [{ value: '', disabled: this.isPhuLuc || this.idTrangThaiHopDong === TrangThaiHopDongEnum.DUYET }],
            idNgachCongChuc: [null],
            idBacLuong: [null],
            heSoLuong: [''], // readonly
            thoiGianNangLuong: [''], // readonly
            nhanLuongTuNgay: [null],
            nhanLuongDenNgay: [null],
            thietBiBaoHo: [{ value: '', disabled: this.isPhuLuc || this.idTrangThaiHopDong === TrangThaiHopDongEnum.DUYET }],
            soNgayNghiHuongLuong: [{ value: '', disabled: this.isPhuLuc || this.idTrangThaiHopDong === TrangThaiHopDongEnum.DUYET }],
            cheDoBaoHiem: [{ value: '', disabled: this.isPhuLuc || this.idTrangThaiHopDong === TrangThaiHopDongEnum.DUYET }],
            phucLoi: [{ value: '', disabled: this.isPhuLuc || this.idTrangThaiHopDong === TrangThaiHopDongEnum.DUYET }],
            thoaThuanKhac: [{ value: '', disabled: this.isPhuLuc || this.idTrangThaiHopDong === TrangThaiHopDongEnum.DUYET }],
            khoanThuongKhac: [{ value: '', disabled: this.isPhuLuc || this.idTrangThaiHopDong === TrangThaiHopDongEnum.DUYET }],
            // tab4
            phuCaps: [[]],
            // image + file
            idFileDinhKem: [null],
            nameHinhNhanSu: [''],
            idHinhNhanSu: [null],
            pathHinhNhanSu: [''],
            sizeHinhNhanSu: [null],
            typeHinhNhanSu: [''],
            checkSumHinhNhanSu: [null],

            idViTriViecLam: [null],
            ghiChu: [''],
            idCoQuanQuanLy: [null],
            idKeHoachTuyenDung: [null],
            isCapLuong: [null],
            ghiChuChiTiet: [''],
            isPhuLuc: [null],
            hinhThucTraLuong: [null],
            ngayNangLuongTiepTheo: [null],
            email: [''],
            emailNoiBo: [''],
            idCoQuanCap1: [null],
            idTrangThaiHopDong: [null],
            ngayXacNhan: [null],
            xacNhanHopDong: [null],
        });
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

    disabledHDDenNgay = (current: Date): boolean => {
        if (!this.form.get('hdTuNgay').value) {
            return;
        }
        return differenceInCalendarDays(current, new Date(this.form.get('hdTuNgay').value)) < 0;
    };

    disabledHDTuNgay = (current: Date): boolean => {
        if (!this.form.get('hdDenNgay').value) {
            return;
        }
        return differenceInCalendarDays(current, new Date(this.form.get('hdDenNgay').value)) > 0;
    };

    disabledNhanLuongDenNgay = (current: Date): boolean => {
        if (!this.form.get('nhanLuongTuNgay').value) {
            return;
        }
        return differenceInCalendarDays(current, new Date(this.form.get('nhanLuongTuNgay').value)) < 0;
    };

    disabledNhanLuongTuNgay = (current: Date): boolean => {
        if (!this.form.get('nhanLuongDenNgay').value) {
            return;
        }
        return differenceInCalendarDays(current, new Date(this.form.get('nhanLuongDenNgay').value)) > 0;
    };

    disabledGiaHanDenNgay = (current: Date): boolean => {
        if (!this.form.get('giaHanTuNgay').value) {
            return;
        }
        return differenceInCalendarDays(current, new Date(this.form.get('giaHanTuNgay').value)) < 0;
    };

    disabledGiaHanTuNgay = (current: Date): boolean => {
        if (!this.form.get('giaHanDenNgay').value) {
            return;
        }
        return differenceInCalendarDays(current, new Date(this.form.get('giaHanDenNgay').value)) > 0;
    };

    onSubmit() {
        if (this.isPhuLuc === undefined) {
            this.form.get('giaHanTuNgay').clearValidators();
            this.form.get('giaHanTuNgay').updateValueAndValidity();
            this.form.get('giaHanDenNgay').clearValidators();
            this.form.get('giaHanDenNgay').updateValueAndValidity();
        }
        if (this.form.invalid) {
            FormUtil.validateAllFormFields(this.form);
            return;
        }
        this.form.get('hdTuNgay').setValue(this.util.convertFullDate(this.form.get('hdTuNgay').value));
        this.form.get('hdDenNgay').setValue(this.util.convertFullDate(this.form.get('hdDenNgay').value));
        if (this.form.get('tapSuTuNgay').value) {
            this.form.get('tapSuTuNgay').setValue(DateUtil.getFullDate(this.form.get('tapSuTuNgay').value));
        }
        if (this.form.get('tapSuDenNgay').value) {
            this.form.get('tapSuDenNgay').setValue(DateUtil.getFullDate(this.form.get('tapSuDenNgay').value));
        }
        if (this.form.get('nhanLuongTuNgay').value) {
            this.form.get('nhanLuongTuNgay').setValue(DateUtil.getFullDate(this.form.get('nhanLuongTuNgay').value));
        }
        if (this.form.get('nhanLuongDenNgay').value) {
            this.form.get('nhanLuongDenNgay').setValue(DateUtil.getFullDate(this.form.get('nhanLuongDenNgay').value));
        }
        if (this.form.get('giaHanTuNgay').value) {
            this.form.get('giaHanTuNgay').setValue(DateUtil.getFullDate(this.form.get('giaHanTuNgay').value));
        }
        if (this.form.get('giaHanDenNgay').value) {
            this.form.get('giaHanDenNgay').setValue(DateUtil.getFullDate(this.form.get('giaHanDenNgay').value));
        }
        if (this.isPhuLuc) {
            this.apiService
                .put(UrlConstant.API.TD_HOP_DONG + '/GiaHanTapSu', this.form.value)
                .pipe(takeUntil(this.destroyed$))
                .subscribe(res => {
                    this.notification.showSuccessMessage(this.translate.get('MES.UPDATE_DONE'));
                    this.closeForm();
                });
        } else {
            this.apiService
                .put(UrlConstant.API.TD_HOP_DONG, this.form.value)
                .pipe(takeUntil(this.destroyed$))
                .subscribe(res => {
                    this.notification.showSuccessMessage(this.translate.get('MES.UPDATE_DONE'));
                    if (this.action === ActionEnum.CREATE) {
                        if (res.result) {
                            this.form.get('idHopDong').setValue(res.result.id);
                            this.form.patchValue(res.result);
                        }
                        this.action = ActionEnum.UPDATE;
                        this.tabCurrentIndex = 3;
                    } else {
                        this.closeForm();
                    }
                });
        }
    }

    closeForm() {
        this.windowRef.close();
    }

    changeNgachCongChuc(e) {
        const item = this.listNgachCongChuc.find(x => x.id === e);
        const ngachItem = item.item as INgachCongChuc;
        if (item) {
            this.form.get('thoiGianNangLuong').setValue(ngachItem.thoiHanNangLuong);
            this.loadBacLuongs(ngachItem.nhomNgachId);
        }
    }

    changeBacLuong(e) {
        const item = this.listBacLuong.find(x => x.id === e);
        const bacLuongItem = item.item as IBacLuong;
        if (item) {
            this.form.get('heSoLuong').setValue(bacLuongItem.heSoLuong);
        }
    }

    handleChange(info: NzUploadChangeParam): void {
        if (info.file.status === 'done') {
            const response = info.file.response as IResponseData<IFileList>;
            this.file = response.result.files[0];

            // set form
            this.form.get('idHinhNhanSu').setValue(this.file.fileId);
        } else if (info.file.status === 'error') {
            this.notification.showErrorMessage('Không cập nhật được hình ảnh, có lỗi xảy ra !');
        }
    }

    onSelectFile(files: IFile[]) {
        if (files.length > 0) {
            this.form.get('idFileDinhKem').setValue(files[0].fileId);
        } else {
            this.form.get('idFileDinhKem').setValue(null);
        }
    }

    addPhuCapHandler() {
        this.listPhuCap.push({
            id: 0,
            idHopDongChiTiet: this.idHopDong,
            idKhoanPhuCap: null,
            tenKhoanPhuCap: null,
            giaTri: null,
            ghiChu: null,
        });
    }

    removePhuCapHandler(item: IPhuCap, index: number) {
        if (item.id > 0) {
            this.modalService.confirm({
                nzTitle: ModalDeleteConfig.title,
                nzContent: ModalDeleteConfig.content,
                nzOkText: ModalDeleteConfig.yes,
                nzOkType: 'danger',
                nzOnOk: () => {
                    this.apiService
                        .delete(UrlConstant.API.TD_HOP_DONG_PHU_CAP, {
                            ids: [item.id],
                        })
                        .subscribe(res => {
                            this.notification.showSuccessMessage(this.translate.get('MES.DELETE_DONE'));
                            this.loadDataPhuCaps(this.modelHopDong.idHopDongChiTiet);
                        });
                },
                nzCancelText: ModalDeleteConfig.no,
                nzOnCancel: () => {},
            });
        } else {
            this.listPhuCap.splice(index, 1);
        }
    }

    changePhuCap(e, index) {
        const phuCap = this.listDMPhuCap.find(x => x.id === e);
        if (phuCap) {
            this.listPhuCap[index].tenKhoanPhuCap = phuCap.ten;
            this.listPhuCap[index].giaTri = phuCap.soTien;
        }
    }

    savePhuCap() {
        const listData = this.listPhuCap.map(x => {
            return {
                id: x.id,
                idKhoanPhuCap: x.idKhoanPhuCap,
                giaTri: x.giaTri,
                ghiChu: x.ghiChu,
            };
        });

        this.apiService
            .put(UrlConstant.API.TD_HOP_DONG_PHU_CAP, {
                idHopDongChiTiet: this.modelHopDong.idHopDongChiTiet,
                phuCaps: listData,
            })
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                this.notification.showSuccessMessage(this.translate.get('MES.UPDATE_DONE'));
                this.loadDataPhuCaps(this.modelHopDong.idHopDongChiTiet);
            });
    }

    changeTabIndex(event) {
        this.tabCurrentIndex = event.index;
    }

    private loadNgachCongChucs() {
        this.apiService
            .read(`${UrlConstant.API.DM_NGACH_CONG_CHUC}/List`, {
                pageSize: 0,
                pageNumber: 0,
            })
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                this.listNgachCongChuc = res.result.items.map(m => {
                    return {
                        id: m.ngachCongChucId,
                        text: `${m.ma} - ${m.ten}`,
                        item: m,
                    };
                });
            });
    }

    private loadBacLuongs(idNhomNgach?: number) {
        this.apiService
            .read(`${UrlConstant.API.DM_BAC_LUONG}/List`, {
                pageSize: 0,
                pageNumber: 0,
                nhomNgachId: [idNhomNgach],
            })
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                this.listBacLuong = res.result.items.map(m => {
                    return {
                        id: m.bacLuongId,
                        text: m.bacLuong.toString() + ' - ' + m.heSoLuong,
                        item: m,
                    };
                });
            });
    }

    private loadKhoangPhuCaps() {
        this.apiService
            .read(`${UrlConstant.API.DM_KHOAN_PHU_CAP}/List`, {
                pageSize: 0,
                pageNumber: 0,
            })
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                this.listDMPhuCap = res.result.items as IKhoanPhuCap[];
            });
    }

    private loadItem() {
        this.loading = true;
        this.apiService
            .read(UrlConstant.API.TD_HOP_DONG + '/ById', {
                idNhanSu: this.idNhanSu,
                idHopDong: this.idHopDong,
            })
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                this.modelHopDong = res.result as IHopDong;
                this.mapFile(res.result as IHopDong);
                this.mapAvatar(res.result as IHopDong);
                this.form.patchValue(this.modelHopDong);
                if (this.modelHopDong.idHopDongChiTiet > 0) {
                    this.loadDataPhuCaps(this.modelHopDong.idHopDongChiTiet);
                }
                if (this.modelHopDong.idHopDong) {
                    this.form.get('id').setValue(this.modelHopDong.idHopDong);
                }
                if (this.modelHopDong.idNgachCongChuc > 0) {
                    this.changeNgachCongChuc(this.modelHopDong.idNgachCongChuc);
                }
                if (this.modelHopDong.hinhThucTraLuong > 0) {
                    this.form.get('isCapLuong').setValue(this.modelHopDong.hinhThucTraLuong === 1 ? true : false); //   CapLuong = 1,  TuTra = 2
                }
            });
    }

    private loadDataPhuCaps(id: number) {
        const modelSearch = {
            pageSize: 0,
            pageNumber: 0,
            idHopDongChiTiet: id,
        };
        this.apiService
            .read(`${UrlConstant.API.TD_HOP_DONG}/PhuCap`, modelSearch)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                this.listPhuCap = res.result.items as IPhuCap[];
            });
    }

    private mapFile(data: IHopDong) {
        // // set path avt
        // if (data && data.idHinhNhanSu && data.idHinhNhanSu > 0) {
        //     this.file = {
        //         path: data.pathHinhNhanSu,
        //         fileId: data.idHinhNhanSu,
        //         size: data.sizeHinhNhanSu,
        //     };
        // }
        // set file
        if (data && data.idFileDinhKem && data.idFileDinhKem > 0) {
            this.fileInput.push({
                fileAttachId: data.idFileDinhKem,
                fileDinhKemId: data.idFileDinhKem,
                name: data.nameFileDinhKem,
                size: data.sizeFileDinhKem,
                path: data.pathFileDinhKem,
                guidId: data.guidIdFileDinhKem,
                type: data.typeFileDinhKem,
                forWeb: data.forWebFileDinhKem,
                checkSum: data.checkSumFileDinhKem,
            });
        }
    }
    private mapAvatar(data: IHopDong) {
        // set path avt
        if (data && data.idHinhNhanSu && data.idHinhNhanSu > 0) {
            this.file = {
                path: data.pathHinhNhanSu,
                fileId: data.idHinhNhanSu,
                size: data.sizeHinhNhanSu,
            };
        }
        // // set file
        // if (data && data.idFileDinhKem && data.idFileDinhKem > 0) {
        //     this.fileInput.push({
        //         fileAttachId: data.idFileDinhKem,
        //         fileDinhKemId: data.idFileDinhKem,
        //         name: data.nameFileDinhKem,
        //         size: data.sizeFileDinhKem,
        //         path: data.pathFileDinhKem,
        //         guidId: data.guidIdFileDinhKem,
        //         type: data.typeFileDinhKem,
        //         forWeb: data.forWebFileDinhKem,
        //         checkSum: data.checkSumFileDinhKem,
        //     });
        // }
    }
}
