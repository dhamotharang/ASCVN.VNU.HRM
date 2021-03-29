import { Pipe, PipeTransform } from '@angular/core';

const trangThais = [
    'Tạo mới',
    'Đề xuất',
    'Trưởng đơn vị duyệt',
    'Trưởng đơn vị không duyệt',
    'Chấm dứt hợp đồng'
];

@Pipe({ name: 'trangThaiHopDong' })
export class TranferTrangThaiHopDongPipe implements PipeTransform {
    transform(status: number): string {
        return trangThais[status - 1];
    }
}
