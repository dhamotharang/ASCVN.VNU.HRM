import { environment } from '@env/environment';

export const AppConstant = {
    VERSION: environment.version,
    SSO_LINK: arg =>
        `/auth/realms/vnu/protocol/openid-connect/auth?kc_locale=vi&scope=openid&response_type=code&client_id=hrm&redirect_uri=${arg}/oauth/callback`,
    SSO_LOGOUT: arg => `/auth/realms/vnu/protocol/openid-connect/logout?kc_locale=vi&redirect_uri=${arg}/login?kc_locale%3Dvi`,
    NO_AVATAR_URL: './assets/images/no-avatar.jpg',
    CURRENT_LANG: 'current_lang',
    TITLE: 'Thông báo',
    TYPE: {
        SUCCESS: 'success',
        DANGER: 'danger',
        WARNING: 'warning',
    },
};

export const FOLDER = {
    PDG_CongViec: 'PDG_CongViec',
    PDG_NhiemVu: 'PDG_NhiemVu',
    NS_NhanSu_ChiTiet: 'NS_NhanSu_ChiTiet',
    NS_NhanSu_TuyenDung: 'NS_NhanSu_TuyenDung',
    NS_NhanSu_TrinhDo: 'NS_NhanSu_TrinhDo',
    NS_NhanSu_TrinhDoChuyenMon: 'NS_NhanSu_TrinhDoChuyenMon',
    NS_NhanSu_DaoTaoBoiDuong: 'NS_NhanSu_DaoTaoBoiDuong',
    NS_NhanSu_TrinhDoNgoaiNgu: 'NS_NhanSu_TrinhDoNgoaiNgu',
    NS_NhanSu_TrinhDoTinHoc: 'NS_NhanSu_TrinhDoTinHoc',
    NS_NhanSu_ChucDanhKhoaHoc: 'NS_NhanSu_ChucDanhKhoaHoc',
    NS_NhanSu_DoanDang: 'NS_NhanSu_DoanDang',
    NS_NhanSu_QuaTrinhDoan: 'NS_NhanSu_QuaTrinhDoan',
    NS_NhanSu_QuaTrinhDang: 'NS_NhanSu_QuaTrinhDang',
    NS_NhanSu_QuaTrinhCongDoan: 'NS_NhanSu_QuaTrinhCongDoan',
    NS_NhanSu_KhenThuong: 'NS_NhanSu_KhenThuong',
    NS_NhanSu_KyLuat: 'NS_NhanSu_KyLuat',
    NS_NhanSu_DanhHieuThiDua: 'NS_NhanSu_DanhHieuThiDua',
    NS_NhanSu_SucKhoe: 'NS_NhanSu_SucKhoe',
    NS_NhanSu_QuaTrinhCongTac: 'NS_NhanSu_QuaTrinhCongTac',
    NS_NhanSu_KiemNhiem: 'NS_NhanSu_KiemNhiem',
    NS_NhanSu_QuanHeGiaDinh: 'NS_NhanSu_QuanHeGiaDinh',
    NS_NhanSu_Luong: 'NS_NhanSu_Luong',
    NS_HopDong: 'NS_HopDong',
    NS_BaoCao: 'NS_BaoCao',
    TS_BaoCaoCaNhan: 'TS_BaoCaoCaNhan',
    HINH_DAI_DIEN: 'NS_HinhNhanSu',
    FOLDER_FUNCTION: 'FolderFunc',
    TD_DINH_BIEN: 'TD_DinhBien',
    TD_HopDongTuyenDung: 'TD_HopDongTuyenDung',
    TD_QuyetDinhTuyenDung: 'TD_QuyetDinhTuyenDung',
    TS_PhanCongHuongDanTapSu: 'TS_PhanCongHuongDanTapSu',
    PTN_PHONG_THI_NGHIEM: 'PTN_PhongThiNghiems',
    KHCN_KHOA_HOC_CONG_NGHE: 'KHCN_KhoaHocCongNghes',
};

export const PageConfig = {
    buttonCount: 5,
    pageSizes: [10, 20, 50],
    previousNext: true,
};

export const ModalDeleteConfig = {
    title: 'Bạn có muốn xóa dòng này ?',
    content: '<b style="color: red;">Xác nhận xóa</b>',
    yes: 'Đồng ý',
    no: 'Không',
};

export const ReziseTable = 140;
