export interface INhanSuThongTinKhac {
    idHoanCanhKinhTe: number;
    idLichSuBanThan: number;
    idNhanSu: number;
    idTrangThaiDuLieu: number;
    idTrangThaiDuLieuHoanCanhKinhTe: number;
    idTrangThaiDuLieuLichSuBanThan: number;
    nguonThuNhapChinh: string;
    nguonKhac: string;
    tenNhaOTuMua: string;
    tenNhaODuocCap: string;
    dienTichNhaOTuMua: number;
    dienTichNhaODuocCap: number;
    dienTichDatODuocCap: number;
    dienTichDatOTuMua: number;
    datSanXuatKinhDoanh: string;
    dienTichDatSanXuatKinhDoanh: number;
    tienAnTienSu: string;
    lamViecCheDoCu: string;
    thamGiaToChucChinhTri: string;
    thamGiaToChucNuocNgoai: string;
    thamGiaQuanLyKHCN: string;
    thanNhanNuocNgoai: string;
    nhanXet: string;
    ghiChu: string;

    compareData?: INhanSuThongTinKhac;
}

export interface INhanSuHoanCanhKinhTe {
    id: number;
    idNhanSu: number;
    idTrangThaiDuLieu: number;
    nguonThuNhapChinh: string;
    nguonKhac: string;
    tenNhaOTuMua: string;
    tenNhaODuocCap: string;
    dienTichNhaOTuMua: number;
    dienTichNhaODuocCap: number;
    dienTichDatODuocCap: number;
    dienTichDatOTuMua: number;
    datSanXuatKinhDoanh: string;
    ghiChu: string;
    dienTichDatSanXuatKinhDoanh: number;

    compareData?: INhanSuHoanCanhKinhTe;
}

export interface INhanSuLichSuBanThan {
    id: number;
    idNhanSu: number;
    idTrangThaiDuLieu: number;
    tienAnTienSu: string;
    lamViecCheDoCu: string;
    thamGiaToChucChinhTri: string;
    thamGiaToChucNuocNgoai: string;
    thanNhanNuocNgoai: string;
    thamGiaQuanLyKHCN: string;
    nhanXet: string;
    ghiChu: string;

    compareData?: INhanSuLichSuBanThan;
}
