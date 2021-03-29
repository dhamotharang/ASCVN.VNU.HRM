export enum SysLoaiDoiTuongEnum {
    NHAN_SU_HRM = 1,
    SINH_VIEN = 2,
    NGOAI_HE_THONG = 3,
}

export const SysLoaiDoiTuongDescription = {
    [SysLoaiDoiTuongEnum.NHAN_SU_HRM]: 'Nhân sự HRM',
    [SysLoaiDoiTuongEnum.SINH_VIEN]: 'Sinh viên',
    [SysLoaiDoiTuongEnum.NGOAI_HE_THONG]: 'Ngoài hệ thống',
};

export enum LoaiNhanSuDanhGiaEnum {
    NHAN_VIEN = 1,
    TRUONG_KHOA_PHONG = 2,
    PHO_HIEU_TRUONG = 3,
    HIEU_TRUONG = 4,
    NHAN_VIEN_CO_QUAN = 5,
    TRUONG_CO_QUAN = 6,
    PHO_GD_CO_QUAN = 7,
}

export const LoaiNhanSuDanhGiaDescription = {
    [LoaiNhanSuDanhGiaEnum.NHAN_VIEN]: 'Nhân viên',
    [LoaiNhanSuDanhGiaEnum.TRUONG_KHOA_PHONG]: 'Trưởng Khoa, Trưởng phòng',
    [LoaiNhanSuDanhGiaEnum.PHO_HIEU_TRUONG]: 'Phó hiệu trưởng',
    [LoaiNhanSuDanhGiaEnum.HIEU_TRUONG]: 'Hiệu trưởng',
    [LoaiNhanSuDanhGiaEnum.NHAN_VIEN_CO_QUAN]: 'Nhân viên Cơ quan',
    [LoaiNhanSuDanhGiaEnum.TRUONG_CO_QUAN]: 'Trưởng Cơ quan',
    [LoaiNhanSuDanhGiaEnum.PHO_GD_CO_QUAN]: 'Phó giám đốc',
};

export enum TrangThaiDuLieuEnum {
    SU_DUNG_CHINH = 1,
    DE_XUAT = 2,
    CHO_CAP_NHAT = 3,
    KHONG_DUYET = 4,
    SU_DUNG_PHU = 5,
    KHONG_SU_DUNG = 6,
}

export const TrangThaiDuLieuDescription = {
    [TrangThaiDuLieuEnum.SU_DUNG_CHINH]: 'Đã duyệt',
    [TrangThaiDuLieuEnum.DE_XUAT]: 'Đề xuất',
    [TrangThaiDuLieuEnum.CHO_CAP_NHAT]: 'Chờ cập nhật',
    [TrangThaiDuLieuEnum.KHONG_DUYET]: 'Không duyệt',
    [TrangThaiDuLieuEnum.SU_DUNG_PHU]: 'Đã duyệt', // (tùy theo quy trình áp dụng)
    [TrangThaiDuLieuEnum.KHONG_SU_DUNG]: 'Không sử dụng',
};

export enum HinhThucTraLuongEnum {
    CAP_LUONG = 1,
    TU_TRA = 2,
}

export enum DuLieuNhanSuEnum {
    SU_DUNG_CHINH = 1,
    DE_XUAT = 2,
}

export const HinhThuTraLuongDescription = {
    [HinhThucTraLuongEnum.CAP_LUONG]: 'Cấp lương',
    [HinhThucTraLuongEnum.TU_TRA]: 'Tự trả',
};

export const HRM_URL = {
    LY_LICH_NHAN_SU: 'ly-lich-nhan-su',
    HO_SO_CA_NHAN: 'ho-so-ca-nhan',
    DUYET_HO_SO_CA_NHAN: 'duyet-ho-so-ca-nhan',
    HO_SO_UNG_VIEN: 'ho-so-ung-vien',
    ///
    TRA_CUU_NHAN_SU: 'tra-cuu-nhan-su',
};

export const HRM_KEY = {
    ThiDuaKhenThuong: 'ThiDuaKhenThuong',
    ThongTinNhanSu: 'ThongTinNhanSu',
    ThongTinTuyenDung: 'ThongTinTuyenDung',
    TrinhDoChuyenMon: 'TrinhDoChuyenMon',
    DaoTaoBoiDuongDaiHan: 'DaoTaoBoiDuongDaiHan',
    DaoTaoBoiDuongNganHan: 'DaoTaoBoiDuongNganHan',
    TrinhDoNgoaiNgu: 'TrinhDoNgoaiNgu',
    TrinhDoTinHoc: 'TrinhDoTinHoc',
    ChucDanhKhoaHoc: 'ChucDanhKhoaHoc',
    ThongTinDoanDang: 'ThongTinDoanDang',
    QuaTrinhDoan: 'QuaTrinhDoan',
    QuaTrinhDang: 'QuaTrinhDang',
    QuaTrinhCongDoan: 'QuaTrinhCongDoan',
    ThongTinLuong: 'ThongTinLuong',
    KhenThuong: 'KhenThuong',
    KyLuat: 'KyLuat',
    TinhTrangSucKhoe: 'TinhTrangSucKhoe',
    QuaTrinhCongTac: 'QuaTrinhCongTac',
    KiemNhiem: 'KiemNhiem',
    QuanHeGiaDinhCaNhan: 'QuanHeGiaDinhCaNhan',
    QuanHeGiaDinhVoChong: 'QuanHeGiaDinhVoChong',
    HoanCanhKinhTe: 'HoanCanhKinhTe',
    LichSuCaNhan: 'LichSuCaNhan',
};

export const KEY_STORE_HRM = {
    XAC_THUC_NHAN_SU: 'keysearchXacThucNhanSu',
    TRA_CUU_NHAN_SU: 'keysearchTraCuuNhanSu',
    DUYET_HO_SO: 'keysearchDuyetHoSo',
};
