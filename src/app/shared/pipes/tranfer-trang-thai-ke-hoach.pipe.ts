import { Pipe, PipeTransform } from '@angular/core';

const trangThais = [
    'Tạo mới',
    'Đề xuất',
    'Trưởng đơn vị duyệt',
    'Trưởng đơn vị không duyệt',
    'ĐHQGHN duyệt',
    'ĐHQGHN không duyệt'
];

@Pipe({ name: 'trangThaiKeHoach' })
export class TranferTrangThaiKeHoachPipe implements PipeTransform {
    transform(status: number): string {
        return trangThais[status - 1];
    }
}
