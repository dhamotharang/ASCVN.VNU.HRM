import { Pipe, PipeTransform } from '@angular/core';

const tabManHinh = [
    {
        key: 'ThongTinNhanSu',
        value: 'Thông tin nhân sự'
    },
    {
        key: 'ThongTinTuyenDung',
        value: 'Thông tin tuyển dụng'
    },
    {
        key: 'QuaTrinhCongTac',
        value: 'Quá trình công tác'
    },
    {
        key: 'KiemNhiem',
        value: 'Quá trình công tác/Kiêm nhiệm'
    },
    {
        key: 'TrinhDoChuyenMon',
        value: 'Quá trình đào tạo, bồi dưỡng/ Trình độ, chuyên môn'
    },
    {
        key: 'DaoTaoBoiDuongDaiHan',
        value: 'Quá trình đào tạo, bồi dưỡng/ Dài hạn'
    },
    {
        key: 'DaoTaoBoiDuongNganHan',
        value: 'Quá trình đào tạo, bồi dưỡng/ Ngắn hạn'
    },
    {
        key: 'TrinhDoNgoaiNgu',
        value: 'Quá trình đào tạo, bồi dưỡng/ Trình độ ngoại ngữ'
    },
    {
        key: 'TrinhDoTinHoc',
        value: 'Quá trình đào tạo, bồi dưỡng/ Trình độ tin học'
    },
    {
        key: 'ChucDanhKhoaHoc',
        value: 'Quá trình đào tạo, bồi dưỡng/ Chức danh khoa học'
    },
    {
        key: 'ThongTinDoanDang',
        value: 'Tổ chức chính trị, xã hội/Thông tin đảng'
    },
    {
        key: 'QuaTrinhDoan',
        value: 'Tổ chức chính trị, xã hội/Quá trình Đoàn'
    },
    {
        key: 'QuaTrinhDang',
        value: 'Tổ chức chính trị, xã hội/Quá trình Đảng'
    },
    {
        key: 'QuaTrinhCongDoan',
        value: 'Tổ chức chính trị, xã hội/Quá trình Công đoàn'
    },
    {
        key: 'ThongTinLuong',
        value: ' Thông tin lương/Thông tin lương'
    },
    // {
    //     key: '',
    //     value: 'Thông tin lương/Nhật ký lương'
    // },
    {
        key: 'KhenThuong',
        value: 'Danh hiệu thi đua, khen thưởng, kỷ luật/Khen thưởng'
    },
    {
        key: 'ThiDuaKhenThuong',
        value: 'Danh hiệu thi đua, khen thưởng, kỷ luật/Danh hiệu thi đua'
    },
    {
        key: 'KyLuat',
        value: 'Danh hiệu thi đua, khen thưởng, kỷ luật/Kỷ luật'
    },
    {
        key: 'TinhTrangSucKhoe',
        value: 'Tình trạng sức khỏe'
    },
    {
        key: 'QuanHeGiaDinhCaNhan',
        value: 'Quan hệ gia đình/Bản thân'
    },
    {
        key: 'QuanHeGiaDinhVoChong',
        value: 'Quan hệ gia đình/Bên vợ'
    },
    {
        key: 'LichSuCaNhan',
        value: 'Thông tin khác'
    },
    {
        key: 'HoanCanhKinhTe',
        value: 'Thông tin khác'
    },
];

@Pipe({ name: 'manHinhDuyetThongTinNhanSu' })
export class TranferManHinhDuyetThongTinNhanSuPipe implements PipeTransform {

    transform(key: string): string {
        const index = tabManHinh.findIndex(x => x.key === key);
        return tabManHinh[index].value;
    }
}
