export enum TrangThaiKeHoachEnum {
    TAO_MOI = 1,
    DE_XUAT = 2,
    TRUONG_DV_DUYET = 3,
    TRUONG_DV_KO_DUYET = 4,
    BAN_DUYET = 5,
    BAN_KO_DUYET = 6,
    ///////// bo sung them ///////////
    NS_DE_XUAT_DUYET = 7,
    TRUONG_DV_DE_XUAT_DUYET = 8,
    TRUONG_DV_DUYET_GUI = 9,
}

export enum CapDuyetEnum {
    TRUONG_DV = 1,
    BAN = 2,
}

export enum XacNhanHopDongEnum {
    XAC_NHAN = 1,
    KHONG_XAC_NHAN = 2,
}
export enum XacNhanHopDongTuyenDungEnum {
    TAO_MOI = 1,
    GUI_XAC_NHAN = 2,
    DUYET = 3,
    KHONG_DUYET = 4,
    CHAM_DUT_HOP_DONG = 5
}

export enum TrangThaiHopDongEnum {
    TAO_MOI = 1,
    DE_XUAT = 2,
    DUYET = 3,
    KHONG_DUYET = 4,
    CHAM_DUT_HOP_DONG = 5,
}


// export enum TrangThaiPhanQuyenEnum {
//     DA_PHAN_QUYEN = true,
//     CHUA_PHAN_QUYEN = false,
// }

export enum TrangThaiDanhGiaTapSuEnum {
    TAO_MOI = 1,
    DAT = 2,
    GIA_HAN_THOI_GIAN_TAP_SU = 3,
    CHAM_DUT_HOP_DONG = 4,
}

export const TrangThaiDanhGiaTapSuDescription = new Map<number, string>([
    [TrangThaiDanhGiaTapSuEnum.TAO_MOI, 'Tạo mới'],
    [TrangThaiDanhGiaTapSuEnum.DAT, 'Đạt'],
    [TrangThaiDanhGiaTapSuEnum.CHAM_DUT_HOP_DONG, 'Chấm dứt hợp đồng'],
    [TrangThaiDanhGiaTapSuEnum.GIA_HAN_THOI_GIAN_TAP_SU, 'Gia hạn thời gian tập sự'],
])
