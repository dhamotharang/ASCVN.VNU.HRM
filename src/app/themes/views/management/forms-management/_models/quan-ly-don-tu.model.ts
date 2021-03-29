import { CacLoaiDonEnum, PhanLoaiDonEnum } from './quan-ly-don-tu.enum';

export interface IDonTu {
    id: number;
    sao: boolean;
    tieuDe: string;
    noiDung: string;
    tenNguoiGui: string;
    idNguoiGui: number;
    thoiGianGui: string;
    idFileDinhKem: 1;
    trangThaiXuLy: string;
    thoiGianXuLy: string;
    phanLoaiDon: string;
    idPhanLoaiDon: PhanLoaiDonEnum;
}

export interface ILocDonNhan{
    keyWord: string;
    idPhanLoaiDon: number;
    idTrangThaiXuLy?: number;
    idTrangThaiQuyetDinh?: number;
    idNguoiGuiHoacNhan?: number;
    thoiGianTu: string;
    thoiGianDen: string;
    duocDanhSao: boolean;
}
