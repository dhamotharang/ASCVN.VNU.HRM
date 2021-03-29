export interface IKeHoachTuyenDung {
    id: number;
    nam: number;
    maKeHoach: string;
    tenKeHoach: string;
    ngayBatDau: Date;
    ngayKetThuc: Date;
    tomTatMonThi: string;
    nguonTuyenDung: string;
    hoiDongThamGia: string;
    ghiChu: string;
    idCoQuan: number;
    idTrangThaiDuyet: number;
    capDuyet: number;
    keHoachTuyenDungTieuChuans: IKeHoachTuyenDungTieuChuan[];
    tienDos: any[];
    deXuats: any[];
    soLuongDaNhap: number;
    tenNguoiDeXuat: string;
    idNguoiDeXuat: number;
    ngayDeXuat: Date;
    noiDungDeXuat: string;
    donViTenNguoiDuyet: string;
    donViIdNguoiDuyet: number;
    donViNgayDuyet: Date;
    donViNoiDung: string;
    dhqgTenNguoiDuyet: number;
    dhqgIdNguoiDuyet: number;
    dhqgNgayDuyet: Date;
    dhqgNoiDung: string;

    tabIndex: number;
}

export interface IKeHoachTuyenDungTieuChuan {
    id: number;
    idTieuChuanTuyenDung: number;
    tenYeuCau: string;
    yeuCau: string;
    ghiChu: string;
}

export interface IKeHoachTuyenDungChiTiet {
    id: number;
    idKeHoachTuyenDung: number;
    noiDungCongViec: string;
    ngayBatDau: any;
    ngayKetThuc: any;
    ghiChu: string;
}

export interface IKeHoachDeXuat {
    id: number;
    idkhtdDeXuat: number;
    idKeHoachTuyenDung: number;
    tenNhomViTriViecLam: string;
    idViTriViecLam: number;
    tenViTriViecLam: string;
    hienTaiCapLuong: number;
    hienTaiTuTra: number;
    deXuatNgayGui: Date;
    donViCapLuong: number;
    donViTuTra: number;
    donViIDNguoiDuyet: number;
    donViNgayDuyet: Date;
    donViLyDoDuyet: string;
    donViNgayGui: Date;
    donViIDTrangThaiDuyet: number;
    capLuong: number;
    tuTra: number;
    idNguoiDuyet: number;
    ngayDuyet: Date;
    lyDoDuyet: string;
    idTrangThaiDuyet: number;
    ngayBatDau: Date;
    ngayKetThuc: Date;
    ghiChu: string;
}

export interface INhanSuDeXuat {
    ghiChu: string;
    hinhThucTraLuong: number;
    hoDem: string;
    id: number;
    idChucVu: number;
    idGioiTinh: number;
    idLoaiNhanSu: number;
    idNgach: number;
    isCapTaiKhoanVNU: boolean;
    maNhanSu: string;
    ngayDeXuat: Date;
    ngayDuyet: Date;
    ngaySinh: Date;
    nguoiDuyet: string;
    soLuongDuyet: string;
    ten: string;
    tenChucVu: string;
    tenCoQuan: string;
    tenGioiTinh: string;
    tenKeHoach: string;
    tenLoaiNhanSu: string;
    tenNgachCongChuc: string;
    tenViTriViecLam: string;
    trangThai: number;
    userName: string;
    soCMND: string;
}
