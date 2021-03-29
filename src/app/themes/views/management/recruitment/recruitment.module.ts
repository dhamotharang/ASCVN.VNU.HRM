import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecruitmentComponent } from './recruitment.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '@core/guards/auth.guard';
import { GridModule } from '@progress/kendo-angular-grid';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { FieldErrorModule } from '@shared/containers/field-error';
import { AscSelectModule } from '@shared/containers/asc-select/asc-select.module';
import { AscUploadModule } from '@shared/containers/asc-upload/asc-upload.module';
import { WidgetModule } from '@shared/widgets/widget.module';
import { CustomPipeModule } from '@shared/pipes/custom-pipe.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import {
    NzButtonModule,
    NzDatePickerModule,
    NzDropDownModule,
    NzIconModule,
    NzInputNumberModule,
    NzModalModule,
    NzNotificationModule,
    NzResultModule,
    NzSelectModule,
    NzTabsModule,
    NzToolTipModule,
    NzUploadModule,
    NzPopoverModule,
    NzDividerModule,
    NzBackTopModule,
    NzTableModule,
} from 'ng-zorro-antd';
import {
    ChamDutHopDongComponent,
    CheDoLamViecComponent,
    DuyetHopDongCaNhanComponent,
    FormBaoCaoTapSuComponent,
    FormDanhGiaBaoCaoTapSuComponent,
    FormDinhBienComponent,
    FormKeHoachDeXuatComponent,
    FormKeHoachTuyenDungComponent,
    FormQdPhanCongHdTapSuComponent,
    FormTaoHopDongComponent,
    FormTaoQuyetDinhComponent,
    HopDongPhuCapComponent,
    QuyenVaNghiaVuComponent,
    ThongTinHopDongComponent,
    ThongTinKeHoachComponent,
    TienDoThucHienComponent,
    TieuChuanTuyenDungComponent,
    ViTriCanTuyenComponent,
    XacNhanHopDongComponent,
    XemChiTietKeHoachComponent,
    DuyetKeHoachComponent,
    LichSuKeHoachComponent,
    FormDuyetHopDongTruongDonViComponent,
    FormSaoChepDinhBienComponent,
    XemDanhMucThayDoiThongTinComponent,
    FormNhapHoSoTuyenDungComponent,
    FormCapNhatTaiKhoanComponent,
    FormHopDongTuyenDungComponent,
    FormQdPcHdTapSuComponent,
    DeXuatHopDongComponent,
    FormChiTietBaoCaoComponent,
} from './components';
import {
    BaoCaoTapSuComponent,
    DanhGiaBaoCaoTapSuComponent,
    DinhBienComponent,
    DuyetHoSoUngVienComponent,
    DuyetKhtdBanQuanLyComponent,
    DuyetKhtdDonViComponent,
    HopDongCaNhanComponent,
    KeHoachTuyenDungComponent,
    QdPhanCongHdTapSuComponent,
    QuanLyHopDongComponent,
    ThongKeNhanSuTheoViTriComponent,
    ThongKeTuyenDungNhanSuComponent,
    NhapHoSoTuyenDungComponent,
    DuyetHopDongTruongDonViComponent,
    QuyetDinhTuyenDungComponent,
    ThongTinTapSuCaNhanComponent,
} from './views';
import { FormDirectiveModule } from '@shared/directives/forms';
import { SharedDirectiveModule } from '@shared/directives/shared-directive.module';
import { TranferManHinhDuyetThongTinNhanSuPipe } from '@shared/pipes/tranfer-man-hinh-duyet-thong-tin-nhan-su.pipe';
import { LayoutModule } from '@progress/kendo-angular-layout';

