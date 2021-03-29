import {Component, OnInit} from '@angular/core';
import {BaseHumanResourceCompareComponent} from '@themes/views/management/human-resource/_base/base-human-resource-compare.component';
import {INhanSuThongTinLuong, TrangThaiDuLieuEnum} from '@themes/views/management/human-resource/_models';
import {IDuyetThongTinNhanSuModel} from '@themes/views/management/human-resource/_models/duyet-thong-tin-nhan-su.model';
import {ApiService} from '@core/data-services/api.service';
import {CustomTranslateService} from '@core/services/common';
import {DuyetThongTinNhanSuComponent} from '@themes/views/management/human-resource/components/duyet-thong-tin-nhan-su/duyet-thong-tin-nhan-su.component';
import {WindowCloseResult, WindowService} from '@progress/kendo-angular-dialog';

@Component({
    selector: 'app-thong-tin-luong-compare',
    templateUrl: '../../../_template/compare-data.html',
    styleUrls: ['./thong-tin-luong-compare.component.scss'],
})
export class ThongTinLuongCompareComponent extends BaseHumanResourceCompareComponent<INhanSuThongTinLuong> implements OnInit {
    protected objectKeys = {
        tenNhomNgach: 'Nhóm chức danh nghề nghiệp',
        maNgach: 'Mã chức danh nghề nghiệp',
        bacLuong: 'Bậc lương',
        heSoLuong: 'Hệ số lương',
        vuotKhung: 'Vượt khung',
        phuCapNgheNghiep: 'Phụ cấp nghề nghiệp',
        phuCapThamNien: 'Phụ cấp thâm niên',
        phuCapChucVu: 'Phụ cấp chức vụ',
        ngayBatDau: 'Ngày bắt đầu',
        ngayKetThuc: 'Ngày kết thúc',
        ngayHuongHeSoLuong: 'Ngày hưởng hệ số lương',
        soQuyetDinh: 'Số quyết định',
        ngayTangLuongTiepTheo: 'Ngày tăng lương tiếp theo',
        ghiChu: 'Ghi chú',
        tenNgach: 'Chức danh nghề nghiệp',
        tenBac: 'Tên bậc',
        maQuyetDinh: 'Mã quyết định',
        ngayDeXuat: 'Ngày đề xuất'
    };

    protected exceptKeys = ['id', 'idTrangThaiDuLieu', 'idNhanSu', 'idNhomNgach', 'idNgach', 'idBacLuong', 'idQuyetDinh'];

    constructor(
        private apiService: ApiService,
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
            idNhanSuLuong: this.compareData.id,
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
        elem.setAttribute("style", "z-index: 1000 !important");
        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.closePopover.emit(true);
                elem.removeAttribute("style");
            }
        });
    }
}
