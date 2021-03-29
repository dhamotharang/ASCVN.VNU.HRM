import {Component, OnInit} from '@angular/core';
import {BaseHumanResourceCompareComponent} from '@themes/views/management/human-resource/_base/base-human-resource-compare.component';
import {IThongTinDoanDang, TrangThaiDuLieuEnum} from '@themes/views/management/human-resource/_models';
import {IDuyetThongTinNhanSuModel} from '@themes/views/management/human-resource/_models/duyet-thong-tin-nhan-su.model';
import {CustomTranslateService} from '@core/services/common';
import {DuyetThongTinNhanSuComponent} from '@themes/views/management/human-resource/components/duyet-thong-tin-nhan-su/duyet-thong-tin-nhan-su.component';
import {WindowCloseResult, WindowService} from '@progress/kendo-angular-dialog';

@Component({
    selector: 'app-thong-tin-doan-dang-compare',
    templateUrl: '../../../_template/compare-data.html',
    styleUrls: ['./thong-tin-doan-dang-compare.component.scss'],
})
export class ThongTinDoanDangCompareComponent extends BaseHumanResourceCompareComponent<IThongTinDoanDang> implements OnInit {
    protected objectKeys = {
        ngayVaoDoan: 'Ngày vào Đoàn',
        isDangVien: 'Là Đảng viên',
        ngayVaoDang: 'Ngày vào Đảng',
        ngayChinhThucVaoDang: 'Ngày chính thức vào Đảng',
        noiKetNapDang: 'Nơi kết nạp Đảng',
        noiSinhHoatDangHienTai: 'Nơi sinh hoạt Đảng hiện tại',
        isThamGiaQuanDoi: 'Có tham gia quân đội',
        ngayNhapNgu: 'Ngày nhập ngũ',
        ngayXuatNgu: 'Ngày xuất ngũ',
        isThuongBinh: 'Là thương binh',
        soThuongTat: 'Số thương tật',
        hinhThucThuongTat: 'Hình thức thương tật',
        noiKetNapDoan: 'Nơi kết nạp Đoàn',
        ngayVaoCongDoan: 'Ngày vào Công Đoàn',
        noiDung: 'Nội dung',
        ghiChu: 'Ghi chú',
        tenChucVuDoan: 'Tên chức vụ Đoàn',
        tenChucVuDang: 'Tên chức vụ Đảng',
        tenQuanHam: 'Tên quân hàm',
        tenChucVuCuuChienBinh: 'Tên chức vụ Cựu chiến binh',
        tenLoaiThuongBinh: 'Tên loại thương binh',
        tenChucVuCongDoan: 'Tên chức vụ Công Đoàn',
        ngayThamGiaCachMang: 'Ngày tham gia cách mạng',
        ngayDeXuat: 'Ngày đề xuất'
    };

    protected exceptKeys = [
        'id',
        'idNhanSu',
        'idTrangThaiDuLieu',
        'idChucVuDoan',
        'idChucVuDang',
        'idQuanHam',
        'idLoaiThuongBinh',
        'idChucVuCongDoan',
        'compareData',
    ];

    constructor(
        private translate: CustomTranslateService,
        private windowService: WindowService
    ) {
        super();
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    onApprove(flag: boolean) {
        const body: IDuyetThongTinNhanSuModel = {
            duyetToanBo: false,
            idNhanSu: this.compareData.idNhanSu,
            idTrangThaiDuLieu: flag ? TrangThaiDuLieuEnum.SU_DUNG_CHINH : TrangThaiDuLieuEnum.KHONG_DUYET,
            idNhanSuDoanDang: this.compareData.id,
        };

        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('LB.CONFIRM'),
            content: DuyetThongTinNhanSuComponent,
            width: 600,
            top: 10,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.body = body;

        const elem = document.querySelector('.cdk-overlay-container') ;
        elem.setAttribute('style', 'z-index: 1000 !important');
        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.closePopover.emit(true);
                elem.removeAttribute('style');
            }
        });
    }
}
