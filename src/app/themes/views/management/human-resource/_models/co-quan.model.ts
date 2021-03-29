export interface ITreeCoQuan {
    coQuanId: number;
    maCoQuan?: string;
    tenCoQuan?: string;
    coQuanTrucThuocId?: number;
    capDonVi?: number;
    childrens?: ITreeCoQuan[];
}
