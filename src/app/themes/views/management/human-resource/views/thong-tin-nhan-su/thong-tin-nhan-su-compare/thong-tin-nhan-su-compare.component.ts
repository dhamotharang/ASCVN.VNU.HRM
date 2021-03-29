import {Component, OnInit} from '@angular/core';
import {BaseHumanResourceCompareComponent} from '@themes/views/management/human-resource/_base/base-human-resource-compare.component';
import {INhanSuChiTiet, TrangThaiDuLieuEnum} from '@themes/views/management/human-resource/_models';
import {IDuyetThongTinNhanSuModel} from '@themes/views/management/human-resource/_models/duyet-thong-tin-nhan-su.model';
import {CustomTranslateService} from '@core/services/common';
import {WindowCloseResult, WindowService} from '@progress/kendo-angular-dialog';
import { DuyetThongTinNhanSuComponent } from '../../../components';

@Component({
    selector: 'app-thong-tin-nhan-su-compare',
    templateUrl: '../../../_template/compare-data.html',
    styleUrls: ['./thong-tin-nhan-su-compare.component.scss'],
})
export class ThongTinNhanSuCompareComponent extends BaseHumanResourceCompareComponent<INhanSuChiTiet> implements OnInit {
    protected objectKeys = {
        userName: 'UserName',
        tenDonViTrucThuoc: 'Tên Đơn vị trực thuộc',
        maNhanSu: 'Mã nhân sự',
        hoDem: 'Họ đệm',
        ten: 'Tên',
        tenGoiKhac: 'Tên gọi khác',
        tenGioiTinh: 'Tên giới tính',
        email: 'Email',
        soDienThoai: 'Số điện thoại',
        tenLoaiNhanSu: 'Tên loại nhân sự',
        tenCoQuan: 'Tên cơ quan',
        tenChucDanh: 'Tên chức danh',
        tenChucVu: 'Tên chức vụ',
        tenNgachCongChuc: 'Tên ngạch công chức',
        tenHinhNhanSu: 'Tên hình nhân sự',
        tenLoaiHopDong: 'Tên loại hợp đồng',
        stt: 'STT',
        tenTrangThaiNhanSu: 'Tên trạng thái nhân sự',
        ghiChuNhanSu: 'Ghi chú nhân sự',
        ghiChuNhanSuChiTiet: 'Ghi chú nhân sự chi tiết',
        ngaySinh: 'Ngày sinh',
        emailNoiBo: 'Email nội bộ',
        isGiangVien: 'Là Giảng viên',
        isNghienCuuVien: 'Là nghiên cưu sinh',
        isThamGiaNVCL: 'Là tham gia NVCL',
        isThamGiaGiangDayCL: 'Là tham gia giảng dạy CL',
        isThamGiaQuanLyCL: 'Là tham gia quản lý CL',
        isQuanLySach: 'Là quản lý sách',
        tenDoiTuongDanhGia: 'Tên đối tượng đánh giá',
        lyDoDuyet: 'Lý do duyệt',
        soCMND: 'Số CMND',
        ngayCapCMND: 'Ngày cấp CMND',
        tenDanToc: 'Tên dân tộc',
        tenTonGiao: 'Tên tôn giáo',
        tenGiaDinhChinhSach: 'Tên Gia đình chính sách',
        noiSinh_TenTinh: 'Nơi sinh - Tỉnh',
        noiSinh_TenHuyen: 'Nơi sinh - Huyện',
        noiSinh_TenPhuongXa: 'Nơi sinh - Phường xã',
        queQuan_TenTinh: 'Quê quán - Tỉnh',
        queQuan_TenHuyen: 'Quê quán - Huyện',
        queQuan_TenPhuongXa: 'Quê quán - Phường xã',
        queQuan_TenQuocGia: 'Quê quán - Quốc gia',
        queQuan_SoNha: 'Quê quán - Số nhà',
        hktT_TenQuocGia: 'Hộ khẩu thường trú - Quốc gia',
        hktT_TenTinh: 'Hộ khẩu thường trú - Tỉnh',
        hktT_TenHuyen: 'Hộ khẩu thường trú - Huyện',
        hktT_TenPhuongXa: 'Hộ khẩu thường trú - Phường xã',
        hktT_SoNha: 'Hộ khẩu thường trú - Số nhà',
        dclL_TenTinh: 'Địa chỉ liên lạc - Tỉnh',
        dclL_TenHuyen: 'Địa chỉ liên lạc - Huyện',
        dclL_TenPhuongXa: 'Địa chỉ liên lạc - Phường xã',
        dclL_SoNha: 'Địa chỉ liên lạc - Sô nhà',
        dclL_TenQuocGia: 'Địa chỉ liên lạc - Quốc gia',
        noiCapCMND: 'Nơi cấp CMND',
        hoChieu: 'Hộ chiếu',
        ngayCapHoChieu: 'Ngày cấp hộ chiếu',
        noiCapHoChieu: 'Nơi cấp hộ chiếu',
        noiSinh_TenQuocGia: 'Nơi sinh - Quốc gia',
        noiSinh_SoNha: 'Nơi sinh - Số nhà',
        dienThoaiNhaRieng: 'Điện thoại nhà riêng',
        dienThoaiCoQuan: 'Điện thoại cơ quan',
        soBHXH: 'Số BHXH',
        tenTinhTrangHonNhan: 'Tình trạng hôn nhân',
        tenDoiTuongChinhSach: 'Đối tượng chính sách',
        tenThanhPhanGiaDinh: 'Thành phần gia đình',
        soSoLaoDong: 'Số sổ lao động',
        ngayCapSoLaoDong: 'Ngày cấp sổ lao động',
        noiCapSoLaoDong: 'Nơi cấp sổ lao động',
        ngayDeXuat: 'Ngày đề xuất',
        tenQuocTich: 'Quốc tịch'
    };

