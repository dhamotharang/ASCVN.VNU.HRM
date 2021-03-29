export interface IPhieuDanhGiaViewModel {
    phieuId: number;
    maPhieu: string;
    tenPhieu: string;
    nam: number;
    quy: number;
    typePhieu: number;
    ghiChuDauTrang: string;
    ghiChuCuoiTrang: string;
    ghiChuPhieuDanhGia: string;
    ghiChuDotDanhGia: string;
    nhomCauHois: INhomCauHoiViewModel[];

    maNhanSu1: string;
    hoTenNhanSu1: string;
    chucDanh1Id: number;
    tenChucDanh1: string;
    chucVu1Id: number;
    tenChucVu1: string;
    coQuan1Id: number;
    tenCoQuan1: string;
    nhanSuDanhGia1Id: number;
    ngayDanhGia1: Date;
    xepLoaiKetQuaDanhGia1Id: number;
    tenXepLoaiKetQuaDanhGia1: string;

    maNhanSu2: string;
    hoTenNhanSu2: string;
    chucDanh2Id: number;
    tenChucDanh2: string;
    chucVu2Id: number;
    tenChucVu2: string;
    coQuan2Id: number;
    tenCoQuan2: string;
    nhanSuDanhGia2Id: number;
    ngayDanhGia2?: Date;
    xepLoaiKetQuaDanhGia2Id: number;
    tenXepLoaiKetQuaDanhGia2: string;

    maNhanSu3: string;
    hoTenNhanSu3: string;
    chucDanh3Id: number;
    tenChucDanh3: string;
    chucVu3Id: number;
    tenChucVu3: string;
    coQuan3Id: number;
    tenCoQuan3: string;
    nhanSuDanhGia3Id: number;
    ngayDanhGia3?: Date;
    xepLoaiKetQuaDanhGia3Id: number;
    tenXepLoaiKetQuaDanhGia3: string;

    tenCoQuanPrint: string;
}
export interface INhomCauHoiViewModel {
    nhomCauHoiId: number;
    stt: number;
    noiDung: string;
    doiTuongThucHienId: number;
    hinhThucTraLoiId: number;
    phieuId: number;
    cauHois: ICauHoiViewModel[];
    isDisabled?: boolean;
    tieuChiDanhGia: string;
}

export interface ICauHoiViewModel {
    cauHoiId: number;
    yKienTraLoi: string;
    nhomCauHoiId: number;
    sttCauHoiDanhGia: number;
    hinhThucTraLoiId: number;
    noiDungCauHoi: string;
    congViecs: ICongViecViewModel[];
    nhiemVuThucHiens: INhiemVuThucHienViewModel[];
    tongHopNhiemVu: ITongHopNhiemVuViewModel;
    xepLoaiKetQuaDanhGiaId?: number;
    yKien?: string;
    isDelete?: boolean;
    isView?: boolean;
    ketQuaDanhGiaId: number;
    ghiChuCauHoi: string;
    tieuChiDanhGia: string;
}

export interface INhiemVuThucHienViewModel {
    nhiemVuThucHienId: number;
    stt: number;
    tieuDe: string;
    soGio: number;
    fileDinhKemId: number;
    ghiChu: string;
    isDelete?: boolean;
    isView?: boolean;
    fileAttachNhiemVus?: IFileAttachViewModel[];
}

export interface ICongViecViewModel {
    congViecId: number;
    stt: number;
    tieuDe: string;
    trangThaiTienDoId: number;
    mucDoHoanThanhId: number;
    fileDinhKemId: number;
    ghiChu: string;
    isDelete?: boolean;
    isView?: boolean;
    fileAttachCongViecs?: IFileAttachViewModel[];
}

export interface ITongHopNhiemVuViewModel {
    tongHopNhiemVuId: number;
    soGioChuan: number;
    soGioGiamTru: number;
    soGioPhaiThucHien: number;
    soGioDaThucHien: number;
    soGioThuaThieu: number;
    stt: number;
    isView?: boolean;
}

export interface IFileAttachViewModel {
    fileAttachId: number;
    fileDinhKemId: number;
    name: string;
    type: number;
    size: number;
    path: string;
    forWeb: boolean;
    checkSum: string;
    isDelete?: boolean;
    guidId?: string;
}

// --------------- PHIẾU ĐÁNH GIÁ SUBMIT
export interface IPhieuDanhGiaSubmit {
    doiTuongThucHienDanhGiaType: number;
    nhanSuDanhGiaId: number;
    xepLoaiKetQuaDanhGiaId: number;
    nhanSuDanhGiaChiTietId: number;
    ketQuaDanhGias: IKetQuaPhieuDanhGia[];
    manHinh?: number;
}

export interface IKetQuaPhieuDanhGia {
    ketQuaDanhGiaId: number;
    cauHoiId: number;
    xepLoaiKetQuaDanhGiaId: number;
    yKien: string;
    tongHopNhiemVuThucHien: ITongHopNhiemVuThucHien;
    congViecThucHiens: ICongViecThucHien[];
    nhiemVuThucHiens: INhiemVuThucHien[];
}

export interface ITongHopNhiemVuThucHien {
    id: number;
    stt: number;
    soGioChuan: number;
    soGioGiamTru: number;
    soGioPhaiThucHien: number;
    soGioDaThucHien: number;
    soGioThuaThieu: number;
    isVisible: boolean;
    hinhThucTraLoiId: number;
    ghiChu: string;
}

export interface ICongViecThucHien {
    id: number;
    stt: number;
    tieuDe: string;
    moTa: string;
    trangThaiTienDoId: number;
    mucDoHoanThanhId: number;
    isVisible: boolean;
    hinhThucTraLoiId: number;
    ghiChu: string;
    isDelete: boolean;
    congViecThucHienFileAttachs: IFileAttach[];
}

export interface INhiemVuThucHien {
    id: number;
    stt: number;
    tenNhiemVuThucHien: string;
    soGioQuyDoi: number;
    hinhThucTraLoiId: number;
    ghiChu: string;
    isVisible: boolean;
    isDelete: boolean;
    nhiemVuThucHienFileAttachs: IFileAttach[];
}

export interface IFileAttach {
    id: number;
    fileId: number;
    isDelete: boolean;
}
