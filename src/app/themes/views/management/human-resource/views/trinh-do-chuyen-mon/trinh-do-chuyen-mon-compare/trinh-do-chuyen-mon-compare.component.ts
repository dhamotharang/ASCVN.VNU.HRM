import {Component, OnInit} from '@angular/core';
import {BaseHumanResourceCompareComponent} from '@themes/views/management/human-resource/_base/base-human-resource-compare.component';
import {INhanSuTrinhDo, TrangThaiDuLieuEnum} from '@themes/views/management/human-resource/_models';
import {IDuyetThongTinNhanSuModel} from '@themes/views/management/human-resource/_models/duyet-thong-tin-nhan-su.model';
import {CustomTranslateService} from '@core/services/common';
import {DuyetThongTinNhanSuComponent} from '@themes/views/management/human-resource/components/duyet-thong-tin-nhan-su/duyet-thong-tin-nhan-su.component';
import {WindowCloseResult, WindowService} from '@progress/kendo-angular-dialog';

@Component({
    selector: 'app-trinh-do-chuyen-mon-compare',
    templateUrl: '../../../_template/compare-data.html',
    styleUrls: ['./trinh-do-chuyen-mon-compare.component.scss'],
})
export class TrinhDoChuyenMonCompareComponent extends BaseHumanResourceCompareComponent<INhanSuTrinhDo> implements OnInit {
    protected objectKeys = {
        trinhDoNgoaiNgu: 'Trình độ ngoại ngữ',
        trinhDoViTinh: 'Trình độ vi tính',
        ghiChu: 'Ghi chú',
        tenTrinhDoVanHoa: 'Trình độ giáo dục phổ thông',
        tenTrinhDoChinhTri: 'Trình độ chính trị',
        tenTrinhDoNhaNuoc: 'Trình độ nhà nước',
        trinhDoNghiepVuTheoChuyenNganh: 'Trình độ nghiệp vụ theo chuyên ngành',
        ngayDeXuat: 'Ngày đề xuất'
    };

    protected exceptKeys = ['id', 'idNhanSu', 'idTrangThaiDuLieu', 'idTrinhDoVanHoa', 'idTrinhDoChinhTri', 'idTrinhDoNhaNuoc', 'compareData'];

    constructor(
        private windowService: WindowService,
        private translate: CustomTranslateService
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
            idNhanSuTrinhDo: this.compareData.id,
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
