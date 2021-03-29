export interface INhanSuThongTinTuyenDung {
    id?: number;
    idNhanSu: number;
    idNguonTuyenDung: number;
    idNguoiTuyenDung: number;
    ngheNghiepTuyenDung: string;
    coQuanTuyenDung: string;
    ngayTuyenDung: Date;
    ngayNhanViec: Date;
    congViecDuocGiao: string;
    soTruongCongTac: string;
    ngayBatDauNN: Date;
    ngayBatDauDHQG: Date;
    ghiChu: string;
    tenNguonTuyenDung: string;
    maNhanSu: string;
    hoTenNguoiTuyen: string;
    hinhThucTraLuong?: number;
    idNhomViTriViecLam: number;
    tenNhomViTriViecLam: string;
    idViTriViecLam: number;
    tenViTriViecLam: string;
    idKeHoachTuyenDung: number;
    tenKeHoachTuyenDung: string;
    namVaoNganhGiaoDuc: number;
    viecLamLauNhat: string;

    compareData?: INhanSuThongTinTuyenDung;
    idTrangThaiDuLieu?: number;
}
