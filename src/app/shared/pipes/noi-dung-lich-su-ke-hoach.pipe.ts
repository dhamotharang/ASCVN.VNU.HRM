import { Pipe, PipeTransform } from '@angular/core';
export const noiDungLichSus = [
    '',  // 0
    'Thêm kế hoạch tuyển dụng', // 1
    'Cập nhật kế hoạch tuyển dụng', // 2
    'Xóa kế hoạch tuyển dụng', // 3
    'Cập nhật tiến độ thực hiện', // 4
    'Cập nhật tiêu chuẩn tuyển dụng', // 5
    'Thêm đề xuất vị trí cần tuyển', // 6
    'Cập nhật đề xuất vị trí cần tuyển', // 7
    'Đề xuất đến trưởng đơn vị duyệt', // 8
    'Trưởng đơn vị duyệt kế hoạch tuyển dụng', // 9
    'Trưởng đơn vị không duyệt kế hoạch tuyển dụng', // 10
    'Đề xuất kế hoạch tuyển dụng đến ban ĐHQGHN', // 11
    'Trưởng đơn vị thu hồi đề xuất', // 12
    'Ban ĐHQGHN duyệt kế hoạch tuyển dụng', // 13
    'Ban ĐHQGHN không duyệt kế hoạch tuyển dụng', // 14
    'Trưởng đơn vị duyệt và gửi kế hoạch tuyển dụng', // 15
];

@Pipe({ name: 'noiDungLichSuKeHoach' })
export class TranferNoiDungLichSuKeHoachPipe implements PipeTransform {
    transform(index: number | 0): string {
        return noiDungLichSus[index];
    }
}