const routes: Routes = [
    {
        path: '',
        component: RecruitmentComponent,
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'dinh-bien',
                component: DinhBienComponent,
            },
            {
                path: 'thong-ke-nhan-su-theo-vi-tri',
                component: ThongKeNhanSuTheoViTriComponent,
            },
            {
                path: 'thong-ke-tuyen-dung-nhan-su',
                component: ThongKeTuyenDungNhanSuComponent,
            },
            {
                path: 'ke-hoach-tuyen-dung',
                component: KeHoachTuyenDungComponent,
            },
            {
                path: 'don-vi-duyet-ke-hoach',
                component: DuyetKhtdDonViComponent,
            },
            {
                path: 'ban-duyet-ke-hoach',
                component: DuyetKhtdBanQuanLyComponent,
            },
            {
                path: 'duyet-ho-so-ung-vien',
                component: DuyetHoSoUngVienComponent,
            },
            {
                path: 'qd-phan-cong-hd-tap-su',
                component: QdPhanCongHdTapSuComponent,
            },
            {
                path: 'quan-ly-hop-dong',
                component: QuanLyHopDongComponent,
            },
            {
                path: 'danh-sach-hop-dong-ca-nhan',
                component: HopDongCaNhanComponent,
            },
            {
                path: 'bao-cao-cong-viec-tap-su',
                component: ThongTinTapSuCaNhanComponent,
            },
            {
                path: 'danh-gia-bao-cao-tap-su',
                component: DanhGiaBaoCaoTapSuComponent,
            },
            {
                path: 'nhap-ho-so-ung-vien',
                component: NhapHoSoTuyenDungComponent,
            },
            {
                path: 'duyet-hd-truong-don-vi',
                component: DuyetHopDongTruongDonViComponent,
            },
            {
                path: 'quyet-dinh-tuyen-dung',
                component: QuyetDinhTuyenDungComponent,
            },
            // {
            //     path: 'thong-tin-tap-su-ca-nhan',
            //     component: ThongTinTapSuCaNhanComponent,
            // },
        ],
    },
];

const AllModules = [
    GridModule,
    DialogsModule,
    TooltipModule,
    NgxSpinnerModule,
    NzNotificationModule,
    NzModalModule,
    NzToolTipModule,
    NzSelectModule,
    NzTabsModule,
    NzButtonModule,
    NzInputNumberModule,
    NzIconModule,
    NzDropDownModule,
    NzDatePickerModule,
    NzResultModule,
    FieldErrorModule,
    AscSelectModule,
    WidgetModule,
    CustomPipeModule,
    AscUploadModule,
    TranslateModule,
    NzUploadModule,
    NzPopoverModule,
    NzDividerModule,
    FormDirectiveModule,
    SharedDirectiveModule,
    LayoutModule,
    NzBackTopModule,
    NzTableModule,
];

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(routes), AllModules],
    declarations: [
        TranferManHinhDuyetThongTinNhanSuPipe,
        RecruitmentComponent,
        DinhBienComponent,
        FormDinhBienComponent,
        ThongKeNhanSuTheoViTriComponent,
        KeHoachTuyenDungComponent,
        FormKeHoachTuyenDungComponent,
        FormKeHoachDeXuatComponent,
        DuyetKhtdDonViComponent,
        DuyetKhtdBanQuanLyComponent,
        QdPhanCongHdTapSuComponent,
        FormQdPhanCongHdTapSuComponent,
        QuanLyHopDongComponent,
        FormTaoHopDongComponent,
        ThongKeTuyenDungNhanSuComponent,
        HopDongCaNhanComponent,
        XacNhanHopDongComponent,
        DuyetHopDongCaNhanComponent,
        ThongTinHopDongComponent,
        CheDoLamViecComponent,
        QuyenVaNghiaVuComponent,
        HopDongPhuCapComponent,
        BaoCaoTapSuComponent,
        FormBaoCaoTapSuComponent,
        DanhGiaBaoCaoTapSuComponent,
        FormDanhGiaBaoCaoTapSuComponent,
        TienDoThucHienComponent,
        ViTriCanTuyenComponent,
        ThongTinKeHoachComponent,
        TieuChuanTuyenDungComponent,
        ChamDutHopDongComponent,
        DuyetHoSoUngVienComponent,
        FormTaoQuyetDinhComponent,
        XemChiTietKeHoachComponent,
        NhapHoSoTuyenDungComponent,
        DuyetKeHoachComponent,
        LichSuKeHoachComponent,
        DuyetHopDongTruongDonViComponent,
        FormDuyetHopDongTruongDonViComponent,
        FormSaoChepDinhBienComponent,
        XemDanhMucThayDoiThongTinComponent,
        FormNhapHoSoTuyenDungComponent,
        QuyetDinhTuyenDungComponent,
        FormCapNhatTaiKhoanComponent,
        FormHopDongTuyenDungComponent,
        DeXuatHopDongComponent,
        FormQdPcHdTapSuComponent,
        ThongTinTapSuCaNhanComponent,
        FormChiTietBaoCaoComponent,
    ],
})
export class RecruitmentModule {}
