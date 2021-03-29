export interface IItemQuyetDinhTuyenDung {
    items: INhanSuQuyetDinhTuyenDung[];
    quyetDinh: IChiTietQuyetDinh;
}
export interface IQuyetDinhTuyenDung {
    id: number;
    soQuyetDinh: string;
    idNguoiKy: number;
    tenNguoiKy: string;
    ngayKy: Date;
    chucVuNguoiKy: string;
    soLuong: number;
    idFileDinhKem: number;
    guidIdFileDinhKem: string;
    tenFile: string;
    type: number;
    size: number;
    path: string;
    forWeb: true;
    checkSum: string;
    ghiChu: string;
}

export interface INhanSuQuyetDinhTuyenDung {
    id: number;
    idNhanSu?: number;
    ngaySinh: Date;
    maNhanSu: string;
    hoDem: string;
    ten: string;
    idGioiTinh: number;
    tenGioiTinh: string;
    idLoaiNhanSu: number;
    tenLoaiNhanSu: string;
    idNgach: number;
    tenNgachCongChuc: string;
    idTrinhDoChuyenMon: number;
    tenTrinhDoChuyenMon: string;
    idViTriViecLam: number;
    tenViTriViecLam: string;
    soQuyetDinh: string;
    ghiChu?: string;
    isDeleted?: boolean; 
}
export interface IChiTietQuyetDinh {
    id: number;
    soQuyetDinh: string;
    idKeHoachTuyenDung: number;
    idNguoiKy: number;
    tenNguoiKy: string;
    ngayKy: Date;
    chucVuNguoiKy: string;
    trichYeu: string;
    noiDungCanCu: string;
    noiDung: string;
    noiNhan: string;
    ghiChu: string;
    idFileDinhKem: number;
    guidIdFileDinhKem: string;
    tenFile: string;
    type: number;
    size: number;
    path: string;
    forWeb: true;
    checkSum: string;
}