export interface INgoaiNgu {
    ngoaiNguId: number;
    ma: string;
    ten: string;
    stt?: number;
    isVisible?: boolean;
    ghiChu: string;
}

export interface IQuocGia {
    quocGiaId: number;
    ma: string;
    ten: string;
    stt?: number;
    isVisible?: boolean;
    ghiChu: string;
}

export interface ITinhThanh {
    tinhThanhId: number;
    ma: string;
    ten: string;
    stt?: number;
    isVisible: boolean;
    ghiChu: string;
}

export interface IQuanHuyen {
    quanHuyenId?: number;
    ma?: string;
    ten?: string;
    stt?: number;
    tinhThanhId?: number;
    isVisible?: boolean;
    ghiChu?: string;
}

export interface IPhuongXa {
    phuongXaId?: number;
    ma?: string;
    ten?: string;
    stt?: number;
    quanHuyenId?: number;
    tinhThanhId?: number;
    isVisible?: boolean;
    ghiChu?: string;
}

export interface ITrinhDoNgoaiNgu {
    trinhDoNgoaiNguId: number;
    ma: string;
    ten: string;
    stt?: number;
    isVisible?: boolean;
    ghiChu: string;
}

export interface IDanToc {
    danTocId: number;
    ma: string;
    ten: string;
    stt?: number;
    isVisible?: boolean;
    ghiChu: string;
}
export interface ITonGiao {
    tonGiaoId: number;
    ma: string;
    ten: string;
    stt?: number;
    isVisible?: boolean;
    ghiChu: string;
}
export interface ITrinhDoVanHoa {
    trinhDoVanHoaId: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
}
export interface ITrinhDoNhaNuoc {
    trinhDoNhaNuocId: number;
    ma: string;
    ten: string;
    stt?: number;
    isVisible?: boolean;
    ghiChu: string;
}
export interface ITrinhDoViTinh {
    trinhDoViTinhId: number;
    ma: string;
    ten: string;
    stt?: number;
    isVisible?: boolean;
    ghiChu: string;
}
export interface ITrinhDoChinhTri {
    trinhDoChinhTriId: number;
    ma: string;
    ten: string;
    stt?: number;
    isVisible?: boolean;
    ghiChu: string;
}

export interface IQuanHeGiaDinh {
    quanHeGiaDinhId: number;
    ma: string;
    ten: string;
    stt?: number;
    isVisible?: boolean;
    ghiChu: string;
}
export interface IDoiTuongChinhSach {
    doiTuongChinhSachId: number;
    ma: string;
    ten: string;
    stt?: number;
    isVisible?: boolean;
    ghiChu: string;
}
export interface IDoiTuongDanhGia {
    doiTuongDanhGiaId: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
}
export interface IDoiTuongThucHien {
    doiTuongThucHienId: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
    dsChucVuId: string;
}
export interface INhomHopDong {
    nhomHopDongId: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
}
export interface ILoaiHopDong {
    loaiHopDongId?: number;
    nhomHopDongId?: number;
    ma?: string;
    ten?: string;
    stt?: number;
    isVisible?: boolean;
    ghiChu?: string;
}
export interface IKhoiCoQuan {
    khoiCoQuanId: number;
    ma: string;
    ten: string;
    stt?: number;
    isVisible?: boolean;
    ghiChu: string;
}
export interface ICoQuan {
    coQuanId?: number;
    ma?: string;
    ten?: string;
    stt?: number;
    isVisible?: boolean;
    ghiChu?: string;
    coQuanTrucThuocId?: number;
    khoiCoQuanId?: number;
    nhanSuDaiDienId?: number;
    tenVietTat?: string;
    diaChi?: string;
    soDienThoai?: string;
    soFax?: string;
    emailLienHe?: string;
    capDonVi?: number;
}
export interface IHocVi {
    hocViId: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
}
export interface IKhenThuong {
    khenThuongId: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
    idLoaiKhenThuong: number;
}
export interface IQuyetDinh {
    id: number;
    idCoQuanQuanLy: number;
    soQuyetDinh: string;
    ngayQuyetDinh: Date;
    ngayHieuLuc: Date;
    ngayKy: Date;
    idLoaiQuyetDinh: number; 
}
export interface IKetQuaDanhGia {
    ketQuaDanhGiaId: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
}
export interface IKyLuat {
    kyLuatId: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
}
export interface ITinhTrangHonNhan {
    tinhTrangHonNhanId: number;
    ma: string;
    ten: string;
    stt?: number;
    isVisible?: boolean;
    ghiChu: string;
}
export interface ITinhTrangSucKhoe {
    id: number;
    ma: string;
    ten: string;
    stt?: number;
    isVisible?: boolean;
    ghiChu: string;
}
export interface ITrinhDoChuyenMon {
    trinhDoChuyenMonId: number;
    ma: string;
    ten: string;
    stt?: number;
    isVisible?: boolean;
    ghiChu: string;
}

