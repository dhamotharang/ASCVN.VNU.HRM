import { Component, forwardRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import {
    ICapQuyetDinh,
    IChucDanh,
    IChucVuCongDoan,
    IChucVuCuuChienBinh,
    IChucVuDang,
    IChucVuDoan,
    IChungChi,
    IDanToc,
    IDoiTuongChinhSach,
    IDoiTuongThucHien,
    IGioiTinh,
    IHinhThucDaoTao,
    IHinhThucTraLoi,
    IHoiNghi,
    IKeHoachTuyenDung,
    IKhenThuong,
    IKhoiCoQuan,
    IKyLuat,
    IKyNangNgoaiNgu,
    ILinhVuc,
    ILoaiHopDong,
    ILoaiThuongBinh,
    INgachCongChuc,
    INganh,
    INguonTuyenDung,
    INhomMau,
    IPhuongXa,
    IQuanHam,
    IQuanHeGiaDinh,
    IQuanHuyen,
    IQuocGia,
    IQuyetDinh,
    ITapChi,
    IThanhPhanGiaDinh,
    ITinhThanh,
    ITinhTrangHonNhan,
    ITinhTrangSucKhoe,
    ITonGiao,
    ITrinhDoNhaNuoc,
    ITrinhDoVanHoa,
    ITrinhDoViTinh,
    IVanBang,
    IViTriViecLam,
} from '@themes/views/management/catalogs/_models/catalog.model';
import {
    NoiUngDungEnum,
    TinhTrangNhiemVuEnum,
    VaiTroHuongDanEnum,
} from '@themes/views/management/scientific-background/_models/scientific-background.enum';
import { IGroupUser } from '@core/models/users/users.model';
import { CatalogService } from '@management-state/catalog/catalog.service';
import { Subject } from 'rxjs';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { DropDownListEnum } from './asc-select.enum';
import { TrangThaiKeHoachEnum } from '@themes/views/management/recruitment/_models';
import { DateUtil } from '@core/utils/date';

export interface AscSelectOption {
    id: number;
    text: string;
    item?: any;
}

@Component({
    selector: 'asc-select',
    templateUrl: './asc-select.component.html',
    styleUrls: ['./asc-select.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => AscSelectComponent),
        },
    ],
})
export class AscSelectComponent implements OnInit, OnDestroy, OnChanges, ControlValueAccessor {
    @Input() modeOfDropDowList: DropDownListEnum;
    @Input() placeHolder?: string;
    @Input() isReference = false;
    @Input() referenceId?: string;
    @Input() selected?: number;
    @Input() mode = 'default';
    @Input() isDisabled = false;
    @Input() permissionType?: number = 1;
    value: string;

    listOfOption: AscSelectOption[] = [];
    selectedValue: number;
    reference: string;

    isLoading = false;

    private destroyed$ = new Subject();
    private fieldSortOfCatalog = 'stt';

    constructor(private apiService: ApiService, private catalogService: CatalogService) {}

    onChange(value) {}

    onTouched() {}

