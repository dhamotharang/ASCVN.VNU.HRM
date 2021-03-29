export interface IPhongThiNghiem {
    id: number;
    idCoQuan: number;
    tenCoQuan: string;
    idLoaiHinhPhong: number;
    maPhongThiNghiem: string;
    tenPhongThiNghiem: string;
    moTa: string;
    chungChi: string;
    tuCachPhapNhan: string;
    soTaiKhoan: string;
    chuTaiKhoan: string;
    nganHang: string;
    diaChi: string;
    soDienThoai: string;
    stt: number;
    idFileDinhKem: number;
    isVisible: true;
    ghiChu: string;
    tenPhongThiNghiem_EN: string;
    tenVietTat: string;
    namThanhLap: number;
    soQuyetDinhThanhLap: string;
    noiDungQuyetDinhThanhLap: string;
    mucTieu: string;
    idCapDo: number;
    idCapQuanLy: number;
    nganhs: [];
}

export interface IDangKySuDungPhong {
    id: number;
    idPhongThiNghiem: number;
    idNhanSu: number;
    idCoQuanNhanSu: number;
    ngayBatDau: Date;
    ngayKetThuc: Date;
    mucTieu: string;
    nangLucSuDung: string;
    soNguoiThamGia: number;
    idTrangThaiDangKy: number;
    idFileDinhKem: number;
    ghiChu: string;
    dangKySuDung_ThietBis: []
}

export interface IChuyenNganh {
    id: number;
    idPhongThiNghiem?: number;
    maChuyenNganh: string;
    tenChuyenNganh: string;
}

export interface INganh {
    id: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
    chuyenNganhs: [];
}

export interface IDangKySuDungThietBi {
    id: number;
    idDangKySuDung: number;
    idThietBi: number;
    maThietBi: string;
    tenThietBi: string;
    mucTieuHao: number;
    dieuKienVanHanh: string;
    ghiChu: string;
}

export interface INhatKySuDungPhong {
    id: number;
    idDangKySuDung: number;
    ngayBatDau: Date;
    ngayKetThuc: Date;
    ketQuaSuDung: string;
    chatThai: string;
    vanDeAnToan: string;
    kienNghi: string;
    ghiChu: string;
    idNguoiSuDung: number;
    mucDichSuDung: string;
    soNguoiThamGia: number;
    dangKySuDung_ThietBis: [];
}

export interface INhatKySuDungPhongChiTiet {
    id: number;
    idDangKySuDung_NhatKySuDung: number;
    idThietBi: number;
    idTinhTrangThietBiTruocSD: number;
    idTinhTrangThietBiSauSD: number;
    mucTieuHao: 0;
    ghiChu: string;
    tenThietBi: string;
    maThietBi: string;
}
export interface IThietBi {
    id: number;
    idCongCu: number;
    idCoQuan: number;
    idTinhTrangThietBi: number;
    maThietBi: string;
    nguyenGia: number;
    khauHao: number;
    giaTriConLai: number;
    isVisible: boolean;
    moTa: string;
    nhaCungCap: string;
    ghiChu: string;
    idPhongThiNghiem: number;
    tenThietBi: string;
    idQuocGia: number;
    thongTinKyThuat: string;
    dieuKienVanHanh: string;
    namSuDung: number;
    soNamSuDung: number;
    tyLeKhauHao: number;
    ngayBatDauTinhKhauHao: Date;
    tenDonVi: string;
}

export interface IDinhMucTieuHao {
    id: number;
    tenThietBi: string;
    maThietBi: string;
    tenVatTu: string;
    donViTinh: string;
    tenLoaiTieuHao: string;
    idThietBi: number;
    idVatTu: number;
    idDonViTinh: number;
    tieuHao: number;
    loaiTieuHao: number;
    ghiChu: string;
}

export interface ITinhTrangThietBi {
    id: number;
    ma: string;
    ten: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
    cssClass: string;
}

export interface IThietBiPhuThuoc {
    id: number;
    idThietBiParent: number;
    idThietBi: number;
    ghiChu: string;
    maThietBi: string;
    tenThietBi: string;
    maThietBiParent: string;
    tenThietBiParent: string;
}

export interface IHuongDanSuDung {
    id: number;
    idThietBi: number;
    tieuDe: string;
    stt: number;
    ghiChu: string;
}

export interface IBaoHanhBaoTri {
    id: number;
    idThietBi: number;
    ngayThucHien: Date;
    idNguoiThucHien: number;
    idTinhTrangThietBi: number;
    hinhThuc: number;
    noiDungThucHien: string;
    ghiChu: string;
}

export interface IMangRaNgoai {
    id: number;
    idThietBi: number;
    ngayThucHien: Date;
    idNguoiDangKy: number;
    lyDo: string;
    idTrangThaiMangRaNgoai: number;
    idNguoiDuyet: number;
    ngayDuyet: Date;
    lyDoDuyet: string;
    ghiChu: string;
}

export interface ITheoDoiTrangThai {
    id: number;
    maThietBi: string;
    tenThietBi: string;
    tenPhongThiNghiem: string;
    ngayBatDau: Date;
    ngayKetThuc: Date;
    tuGio: string;
    denGio: string;
    tenCoQuan: string;
    tenTrangThai: string;
    isFullDay: boolean;
}

