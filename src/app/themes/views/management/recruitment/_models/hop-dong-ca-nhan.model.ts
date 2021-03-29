export interface IHopDongCaNhan {
    id: number;
    idKeHoachTuyenDung: number;
    tenKeHoach: string;
    idNhanSu: number;
    maNhanSu: string;
    hoDem: string;
    ten: string;
    idCoQuan: number;
    tenCoQuan: string;
    idViTriViecLam: number;
    tenViTriViecLam: string;
    soHopDong: string;
    idLoaiHopDong: number;
    tenLoaiHopDong: string;
    ngayHopDong: Date;
    idTrangThaiHopDong: number;
    tenTrangThaiHopDong: string;
    xacNhanHopDong: number;
    lyDoXacNhanHopDong: string;
    ngayXacNhan: Date;

    idHopDongChiTiet?: number;
}