    writeValue(value): void {
        this.value = value;
        this.selectedValue = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.referenceId) {
            this.reference = changes.referenceId.currentValue;
            this.isDisabled = !(this.reference && this.isReference);
            if (this.reference === null || this.reference === undefined) {
                this.value = null;
                this.writeValue(this.value);
            }

            if (!changes.referenceId.firstChange && changes.referenceId.currentValue !== changes.referenceId.previousValue) {
                this.value = null;
                this.writeValue(this.value);
            }
            this.init();
        }
    }

    ngOnInit() {
        this.init();
    }

    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    init() {
        switch (this.modeOfDropDowList) {
            case DropDownListEnum.NAM:
                this.loadNams(10);
                break;
            case DropDownListEnum.QUY:
                this.loadQuys();
                break;
            case DropDownListEnum.GROUP_USER:
                this.loadGroupUsers();
                break;
            case DropDownListEnum.TINH_THANH:
                this.loadTinhThanhs();
                break;
            case DropDownListEnum.QUAN_HUYEN:
                this.loadQuanHuyens();
                break;
            case DropDownListEnum.PHUONG_XA:
                this.loadPhuongXas();
                break;
            case DropDownListEnum.KHOI_CO_QUAN:
                this.loadKhoiCoQuans();
                break;
            case DropDownListEnum.CO_QUAN:
                this.loadCoQuans();
                break;
            case DropDownListEnum.CO_QUAN_TRUC_THUOC:
                this.loadCoQuanTrucThuocs();
                break;
            case DropDownListEnum.NHOM_VIEC_LAM:
                this.loadNhomViecLams();
                break;
            case DropDownListEnum.VI_TRI_VIEC_LAM:
                this.loadViTriViecLams();
                break;
            case DropDownListEnum.NHOM_NGACH:
                this.loadNhomNgachs();
                break;
            case DropDownListEnum.NHOM_HOP_DONG:
                this.loadNhomHopDongs();
                break;
            case DropDownListEnum.LOAI_HOP_DONG:
                this.loadLoaiHopDongs();
                break;
            case DropDownListEnum.NGACH_CONG_CHUC:
                this.loadNgachCongChucs();
                break;
            case DropDownListEnum.CHUC_VU:
                this.loadChucVus();
                break;
            case DropDownListEnum.TINH_TRANG_HON_NHAN:
                this.loadTinhTrangHonNhans();
                break;
            case DropDownListEnum.TINH_TRANG_SUC_KHOE:
                this.loadTinhTrangSucKhoes();
                break;
            case DropDownListEnum.DOI_TUONG_CHINH_SACH:
                this.loadDoiTuongChinhSachs();
                break;
            case DropDownListEnum.CHUC_DANH_KHOA_HOC:
                this.loadChucDanhKhoaHocs();
                break;
            case DropDownListEnum.DOI_TUONG_DANH_GIA:
                this.loadDoiTuongDanhGias();
                break;
            case DropDownListEnum.PHIEU_DANH_GIA:
                this.loadPhieuDanhGias();
                break;
            case DropDownListEnum.LOAI_DANH_GIA:
                this.loadLoaiDanhGias();
                break;
            case DropDownListEnum.LOAI_CAU_HOI_DANH_GIA:
                this.loadLoaiCauHoiDanhGias();
                break;
            case DropDownListEnum.TRANG_THAI_DANH_GIA:
                this.loadTrangThaiDanhGias();
                break;
            case DropDownListEnum.GIOI_TINH:
                this.loadGioiTinhs();
                break;
            case DropDownListEnum.QUOC_TICH:
                this.loadQuocTichs();
                break;
            case DropDownListEnum.DAN_TOC:
                this.loadDanTocs();
                break;
            case DropDownListEnum.TON_GIAO:
                this.loadTonGiaos();
                break;
            case DropDownListEnum.NHOM_MAU:
                this.loadNhomMaus();
                break;
            case DropDownListEnum.QUAN_HE_GIA_DINH:
                this.loadQuanHeGiaDinhs();
                break;
            case DropDownListEnum.LOAI_NHAN_SU:
                this.loadLoaiNhanSus();
                break;
            case DropDownListEnum.LOAI_NHAN_SU_DANH_GIA:
                this.loadLoaiNhanSuDanhGias();
                break;
            case DropDownListEnum.CHUC_DANH:
                // this.loadChucDanhs();
                this.loadNgachCongChucs();
                break;
            case DropDownListEnum.TRINH_DO_CHUYEN_MON:
                this.loadTrinhDoChuyenMons();
                break;
            case DropDownListEnum.TINH_TRANG_NHIEM_VU:
                this.loadTinhTrangNhiemVus();
                break;
            case DropDownListEnum.VAI_TRO_HUONG_DAN:
                this.loadVaiTroHuongDans();
                break;
            case DropDownListEnum.LINH_VUC:
                this.loadLinhVucs();
                break;
            case DropDownListEnum.TAP_CHI:
                this.loadTapChis();
                break;
            case DropDownListEnum.HOI_NGHI:
                this.loadHoiNghis();
                break;
            case DropDownListEnum.NOI_UNG_DUNG:
                this.loadNoiUngDungs();
                break;
            case DropDownListEnum.NGUON_TUYEN:
                this.loadNguonTuyens();
                break;
            case DropDownListEnum.NGOAI_NGU:
                this.loadNgoaiNgus();
                break;
            case DropDownListEnum.TRINH_DO_NGOAI_NGU:
                this.loadTrinhDoNgoaiNgus();
                break;
            case DropDownListEnum.TRINH_DO_TIN_HOC:
                this.loadTrinhDoTinHocs();
                break;
            case DropDownListEnum.KY_NANG_NGOAI_NGU:
                this.loadKyNangNgoaiNgus();
                break;
            case DropDownListEnum.HINH_THUC_DAO_TAO:
                this.loadHinhThucDaoTaos();
                break;
            case DropDownListEnum.QUYET_DINH:
                this.loadQuyetDinhs();
                break;
            case DropDownListEnum.KHEN_THUONG:
                this.loadKhenThuongs();
                break;
            case DropDownListEnum.KY_LUAT:
                this.loadKyLuats();
                break;
            case DropDownListEnum.THANH_PHAN_GIA_DINH:
                this.loadThanhPhanGiaDinhs();
                break;
            case DropDownListEnum.CHUC_VU_DOAN:
                this.loadChucVuDoans();
                break;
            case DropDownListEnum.CHUC_VU_DANG:
                this.loadChucVuDangs();
                break;
            case DropDownListEnum.CHUC_VU_CONG_DOAN:
                this.loadChucVuCongDoans();
                break;
            case DropDownListEnum.CHUC_VU_CUU_CHIEN_BINH:
                this.loadChucVuCuuChienBinhs();
                break;
            case DropDownListEnum.CAP_QUYET_DINH:
                this.loadCapQuyetDinhs();
                break;
            case DropDownListEnum.LOAI_THUONG_BINH:
                this.loadLoaiThuongBinhs();
                break;
            case DropDownListEnum.QUAN_HAM:
                this.loadQuanHams();
                break;
            case DropDownListEnum.TRINH_DO_CHINH_TRI:
                this.loadTrinhDoChinhTris();
                break;
            case DropDownListEnum.TRINH_DO_VAN_HOA:
                this.loadTrinhDoVanHoas();
                break;
            case DropDownListEnum.TRINH_DO_NHA_NUOC:
                this.loadTrinhDoNhaNuocs();
                break;
            case DropDownListEnum.BAC_LUONG:
                this.loadBacLuongs();
                break;
            case DropDownListEnum.KE_HOACH_TUYEN_DUNG:
                this.loadKeHoachTuyenDungs();
                break;
            case DropDownListEnum.KE_HOACH_TUYEN_DUNG_BD:
                this.loadKeHoachTuyenDungBanDuyet();
                break;
            case DropDownListEnum.PTN_NGANH:
                this.loadNganh();
                break;
            case DropDownListEnum.PTN_CHUYEN_NGANH:
                this.loadChuyenNganh();
                break;
            case DropDownListEnum.PTN_LOAI_HINH_PHONG:
                this.loadLoaiHinhPhong();
                break;
            case DropDownListEnum.PTN_PHONG_THI_NGHIEM:
                this.loadPhongThiNghiem();
                break;
            case DropDownListEnum.NHOM_CONG_CU:
                this.loadNhomCongCu();
                break;
            case DropDownListEnum.CONG_CU:
                this.loadCongCu();
                break;
            case DropDownListEnum.THIET_BI:
                this.loadThietBi();
                break;
            case DropDownListEnum.TINH_TRANG_SU_DUNG_THIET_BI:
                this.loadTinhTrangSuDungThietBi();
                break;
            case DropDownListEnum.THIET_BI_THEO_PTN:
                this.loadThietBiTheoPhongThiNghiem();
                break;
            case DropDownListEnum.TRANG_THAI_DANG_KY_PTN:
                this.loadTrangThaiDangKyPhong();
                break;
            case DropDownListEnum.DANG_KY_SD_PHONG_THI_NGHIEM:
                this.loadDanhSachDangKy();
                break;
            case DropDownListEnum.DON_VI_TINH:
                this.loadDonViTinh();
                break;
            case DropDownListEnum.LOAI_TIEU_HAO:
                this.loadLoaiTieuHao();
                break;
            case DropDownListEnum.HINH_THUC_BAO_TRI:
                this.loadHinhThucBaoTri();
                break;
            case DropDownListEnum.TRANG_THAI_MANG_RA_NGOAI:
                this.loadTrangThaiMangRaNgoai();
                break;
            case DropDownListEnum.DM_VAI_TRO_DNCB:
                this.loadVaiTroDoiNguCanBo();
                break;
            case DropDownListEnum.DM_KY_NANG_VAN_HANH:
                this.loadKyNangVanHanh();
                break;
            case DropDownListEnum.VAN_BANG:
                this.loadVanBang();
                break;
            case DropDownListEnum.CHUNG_CHI:
                this.loadChungChi();
                break;
            case DropDownListEnum.KHCN_DE_TAI:
                this.loadDeTaiKHCN();
                break;
            case DropDownListEnum.DM_LOAI_HOI_THAO_HOI_NGHI:
                this.loadDMLoaiHoiNghiHoiThao();
                break;
            case DropDownListEnum.DM_LOAI_BAO_CAO:
                this.loadDMLoaiBaoCao();
                break;
            case DropDownListEnum.KHCN_NGON_NGU:
                this.loadNgonNguKHCN();
                break;
            case DropDownListEnum.DM_TINH_TRANG_DANG_KY:
                this.loadTinhTrangDangKy();
                break;
            case DropDownListEnum.DM_HINH_THUC:
                this.loadHinhThuc();
                break;
            case DropDownListEnum.DM_TINH_TRANG_SAN_PHAM:
                this.loadTinhTrangSanPham();
                break;
            case DropDownListEnum.DM_TO_CHUC_CAP_BANG:
                this.loadToChucCapBang();
                break;
            case DropDownListEnum.DM_CAP_DO:
                this.loadDMCapDo();
                break;
            case DropDownListEnum.DM_LOAI_GIAI_THUONG:
                this.loadDMLoaiGiaiThuong();
                break;
            case DropDownListEnum.DM_THU_HANG_LOAI_GIAI_THUONG:
                this.loadDMThuHangGiaiThuong();
                break;
            case DropDownListEnum.DM_LOAI_DU_AN:
                this.loadDMLoaiDuAn();
                break;
            case DropDownListEnum.DM_PHAM_VI_BAI_BAO:
                this.loadDMPhamViBaiBao();
                break;
            case DropDownListEnum.KHCN_TRANG_THAI:
                this.loadTrangThaiKHCN();
                break;
            case DropDownListEnum.TAP_CHI_KHCN:
                this.loadTapChiKHCN();
                break;
            case DropDownListEnum.VAI_TRO_KHCN:
                this.loadVaiTroKHCN();
                break;
            case DropDownListEnum.NHOM_KET_QUA_DU_KIEN:
                this.loadNhomKetQuaDuKienKHCN();
                break;
            case DropDownListEnum.KHCN_DM_CAP_DO:
                this.loadDMCapDoKHCN();
                break;
            case DropDownListEnum.LOAI_KE_HOACH:
                this.loadDMLoaiKeHoachKHCN();
                break;
            case DropDownListEnum.THONG_BAO_KE_HOACH:
                this.loadThongBaoKeHoachKHCN();
                break;

        }
    }

    get queryOptionsCatalog() {
        return {
            pageSize: 0,
            pageNumber: 0,
            sortCol: 'stt',
            sortByASC: true,
        };
    }

    /**
     * Loads group users
     */
    loadGroupUsers() {
        this.apiService
            .post(UrlConstant.API.SYSTEM.USERS + '/GetUserGroup', {
                pageSize: 0,
                pageNumber: 0,
                sortByASC: false,
                sortCol: 'id',
                keyword: null,
            })
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                if (res.result) {
                    const result = res.result?.items as IGroupUser[];
                    this.listOfOption = result.map(m => {
                        return {
                            id: m.id,
                            text: m.groupName,
                        };
                    });
                }
            });
    }

    /**
     * Load tinh thnah
     */
    loadTinhThanhs() {
        if (this.isReference && this.reference) {
            this.apiService
                .read(`${UrlConstant.API.DM_TINH_THANH + '/List'}`, {
                    ...this.queryOptionsCatalog,
                    quocGiaId: [this.reference],
                })
                .pipe(takeUntil(this.destroyed$))
                .subscribe(res => {
                    if (res.result && res.result.items) {
                        const quanHuyens = res.result.items as ITinhThanh[];
                        this.listOfOption = quanHuyens.map(m => {
                            return {
                                id: m.tinhThanhId,
                                text: m.ten,
                            };
                        });
                    }
                });
        } else {
            this.catalogService
                .getAllTinhThanhForSelect()
                .pipe(takeUntil(this.destroyed$))
                .subscribe((res: ITinhThanh[]) => {
                    this.listOfOption = res.map(m => {
                        return {
                            id: m.tinhThanhId,
                            text: m.ten,
                        };
                    });
                });
        }
    }

    loadQuanHuyens() {
        if (this.isReference && this.reference) {
            this.apiService
                .read(`${UrlConstant.API.DM_QUAN_HUYEN + '/List'}`, {
                    ...this.queryOptionsCatalog,
                    tinhThanhId: [this.reference],
                })
                .pipe(takeUntil(this.destroyed$))
                .subscribe(res => {
                    if (res.result && res.result.items) {
                        const quanHuyens = res.result.items as IQuanHuyen[];
                        this.listOfOption = quanHuyens.map(m => {
                            return {
                                id: m.quanHuyenId,
                                text: m.ten,
                            };
                        });
                    }
                });
        } else {
            this.listOfOption = [];
        }
    }

    loadPhuongXas() {
        if (this.isReference && this.reference) {
            this.apiService
                .read(`${UrlConstant.API.DM_PHUONG_XA + '/List'}`, {
                    ...this.queryOptionsCatalog,
                    quanHuyenId: [this.reference],
                })
                .pipe(takeUntil(this.destroyed$))
                .subscribe(res => {
                    if (res.result && res.result.items) {
                        const phuongXas = res.result.items as IPhuongXa[];
                        this.listOfOption = phuongXas.map(m => {
                            return {
                                id: m.phuongXaId,
                                text: m.ten,
                            };
                        });
                    }
                });
        } else {
            this.listOfOption = [];
        }
    }

    loadKhoiCoQuans() {
        this.apiService
            .read(`${UrlConstant.API.DM_KHOI_CO_QUAN}/List`, this.queryOptionsCatalog)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                if (res.result) {
                    const khoiCoQuans = res.result.items as IKhoiCoQuan[];
                    this.listOfOption = khoiCoQuans.map(m => {
                        return {
                            id: m.khoiCoQuanId,
                            text: m.ten,
                        };
                    });
                }
            });
    }

    loadCoQuans() {
        this.apiService
            .read(`${UrlConstant.API.DM_CO_QUAN}/List`, this.queryOptionsCatalog)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                if (res.result) {
                    this.listOfOption = res.result.items.map(m => {
                        return {
                            id: m.coQuanId,
                            text: m.ten,
                        };
                    });
                }
            });
    }

    loadLoaiNhanSus() {
        this.isLoading = true;
        this.apiService
            .read(`${UrlConstant.API.DM_LOAI_NHAN_SU}/List`, this.queryOptionsCatalog)
            .pipe(takeUntil(this.destroyed$))
            .pipe(
                map(res => {
                    if (res.result) {
                        return res.result?.items;
                    }
                    return [];
                }),
                tap(res => {
                    this.listOfOption = res.map(m => {
                        return {
                            id: m.loaiNhanSuId,
                            text: m.ten,
                        };
                    });
                }),
                finalize(() => (this.isLoading = false))
            )
            .subscribe();
    }

    loadCoQuanTrucThuocs() {
        this.listOfOption = [];
    }

    loadNhomViecLams() {
        this.isLoading = true;
        this.apiService
            .read(`${UrlConstant.API.DM_NHOM_VIEC_LAM}/List`, this.queryOptionsCatalog)
            .pipe(
                map(res => {
                    if (res.result) {
                        return res.result.items;
                    }
                    return [];
                }),
                tap(res => {
                    this.listOfOption = res.map(m => {
                        return {
                            id: m.nhomViTriViecLamId,
                            text: m.ten,
                        };
                    });
                }),
                finalize(() => (this.isLoading = false))
            )
            .pipe(takeUntil(this.destroyed$))
            .subscribe();
    }

    loadViTriViecLams() {
        if (this.isReference && this.reference) {
            this.isLoading = true;
            this.apiService
                .read(`${UrlConstant.API.DM_VI_TRI_VIEC_LAM + '/List'}`, {
                    ...this.queryOptionsCatalog,
                    nhomViTriViecLamId: [this.reference],
                })
                .pipe(
                    map(res => {
                        if (res.result) {
                            return res.result.items;
                        }
                        return [];
                    }),
                    tap((res: IViTriViecLam[]) => {
                        this.listOfOption = res.map(m => {
                            return {
                                id: m.viTriViecLamId,
                                text: m.ten,
                            };
                        });
                    }),
                    finalize(() => (this.isLoading = false))
                )
                .pipe(takeUntil(this.destroyed$))
                .subscribe();
        } else {
            this.apiService
                .read(`${UrlConstant.API.DM_VI_TRI_VIEC_LAM + '/List'}`, {
                    ...this.queryOptionsCatalog,
                    // nhomViTriViecLamId: [],
                })
                .pipe(
                    map(res => {
                        if (res.result) {
                            return res.result.items;
                        }
                        return [];
                    }),
                    tap((res: IViTriViecLam[]) => {
                        this.listOfOption = res.map(m => {
                            return {
                                id: m.viTriViecLamId,
                                text: m.ten,
                            };
                        });
                    }),
                    finalize(() => (this.isLoading = false))
                )
                .pipe(takeUntil(this.destroyed$))
                .subscribe();
        }
    }

    loadKeHoachTuyenDungs() {
        this.isLoading = true;
        this.apiService
            .read(`${UrlConstant.API.DM_KE_HOACH_TUYEN_DUNG}/DanhMuc`, {
                ...this.queryOptionsCatalog,
                isFilterCoQuan: true,
            })
            .pipe(
                map(res => {
                    if (res.result) {
                        return res.result.items;
                    }
                    return [];
                }),
                tap((res: IKeHoachTuyenDung[]) => {
                    this.listOfOption = res.map(m => {
                        return {
                            id: m.id,
                            text: `${m.maKeHoach} - ${m.tenKeHoach}`,
                        };
                    });
                }),
                finalize(() => (this.isLoading = false))
            )
            .pipe(takeUntil(this.destroyed$))
            .subscribe();
    }

    loadNhomNgachs() {
        this.isLoading = true;
        this.apiService
            .read(`${UrlConstant.API.DM_NHOM_NGACH}/List`, this.queryOptionsCatalog)
            .pipe(
                map(res => {
                    if (res.result) {
                        return res.result.items;
                    }
                    return [];
                }),
                tap(res => {
                    this.listOfOption = res.map(m => {
                        return {
                            id: m.nhomNgachId,
                            text: m.ten,
                        };
                    });
                }),
                finalize(() => (this.isLoading = false))
            )
            .pipe(takeUntil(this.destroyed$))
            .subscribe();
    }

    loadNhomHopDongs() {
        this.isLoading = true;
        this.apiService
            .read(`${UrlConstant.API.DM_NHOM_HOP_DONG}/List`, this.queryOptionsCatalog)
            .pipe(
                map(res => {
                    if (res.result) {
                        return res.result.items;
                    }
                    return [];
                }),
                tap(res => {
                    this.listOfOption = res.map(m => {
                        return {
                            id: m.nhomHopDongId,
                            text: m.ten,
                        };
                    });
                }),
                finalize(() => (this.isLoading = false))
            )
            .pipe(takeUntil(this.destroyed$))
            .subscribe();
    }

    loadLoaiHopDongs() {
        this.isLoading = true;
        this.apiService
            .read(`${UrlConstant.API.DM_LOAI_HOP_DONG}/List`, this.queryOptionsCatalog)
            .pipe(
                map(res => {
                    if (res.result) {
                        return res.result.items;
                    }
                    return [];
                }),
                tap((res: ILoaiHopDong[]) => {
                    this.listOfOption = res.map(m => {
                        return {
                            id: m.loaiHopDongId,
                            text: m.ten,
                        };
                    });
                }),
                finalize(() => (this.isLoading = false))
            )
            .pipe(takeUntil(this.destroyed$))
            .subscribe();
    }

    loadNgachCongChucs() {
        this.isLoading = true;
        this.apiService
            .read(`${UrlConstant.API.DM_NGACH_CONG_CHUC}/List`, this.queryOptionsCatalog)
            .pipe(
                map(res => {
                    if (res.result) {
                        return res.result.items;
                    }
                    return [];
                }),
                tap((res: INgachCongChuc[]) => {
                    this.listOfOption = res.map(m => {
                        return {
                            id: m.ngachCongChucId,
                            text: `${m.ten} - ${m.ma}`,
                            item: m,
                        };
                    });
                }),
                finalize(() => (this.isLoading = false))
            )
            .pipe(takeUntil(this.destroyed$))
            .subscribe();
    }

    loadChucVus() {
        this.isLoading = true;
        this.catalogService
            .getAllChucVuForSelect()
            .pipe(
                tap(res => {
                    this.listOfOption = res.map(m => {
                        return {
                            id: m.chucVuId,
                            text: m.ten,
                        };
                    });
                }),
                finalize(() => (this.isLoading = false))
            )
            .pipe(takeUntil(this.destroyed$))
            .subscribe();
    }

    loadTinhTrangHonNhans() {
        this.apiService
            .read(`${UrlConstant.API.DM_TINH_TRANG_HON_NHAN}/List`, this.queryOptionsCatalog)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                if (res.result) {
                    const tinhTrangHonNhans = res.result.items as ITinhTrangHonNhan[];
                    this.listOfOption = tinhTrangHonNhans.map(m => {
                        return {
                            id: m.tinhTrangHonNhanId,
                            text: m.ten,
                        };
                    });
                }
            });
    }

    loadTinhTrangSucKhoes() {
        this.apiService
            .read(`${UrlConstant.API.DM_TINH_TRANG_SUC_KHOE}/List`, this.queryOptionsCatalog)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                if (res.result) {
                    const tinhTrangSucKhoes = res.result.items as ITinhTrangSucKhoe[];
                    this.listOfOption = tinhTrangSucKhoes.map(m => {
                        return {
                            id: m.id,
                            text: m.ten,
                        };
                    });
                }
            });
    }

    loadDoiTuongChinhSachs() {
        this.apiService
            .read(`${UrlConstant.API.DM_DOI_TUONG_CHINH_SACH}/List`, this.queryOptionsCatalog)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                if (res.result) {
                    const doiTuongChinhSachs = res.result.items as IDoiTuongChinhSach[];
                    this.listOfOption = doiTuongChinhSachs.map(m => {
                        return {
                            id: m.doiTuongChinhSachId,
                            text: m.ten,
                        };
                    });
                }
            });
    }

    loadChucDanhKhoaHocs() {
        this.isLoading = true;
        this.apiService
            .read(`${UrlConstant.API.DM_CHUC_DANH_KHOA_HOC}/List`, this.queryOptionsCatalog)
            .pipe(
                map(res => {
                    if (res.result) {
                        return res.result.items;
                    }

                    return [];
                }),
                tap(res => {
                    this.listOfOption = res.map(m => {
                        return {
                            id: m.chucDanhKhoaHocId,
                            text: m.ten,
                        };
                    });
                }),
                finalize(() => (this.isLoading = false))
            )
            .pipe(takeUntil(this.destroyed$))
            .subscribe();
    }

    loadQuocTichs() {
        this.catalogService
            .getAllQuocGiaForSelect()
            .pipe(takeUntil(this.destroyed$))
            .subscribe((res: IQuocGia[]) => {
                this.listOfOption = res.map(m => {
                    return {
                        id: m.quocGiaId,
                        text: m.ten,
                    };
                });
            });
    }

    loadDanTocs() {
        this.catalogService
            .getAllDanTocForSelect()
            .pipe(takeUntil(this.destroyed$))
            .subscribe((res: IDanToc[]) => {
                this.listOfOption = res.map(m => {
                    return {
                        id: m.danTocId,
                        text: m.ten,
                    };
                });
            });
    }

    loadTonGiaos() {
        this.catalogService
            .getAllTonGiaoForSelect()
            .pipe(takeUntil(this.destroyed$))
            .subscribe((res: ITonGiao[]) => {
                this.listOfOption = res.map(m => {
                    return {
                        id: m.tonGiaoId,
                        text: m.ten,
                    };
                });
            });
    }

    loadNhomMaus() {
        this.apiService
            .read(`${UrlConstant.API.DM_NHOM_MAU}/List`, this.queryOptionsCatalog)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                if (res.result) {
                    const nhomMaus = res.result.items as INhomMau[];
                    this.listOfOption = nhomMaus.map(m => {
                        return {
                            id: m.nhomMauId,
                            text: m.ten,
                        };
                    });
                }
            });
    }

    loadQuanHeGiaDinhs() {
        this.apiService
            .read(`${UrlConstant.API.DM_QUAN_HE_GIA_DINH}/List`, this.queryOptionsCatalog)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                if (res.result) {
                    const quanHeGiaDinhs = res.result.items as IQuanHeGiaDinh[];
                    this.listOfOption = quanHeGiaDinhs.map(m => {
                        return {
                            id: m.quanHeGiaDinhId,
                            text: m.ten,
                        };
                    });
                }
            });
    }

    loadPhieuDanhGias() {
        this.listOfOption = [
            {
                id: 1,
                text: 'Phiếu Đánh giá năm',
            },
            {
                id: 2,
                text: 'Phiếu Đánh giá quý',
            },
        ];
    }

    loadLoaiDanhGias() {
        // danh muc: DoiTuongThucHien
        this.apiService
            .read(`${UrlConstant.API.DM_DOI_TUONG_THUC_HIEN}/List`, this.queryOptionsCatalog)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                if (res.result) {
                    const doiTuongThucHiens = res.result.items as IDoiTuongThucHien[];
                    this.listOfOption = doiTuongThucHiens.map(m => {
                        return {
                            id: m.doiTuongThucHienId,
                            text: m.ten,
                        };
                    });
                }
            });
    }

    loadLoaiCauHoiDanhGias() {
        this.apiService
            .read(`${UrlConstant.API.DM_HINH_THUC_TRA_LOI}/List`, this.queryOptionsCatalog)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                if (res.result) {
                    const hinhThucTraLois = res.result.items as IHinhThucTraLoi[];
                    this.listOfOption = hinhThucTraLois.map(m => {
                        return {
                            id: m.hinhThucTraLoiId,
                            text: m.ten,
                        };
                    });
                }
            });
    }

    loadNams(numberOfYear: number) {
        const nyear = numberOfYear != null && numberOfYear > 0 ? numberOfYear : 10;
        const year = new Date().getFullYear();
        const min = year - nyear;
        const max = year + 1;
        for (let i = max; i >= min; i--) {
            this.listOfOption.push({
                id: i,
                text: i.toString(),
            });
        }
    }

    loadTrangThaiDanhGias() {
        this.listOfOption = [
            {
                id: 1,
                text: 'Đã đánh giá',
            },
            {
                id: 0,
                text: 'Chưa đánh giá',
            },
        ];
    }

    loadQuys() {
        this.listOfOption = [
            {
                id: 0,
                text: 'Năm',
            },
            {
                id: 1,
                text: 'Quý I',
            },
            {
                id: 2,
                text: 'Quý II',
            },
            {
                id: 3,
                text: 'Quý III',
            },
            {
                id: 4,
                text: 'Quý IV',
            },
        ];
    }

    loadDoiTuongDanhGias() {
        this.isLoading = true;
        this.apiService
            .read(`${UrlConstant.API.DM_DOI_TUONG_DANH_GIA}/List`, this.queryOptionsCatalog)

            .pipe(
                map(res => {
                    if (res.result) {
                        return res.result.items;
                    }
                    return [];
                }),
                tap(res => {
                    this.listOfOption = res.map(m => {
                        return {
                            id: m.doiTuongDanhGiaId,
                            text: m.ten,
                        };
                    });
                }),
                finalize(() => (this.isLoading = false))
            )
            .pipe(takeUntil(this.destroyed$))
            .subscribe();
    }

    loadGioiTinhs() {
        this.apiService
            .read(`${UrlConstant.API.DM_GIOI_TINH}/List`, this.queryOptionsCatalog)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                if (res.result) {
                    const gioiTinhs = res.result.items as IGioiTinh[];
                    this.listOfOption = gioiTinhs.map(m => {
                        return {
                            id: m.gioiTinhId,
                            text: m.ten,
                        };
                    });
                }
            });
    }

    loadVanBang() {
        this.apiService
            .read(`${UrlConstant.API.DM_VAN_BANG}/List`, this.queryOptionsCatalog)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                if (res.result) {
                    const vanBangs = res.result.items as IVanBang[];
                    this.listOfOption = vanBangs.map(m => {
                        return {
                            id: m.id,
                            text: m.ten,
                        };
                    });
                }
            });
    }

    loadChungChi() {
        this.apiService
            .read(`${UrlConstant.API.DM_CHUNG_CHI}/List`, this.queryOptionsCatalog)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                if (res.result) {
                    const chungChis = res.result.items as IChungChi[];
                    this.listOfOption = chungChis.map(m => {
                        return {
                            id: m.id,
                            text: m.ten,
                        };
                    });
                }
            });
    }

    loadLoaiNhanSuDanhGias() {
        this.isLoading = true;
        this.apiService
            .read(`${UrlConstant.API.DM_LOAI_NHAN_SU_DANH_GIA}/List`, this.queryOptionsCatalog)
            .pipe(
                map(res => {
                    if (res.result) {
                        return res.result.items;
                    }
                    return [];
                }),
                tap(res => {
                    this.listOfOption = res.map(m => {
                        return {
                            id: m.loaiNhanSuDanhGiaId,
                            text: m.ten,
                        };
                    });
                }),
                finalize(() => (this.isLoading = false))
            )
            .pipe(takeUntil(this.destroyed$))
            .subscribe();
    }

    loadChucDanhs() {
        this.catalogService
            .getAllChucDanhForSelect()
            .pipe(takeUntil(this.destroyed$))
            .subscribe((res: IChucDanh[]) => {
                this.listOfOption = res.map(m => {
                    return {
                        id: m.chucDanhId,
                        text: m.ten,
                    };
                });
            });
    }

    loadTrinhDoChuyenMons() {
        this.isLoading = true;
        this.apiService
            .read(`${UrlConstant.API.DM_TRINH_DO_CHUYEN_MON}/List`, this.queryOptionsCatalog)
            .pipe(takeUntil(this.destroyed$))
            .pipe(
                map(res => {
                    if (res.result) {
                        return res.result.items;
                    }

                    return [];
                }),
                tap(res => {
                    this.listOfOption = res.map(m => {
                        return {
                            id: m.trinhDoChuyenMonId,
                            text: m.ten,
                        };
                    });
                }),
                finalize(() => (this.isLoading = false))
            )
            .subscribe();
    }

    loadVaiTroHuongDans() {
        this.listOfOption = [
            {
                id: VaiTroHuongDanEnum.CHINH,
                text: 'Chính',
            },
            {
                id: VaiTroHuongDanEnum.PHU,
                text: 'Phụ',
            },
        ];
    }

    loadTinhTrangNhiemVus() {
        this.listOfOption = [
            {
                id: TinhTrangNhiemVuEnum.DA_NGHIEM_THU,
                text: 'Đã nghiệm thu',
            },
            {
                id: TinhTrangNhiemVuEnum.CHUA_NGHIEM_THU,
                text: 'Chưa nghiệm thu',
            },
            {
                id: TinhTrangNhiemVuEnum.KHONG_HOAN_THANH,
                text: 'Không hoàn thành',
            },
        ];
    }

    loadLinhVucs() {
        this.apiService
            .read(`${UrlConstant.API.DM_LINH_VUC}/List`, this.queryOptionsCatalog)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                if (res.result) {
                    const linhVucs = res.result.items as ILinhVuc[];
                    this.listOfOption = linhVucs.map(m => {
                        return {
                            id: m.id,
                            text: m.ten,
                        };
                    });
                }
            });
    }

    loadTapChis() {
        this.apiService
            .read(`${UrlConstant.API.DM_TAP_CHI}/List`, this.queryOptionsCatalog)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                if (res.result) {
                    const tapChis = res.result.items as ITapChi[];
                    this.listOfOption = tapChis.map(m => {
                        return {
                            id: m.id,
                            text: m.ten,
                        };
                    });
                }
            });
    }

    loadHoiNghis() {
        this.apiService
            .read(`${UrlConstant.API.DM_HOI_NGHI}/List`, this.queryOptionsCatalog)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                if (res.result) {
                    const hoiNghis = res.result.items as IHoiNghi[];
                    this.listOfOption = hoiNghis.map(m => {
                        return {
                            id: m.id,
                            text: m.ten,
                        };
                    });
                }
            });
    }

    loadNguonTuyens() {
        this.apiService
            .read(`${UrlConstant.API.DM_NGUON_TUYEN_DUNG}/List`, this.queryOptionsCatalog)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                if (res.result) {
                    const nguonTuyens = res.result.items as INguonTuyenDung[];
                    this.listOfOption = nguonTuyens.map(m => {
                        return {
                            id: m.id,
                            text: m.ten,
                        };
                    });
                }
            });
    }

    loadNoiUngDungs() {
        this.listOfOption = [
            {
                id: NoiUngDungEnum.TRONG_NUOC,
                text: 'Trong nước',
            },
            {
                id: NoiUngDungEnum.NGOAI_NUOC,
                text: 'Ngoài nước',
            },
            {
                id: NoiUngDungEnum.TRONG_VA_NGOAI_NUOC,
                text: 'Trong và ngoài nước',
            },
        ];
    }

    loadNgoaiNgus() {
        this.isLoading = true;
        this.apiService
            .read(`${UrlConstant.API.DM_NGOAI_NGU}/List`, this.queryOptionsCatalog)
            .pipe(takeUntil(this.destroyed$))
            .pipe(
                map(res => {
                    if (res.result) {
                        return res.result.items;
                    }

                    return [];
                }),
                tap(res => {
                    this.listOfOption = res.map(m => {
                        return {
                            id: m.ngoaiNguId,
                            text: m.ten,
                        };
                    });
                }),
                finalize(() => (this.isLoading = false))
            )
            .subscribe();
    }

    loadTrinhDoNgoaiNgus() {
        this.isLoading = true;
        this.apiService
            .read(`${UrlConstant.API.DM_TRINH_DO_NGOAI_NGU}/List`, this.queryOptionsCatalog)
            .pipe(takeUntil(this.destroyed$))
            .pipe(
                map(res => {
                    if (res.result) {
                        return res.result.items;
                    }

                    return [];
                }),
                tap(res => {
                    this.listOfOption = res.map(m => {
                        return {
                            id: m.trinhDoNgoaiNguId,
                            text: m.ten,
                        };
                    });
                }),
                finalize(() => (this.isLoading = false))
            )
            .subscribe();
    }

    loadKyNangNgoaiNgus() {
        this.apiService
            .read(`${UrlConstant.API.DM_KY_NANG_NGOAI_NGU}/List`, this.queryOptionsCatalog)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                if (res.result) {
                    const kyNangNgoaiNgus = res.result.items as IKyNangNgoaiNgu[];
                    this.listOfOption = kyNangNgoaiNgus.map(m => {
                        return {
                            id: m.kyNangNgoaiNguId,
                            text: m.ten,
                        };
                    });
                }
            });
    }

    loadHinhThucDaoTaos() {
        this.apiService
            .read(`${UrlConstant.API.DM_HINH_THUC_DAO_TAO}/List`, this.queryOptionsCatalog)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                if (res.result) {
                    const hinhThucDaoTaos = res.result.items as IHinhThucDaoTao[];
                    this.listOfOption = hinhThucDaoTaos.map(m => {
                        return {
                            id: m.id,
                            text: m.ten,
                        };
                    });
                }
            });
    }

    loadQuyetDinhs() {
        this.listOfOption = [
            {
                id: 1,
                text: 'Quyết định 1',
            },
            {
                id: 2,
                text: 'Quyết định 2',
            },
        ];
    }

    loadKhenThuongs() {
        this.apiService
            .read(`${UrlConstant.API.DM_KHEN_THUONG}/List`, this.queryOptionsCatalog)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                if (res.result) {
                    const khenThuongs = res.result.items as IKhenThuong[];
                    this.listOfOption = khenThuongs.map(m => {
                        return {
                            id: m.khenThuongId,
                            text: m.ten,
                        };
                    });
                }
            });
    }

    loadCapKyLuats() {
        this.listOfOption = [
            {
                id: 1,
                text: 'Cấp kỷ luật 1',
            },
            {
                id: 2,
                text: 'Cấp kỷ luật 2',
            },
        ];
    }

    loadKyLuats() {
        this.apiService
            .read(`${UrlConstant.API.DM_KY_LUAT}/List`, this.queryOptionsCatalog)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                if (res.result) {
                    const kyLuats = res.result.items as IKyLuat[];
                    this.listOfOption = kyLuats.map(m => {
                        return {
                            id: m.kyLuatId,
                            text: m.ten,
                        };
                    });
                }
            });
    }

    loadTrinhDoTinHocs() {
        this.apiService
            .read(`${UrlConstant.API.DM_TRINH_DO_VI_TINH}/List`, this.queryOptionsCatalog)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                if (res.result) {
                    const trinhDoTinHocs = res.result.items as ITrinhDoViTinh[];
                    this.listOfOption = trinhDoTinHocs.map(m => {
                        return {
                            id: m.trinhDoViTinhId,
                            text: m.ten,
                        };
                    });
                }
            });
    }

    loadCapQuyetDinhs() {
        this.apiService
            .read(`${UrlConstant.API.DM_CAP_QUYET_DINH}/List`, this.queryOptionsCatalog)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                if (res.result) {
                    const capQuyetDinhs = res.result.items as ICapQuyetDinh[];
                    this.listOfOption = capQuyetDinhs.map(m => {
                        return {
                            id: m.id,
                            text: m.ten,
                        };
                    });
                }
            });
    }

    loadLoaiThuongBinhs() {
        this.apiService
            .read(`${UrlConstant.API.DM_LOAI_THUONG_BINH}/List`, this.queryOptionsCatalog)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                if (res.result) {
                    const loaiThuongBinhs = res.result.items as ILoaiThuongBinh[];
                    this.listOfOption = loaiThuongBinhs.map(m => {
                        return {
                            id: m.id,
                            text: m.ten,
                        };
                    });
                }
            });
    }

    loadQuanHams() {
        this.apiService
            .read(`${UrlConstant.API.DM_QUAN_HAM}/List`, this.queryOptionsCatalog)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                if (res.result) {
                    const quanHams = res.result.items as IQuanHam[];
                    this.listOfOption = quanHams.map(m => {
                        return {
                            id: m.id,
                            text: m.ten,
                        };
                    });
                }
            });
    }

    loadThanhPhanGiaDinhs() {
        this.apiService
            .read(`${UrlConstant.API.DM_THANH_PHAN_GIA_DINH}/List`, this.queryOptionsCatalog)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                if (res.result) {
                    const thanhPhanGiaDinhs = res.result.items as IThanhPhanGiaDinh[];
                    this.listOfOption = thanhPhanGiaDinhs.map(m => {
                        return {
                            id: m.id,
                            text: m.ten,
                        };
                    });
                }
            });
    }

    loadChucVuDoans() {
        this.apiService
            .read(`${UrlConstant.API.DM_CHUC_VU_DOAN}/List`, this.queryOptionsCatalog)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                if (res.result) {
                    const chucVuDoans = res.result.items as IChucVuDoan[];
                    this.listOfOption = chucVuDoans.map(m => {
                        return {
                            id: m.id,
                            text: m.ten,
                        };
                    });
                }
            });
    }

    loadChucVuDangs() {
        this.apiService
            .read(`${UrlConstant.API.DM_CHUC_VU_DANG}/List`, this.queryOptionsCatalog)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                if (res.result) {
                    const chucVuDangs = res.result.items as IChucVuDang[];
                    this.listOfOption = chucVuDangs.map(m => {
                        return {
                            id: m.id,
                            text: m.ten,
                        };
                    });
                }
            });
    }

    loadChucVuCongDoans() {
        this.apiService
            .read(`${UrlConstant.API.DM_CHUC_VU_CONG_DOAN}/List`, this.queryOptionsCatalog)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                if (res.result) {
                    const chucVuCongDoans = res.result.items as IChucVuCongDoan[];
                    this.listOfOption = chucVuCongDoans.map(m => {
                        return {
                            id: m.id,
                            text: m.ten,
                        };
                    });
                }
            });
    }

    loadChucVuCuuChienBinhs() {
        this.apiService
            .read(`${UrlConstant.API.DM_CHUC_VU_CUU_CHIEN_BINH}/List`, this.queryOptionsCatalog)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                if (res.result) {
                    const chucVuCuuChienBinhs = res.result.items as IChucVuCuuChienBinh[];
                    this.listOfOption = chucVuCuuChienBinhs.map(m => {
                        return {
                            id: m.id,
                            text: m.ten,
                        };
                    });
                }
            });
    }

    loadTrinhDoChinhTris() {
        this.isLoading = true;
        this.apiService
            .read(`${UrlConstant.API.DM_TRINH_DO_CHINH_TRI}/List`, this.queryOptionsCatalog)
            .pipe(
                map(res => {
                    if (res.result) {
                        return res.result.items;
                    }

                    return [];
                }),
                tap(res => {
                    this.listOfOption = res.map(m => {
                        return {
                            id: m.trinhDoChinhTriId,
                            text: m.ten,
                        };
                    });
                }),
                finalize(() => (this.isLoading = false))
            )
            .pipe(takeUntil(this.destroyed$))
            .subscribe();
    }

    loadTrinhDoNhaNuocs() {
        this.apiService
            .read(`${UrlConstant.API.DM_TRINH_DO_NHA_NUOC}/List`, this.queryOptionsCatalog)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                if (res.result) {
                    const trinhDoNhaNuocs = res.result.items as ITrinhDoNhaNuoc[];
                    this.listOfOption = trinhDoNhaNuocs.map(m => {
                        return {
                            id: m.trinhDoNhaNuocId,
                            text: m.ten,
                        };
                    });
                }
            });
    }

    loadTrinhDoVanHoas() {
        this.apiService
            .read(`${UrlConstant.API.DM_TRINH_DO_VAN_HOA}/List`, this.queryOptionsCatalog)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                if (res.result) {
                    const trinhDoVanHoas = res.result.items as ITrinhDoVanHoa[];
                    this.listOfOption = trinhDoVanHoas.map(m => {
                        return {
                            id: m.trinhDoVanHoaId,
                            text: m.ten,
                        };
                    });
                }
            });
    }

    loadBacLuongs() {
        if (this.isReference && this.reference) {
            this.apiService
                .read(`${UrlConstant.API.DM_BAC_LUONG}/List`, {
                    ...this.queryOptionsCatalog,
                    nhomNgachId: [this.reference],
                })
                .pipe(
                    map(res => {
                        if (res.result) {
                            return res.result.items;
                        }

                        return [];
                    }),
                    tap(res => {
                        this.listOfOption = res.map(m => {
                            return {
                                id: m.bacLuongId,
                                text: m.bacLuong.toString() + ' - ' + m.heSoLuong,
                                item: m,
                            };
                        });
                    }),
                    finalize(() => (this.isLoading = false))
                )
                .pipe(takeUntil(this.destroyed$))
                .subscribe();
        } else {
            this.listOfOption = [];
        }
    }

    loadKeHoachTuyenDungBanDuyet() {
        this.apiService
            .read(UrlConstant.API.HRM_TD_KE_HOACH_TUYEN_DUNG + '/DanhMuc', {
                pageSize: 0,
                pageNumber: 0,
                idTrangThaiDuyet: TrangThaiKeHoachEnum.BAN_DUYET,
                isFilterCoQuan: true,
            })
            .pipe(
                map(res => res.result),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                const items = res.items;
                this.listOfOption = items.map(m => {
                    return {
                        id: m.id,
                        text: `${m.maKeHoach} - ${m.tenKeHoach}`,
                    };
                });
            });
    }

    loadNganh() {
        this.apiService
            .read(UrlConstant.API.DM_NGANH_DAO_TAO + '/List', {
                isVisible: true,
                pageSize: 0,
                pageNumber: 0,
            })
            .pipe(
                map(res => res.result),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                const items = res.items;
                this.listOfOption = items.map(m => {
                    return {
                        id: m.id,
                        text: `${m.ma} - ${m.ten}`,
                    };
                });
            });
    }

    loadChuyenNganh() {
        this.apiService
            .read(UrlConstant.API.DM_CHUYEN_NGANH_DAO_TAO + '/List', {
                isVisible: true,
                pageSize: 0,
                pageNumber: 0,
                nganhId: this.referenceId != null ? [this.referenceId] : null,
            })
            .pipe(
                map(res => res.result),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                const items = res.items;
                this.listOfOption = items.map(m => {
                    return {
                        id: m.id,
                        text: `${m.ma} - ${m.ten}`,
                    };
                });
            });
    }

    loadLoaiHinhPhong() {
        this.apiService
            .post(
                UrlConstant.API.DM_LOAI_PHONG_TN + '/GetList',
                {
                    isVisible: true,
                    pageSize: 0,
                    pageNumber: 0,
                },
                true
            )
            .pipe(
                map(res => res.result),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                const items = res.items;
                this.listOfOption = items.map(m => {
                    return {
                        id: m.id,
                        text: `${m.ma} - ${m.ten}`,
                    };
                });
            });
    }

    loadPhongThiNghiem() {
        this.apiService
            .post(
                UrlConstant.API.PTN_READPHONGTHINGHIEM + '/GetDanhSachPhongThiNghiem',
                {
                    isVisible: true,
                    pageSize: 0,
                    pageNumber: 0,
                    sortCol: 'id',
                    isAsc: false,
                    permissionType: this.permissionType,
                },
                true
            )
            .pipe(
                map(res => res.result),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                const items = res.items;
                this.listOfOption = items.map(m => {
                    return {
                        id: m.id,
                        text: `${m.maPhongThiNghiem} - ${m.tenPhongThiNghiem}`,
                    };
                });
            });
    }

    loadNhomCongCu() {
        this.apiService
            .post(
                UrlConstant.API.DM_NHOM_CONG_CU + '/GetList',
                {
                    isVisible: true,
                    pageSize: 0,
                    pageNumber: 0,
                },
                true
            )
            .pipe(
                map(res => res.result),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                const items = res.items;
                this.listOfOption = items.map(m => {
                    return {
                        id: m.id,
                        text: `${m.ma} - ${m.ten}`,
                    };
                });
            });
    }

    loadCongCu() {
        this.apiService
            .post(
                UrlConstant.API.DM_CONG_CU + '/GetList',
                {
                    isVisible: true,
                    pageSize: 0,
                    pageNumber: 0,
                    idRef: this.referenceId != null ? this.referenceId : null,
                },
                true
            )
            .pipe(
                map(res => res.result),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                const items = res.items;
                this.listOfOption = items.map(m => {
                    return {
                        id: m.id,
                        text: `${m.ma} - ${m.ten}`,
                    };
                });
            });
    }

    loadTinhTrangSuDungThietBi() {
        this.apiService
            .post(
                UrlConstant.API.DM_TINH_TRANG_THIET_BI + '/GetList',
                {
                    isVisible: true,
                    pageSize: 0,
                    pageNumber: 0,
                },
                true
            )
            .pipe(
                map(res => res.result),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                const items = res.items;
                this.listOfOption = items.map(m => {
                    return {
                        id: m.id,
                        text: `${m.ma} - ${m.ten}`,
                    };
                });
            });
    }

    loadThietBi() {
        this.apiService
            .post(
                UrlConstant.API.PTN_THIETBI + '/GetDanhSachThietBi',
                {
                    isVisible: true,
                    pageSize: 0,
                    pageNumber: 0,
                    sortCol: 'id',
                    isAsc: false,
                },
                true
            )
            .pipe(
                map(res => res.result),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                const items = res.items;
                this.listOfOption = items.map(m => {
                    return {
                        id: m.id,
                        text: `${m.maThietBi} - ${m.tenThietBi}`,
                    };
                });
            });
    }

    loadThietBiTheoPhongThiNghiem() {
        this.apiService
            .post(
                UrlConstant.API.PTN_DANG_KY_SD_PTN + '/GetListThietBi',
                {
                    isVisible: true,
                    pageSize: 0,
                    pageNumber: 0,
                    sortCol: 'id',
                    isAsc: false,
                    idPhongThiNghiem: this.referenceId != null ? this.referenceId : null,
                },
                true
            )
            .pipe(
                map(res => res.result),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                const items = res.items;
                this.listOfOption = items.map(m => {
                    return {
                        id: m.id,
                        text: `${m.maThietBi} - ${m.tenThietBi}`,
                    };
                });
            });
    }

    loadTrangThaiDangKyPhong() {
        this.apiService
            .post(
                UrlConstant.API.DM_TRANG_THAI_DANG_KY_PTN + '/GetList',
                {
                    isVisible: true,
                    pageSize: 0,
                    pageNumber: 0,
                },
                true
            )
            .pipe(
                map(res => res.result),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                const items = res.items;
                this.listOfOption = items.map(m => {
                    return {
                        id: m.id,
                        text: `${m.ma} - ${m.ten}`,
                    };
                });
            });
    }

    loadDanhSachDangKy() {
        this.apiService
            .post(
                UrlConstant.API.PTN_READPHONGTHINGHIEM + '/GetDanhSachDangKy',
                {
                    isVisible: true,
                    pageSize: 0,
                    pageNumber: 0,
                    sortCol: 'id',
                    isAsc: false,
                    idsPhongThiNghiem: this.referenceId != null ? '' + this.referenceId : null,
                },
                true
            )
            .pipe(
                map(res => res.result),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                const items = res.items;
                this.listOfOption = items.map(m => {
                    return {
                        id: m.id,
                        text: `${m.maPhongThiNghiem} (${DateUtil.getFullDateTime(m.ngayBatDau)} - ${DateUtil.getFullDateTime(
                            m.ngayKetThuc
                        )})`,
                    };
                });
            });
    }

    loadDonViTinh() {
        this.apiService
            .post(
                UrlConstant.API.DM_DON_VI_TINH + '/GetList',
                {
                    isVisible: true,
                    pageSize: 0,
                    pageNumber: 0,
                },
                true
            )
            .pipe(
                map(res => res.result),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                const items = res.items;
                this.listOfOption = items.map(m => {
                    return {
                        id: m.id,
                        text: `${m.ma} - ${m.ten}`,
                    };
                });
            });
    }

    loadLoaiTieuHao() {
        this.listOfOption = [
            {
                id: 1,
                text: '01 - Theo giờ',
            },
            {
                id: 2,
                text: '02 - Theo lần sử dụng',
            },
        ];
    }

    loadHinhThucBaoTri() {
        this.listOfOption = [
            {
                id: 1,
                text: '01 - Bảo dưỡng',
            },
            {
                id: 2,
                text: '02 - Sữa chữa',
            },
        ];
    }

    loadTrangThaiMangRaNgoai() {
        this.listOfOption = [
            {
                id: 1,
                text: 'Chờ duyệt',
            },
            {
                id: 2,
                text: 'Duyệt',
            },
            {
                id: 3,
                text: 'Không duyệt',
            },
        ];
    }

    loadVaiTroDoiNguCanBo() {
        this.apiService
            .post(
                UrlConstant.API.DM_VAI_TRO_DNCB + '/GetList',
                {
                    isVisible: true,
                    pageSize: 0,
                    pageNumber: 0,
                },
                true
            )
            .pipe(
                map(res => res.result),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                const items = res.items;
                this.listOfOption = items.map(m => {
                    return {
                        id: m.id,
                        text: `${m.ma} - ${m.ten}`,
                    };
                });
            });
    }
    loadKyNangVanHanh() {
        this.apiService
            .post(
                UrlConstant.API.DM_KY_NANG_VAN_HANH + '/GetList',
                {
                    isVisible: true,
                    pageSize: 0,
                    pageNumber: 0,
                },
                true
            )
            .pipe(
                map(res => res.result),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                const items = res.items;
                this.listOfOption = items.map(m => {
                    return {
                        id: m.id,
                        text: `${m.ma} - ${m.ten}`,
                    };
                });
            });
    }
    // Đây là dữ liệu dựng (có API dựng sau)
    loadDeTaiKHCN() {
        this.listOfOption = [
            {
                id: 1,
                text: '01 - Đề tài 001',
            },
            {
                id: 2,
                text: '02 - Đề tài 002',
            },
            {
                id: 3,
                text: '03 - Đề tài 003',
            },
            {
                id: 4,
                text: '04 - Đề tài 004',
            },
        ];
    }

    loadDMLoaiHoiNghiHoiThao() {
        this.apiService
            .post(
                UrlConstant.API.DM_LOAI_HOI_THAO_HOI_NGHI + '/GetList',
                {
                    isVisible: true,
                    pageSize: 0,
                    pageNumber: 0,
                },
                true
            )
            .pipe(
                map(res => res.result),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                const items = res.items;
                this.listOfOption = items.map(m => {
                    return {
                        id: m.id,
                        text: `${m.ma} - ${m.ten}`,
                    };
                });
            });
    }
    loadDMLoaiBaoCao() {
        this.apiService
            .post(
                UrlConstant.API.DM_LOAI_BAO_CAO + '/GetList',
                {
                    isVisible: true,
                    pageSize: 0,
                    pageNumber: 0,
                },
                true
            )
            .pipe(
                map(res => res.result),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                const items = res.items;
                this.listOfOption = items.map(m => {
                    return {
                        id: m.id,
                        text: `${m.ma} - ${m.ten}`,
                    };
                });
            });
    }

    loadNgonNguKHCN() {
        this.listOfOption = [
            {
                id: 1,
                text: '01 - Tiếng việt',
            },
            {
                id: 2,
                text: '02 - Tiếng nước ngoài',
            },
        ];
    }

    loadTinhTrangDangKy() {
        this.apiService
            .post(
                UrlConstant.API.DM_TINH_TRANG_DANG_KY + '/GetList',
                {
                    isVisible: true,
                    pageSize: 0,
                    pageNumber: 0,
                },
                true
            )
            .pipe(
                map(res => res.result),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                const items = res.items;
                this.listOfOption = items.map(m => {
                    return {
                        id: m.id,
                        text: `${m.ma} - ${m.ten}`,
                    };
                });
            });
    }

    loadDMCapDo() {
        this.apiService
            .post(
                UrlConstant.API.DM_CAP_DO + '/GetList',
                {
                    isVisible: true,
                    pageSize: 0,
                    pageNumber: 0,
                },
                true
            )
            .pipe(
                map(res => res.result),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                const items = res.items;
                this.listOfOption = items.map(m => {
                    return {
                        id: m.id,
                        text: `${m.ma} - ${m.ten}`,
                    };
                });
            });
    }

    loadHinhThuc() {
        this.apiService
            .post(
                UrlConstant.API.DM_HINH_THUC + '/GetList',
                {
                    isVisible: true,
                    pageSize: 0,
                    pageNumber: 0,
                },
                true
            )
            .pipe(
                map(res => res.result),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                const items = res.items;
                this.listOfOption = items.map(m => {
                    return {
                        id: m.id,
                        text: `${m.ma} - ${m.ten}`,
                    };
                });
            });
    }

    loadTinhTrangSanPham() {
        this.apiService
            .post(
                UrlConstant.API.DM_TINH_TRANG_SAN_PHAM + '/GetList',
                {
                    isVisible: true,
                    pageSize: 0,
                    pageNumber: 0,
                },
                true
            )
            .pipe(
                map(res => res.result),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                const items = res.items;
                this.listOfOption = items.map(m => {
                    return {
                        id: m.id,
                        text: `${m.ma} - ${m.ten}`,
                    };
                });
            });
    }

    loadToChucCapBang() {
        this.apiService
            .post(
                UrlConstant.API.DM_TO_CHUC_CAP_BANG + '/GetList',
                {
                    isVisible: true,
                    pageSize: 0,
                    pageNumber: 0,
                },
                true
            )
            .pipe(
                map(res => res.result),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                const items = res.items;
                this.listOfOption = items.map(m => {
                    return {
                        id: m.id,
                        text: `${m.ma} - ${m.ten}`,
                    };
                });
            });
    }

    loadDMLoaiGiaiThuong() {
        this.apiService
            .post(
                UrlConstant.API.DM_LOAI_GIAI_THUONG + '/GetList',
                {
                    isVisible: true,
                    pageSize: 0,
                    pageNumber: 0,
                },
                true
            )
            .pipe(
                map(res => res.result),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                const items = res.items;
                this.listOfOption = items.map(m => {
                    return {
                        id: m.id,
                        text: `${m.ma} - ${m.ten}`,
                    };
                });
            });
    }

    loadDMThuHangGiaiThuong() {
        this.apiService
            .post(
                UrlConstant.API.DM_THU_HANG_GIAI_THUONG + '/GetList',
                {
                    isVisible: true,
                    pageSize: 0,
                    pageNumber: 0,
                },
                true
            )
            .pipe(
                map(res => res.result),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                const items = res.items;
                this.listOfOption = items.map(m => {
                    return {
                        id: m.id,
                        text: `${m.ma} - ${m.ten}`,
                    };
                });
            });
    }

    loadDMLoaiDuAn() {
        this.apiService
            .post(
                UrlConstant.API.DM_LOAI_DU_AN + '/GetList',
                {
                    isVisible: true,
                    pageSize: 0,
                    pageNumber: 0,
                },
                true
            )
            .pipe(
                map(res => res.result),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                const items = res.items;
                this.listOfOption = items.map(m => {
                    return {
                        id: m.id,
                        text: `${m.ma} - ${m.ten}`,
                    };
                });
            });
    }

    //Chờ API Phạm vi Bài Báo
    loadDMPhamViBaiBao() {
        this.listOfOption = [
            {
                id: 1,
                text: 'Quốc tế',
            },
            {
                id: 2,
                text: 'Trong nước',
            },
            {
                id: 3,
                text: 'ISI',
            },
            {
                id: 4,
                text: 'SCOPUS',
            },
        ];
    }

    loadTrangThaiKHCN() {
        this.apiService
            .post(
                UrlConstant.API.DM_TRANG_THAI_KHCN + '/GetList',
                {
                    isVisible: true,
                    pageSize: 0,
                    pageNumber: 0,
                },
                true
            )
            .pipe(
                map(res => res.result),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                const items = res.items;
                this.listOfOption = items.map(m => {
                    return {
                        id: m.id,
                        text: `${m.ma} - ${m.ten}`,
                    };
                });
            });
    }

    loadTapChiKHCN() {
        this.apiService
            .post(
                UrlConstant.API.DM_TAP_CHI_KHCN + '/GetList',
                {
                    isVisible: true,
                    pageSize: 0,
                    pageNumber: 0,
                },
                true
            )
            .pipe(
                map(res => res.result),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                const items = res.items;
                this.listOfOption = items.map(m => {
                    return {
                        id: m.id,
                        text: `${m.ma} - ${m.ten}`,
                    };
                });
            });
    }

    loadVaiTroKHCN() {
        this.apiService
            .post(
                UrlConstant.API.DM_VAI_TRO_KHCN + '/GetList',
                {
                    isVisible: true,
                    pageSize: 0,
                    pageNumber: 0,
                },
                true
            )
            .pipe(
                map(res => res.result),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                const items = res.items;
                this.listOfOption = items.map(m => {
                    return {
                        id: m.id,
                        text: `${m.ma} - ${m.ten}`,
                    };
                });
            });
    }

    loadNhomKetQuaDuKienKHCN() {
        this.apiService
            .post(
                UrlConstant.API.DM_NHOM_KET_QUA_DU_KIEN + '/GetList',
                {
                    isVisible: true,
                    pageSize: 0,
                    pageNumber: 0,
                },
                true
            )
            .pipe(
                map(res => res.result),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                const items = res.items;
                this.listOfOption = items.map(m => {
                    return {
                        id: m.id,
                        text: `${m.ma} - ${m.ten}`,
                    };
                });
            });
    }

    loadDMCapDoKHCN() {
        this.apiService
            .post(
                UrlConstant.API.DM_CAP_DO_KHCN + '/GetList',
                {
                    isVisible: true,
                    pageSize: 0,
                    pageNumber: 0,
                },
                true
            )
            .pipe(
                map(res => res.result),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                const items = res.items;
                this.listOfOption = items.map(m => {
                    return {
                        id: m.id,
                        text: `${m.ma} - ${m.ten}`,
                    };
                });
            });
    }

    loadDMLoaiKeHoachKHCN(){
        this.apiService
            .post(
                UrlConstant.API.DM_LOAI_KE_HOACH + '/GetList',
                {
                    isVisible: true,
                    pageSize: 0,
                    pageNumber: 0,
                },
                true
            )
            .pipe(
                map(res => res.result),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                const items = res.items;
                this.listOfOption = items.map(m => {
                    return {
                        id: m.id,
                        text: `${m.ma} - ${m.ten}`,
                    };
                });
            });
    }

    loadThongBaoKeHoachKHCN(){
        this.apiService
            .post(
                UrlConstant.API.LKH_KHCN_LAP_KE_HOACH_THONG_BAO + '/GetList',
                {
                    isVisible: true,
                    pageSize: 0,
                    pageNumber: 0,
                },
                true
            )
            .pipe(
                map(res => res.result),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                const items = res.items;
                this.listOfOption = items.map(m => {
                    return {
                        id: m.id,
                        text: `${m.ma} - ${m.ten}`,
                    };
                });
            });
    }
}
