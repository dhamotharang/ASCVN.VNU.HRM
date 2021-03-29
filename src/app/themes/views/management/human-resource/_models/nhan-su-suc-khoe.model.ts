export interface INhanSuSucKhoe {
    id: number;
    idNhanSu: number;
    idTinhTrangSucKhoe: number;
    canNang: number;
    chieuCao: number;
    idNhomMau: number;
    idFileDinhKem: number;
    ghiChu: string;
    tenNhomMau: string;
    tenTrinhTrangSucKhoe: string;
    tenFile: string;
    type: number;
    size: number;
    path: string;
    forWeb: boolean;
    checkSum: string;
    guidId: string;

    compareData?: INhanSuSucKhoe;
    idTrangThaiDuLieu?: number;
}
