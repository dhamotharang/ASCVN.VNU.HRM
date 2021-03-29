export interface ILapThongBaoKeHoach{
    id: number;
    maThongBao: string;
    tenThongBao: string;
    noiDung: string;
    ngayBatDau: string;
    ngayKetThuc: string;
    namThongBao: number;
    ghiChu: string;
    isVisible: boolean;
    thongBao:ILapThongBaoKeHoach;
}

export interface IDeTaiCongTrinh{
    id: number;
    ma: string;
    ten: string;
    tenCapDeTai: string;
    tenCoQuanChuTri: string;
    moTa: string;
    ngayBatDau: string;
    ngayKetThuc: string;
    thoiGianThucHien: number;
    tongKinhPhi: number;
    kinhPhiDaCap: number;
    kinhPhiConLai: number;
    idCapDeTai: number;
    isVisible: boolean;
    tenTrangThai: string;
    ghiChu: string;
    loaiDuLieu: number;
    keyThamChieu: string;
}
export interface IKeHoach{
    id: number;
    idCoQuan: number;
    idThongBao: number;
    idLoaiKeHoach: number;
    namKeHoach: number;
    hinhThucNhiemVu: number;
    tenChuongTrinh: string;
    tenNhiemVu: string;
    idDeTai: number;
    nguoiChuTri: string;
    ngayBatDau: string;
    ngayKetThuc: string;
    tongKinhPhi: number;
    kinhPhiHienTai: number;
    kinhPhiTiepTheo: number;
    diaDiemThucHien: string;
    chuDauTu: string;
    canCuPhapLy: string;
    isKeHoachTongHop: boolean;
    ghiChu: string;
    soThuTu: number;
    idTrangThaiDuyet: number;
}
export interface IChonPhanCong{
    idThongBao: number;
    phanCongItems: IPhanCongThucHien[];
} 
export interface IPhanCongThucHien{
    idCoQuan: number;
    idThongBao: number;
    idLoaiKeHoach: number;
    idNhanSu: number;
    ghiChu: string;
}

export interface ILoaiKeHoach{
    id: number;
    ma: string;
    ten: string;
    moTa: string;
    isVisible: boolean;
    ghiChu: string;
}