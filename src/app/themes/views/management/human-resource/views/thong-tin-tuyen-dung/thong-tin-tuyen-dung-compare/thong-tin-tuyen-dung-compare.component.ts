import {Component, OnDestroy, OnInit} from '@angular/core';
import {HRM_KEY, INhanSuThongTinTuyenDung, TrangThaiDuLieuEnum} from '@themes/views/management/human-resource/_models';
import {BaseHumanResourceCompareComponent} from '@themes/views/management/human-resource/_base/base-human-resource-compare.component';
import {IDuyetThongTinNhanSuModel} from '@themes/views/management/human-resource/_models/duyet-thong-tin-nhan-su.model';
import {CustomTranslateService} from '@core/services/common';
import {DuyetThongTinNhanSuComponent} from '@themes/views/management/human-resource/components/duyet-thong-tin-nhan-su/duyet-thong-tin-nhan-su.component';
import {WindowCloseResult, WindowService} from '@progress/kendo-angular-dialog';

@Component({
    selector: 'app-thong-tin-tuyen-dung-compare',
    templateUrl: '../../../_template/compare-data.html',
    styleUrls: ['./thong-tin-tuyen-dung-compare.component.scss'],
})
export class ThongTinTuyenDungCompareComponent
    extends BaseHumanResourceCompareComponent<INhanSuThongTinTuyenDung>
    implements OnInit, OnDestroy {
    protected objectKeys = {
        soTruongCongTac: 'Sở trưởng công tác',
        congViecDuocGiao: 'Công việc được giao',
        ngheNghiepTuyenDung: 'Nghề nghiệp tuyển dụng',
        coQuanTuyenDung: 'Cơ quan tuyển dụng',
        ghiChu: 'Ghi chú',
        ngayTuyenDung: 'Ngày tuyển dụng',
        ngayNhanViec: 'Ngày nhận việc',
        namVaoNganhGiaoDuc: 'Năm vào ngành giáo dục',
        ngayBatDauNN: 'Ngày bắt đầu NN',
        ngayBatDauDHQG: 'Ngày bắt đầu DHQG',
        tenNguonTuyenDung: 'Tên nguồn tuyển dụng',
        hinhThucTraLuong: 'Hình thức trả lương',
        tenNhomViTriViecLam: 'Tên nhóm vị trí việc làm',
        tenKeHoachTuyenDung: 'Tên kế hoạch tuyển dụng',
        tenViTriViecLam: 'Tên vị trí việc làm',
        hoTenNguoiTuyen: 'Người tuyển',
        viecLamLauNhat: 'Công việc đã làm lâu nhất',
        ngayDeXuat: 'Ngày đề xuất'
    };

    protected exceptKeys = [
        'id',
        'idNhanSu',
        'maNhanSu',
        'idTrangThaiDuLieu',
        'idNguonTuyenDung',
        'idNguoiTuyenDung',
        'idNhomViTriViecLam',
        'idViTriViecLam',
        'idKeHoachTuyenDung',
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

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    onApprove(flag: boolean) {
        const body: IDuyetThongTinNhanSuModel = {
            duyetToanBo: false,
            idNhanSu: this.compareData.idNhanSu,
            idTrangThaiDuLieu: flag ? TrangThaiDuLieuEnum.SU_DUNG_CHINH : TrangThaiDuLieuEnum.KHONG_DUYET,
            idNhanSuTuyenDung: this.compareData.id,
        };

        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('LB.CONFIRM'),
            content: DuyetThongTinNhanSuComponent,
            width: 600,
            top: 10,
            // autoFocusedElement: 'm-portlet',
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

    setStyleAttribute(element: HTMLElement, attrs: { [key: string]: object }): void {
        if (attrs !== undefined) {
            Object.keys(attrs).forEach((key: string) => {
                element.style[key] = attrs[key];
            });
        }
    }
}
