export interface IBangSoHuuTriTue {
    id: number;
    tenVanBang: string;
    idLinhVuc: number;
    noiDungVanBang: string;
    soKyMaHieu: string;
    noiCap: string;
    namXuatBan: number;
    ngayCapBang: Date;
    ghiChu: string;
    tenLinhVuc: string;
}
export interface ICongTrinhKhoaHoc {
    id: number;
    congTrinh: string;
    idLinhVuc: number;
    tacGia: string;
    idTapChi: number;
    idHoiNghi: number;
    namXuatBan: number;
    trangSo: string;
    volume: string;
    ghiChu: string;
    tenLinhVuc: string;
    tenTapChi: string;
    tenHoiNghi: string;
}
export interface ISachGiaoTrinh {
    id: number;
    tacGia: string;
    sach: string;
    giaoTrinh: string;
    nhaXuatBan: string;
    namXuatBan: number;
    idLinhVuc: number;
    tenLinhVuc: string;
    ghiChu: string;
}
export interface ISanPhamUngDung {
    id: number;
    sanPham: string;
    idLinhVuc: number;
    thoiGian: Date;
    hinhThuc: string;
    quyMo: string;
    diaChiApDung: string;
    congDung: string;
    noiUngDung: number;
    ghiChu: string;
    tenLinhVucNghienCuu: string;
}
export interface IGiaiThuongKhcn {
    id: number;
    hinhThucVaNoiDung: string;
    idLinhVuc: number;
    sanPham: string;
    noiDungGiaiThuong: string;
    toChuc: string;
    namTangThuong: number;
    ghiChu: string;
    tenLinhVuc: string;
}
export interface IThamGiaDaoTaoSdh {
    id: number;
    hoTen: string;
    idLinhVuc: number;
    tenLuanAn: string;
    idVaiTroHuongDan: number;
    coQuanCongTac: string;
    thoiGianBatDau: Date;
    thoiGianKetThuc: Date;
    isDaBaoVeThanhCong: boolean;
    isNghienCuuSinh: boolean;
    ghiChu: string;
    tenLinhVuc: string;
}
export interface IDeTaiKhcn {
    id: number;
    tenNhiemVuMaSo: string;
    idLinhVuc: number;
    thoiGianBatDau: Date;
    thoiGianKetThuc: Date;
    coQuanQuanLyNhiemVu: string;
    idTinhTrangNhiemVu: number;
    ghiChu: string;
    isChuTri: boolean;
    tenLinhVuc: string;
    maDeTai: string;
    maVaiTro: string;
    maDanhGiaXepLoai: string;
    sanPham: string;
    isTieuBieu: boolean;
}
