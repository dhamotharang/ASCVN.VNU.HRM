export interface INhatKyDanhGiaViewModel {
    idDot: number;
    tenDotDanhGia: string;
    idPhieuDanhGia: number;
    tenPhieu: string;
    lichSuDanhGiaChiTiets: ILichSuDanhGiaChiTietViewModel[];
}

export interface ILichSuDanhGiaChiTietViewModel {
    id: number;
    idDot: number;
    idPhieuDanhGia: number;
    idNhanSuDanhGiaChiTiet: number;
    manHinh: number;
    noiDung: string;
    idXepLoaiKetQuaDanhGiaCu: number;
    idXepLoaiKetQuaDanhGiaMoi: number;
    tenXepLoaiKetQuaDanhGiaCu: string;
    tenXepLoaiKetQuaDanhGiaMoi: string;
    creationDate: Date;
    loaiNoiDung: number;
    maNhanSuCu: string;
    maNhanSuMoi: string;
    hoDemNhanSuCu: string;
    hoDemNhanSuMoi: string;
    tenNhanSuCu: string;
    tenNhanSuMoi: string;
}
