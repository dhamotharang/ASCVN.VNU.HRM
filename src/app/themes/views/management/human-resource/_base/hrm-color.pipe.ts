import { Pipe, PipeTransform } from '@angular/core';
import { TrangThaiDuLieuEnum } from '@themes/views/management/human-resource/_models';

@Pipe({
    name: 'hrmColor',
})
export class HrmColorPipe implements PipeTransform {
    transform(trangThai: TrangThaiDuLieuEnum): string {
        if (trangThai === TrangThaiDuLieuEnum.SU_DUNG_CHINH) {
            return 'label_success';
        } else if (trangThai === TrangThaiDuLieuEnum.CHO_CAP_NHAT) {
            return 'label_success';
        } else if (trangThai === TrangThaiDuLieuEnum.DE_XUAT) {
            return 'label_warning';
        } else if (trangThai === TrangThaiDuLieuEnum.KHONG_DUYET) {
            return 'label_danger';
        } else if (trangThai === TrangThaiDuLieuEnum.SU_DUNG_PHU) {
            // return 'label_default';
            return 'label_success';
        } else if (trangThai === TrangThaiDuLieuEnum.KHONG_SU_DUNG) {
            return 'label_default';
        } else {
            return 'label_default';
        }
    }
}