export interface INhomViecLam {
    nhomViTriViecLamId: number;
    ma: string;
    ten: string;
    stt?: number;
    isVisible?: boolean;
    ghiChu: string;
}

export interface IViTriViecLam {
    viTriViecLamId?: number;
    ma?: string;
    ten?: string;
    stt?: number;
    isVisible?: boolean;
    ghiChu?: string;
    nhomViTriViecLamId?: number;
    ngachCongChucToiThieuId?: number;
}

export interface INhomMau {
    nhomMauId: number;
    ma: string;
    ten: string;
    stt?: number;
    isVisible?: boolean;
    ghiChu: string;
}
export interface IChucVu {
    chucVuId: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
}
export interface IGioiTinh {
    gioiTinhId: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
}
export interface IVanBang {
    id: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
}
export interface IChungChi {
    id: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
}
export interface IHinhThucTraLoi {
    hinhThucTraLoiId: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
}

export interface IDanhHieu {
    danhHieuId: number;
    idLoaiDanhHieu: number;
    ma: string;
    ten: string;
    stt?: number;
    isVisible?: boolean;
    ghiChu: string;
}

export interface INhomNgach {
    nhomNgachId: number;
    ma: string;
    ten: string;
    stt?: number;
    isVisible?: boolean;
    ghiChu: string;
}

export interface INgachCongChuc {
    ngachCongChucId?: number;
    ma?: string;
    ten?: string;
    stt?: number;
    isVisible?: boolean;
    ghiChu?: string;
    nhomNgachId?: number;
    thoiHanNangLuong: number;
}

export interface IChucDanhKhoaHoc {
    chucDanhKhoaHocId: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
    idNhomNgach?: number;
    thoiHanNangLuong?: number;
}
export interface IBacLuong {
    bacLuongId: number;
    nhomNgachId?: number;
    bacLuong: number;
    heSoLuong: number;
    isVisible?: boolean;
    ghiChu: string;
    isVuotKhung: boolean;
    phanTramVuotKhung: number;
}

export interface ITrangThaiTienDo {
    trangThaiTienDoId: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
}

export interface IMucDoHoanThanh {
    mucDoHoanThanhId: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
}

export interface IXepLoaiKetQuaDanhGia {
    xepLoaiKetQuaDanhGiaId: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
}

export interface ILoaiNhanSuDanhGia {
    loaiNhanSuDanhGiaId: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
}

export interface IChucDanh {
    chucDanhId: number;
    id: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
}

export interface ITapChi {
    id: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
}

export interface IHoiNghi {
    id: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
}

export interface ILinhVuc {
    id: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
}

export interface ICapQuyetDinh {
    id: number;
    chucDanhId: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
}

export interface IChucVuDoan {
    id: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
}

export interface IChucVuDang {
    id: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
}

export interface IChucVuCongDoan {
    id: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
}

export interface IChucVuCuuChienBinh {
    id: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
}

export interface ILoaiThuongBinh {
    id: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
}

export interface IKyNangNgoaiNgu {
    kyNangNgoaiNguId: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
}

export interface IHinhThucDaoTao {
    id: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
}
export interface ITrangThaiDuyetKeHoach {
    id: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
}
export interface IQuanHam {
    id: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
}

export interface INguonTuyenDung {
    id: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    diaChi: string;
    soDienThoai: string;
    soFax: string;
    emailLienHe: string;
    website: string;
    ghiChu: string;
}

export interface IKeHoachTuyenDung {
    id: number;
    idCoQuan: number;
    nam: number;
    maKeHoach: string;
    tenKeHoach: string;
    ngayBatDau: Date;
    ngayKetThuc: Date;
    tomTatMonThi: string;
    nguonTuyenDung: string;
    hoiDongThamGia: string;
    ghiChu: string;
}

export interface ILoaiNhanSu {
    id: number;
    loaiNhanSuId: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
}
export interface INganh {
    id: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
}
export interface IChuyenNganh {
    id?: number;
    nganhId: number;
    ma: string;
    ten: string;
    stt?: number;
    isVisible?: boolean;
    ghiChu?: string;
}
export interface IKhoanPhuCap {
    id?: number;
    soTien: number;
    ma: string;
    ten: string;
    stt?: number;
    isVisible?: boolean;
    ghiChu?: string;
}

export interface IThanhPhanGiaDinh {
    id: number;
    ma: string;
    ten: string;
    stt: 0;
    isVisible: boolean;
    ghiChu: string;
}
