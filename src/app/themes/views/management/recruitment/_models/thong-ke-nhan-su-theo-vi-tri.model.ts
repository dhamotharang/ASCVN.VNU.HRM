export interface IThongKeNSTheoViTri {
    idNhomViTriViecLam: number;
    sttNhomViTriViecLam: number;
    tenNhomViTriViecLam: string;
    viTriViecLams: IThongKeNSTheoViTriChiTiet[];
}

export interface IThongKeNSTheoViTriChiTiet {
    cdkH_Gs: number;
    cdkH_Khac: number;
    cdkH_Pgs: number;
    ghiChu: string;
    idViTriViecLam: number;
    lH_CCVC: number;
    lH_HD68: number;
    lH_HDLD: number;
    lH_Khac: number;
    sttViTriViecLam: number;
    tddT_Cd: number;
    tddT_Cky: number;
    tddT_Dh: number;
    tddT_Khac: number;
    tddT_Ncs: number;
    tddT_Ths: number;
    tddT_Tr: number;
    tddT_Ts: number;
    tddT_Tskh: number;
    tenViTriViecLam: string;
    tongSoLuong: number;
    tongSoTheoTDDT: number;
    id: number;
    idCoQuan: number;
    maCoQuan: string;
    tenCoQuan: string;
}
