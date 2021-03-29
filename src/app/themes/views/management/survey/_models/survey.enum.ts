export enum DoiTuongThucHienEnum {
    TU_DANH_GIA = 1,
    THU_TRUONG_DON_VI = 2,
    BAN_GIAM_DOC_DHQG = 3,
}

export enum HinhThucTraLoiEnum {
    GROUP = 1,
    TEXT = 2,
    SELECT = 3,
    LIST_CONGVIEC = 4,
    LIST_GIOGIANG = 5,
    LIST_NCKH = 6,
    LIST_CONG_TAC_KHAC = 7,
    Y_KIEN = 8,
}

export enum TrangThaiTienDoEnum {
    VUOT_TIEN_DO = 1,
    DUNG_TIEN_DO = 2,
    VUONG_MAC_KHACH_QUAN = 3,
    CHAM_TIEN_DO = 4,
}

export enum MucDoHoanThanhEnum {
    TOT = 1,
    KHA = 2,
    TRUNG_BINH = 3,
    CHUA_DAT = 4,
}

export enum LayoutViewEnum {
    CARD_VIEW,
    TABLE_VIEW,
}

export enum TypeManagementSurveyEnum { // @ManHinh INT
    TU_DANH_GIA = 1, // 1: Tự đánh giá
    QUAN_LY_DANH_GIA = 2, // 2: Quản lý đánh giá
    DON_VI_DANH_GIA = 3, // 3: Đơn vị đánh giá
    BAN_QUAN_LY_DANH_GIA = 9, // 9: Ban quản lý đánh giá
}

// su dung tao cac cau hoi khao sat khi soan phieu
export enum ActionCreateServeyEnum {
    CREATE_GROUP = 1,
    UPDATE_GROUP = 2,
    CREATE_ITEM = 3,
    UPDATE_ITEM = 4,
}
