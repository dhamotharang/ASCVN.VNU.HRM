export interface IListBaoCaoTapSu {
    idPhanCongHuongDanTapSu: number;
    hoDem: string;
    ten: string;
    ngayNopBaoCao?: string;
    ngayXemBaoCao?: string;
    nopBaoCaoTuNgay?: string;
    nopBaoCaoDenNgay?: string;
    noiDungBaoCao?: string;
    idFileDinhKem?: number;

    fileName: string;
    type: number;
    size: number;
    path: string;
    forWeb: boolean;
    checkSum: string;
    guidId: string;
}
export interface IListDanhGiaBaoCaoTapSu {
    id: number;
    idQuyetDinh: number;
    idNhanSuTapSu: number;
    tapSuTuNgay: Date;
    tapSuDenNgay: Date;
    nopBaoCaoTuNgay: Date;
    nopBaoCaoDenNgay: Date;
    ngayNopBaoCao: Date;
    noiDungBaoCao: string;
    ghiChu: string;
    ngayXemBaoCao: Date;
    idTrangThaiDanhGiaTapSu: number;
    noiDungDanhGia: string;
    hoDem: string;
    ten: string;
    idNhanSuNhanQuyetDinh: number;
    hoTenNhanSuNhanQuyetDinh: string;
}
export interface IBaoCaoTapSuCaNhan{
    id: number;
    soQuyetDinh: string;
    idNhanSuNhanQuyetDinh: number;
    idNhanSuTapSu: number;
    hoDem: string;
    ten: string;
    soLuong: number;
    ghiChu: string;
    tapSuTuNgay: Date;
    tapSuDenNgay: Date;
    nopBaoCaoTuNgay: Date;
    nopBaoCaoDenNgay: Date;
}