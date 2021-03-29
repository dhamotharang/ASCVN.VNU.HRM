import { TrangThaiDuLieuEnum } from "./human-resource.enum";

export interface INhanSuTrinhDo {
    id: number;
    idNhanSu: number;
    idTrinhDoVanHoa: number;
    idTrinhDoChinhTri: number;
    idTrinhDoNhaNuoc: number;
    trinhDoNgoaiNgu: string;
    trinhDoViTinh: string;
    ghiChu: string;
    tenTrinhDoVanHoa: string;
    tenTrinhDoChinhTri: string;
    tenTrinhDoNhaNuoc: string;
    trinhDoNghiepVuTheoChuyenNganh: string;
    tenTrinhDoChuyenMonCaoNhat: string;

    compareData?: INhanSuTrinhDo;
    idTrangThaiDuLieu?: number;
}

export interface INhanSuTrinhDoTinHoc {
    id: number;
    idNhanSu: number;
    idTrinhDoTinHoc: number;
    namCongNhan: number;
    soNamCongNhan: number;
    ghiChu: string;
    tenTrinhDoTinHoc: string;
    idFileDinhKem: number;
    tenFile: string;
    type: number;
    size: number;
    path: string;
    guidId: string;
    forWeb: boolean;
    checkSum: string;
}

export interface INhanSuTrinhDoNgoaiNgu {
    id: number;
    idNhanSu: number;
    idNgoaiNgu: number;
    idKyNangNgoaiNgu: number;
    idTrinhDoNgoaiNgu: number;
    ghiChu: string;
    idFileDinhKem: number;
    tenNgoaiNgu: string;
    tenKyNangNgoaiNgu: string;
    tenTrinhDoNgoaiNgu: string;
    tenFile: string;
    type: number;
    size: number;
    path: string;
    guidId: string;
    forWeb: boolean;
    checkSum: string;
}

export interface INhanSuTrinhDoChuyenMon {
    id: number;
    idNhanSu: number;
    idTrinhDoChuyenMon: number;
    idHinhThucDaoTao: number;
    idLinhVuc: number;
    batDau_Nam: number;
    batDau_Thang: number;
    ketThuc_Nam: number;
    ketThuc_Thang: number;
    maXepLoai: string;
    noiDaoTao: string;
    idQuocGia: number;
    ghiChu: string;
    tenTrinhDoChuyenMon: string;
    tenHinhThucDaoTao: string;
    tenLinhVuc: string;
    idFileDinhKem: number;
    tenFile: string;
    type: number;
    size: number;
    path: string;
    guidId: string;
    forWeb: boolean;
    checkSum: string;
    idTrangThaiDuLieu: TrangThaiDuLieuEnum;
}

export interface INhanSuChucDanhKhoaHoc {
    id: number;
    idNhanSu: number;
    idChucDanhKhoaHoc: number;
    nam: number;
    thang: number;
    noiCongNhan: string;
    ghiChu: string;
    idFileDinhKem: number;
    tenFile: string;
    type: number;
    size: number;
    path: string;
    guidId: string;
    forWeb: boolean;
    checkSum: string;
}
