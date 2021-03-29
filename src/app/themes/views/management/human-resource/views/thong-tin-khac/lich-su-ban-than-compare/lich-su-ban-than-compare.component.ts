import { Component, OnInit } from '@angular/core';
import { BaseHumanResourceCompareComponent } from '@themes/views/management/human-resource/_base/base-human-resource-compare.component';
import { INhanSuChiTiet, INhanSuLichSuBanThan, INhanSuThongTinKhac, TrangThaiDuLieuEnum } from '@themes/views/management/human-resource/_models';
import { IDuyetThongTinNhanSuModel } from '@themes/views/management/human-resource/_models/duyet-thong-tin-nhan-su.model';
import { CustomTranslateService } from '@core/services/common';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { DuyetThongTinNhanSuComponent } from '../../../components';

@Component({
    selector: 'app-lich-su-ban-than-compare',
    templateUrl: '../../../_template/compare-data.html',
    styleUrls: ['./lich-su-ban-than-compare.component.scss']
})
export class LichSuBanThanCompareComponent extends BaseHumanResourceCompareComponent<INhanSuLichSuBanThan> implements OnInit {
    protected objectKeys = {
        tienAnTienSu: 'Tiểu sử cá nhân',
        lamViecCheDoCu: 'Làm việc chế độ cũ',
        thamGiaToChucNuocNgoai: 'Tham gia tổ chức chính trị xã hội nước ngoài',
        thamGiaToChucChinhTri: 'Tham gia tổ chức chính trị xã hội',
        thanNhanNuocNgoai: 'Có thân nhân nước ngoài',
        nhanXet: 'Nhận xét, đánh giá',
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
            idNhanSuLichSuCaNhan: this.compareData.id,
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
