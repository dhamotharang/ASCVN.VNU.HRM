import {Component, OnInit} from '@angular/core';
import {BaseHumanResourceCompareComponent} from '@themes/views/management/human-resource/_base/base-human-resource-compare.component';
import {INhanSuSucKhoe, TrangThaiDuLieuEnum} from '@themes/views/management/human-resource/_models';
import {IDuyetThongTinNhanSuModel} from '@themes/views/management/human-resource/_models/duyet-thong-tin-nhan-su.model';
import {CustomTranslateService} from '@core/services/common';
import {DuyetThongTinNhanSuComponent} from '@themes/views/management/human-resource/components/duyet-thong-tin-nhan-su/duyet-thong-tin-nhan-su.component';
import {WindowCloseResult, WindowService} from '@progress/kendo-angular-dialog';

@Component({
    selector: 'app-tinh-trang-suc-khoe-compare',
    templateUrl: '../../../_template/compare-data.html',
    styleUrls: ['./tinh-trang-suc-khoe-compare.component.scss'],
})
export class TinhTrangSucKhoeCompareComponent extends BaseHumanResourceCompareComponent<INhanSuSucKhoe> implements OnInit {
    protected objectKeys = {
        canNang: 'Cân nặng',
        chieuCao: 'Chiều cao',
        ghiChu: 'Ghi chú',
        tenNhomMau: 'Tên nhóm máu',
        tenTrinhTrangSucKhoe: 'Tên trình trạng sức khỏe',
        tenFile: 'Tên tập tin đính kèm',
        ngayDeXuat: 'Ngày đề xuất'
    };

    protected exceptKeys = [
        'id',
        'idNhanSu',
        'idTrangThaiDuLieu',
        'idTinhTrangSucKhoe',
        'idNhomMau',
        'idFileDinhKem',
        'type',
        'size',
        'path',
        'forWeb',
        'checkSum',
        'guidId',
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
            idNhanSuSucKhoe: this.compareData.id,
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
