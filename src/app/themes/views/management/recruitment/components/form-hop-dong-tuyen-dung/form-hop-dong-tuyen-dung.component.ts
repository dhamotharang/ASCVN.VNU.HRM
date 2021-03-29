import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { CustomTranslateService, NotificationService } from '@core/services/common';
import { WindowCloseResult, WindowRef, WindowService } from '@progress/kendo-angular-dialog';
import { Observable, of, Subject } from 'rxjs';
import { finalize, map, takeUntil } from 'rxjs/operators';
import { IHopDong, IItemHopDong, TrangThaiHopDongEnum, XacNhanHopDongEnum } from '../../_models';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { IFile, IFileAttach } from '@core/models/common';
import { DuLieuNhanSuEnum } from '@themes/views/management/human-resource/_models';
import { ActionEnum } from '@core/constants/enum.constant';
import { XacNhanHopDongComponent } from '../xac-nhan-hop-dong/xac-nhan-hop-dong.component';
import { ListRoleOption } from '@core/auth/user-role-option';
import { BaseRecruitmentComponent } from '../../_base/base-recruitment.component';
import { FOLDER } from '@core/constants/app.constant';
import { DropDownListEnum } from '@shared/containers/asc-select';
import { DeXuatHopDongComponent } from '../de-xuat-hop-dong/de-xuat-hop-dong.component';

@Component({
    selector: 'app-form-hop-dong-tuyen-dung',
    templateUrl: './form-hop-dong-tuyen-dung.component.html',
    styleUrls: ['./form-hop-dong-tuyen-dung.component.scss'],
})
export class FormHopDongTuyenDungComponent implements OnInit, OnDestroy {
    @Input() model: IHopDong;
    @Input() idNhanSu: number;
    @Input() idHopDong: number;
    @Input() idHopDongChiTiet: number;
    @Input() action: ActionEnum;
    @Input() isHopDongXacNhan: boolean;
    @Input() idTrangThaiHopDong: number;

    opened = false;
    isCapNhatSau = false;
    isSubmitAndSend = false;
    xacNhanHopDongEnum = XacNhanHopDongEnum;
    trangThaiHopDongEnum = TrangThaiHopDongEnum;
    dropdownListEnum = DropDownListEnum;
    formXacNhan: FormGroup;
    form: FormGroup;
    destroyed$ = new Subject();
    tenBenA: string;
    tenBenB: string;
    isChecked: any;
    chonNguoiDuyet: number[] = [];
    chonNguoiKy: number[] = [];
    idCoQuanCap1: number;
    fileInput$: Observable<IFileAttach[]>;
    isAction = ActionEnum;
    lydoXacNhanBenA = '';
    lydoXacNhanBenB = '';
    listRoleOption = ListRoleOption;
    folder = FOLDER;

    constructor(
        private formBuilder: FormBuilder,
        public apiService: ApiService,
        public notificationService: NotificationService,
        private windowService: WindowService,
        private translate: CustomTranslateService,
        private notification: NotificationService,
        public windowRef: WindowRef
    ) {}

