
export interface ITinhTrangThietBi {
    id: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
    cssClass: string;
}
export interface ICongCu {
    id: number;
    ma: string;
    ten: string;
    stt?: number;
    isVisible?: boolean;
    idNhomCongCu?: number;
    ghiChu: string;
}

export interface INhomCongCu {
    id: number;
    ma: string;
    ten: string;
    stt?: number;
    isVisible?: boolean;
    ghiChu: string;
}

export interface ICapDo {
    id: number;
    ma: string;
    ten: string;
    stt?: number;
    isVisible?: boolean;
    ghiChu: string;
}

export interface ICapQuanLy {
    id: number;
    ma: string;
    ten: string;
    stt?: number;
    isVisible?: boolean;
    ghiChu: string;
}

export interface IDonViTinh {
    id: number;
    ma: string;
    ten: string;
    stt?: number;
    isVisible?: boolean;
    ghiChu: string;
}

export interface IKyNangVanHanh {
    id: number;
    ma: string;
    ten: string;
    stt?: number;
    isVisible?: boolean;
    ghiChu: string;
}
export interface ILoaiHinhPhong {
    id: number;
    ma: string;
    ten: string;
    stt?: number;
    isVisible?: boolean;
    ghiChu: string;
}
export interface IVaiTro {
    id: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
}
export interface ITrangThaiDangKyPhong {
    id: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
    cssClass: string;
}

export interface ILoaiBaoCao {
    id: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
}
export interface IHoiNghiHoiThao {
    id: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
}
export interface INhomKetQuaDuKien {
    id: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
}

export interface IHinhThuc{
    id: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
}

export interface ITinhTrangDangKy{
    id: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
}

export interface ITinhTrangSanPham{
    id: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
}
export interface ILoaiGiaiThuong{
    id: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
}
export interface IThuHangGiaiThuong{
    id: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
}
export interface ILoaiDuAn{
    id: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
}

export interface IVaiTroKHCN {
    id: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
}

export interface ITapChiKHCN {
    id: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
}

export interface IKetQuaDuKien {
    id: number;
    idNhomKetQuaDuKien: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
}

export interface IThanhVienNgoai {
    id: number;
    maThanhVien: string,
    hoDem: string,
    ten: string,
    donVi: string,
    trinhDoChuyenMon: string,
    chucDanh: string,
    stt: number,
    isVisible: boolean,
    ghiChu: string,
}

export interface ITrangThaiKHCN {
    id: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
    cssClass: string;
}
export interface ILoaiKeHoach{
    id: number;
    ma: string;
    ten: string;
    moTa: string;
    isVisible: boolean;
    ghiChu: string;
}