export interface INhatKySuDungPhongChiTiet {
    id: number;
    idDangKySuDung_NhatKySuDung: number;
    idThietBi: number;
    idTinhTrangThietBiTruocSD: number;
    idTinhTrangThietBiSauSD: number;
    mucTieuHao: 0;
    ghiChu: string;
}

export interface IDoiNguCanBo {
    id: number;
    idPhongThiNghiem: number;
    idNhanSu: number;
    idNganh: number;
    idChuyenNganh: number;
    khoaHocDaoTao: string;
    vanHanhThietBi: string;
    kinhNghiemVanHanh: string;
    chungChi: string;
    idKyNangVanHanh: number;
    isVisible: boolean;
    ghiChu: string;
    idVaiTro: number;
    isCoHuu: true;
    maNhanSu: string;
    hoDem: string;
    ten: string;
    tenGioiTinh: string;
    tenTrinhDo: string;
    ngaySinh: Date;
    tenCoQuan: string;
    tenKyNangVanHanh: string;
    tenVaiTro: string;
}

export interface IScheduler {
    id: number;
    start: Date;
    end: Date;
    title: string;
    isAllDay: boolean;
}

export interface ISanPhamKHCN {
    id: number;
    idPhongThiNghiem: number;
    tenPhongThiNghiem: string;
    maSanPham: string;
    tenSanPham: string;
    tenTacGia: string;
    moTa: string;
    namHoanThanh: number;
    isChuyenGiao: boolean;
    idCoQuanNhanChuyenGiao: number;
    tenDonNhanChuyenGiao: string;
    donNhanChuyenGiaoKhac: string;
    isVisible: boolean;
    ghiChu: string;
}
export interface ILichSuDuyetDangKy {
    id: number;
    idTrangThaiDangKy: number;
    idDangKySuDung: number;
    ngayDuyet: Date;
    tenTrangThai: string;
    idNguoiDuyet: number;
    nguoiDuyet: string;
    tenFile: string;
    type: number;
    size: number;
    path: string;
    forWeb: boolean;
    checkSum: string;
    guidIdFileDinhKem: string;
}
export interface IPhanQuyenPhuTrach {
    id: number;
    idNhanSu: number;
    idPhongThiNghiem: number;
    tuNgay: Date;
    denNgay: Date;
    ghiChu: string;
    maNhanSu: string;
    tenNhanSu: string;
    tenPhongThiNghiem: string;
}

export interface IChonNhanSu {
    chucDanhId: number;
    chucVuId: number;
    coQuanId: number;
    doiTuongDanhGiaId: number;
    email: string;
    emailNoiBo: string;
    ghiChu: string;
    gioiTinhId: number;
    hoDem: string;
    isVisible: boolean;
    loaiHopDongId: number;
    loaiNhanSuId: number;
    maNhanSu: string;
    ngaySinh: string;
    nhanSuId: number;
    soDienThoai: string;
    stt: number;
    ten: string;
    tenChucDanh: string;
    tenChucVu: string;
    tenCoQuan: string;
    tenDoiTuongDanhGia: string;
    tenGioiTinh: string;
    tenGoiKhac: string;
    tenLoaiHopDong: string;
    trangThaiNhanSuId: number;
    userId: number;
    userName: string;
    hoTenNhanSu: string;
    idVaiTro: number /* Sử dụng cho module Khoa học côn nghệ */;

    idNhanSu?: number /* Do api trả về nên tạo map về nhanSuId */;
}

export interface ICoQuanByNhanSu {
    id: number;
    ten: string;
    idCoQuanCap1: number;
    tenCoQuanCap1: string;
    tenDonViTrucThuoc: string;
}
export interface INhomNghienCuu {
    id: number;
    idPhongThiNghiem: number;
    maNhomNghienCuu: string;
    tenNhomNghienCuu: string;
    tenNhomTruong: string;
    namCongNhan: number;
    isVisible: boolean;
    moTa: string;
    ghiChu: string;
}
export interface IHopDongKhaiThac {
    id: number;
    idPhongThiNghiem: number;
    tenHopDongKhaiThac: string;
    soHopDongKhaiThac: string;
    tenDoiTac: string;
    thoiGianThucHien: Date;
    tongKinhPhi: number;
    isVisible: boolean;
    moTa: string;
    ghiChu: string;
}

export interface IThuHutNhaKhoaHoc {
    id: number;
    idPhongThiNghiem: number;
    hoTen: string;
    idQuocTich: number;
    chucVuNghienCuu: string;
    donViDoiTac: string;
    isVisible: boolean;
    moTa: string;
    ghiChu: string;
}

export interface IDangKySoHuuTriTue {
    id: number;
    idPhongThiNghiem: number;
    maSoHuuTriTue: string;
    tenSoHuuTriTue: string;
    tenTacGia: string;
    tinhTrang: string;
    moTa: string;
    namDangKy: number;
    thietBiSuDung: string;
    isVisible: boolean;
    ghiChu: string;
}
