export interface INhiemVuKHCN {
    id: number;
    idCoQuan: number;
    tenCoQuan: string;
    idLinhVuc: number;
    idCapDo: number;
    maNhiemVuKhoaHoc: string;
    tenNhiemVuKhoaHoc: string;
    tenVietTat: string;
    tomTat: string;
    mucTieu: string;
    noiDungNghienCuu: string;
    moTaSanPham: string;
    ngayBatDau: Date;
    ngayKetThuc: Date;
    namThucHien: number;
    idTrangThaiDuyet: number;
    isVisible: boolean;
    ghiChu: string;
    ketQuas: [];
    fileAttachs: [];
    thanhViens: [];
    thanhVienNgoais: [];
    nhiemVuKhoaHoc:INhiemVuKHCN;
}

export interface ISachChuyenKhao {
    id: number;
    idCoQuan: number;
    tenCoQuan: string;
    maSachChuyenKhao: string;
    tenSachChuyenKhao: string;
    idDeTai: number;
    nhaXuatBan: string;
    namXuatBan: number;
    idTrangThaiDuyet: number;
    isTiengViet: boolean;
    isGiaoTrinh: boolean;
    isChuyenKhao: boolean;
    isThamKhao: boolean;
    currentUser: number;
    thanhViens: [];
    thanhVienNgoais: [];
    suDungPhongThiNghiems: [];
    sachChuyenKhao:ISachChuyenKhao;
}
export interface IBaoCaoKhoaHoc {
    id: number;
    idCoQuan: number;
    tenCoQuan: string;
    maBaoCaoKhoaHoc: string;
    tenBaoCaoKhoaHoc: string;
    idDeTai: number;
    tenDeTai: string;
    idHoiThao: number;
    tenHoiThao: string;
    idLoaiBaoCao: number;
    tenLoaiBaoCao: string;
    tenKyYeu: string;
    viTriTrang: string;
    isTrongNuoc: boolean;
    tomTat: string;
    ngayBaoCao: string;
    idTrangThaiDuyet: number;
    tenTrangThaiDuyet: string;
    currentUser: number;
    thanhViens: [];
    thanhVienNgoais: [];
    baoCaoKhoaHoc: IBaoCaoKhoaHoc;
    suDungPhongThiNghiems: [];
    fileDinhKems: [];
}

export interface ISanPhamDaoTao {
    id: number;
    idCoQuan: number;
    tenCoQuan: string;
    idDeTai: number;
    tenDeTai: string;
    idNguoiHuongDan: number;
    tenNguoiHuongDan: string;
    soTienSi: number;
    soNghienCuuSinh: number;
    idTrangThaiDuyet: number;
    tenTrangThai: string;
    isVisible: boolean;
    ghiChu: string;
    currentUser: number;
    sanPhamDaoTao: ISanPhamDaoTao;
}

export interface IPhatMinhSangChe {
    id: number;
    idCoQuan: number;
    tenCoQuan: string;
    tenPhatMinhSangChe: string;
    idHinhThuc: number;
    moTa: string;
    idDeTai: number;
    idTinhTrangDangKy: number;
    maCapBang: string;
    ngayCapBang: string;
    idQuocGiaCapBang: number;
    idToChucCapBang: number;
    idTinhTrangSanPham: number;
    khaNangUngDung: string;
    nhuCauChuyenGiao: string;
    nhuCauGoiVon: string;
    deNghiHoTro: string;
    idTrangThaiDuyet: number;
    currentUser: number;
    thanhViens: [];
    thanhVienNgoais: [];
    suDungPhongThiNghiems: [];
    phatMinhSangChe: IPhatMinhSangChe;
    ghiChu: string;
}
export interface IKetQuaDuKien {
    id: number;
    isVisible: boolean;
    ghiChu: string;
}

export interface IGiaiThuongKHCN {
    id: number;
    idCoQuan: number;
    tenCoQuan: string;
    tenGiaiThuongKHCN: string;
    tenDeTai: string;
    idLoaiGiaiThuong: number;
    tenLoaiGiaiThuong: string;
    idThuHangGiaiThuong: number;
    tenThuHangGiaiThuong: string;
    idDeTai: number;
    tenTrangThaiDuyet:string;
    soQuyetDinh: string;
    ngayQuyetDinh: string;
    idTrangThaiDuyet: number;
    fileDinhKems: [];
    currentUser: number;
    giaiThuongKHCN: IGiaiThuongKHCN,
}

export interface IBaiBaoKhoaHoc {
    id: number;
    idCoQuan: number;
    maBaiBaoKhoaHoc: string;
    tenBaiBaoKhoaHoc: string;
    idDeTai: number;
    idTapChi: number;
    soTrichDan: string;
    tapSo: string;
    viTriTrang: string;
    isTrongNuoc: boolean;
    phamViBaiBao: number;
    namCongBo: number;
    idTrangThaiDuyet: number;
    currentUser: number;
    tenCoQuan: string;
    thanhViens: [];
    thanhVienNgoais: [];
    suDungPhongThiNghiems: [];
    baiBaoKhoaHoc: IBaiBaoKhoaHoc;
}

export interface IHoiNghiHoiThao {
    id: number;
    idCoQuan: number;
    tenCoQuan: string;
    idLoaiHoiThaoHoiNghi: number;
    tenLoaiHoiThaoHoiNghi: string;
    tenHoiThaoHoiNghi: string;
    isTrongNuoc: boolean;
    chuDe: string;
    ngayBatDau: string;
    ngayKetThuc: string;
    diaDiem: string;
    soLuongDaiBieu: number;
    nguonKinhPhi: string;
    kinhPhi: number;
    idTrangThaiDuyet: number;
    tenTrangThai: string;
    ghiChu: string;
    currentUser: number;
    hoiThaoHoiNghi: IHoiNghiHoiThao;
    suDungPhongThiNghiems: [];
}

export interface IDuAnDauTu {
    id: number;
    idCoQuan: number;
    tenCoQuan: string;
    namDauTu: number;
    maDuAnDauTu: string;
    tenDuAnDauTu: string;
    idLoaiDuAn: number;
    tenLoaiDuAn: string;
    soQuyetDinh: string;
    diaDiem: string;
    ngayKhoiCong: string;
    ngayHoanThanh: string;
    nguonKinhPhi: string;
    kinhPhi: number;
    ghiChu: string;
    idTrangThaiDuyet: number;
    tenTrangThaiDuyet: string;
    currentUser: number;
    duAnDauTu: IDuAnDauTu;
    suDungPhongThiNghiems: [];
}

export interface IThanhVienNgoai {
    id: number;
    maThanhVien: string;
    hoDem: string;
    ten: string;
    donVi: string;
    trinhDoChuyenMon: string;
    chucDanh: string;
    stt: number;
    isVisible: boolean;
    ghiChu: string;
    idVaiTroTVN: number;
    idVaiTro: number; // để map dữ liệu
}

export interface IPhongThiNghiem {
    id: number;
    maPhongThiNghiem: string;
    tenPhongThiNghiem: string;
    diaChi: string;
    soDienThoai: string;
    idPhongThiNghiem: number;
}
