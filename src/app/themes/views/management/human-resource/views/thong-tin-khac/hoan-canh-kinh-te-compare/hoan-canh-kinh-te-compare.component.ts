import { Component, OnInit } from '@angular/core';
import { BaseHumanResourceCompareComponent } from '@themes/views/management/human-resource/_base/base-human-resource-compare.component';
import { INhanSuChiTiet, INhanSuHoanCanhKinhTe, INhanSuThongTinKhac, TrangThaiDuLieuEnum } from '@themes/views/management/human-resource/_models';
import { IDuyetThongTinNhanSuModel } from '@themes/views/management/human-resource/_models/duyet-thong-tin-nhan-su.model';
import { CustomTranslateService } from '@core/services/common';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { DuyetThongTinNhanSuComponent } from '../../../components';

@Component({
    selector: 'app-hoan-canh-kinh-te-compare',
    templateUrl: '../../../_template/compare-data.html',
    styleUrls: ['./hoan-canh-kinh-te-compare.component.scss']
})
export class HoanCanhKinhTeCompareComponent extends BaseHumanResourceCompareComponent<INhanSuHoanCanhKinhTe> implements OnInit {
    protected objectKeys = {
        nguonThuNhapChinh: 'Nguồn thu nhập chính',
        nguonKhac: 'Thu nhập khác',
        tenNhaOTuMua: 'Nhà ở tự mua',
        tenNhaODuocCap: 'Nhà ở được cấp',
        dienTichNhaOTuMua: 'Diện tích nhà ở tự mua',
        dienTichNhaODuocCap: 'Diện tích nhà ở được cấp',
        dienTichDatOTuMua: 'Diện tích đất ở tự mua',
        dienTichDatODuocCap: 'Diện tích đát ở được cấp',
        datSanXuatKinhDoanh: 'Đất sản xuất kinh doanh',
        dienTichDatSanXuatKinhDoanh: 'Diện tích đất sản xuất, kinh doanh',
        ngayDeXuat: 'Ngày đề xuất'
    };

    protected exceptKeys = [
        'id',
        'idTrangThaiDuLieu',
        'idNhanSu'
    ];

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
            idNhanSuHoanCanhKinhTe: this.compareData.id,
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

        const elem = document.querySelector('.cdk-overlay-container');
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