    ngOnInit() {
        // super.ngOnInit();
        this.createForm();

        if (this.idNhanSu) {
            this.loadGetById();
        }
        this.form.get('isThuViec').valueChanges.subscribe(x => {
            this.isChecked = x;
        });

        // this.createFormXacNhan();
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    createForm() {
        this.form = this.formBuilder.group({
            id: [0],
            idHopDongChiTiet: [null],
            idViTriViecLam: [null],
            idKeHoachTuyenDung: [null],
            soHopDong: [''],
            ngayKy: [null],
            idNhanSuDuyet: [null],
            // moi
            idNguoiKy: [null],
            soDienThoaiBenA: [{ value: '', disabled: true }],
            quocTichNguoiKy: [{ value: '', disabled: true }],
            chucVuBenA: [{ value: '', disabled: true }],
            daiDienChoBenA: [{ value: '', disabled: true }],
            diaChiBenA: [{ value: '', disabled: true }],
            quocTichNhanSu: [{ value: '', disabled: true }],
            ngaySinhBenB: [{ value: null, disabled: true }],
            noiSinhBenB: [{ value: '', disabled: true }],
            ngheNghiepBenB: [{ value: '', disabled: true }],
            diaChiThuongTruBenB: [{ value: '', disabled: true }],
            soCMNDBenB: [{ value: '', disabled: true }],
            ngayCapCMNDBenB: [null],
            CMNDCapTaiBenB: [{ value: '', disabled: true }],
            soSoLaoDongBenB: [{ value: '', disabled: true }],
            ngayCapSSLDBenB: [null],
            SSLDCapTaiBenB: [{ value: '', disabled: true }],

            tenNhanSu: [{ value: '', disabled: true }],
            chucVuNguoiKy: [''],
            diaDiemLamViec: [''],
            idCoQuanQuanLy: [null],
            idNhanSu: [null, Validators.required],
            idLoaiHopDong: [null, Validators.required],
            hdTuNgay: [null, Validators.required],
            hdDenNgay: [null, Validators.required],
            isThuViec: [null],
            thuViecTuNgay: [null],
            thuViecDenNgay: [null],
            idCoQuan: [null],
            idNgachCongChuc: [null],
            idChucVu: [null],
            nhiemVu: [''],
            thoiGianLamViec: [''],
            phuongTienLamViec: [''],
            phuongTienDiLai: [''],
            mucLuongChinh: [''],
            hinhThucTraLuong: [''],
            phucLoi: [''],
            ngayNhanLuong: [''],
            khoanThuongKhac: [''],
            cheDoNangLuong: [''],
            thietBiBaoHo: [''],
            soNgayNghiHuongLuong: [''],
            cheDoBaoHiem: [''],
            cheDoDaoTao: [''],
            thoaThuanKhac: [''],
            nghiaVu: [''],
            ngayHieuLuc: [null],
            ngayHopDong: [null],
            hopDongLamLai: [''],
            idFileDinhKem: [null],
            nameFileDinhKem: [''],
            ghiChuNguoiGui: [''],
        });
    }

    disabledNgayBatDauHD = (current: Date): boolean => {
        const date = this.form.get('hdDenNgay').value;
        if (!date) {
            return;
        }
        return differenceInCalendarDays(current, new Date(date)) > 0;
    };

    disabledNgayKetThucHD = (current: Date): boolean => {
        const date = this.form.get('hdTuNgay').value;
        if (!date) {
            return;
        }
        return differenceInCalendarDays(current, new Date(date)) < 0;
    };

    disabledNgayBatDauTV = (current: Date): boolean => {
        const date = this.form.get('thuViecDenNgay').value;
        if (!date) {
            return;
        }
        return differenceInCalendarDays(current, new Date(date)) > 0;
    };

    disabledNgayKetThucTV = (current: Date): boolean => {
        const date = this.form.get('thuViecTuNgay').value;
        if (!date) {
            return;
        }
        return differenceInCalendarDays(current, new Date(date)) < 0;
    };

    onSelectFile(files: IFile[]) {
        if (files.length > 0) {
            this.form.get('idFileDinhKem').setValue(files[0].fileId);
        } else {
            this.form.get('idFileDinhKem').setValue(null);
        }
    }

    onSubmitAndSend() {
        this.isSubmitAndSend = true;
        this.onSubmit();
    }
    guiVaLuuXacNhan() {
        const model = {
            idsHopDong: this.idHopDong,
            ghiChuNguoiGui: this.form.get('ghiChuNguoiGui').value,
        };

        this.apiService
            .put(UrlConstant.API.TD_HOP_DONG + '/GuiXacNhan', model)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                this.notification.showSuccessMessage(this.translate.get('MES.SEND_DONE'));
                this.closeForm();
            });
    }

    onSubmit() {
        if (this.isSubmitAndSend) {
            this.apiService
                .put(UrlConstant.API.TD_HOP_DONG + '/LuuVaGui', this.form.value)
                .pipe(
                    takeUntil(this.destroyed$),
                    finalize(() => {
                        this.isSubmitAndSend = false;
                    })
                )
                .subscribe(() => {
                    // show notification
                    this.notificationService.showSuccessMessage(MessageConstant.COMMON.MSG_UPDATE_DONE);
                    // close form
                    this.closeForm();
                });
        } else {
            this.apiService
                .put(UrlConstant.API.TD_HOP_DONG, this.form.value)
                .pipe(
                    takeUntil(this.destroyed$),
                    finalize(() => {
                        this.isSubmitAndSend = false;
                    })
                )
                .subscribe(() => {
                    // show notification
                    this.notificationService.showSuccessMessage(MessageConstant.COMMON.MSG_UPDATE_DONE);
                    // close form
                    this.closeForm();
                });
        }
    }
    onDeXuatHopDong(id: number) {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('RECRUITMENT.HD.GUI_CA_NHAN_XAC_NHAN'),
            content: DeXuatHopDongComponent,
            width: 500,
            top: 10,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.ids = [id];

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
            }
        });
    }
    closeForm() {
        this.windowRef.close();
    }

    changeNhanSuBenA(data: any) {
        if (data.length > 0) {
            this.getInforNhanSu(data[0].nhanSuId, true);
        }
    }

    changeNhanSuBenB(data: any) {
        if (data.length > 0) {
            this.getInforNhanSu(data[0].nhanSuId, false);
        }
    }

    getInforNhanSu(idNS: number, isBenA: boolean) {
        const nhanSu$ = this.apiService
            .read(UrlConstant.API.HRM_NHAN_SU + '/ById', {
                idNhanSu: idNS,
                manHinh: DuLieuNhanSuEnum.SU_DUNG_CHINH,
            })
            .pipe(takeUntil(this.destroyed$));
        nhanSu$.subscribe(res => {
            if (res.result) {
                const itemNhanSu = res.result as any;
                if (isBenA) {
                    this.tenBenA = itemNhanSu.hoDem + ' ' + itemNhanSu.ten;
                    this.form.get('soDienThoaiBenA').setValue(itemNhanSu.soDienThoai);
                    this.form.get('quocTichNguoiKy').setValue(itemNhanSu.tenQuocTich);
                    this.form.get('chucVuBenA').setValue(itemNhanSu.tenChucVu);
                    this.form.get('daiDienChoBenA').setValue(itemNhanSu.tenCoQuan);
                    this.form
                        .get('diaChiBenA')
                        .setValue(
                            (itemNhanSu.hktT_SoNha != null ? itemNhanSu.hktT_SoNha + ',' : '') +
                                (itemNhanSu.hktT_TenHuyen != null ? itemNhanSu.hktT_TenHuyen + ',' : '') +
                                (itemNhanSu.hktT_TenTinh != null ? itemNhanSu.hktT_TenTinh : '')
                        );
                } else {
                    this.tenBenB = itemNhanSu.hoDem + ' ' + itemNhanSu.ten;
                    this.form.get('quocTichNhanSu').setValue(itemNhanSu.tenQuocTich);
                    this.form.get('ngaySinhBenB').setValue(itemNhanSu.ngaySinh);
                    this.form
                        .get('noiSinhBenB')
                        .setValue(
                            (itemNhanSu.noiSinh_TenTinh != null ? itemNhanSu.noiSinh_TenTinh + ',' : '') + itemNhanSu.noiSinh_TenQuocGia !=
                                null
                                ? itemNhanSu.noiSinh_TenQuocGia
                                : ''
                        );
                    this.form.get('ngheNghiepBenB').setValue(itemNhanSu.tenChucDanh);
                    this.form
                        .get('diaChiThuongTruBenB')
                        .setValue(
                            (itemNhanSu.hktT_SoNha != null ? itemNhanSu.hktT_SoNha + ',' : '') +
                                (itemNhanSu.hktT_TenHuyen != null ? itemNhanSu.hktT_TenHuyen + ',' : '') +
                                itemNhanSu.hktT_TenTinh !=
                                null
                                ? itemNhanSu.hktT_TenTinh
                                : ''
                        );
                    this.form.get('soCMNDBenB').setValue(itemNhanSu.soCMND);
                    this.form.get('ngayCapCMNDBenB').setValue(itemNhanSu.ngayCapCMND);
                    this.form.get('CMNDCapTaiBenB').setValue(itemNhanSu.noiCapCMND);
                    this.form.get('soSoLaoDongBenB').setValue(itemNhanSu.soSoLaoDong);
                    this.form.get('ngayCapSSLDBenB').setValue(itemNhanSu.ngayCapSoLaoDong);
                    this.form.get('SSLDCapTaiBenB').setValue(itemNhanSu.noiCapSoLaoDong);
                }
            }
        });
    }

    getThongTinNguoiKy(itemHopDong: IItemHopDong) {
        this.tenBenA = itemHopDong.tenNguoiKy;
        this.form.get('soDienThoaiBenA').setValue(itemHopDong.soDienThoaiNguoiKy);
        this.form.get('quocTichNguoiKy').setValue(itemHopDong.quocTichNguoiKy);
        this.form.get('chucVuBenA').setValue(itemHopDong.tenChucVuNguoiKy);
        this.form.get('daiDienChoBenA').setValue(itemHopDong.tenCoQuanNguoiKy);
        this.form.get('diaChiBenA').setValue(itemHopDong.hoKhauThuongTruNguoiKy);
    }

    getThongTinNhanSu(itemHopDong: IItemHopDong) {
        this.tenBenB = itemHopDong.tenNhanSu;
        this.form.get('quocTichNhanSu').setValue(itemHopDong.quocTichNhanSu);
        this.form.get('ngaySinhBenB').setValue(itemHopDong.ngaySinh);
        this.form.get('noiSinhBenB').setValue(itemHopDong.noiSinhNhanSu);
        this.form.get('ngheNghiepBenB').setValue(itemHopDong.ngheNghiepTuyenDung);
        this.form.get('diaChiThuongTruBenB').setValue(itemHopDong.hoKhauThuongTru);
        this.form.get('soCMNDBenB').setValue(itemHopDong.soCMND);
        this.form.get('ngayCapCMNDBenB').setValue(itemHopDong.ngayCapCMND);
        this.form.get('CMNDCapTaiBenB').setValue(itemHopDong.noiCapCMND);
        this.form.get('soSoLaoDongBenB').setValue(itemHopDong.soSoLaoDong);
        this.form.get('ngayCapSSLDBenB').setValue(itemHopDong.ngayCapSoLaoDong);
        this.form.get('SSLDCapTaiBenB').setValue(itemHopDong.noiCapSoLaoDong);
    }

    private loadGetById() {
        this.apiService
            .read(UrlConstant.API.TD_HOP_DONG + '/ById', {
                idNhanSu: this.idNhanSu,
                idHopDong: this.idHopDong,
            })
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                const itemHopDong = res.result as IItemHopDong;
                this.mapFileDinhKem(itemHopDong);

                this.form.patchValue(itemHopDong);

                // get thong tin nhan su hop dong
                this.getThongTinNhanSu(itemHopDong);
                // this.getInforNhanSu(this.idNhanSu, false);
                // get thong tin ng ky
                if (itemHopDong.idCoQuanCap1 && itemHopDong.idCoQuanCap1 > 0) {
                    this.idCoQuanCap1 = itemHopDong.idCoQuanCap1;
                }
                if (itemHopDong.idNguoiKy && itemHopDong.idNguoiKy > 0) {
                    this.getThongTinNguoiKy(itemHopDong);
                    this.chonNguoiKy = [itemHopDong.idNguoiKy];
                }
                // get thong tin ng duyet
                if (itemHopDong.idNhanSuDuyet && itemHopDong.idNhanSuDuyet > 0) {
                    this.chonNguoiDuyet = [itemHopDong.idNhanSuDuyet];
                }
                // get thong tin ng duyet
                // if (itemHopDong.idNhanSuDuyet && itemHopDong.idNhanSuDuyet > 0) {

                // }

                if (this.action === ActionEnum.UPDATE && itemHopDong.idTrangThaiHopDong !== TrangThaiHopDongEnum.TAO_MOI) {
                    this.isCapNhatSau = true;
                }
            });
    }

    mapFileDinhKem(itemHopDong: IItemHopDong) {
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

    XacNhanHopDong(flag: number) {
        const dataSubmit = {
            idHopDongChiTiet: this.idHopDongChiTiet,
            xacNhanHopDong: flag,
            lyDoXacNhanHopDong: this.lydoXacNhanBenB,
        };

        this.apiService
            .put(UrlConstant.API.TD_HOP_DONG + '/XacNhan', dataSubmit)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(() => {
                this.notification.showSuccessMessage(this.translate.get('RECRUITMENT.MES.08'));
                this.closeForm();
            });
    }

    duyetHopDongTruongDonVi(trangThai: TrangThaiHopDongEnum) {
        const dataSubmit = {
            idsHopDong: [this.idHopDong],
            idTrangThaiHopDong: trangThai,
            lyDoDuyet: this.lydoXacNhanBenA,
        };

        this.apiService
            .put(UrlConstant.API.TD_HOP_DONG + '/Duyet', dataSubmit)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(() => {
                this.notification.showSuccessMessage(this.translate.get('RECRUITMENT.MES.06'));
                this.closeForm();
            });
    }

    showFormXacNhanHopDongCaNhan() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('RECRUITMENT.HDCN.XAC_NHAN01'),
            content: XacNhanHopDongComponent,
            width: 500,
            top: 10,
            autoFocusedElement: 'body',
        });
        const param = windowRef.content.instance;
        param.idHopDongChiTiet = this.idHopDongChiTiet;
        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
            }
        });
    }

    onChangeThuViec(e) {}
}
