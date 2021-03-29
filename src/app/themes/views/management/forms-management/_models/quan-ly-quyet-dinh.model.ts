import { PhanLoaiDonEnum } from './quan-ly-don-tu.enum';

export interface IQuyetDinh {
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
