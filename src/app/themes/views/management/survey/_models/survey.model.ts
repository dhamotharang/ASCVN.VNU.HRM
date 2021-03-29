import { DateBodyRow } from 'ng-zorro-antd/date-picker/lib/interface';

export interface IDotDanhGia {
    dotDanhGiaId: number;
    nam: number;
    namTemp: Date;
    quy: number;
    tenDotDanhGia: string;
    phieuDanhGiaId: number;
    doiTuongDanhGiaId: number;
    tuNgay: Date;
    denNgay: Date;
    stt: number;
    isVisible: boolean;
    isKichHoat: boolean;
    dotDanhGiaChiTiets: IDotDanhGiaChiTiet[];
    ghiChu: string;
}

export interface IDotDanhGiaChiTiet {
    ten: string;
    phieuDanhGiaId: number;
    dotDanhGiaChiTietId: number;
    doiTuongDanhGiaId: number;
    stt: number;
    maPhieu: string;
    tenPhieu: string;
    ghiChu: string;
}

export interface IPhieuDanhGia {
    phieuDanhGiaId: number;
    maPhieu: string;
    tenPhieu: string;
    stt?: number;
    ghiChuDauTrang: string;
    ghiChuCuoiTrang: string;
    isVisible: boolean;
    ghiChu: string;
    nhomCauHois: INhomCauHoi[];
}

export interface INhomCauHoi {
    cauHoiId: number;
    noiDung: string;
    doiTuongThucHienId: number;
    hinhThucTraLoiId: number;
    stt?: number;
    ghiChu: string;
    isDeleted: boolean;
    cauHois?: ICauHoi[];
    tieuChiDanhGia: string;
}

export interface ICauHoi {
    cauHoiId: number;
    noiDung: string;
    hinhThucTraLoiId: number;
    stt?: number;
    ghiChu: string;
    isDeleted: boolean;
    // bổ sung
    noiDungCauHoi?: string;
    tieuChiDanhGia: string;
}

export interface IPhieuTuDanhGia {
    nhanSuDanhGiaChiTietId: number;
    tenPhieu: string;
    maPhieu: string;
    phieuDanhGiaId: number;
    dotDanhGiaId: number;
    dotDanhGiaChiTietId: number;
    doiTuongDanhGiaId: number;
    tenDoiTuongDanhGia: string;
    tenDotDanhGia: string;
    nhanSuId: number;
    coQuanId: number;
    nam: number;
    quy: number;
    tuNgay?: Date;
    denNgay?: Date;
    typePhieu: number;

    chucDanh1Id?: number;
    tenChucDanh1?: number;
    chucVu1Id?: number;
    tenChucVu1?: number;
    coQuan1Id: number;
    tenCoQuan1: string;
    nhanSuDanhGia1Id: number;
    tenNhanSuDanhGia1: string;
    ngayDanhGia1: Date;
    xepLoai1Id: number;
    tenXepLoai1: string;
    isDanhGia1: boolean;

    chucDanh2Id?: number;
    tenChucDanh2?: number;
    chucVu2Id: number;
    tenChucVu2: string;
    coQuan2Id: number;
    tenCoQuan2: string;
    nhanSuDanhGia2Id: number;
    xepLoaiKetQuaDanhGia2Id: number;
    tenNhanSuDanhGia2: string;
    ngayDanhGia2: Date;
    xepLoai2Id?: number;
    tenXepLoai2?: number;
    isDanhGia2: boolean;

    chucDanh3Id?: number;
    tenChucDanh3?: number;
    chucVu3Id?: number;
    tenChucVu3?: number;
    coQuan3Id?: number;
    tenCoQuan3?: number;
    ngayDanhGia3?: number;
    nhanSuDanhGia3Id?: number;
    tenNhanSuDanhGia3?: number;
    xepLoai3Id?: number;
    tenXepLoai3?: number;
    isDanhGia3: boolean;

    chucDanh4Id?: number;
    tenChucDanh4?: number;
    chucVu4Id?: number;
    tenChucVu4?: number;
    coQuan4Id?: number;
    tenCoQuan4?: number;
    ngayDanhGia4?: number;
    nhanSuDanhGia4Id?: number;
    tenNhanSuDanhGia4?: number;
    xepLoai4Id?: number;
    tenXepLoai4: string;
    isDanhGia4: boolean;
}

export interface INhatKyPhieuTuDanhGia {
    nhanSuDanhGiaChiTietId: number;
    phieuDanhGiaId: number;
    tenPhieu: string;
    nhanSuId: number;
    hoDemNhanSu: string;
    tenNhanSu: string;
    doiTuongDanhGiaId: number;
    tenDoiTuongDanhGia: string; // them

    nhanSuDanhGia1Id: number;
    tenNhanSuDanhGia1: string;
    hoDemNhanSuDanhGia1: string;
    nhanXetNhanSuDanhGia1: string;
    ngayDanhGia1: Date;
    xepLoaiKetQuaDanhGia1Id: number;
    tenXepLoaiKetQuaDanhGia1: number; // them

    nhanSuDanhGia2Id: number;
    tenNhanSuDanhGia2: string;
    hoDemNhanSuDanhGia2: string;
    nhanXetNhanSuDanhGia2: string;
    ngayDanhGia2: Date;
    xepLoaiKetQuaDanhGia2Id: number;
    tenXepLoaiKetQuaDanhGia2: number; // them

