export interface IThongTinDoanDang {
    id: number;
    idNhanSu: number;
    ngayVaoDoan: Date;
    noiKetNapDoan: string;
    idChucVuDoan: number;
    isDangVien: true;
    ngayVaoDang: Date;
    ngayChinhThucVaoDang: Date;
    noiKetNapDang: string;
    idChucVuDang: number;
    noiSinhHoatDangHienTai: string;
    isThamGiaQuanDoi: true;
    ngayNhapNgu: Date;
    ngayXuatNgu: Date;
    ngayThamGiaCachMang: Date;
    idQuanHam: number;
    idChucVuCuuChienBinh: number;
    isThuongBinh: Date;
    idLoaiThuongBinh: number;
    soThuongTat: string;
    hinhThucThuongTat: string;
    idChucVuCongDoan: number;
    ngayVaoCongDoan: Date;
    noiDung: string;
    ghiChu: string;
    tenChucVuDoan: string;
    tenChucVuDang: string;
    tenQuanHam: string;
    tenChucVuCuuChienBinh: string;
    tenLoaiThuongBinh: string;
    tenChucVuCongDoan: string;
    compareData?: IThongTinDoanDang;
    idTrangThaiDuLieu?: number;
}

export interface IQuaTrinhDoan {
    id: number;
    idNhanSu: number;
    idChucVuDoan: number;
    ngayBatDau: Date;
    noiSinhHoat: string;
    ghiChu: string;
    tenChucVuDoan: string;
}

export interface IQuaTrinhDang {
    id: number;
    idNhanSu: number;
    idChucVuDang: number;
    ngayBatDau: Date;
    noiSinhHoat: string;
    ghiChu: string;
    tenChucVuDang: string;
}

export interface IQuaTrinhCongDoan {
    id: number;
    idNhanSu: number;
    idChucVuCongDoan: number;
    ngayBatDau: Date;
    noiSinhHoat: string;
    ghiChu: string;
}
