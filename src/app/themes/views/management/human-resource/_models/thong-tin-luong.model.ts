export interface INhanSuThongTinLuong {
    id?: number;
    idNhanSu: number;
    idNhomNgach: number;
    idNgach: number;
    maNgach: string;
    idBacLuong: number;
    bacLuong: string;
    heSoLuong: string;
    vuotKhung: string;
    phuCapNgheNghiep: string;
    phuCapThamNien: string;
    phuCapChucVu: string;
    ngayBatDau: Date;
    ngayKetThuc: Date;
    ngayHuongHeSoLuong: Date;
    soQuyetDinh: string;
    idQuyetDinh: number;
    ngayTangLuongTiepTheo: Date;
    ghiChu: string;
    tenNgach: string;
    tenNhomNgach: string;
    tenBac: string;
    maQuyetDinh: string;

    compareData?: INhanSuThongTinLuong;
    idTrangThaiDuLieu?: number;
}
