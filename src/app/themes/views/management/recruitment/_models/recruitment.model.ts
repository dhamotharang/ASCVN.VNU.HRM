export interface IDinhBien {
    id: number;
    idCoQuan: number;
    tenCoQuan: string;
    nam: number;
    lH_CCVC: number;
    lH_HDLD: number;
    lH_HD68: number;
    dinhBienChiTiets: IDinhBienChiTiet[];
    idFileDinhKem: number;
    ghiChu: string;
}

export interface IDinhBienChiTiet {
    id: number;
    idViTriViecLam: number;
    capLuong: number;
    tuTra: number;
}
