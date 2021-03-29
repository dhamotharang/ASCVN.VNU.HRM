import { Pipe, PipeTransform } from '@angular/core';
export const tinhTrangNhiemVus = ['', 'Đã nghiệm thu', 'Chưa nghiệm thu', 'Không hoàn thành'];
@Pipe({ name: 'tinhTrangNhiemVu' })
export class TranferTinhTrangNhiemVuPipe implements PipeTransform {
    transform(index: number | 0): string {
        return tinhTrangNhiemVus[index];
    }
}