    nhanSuDanhGia3Id: number;
    tenNhanSuDanhGia3: string;
    hoDemNhanSuDanhGia3: string;
    nhanXetNhanSuDanhGia3: string;
    ngayDanhGia3: Date;
    xepLoaiKetQuaDanhGia3Id: number;
    tenXepLoaiKetQuaDanhGia3: number; // them
}

export interface ITongHopKetQuaDanhGia {
    nhanSuId: number;
    maNhanSu: string;
    hoDem: string;
    ten: string;
    chucDanhId: number;
    chucVuId: number;
    coQuanId: number;
    doiTuongDanhGiaId: number;
    quy1XepLoaiKetQuaDanhGiaId: number;
    quy2XepLoaiKetQuaDanhGiaId: number;
    quy3XepLoaiKetQuaDanhGiaId: number;
    quy4XepLoaiKetQuaDanhGiaId: number;
    namXepLoaiKetQuaDanhGiaId1: number;
    namXepLoaiKetQuaDanhGiaId2: number;
    namXepLoaiKetQuaDanhGiaId3: number;
}

export interface ITongHopKetQuaDanhGiaBGDTheoCaNhan {
    nhanSuDanhGiaChiTietId: number;
    maNhanSu: string;
    hoDemNhanSu: string;
    tenNhanSu: string;
    doiTuongDanhGiaId: number;
    tenDoiTuongDanhGia: string;
    chucDanhId: number;
    tenChucDanh: string;
    coQuanId: number;
    tenCoQuan: string;
    xepLoaiKetQuaDanhGia1Id: number;
    xepLoaiKetQuaDanhGia2Id: number;
    xepLoaiKetQuaDanhGia3Id: number;
    tenXepLoaiKetQuaDanhGia1: string;
    tenXepLoaiKetQuaDanhGia2: string;
    tenXepLoaiKetQuaDanhGia3: string;
}

export interface ITongHopKetQuaDanhGiaBGDTheoPhongBan {
    tenCoQuan: string;
    maCoQuan: string; // them
    coQuanId: number;
    chuaDanhGia: number;
    daDanhGia: number;
}

export interface INhanSuDanhGiaChiTiet {
    nhanSuDanhGiaChiTietId: number;
    ngayDanhGia1: Date;
    daDanhGia: boolean;
    nhanSuId: number;
    maNhanSu: string;
    hoDem: string;
    ten: string;
    tenGoiKhac: string;
    gioiTinhId: number;
    tenGioiTinh: string;
    ngaySinh: Date;
    email: string;
    emailNoiBo: string;
    soDienThoai: string;
    loaiNhanSuId: number;
    coQuanId: number;
    tenCoQuan: string;
    chucVuId: number;
    chucDanhId: number;
    userId: number;
    loaiHopDongId: number;
    trangThaiNhanSuId: number;
    doiTuongDanhGiaId: number;
    tenDoiTuongDanhGia: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
    tenDonVi: string;
}

export interface INhanSuDanhGiaChiTietDelete {
    nhanSuDanhGiaChiTietId: number;
    nhanSuId: number;
    coQuanId: number;
    isDeleted: boolean;
}

export interface IQuanLyDanhGia {
    nhanSuDanhGiaChiTietId: number;
    ngayDanhGia: Date;
    maNhanSu: string;
    hoDem: string;
    ten: string;
    doiTuongDanhGiaId: number;
    chucVuId: number;
    phieuDanhGiaId: number;
    tenPhieu: string;
    tuNgay: Date;
    denNgay: Date;
    xepLoaiKetQuaDanhGia1Id: number;
    xepLoaiKetQuaDanhGia2Id: number;
    xepLoaiKetQuaDanhGia3Id: number;
}

export interface ISoLuongPhieuDanhGia {
    totalPhieu: number;
    phieuChuaDanhGia: number;
    phieuDaDanhGia: number;
}
export interface ISoLuongTongHopKetQuaDanhGia {
    totalItems: number;
    soLuongDaDanhGia: number;
    soLuongChuaDanhGia: number;
    soLuong1: number; // xuat sac
    soLuong2: number; // tot
    soLuong3: number; // hoan thanh
    soLuong4: number; // ko hoan thanh
    soLuong5: number;
    soLuong6: number; // chua hoan thanh
    tyLe1: number; // xuat sac
    tyLe2: number; // tot
    tyLe3: number; // hoan thanh
    tyLe4: number; // ko hoan thanh
    tyLe5: number;
    tyLe6: number; // chua hoan thanh
}
export interface IBanQuanLyDanhGia {
    nhanSuDanhGiaChiTietId: number;
    ngayDanhGia: Date;
    maNhanSu: string;
    hoDem: string;
    ten: string;
    doiTuongDanhGiaId: number;
    tenDoiTuongDanhGia: string;
    chucVuId: number;
    tenChucVu: string;
    phieuDanhGiaId: number;
    tenPhieu: string;
    tuNgay: Date;
    denNgay: Date;
    xepLoaiKetQuaDanhGia1Id: number;
    tenXepLoaiKetQuaDanhGia1: string;
    xepLoaiKetQuaDanhGia2Id: number;
    tenXepLoaiKetQuaDanhGia2: string;
    xepLoaiKetQuaDanhGia3Id: number;
    tenXepLoaiKetQuaDanhGia3: string;
}