    protected exceptKeys = [
        'id',
        'idTrangThaiDuLieu',
        'idNhanSu',
        'idLoaiNhanSu',
        'idCoQuan',
        'idChucVu',
        'idHinhNhanSu',
        'idChucDanh',
        'idLoaiHopDong',
        'idUser',
        'idTrangThaiNhanSu',
        'idDoiTuongDanhGia',
        'idGioiTinh',
        'idDanToc',
        'idQuocTich',
        'idTonGiao',
        'idGiaDinhChinhSach',
        'noiSinh_IDTinh',
        'noiSinh_IDHuyen',
        'noiSinh_IDPhuongXa',
        'queQuan_IDTinh',
        'queQuan_IDHuyen',
        'queQuan_IDPhuongXa',
        'queQuan_IDQuocGia',
        'hktT_IDQuocGia',
        'hktT_IDTinh',
        'hktT_IDHuyen',
        'hktT_IDPhuongXa',
        'dclL_IDTinh',
        'dclL_IDHuyen',
        'dclL_IDPhuongXa',
        'dclL_IDQuocGia',
        'noiSinh_IDQuocGia',
        'idTinhTrangHonNhan',
        'idFileDinhKem',
        'isVisible',
        'idNhanSuChiTiet',
        'idNhanSuDuyet',
        'pathHinhNhanSu',
        'sizeHinhNhanSu',
        'nameHinhNhanSu',
        'forWebHinhNhanSu',
        'checkSumHinhNhanSu',
        'idNhanSuLuong',
        'idNgach',
        'idTrinhDoChuyenMon',
        'tenCoQuanPrint',
        'idCoQuanCap1',
        'idChucDanhKhoaHoc',
        'idTrinhDoChinhTri',
        'tenCoQuanCap1',
        'idThanhPhanGiaDinh',
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
            idNhanSuChiTiet: this.compareData.idNhanSuChiTiet,
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
