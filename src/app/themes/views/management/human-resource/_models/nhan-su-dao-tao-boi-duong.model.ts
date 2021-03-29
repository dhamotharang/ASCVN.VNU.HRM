export interface INhanSuDaoTaoBoiDuong {
    id: number;
    idNhanSu: number;
    ngayBatDau: Date;
    ngayKetThuc: Date;
    donVi: string;
    chuyenNganh: string;
    vanBang: string;
    chungChi: string;
    idHinhThucDaoTao: number;
    idQuocGia: number;
    truongDaoTao: string;
    soQuyetDinh: string;
    ngayQuyetDinh: Date;
    ghiChu: string;
    idFileDinhKem: number;
    tenFile: string;
    type: number;
    size: number;
    path: string;
    forWeb: true;
    checkSum: string;
    guidId: string;
}
