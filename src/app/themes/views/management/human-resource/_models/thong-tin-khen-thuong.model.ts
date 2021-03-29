export interface INhanSuKhenThuong {
    id: number;
    idNhanSu: number;
    idQuyetDinh: number;
    soQuyetDinh: string;
    ngayQuyetDinh: Date;
    ngayHieuLuc: Date;
    idCapKhenThuong: number;
    idKhenThuong: number;
    hinhThucKhenThuongKhac: string;
    noiDung: string;
    ghiChu: string;
    tenKhenThuong: string;
    tenCapKhenThuong: string;
    idFileDinhKem: number;
    tenFile: string;
    type: number;
    size: number;
    path: string;
    guidId: string;
    forWeb: boolean;
    checkSum: string;
    idTrangThaiDuLieu?: number;
}

export interface INhanSuKyLuat {
    id: number;
    idNhanSu: number;
    idQuyetDinh: number;
    soQuyetDinh: string;
    ngayQuyetDinh: Date;
    ngayHieuLuc: Date;
    idCapKyLuat: number;
    idKyLuat: number;
    hinhThucKyLuatKhac: string;
    noiDung: string;
    ghiChu: string;
    tenKyLuat: string;
    tenCapKyLuat: string;
    idFileDinhKem: number;
    tenFile: string;
    type: number;
    size: number;
    path: string;
    guidId: string;
    forWeb: boolean;
    checkSum: string;
    idTrangThaiDuLieu?: number;
}

export interface IDanhHieuThiDuaKhenThuong {
    id: number;
    idNhanSu: number;
    idTrinhDoTinHoc: number;
    namCongNhan: number;
    soNamCongNhan: number;
    ghiChu: string;
    idFileDinhKem: number;
    tenTrinhDoTinHoc: string;
    isDanhHieuCaoNhat: boolean;
    tenFile: string;
    type: number;
    size: number;
    path: string;
    forWeb: boolean;
    checkSum: string;
    idTrangThaiDuLieu: number;
    isTapThe: boolean;
}
