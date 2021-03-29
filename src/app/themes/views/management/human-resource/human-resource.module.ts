import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '@core/guards/auth.guard';

import { ViewFileModule } from '@shared/controls/view-file/view-file.module';
import { GridModule } from '@progress/kendo-angular-grid';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { ContextMenuModule } from '@progress/kendo-angular-menu';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { FieldErrorModule } from '@shared/containers/field-error/field-error.module';
import { AscSelectModule } from '@shared/containers/asc-select/asc-select.module';
import { CustomPipeModule } from '@shared/pipes/custom-pipe.module';
import { TranslateModule } from '@ngx-translate/core';
import { AscUploadModule } from '@shared/containers/asc-upload/asc-upload.module';
import { WidgetModule } from '@shared/widgets/widget.module';
import { HumanResourceComponent } from './human-resource.component';
import {
    FormNhanSuDoanDangComponent,
    FormNhanSuQuanHeGiaDinhComponent,
    FormNhanSuTinhTrangSucKhoeComponent,
    FormThongTinLuongComponent,
    FormThongTinNhanSuComponent,
    FormThongTinTuyenDungComponent,
    FormTrinhDoComponent,
    FormThongTinKhacComponent,
    HoSoCaNhanComponent,
    KhenThuongKyLuatComponent,
    // LichSuLuongComponent,
    QuanHeGiaDinhComponent,
    QuaTrinhCongTacKiemNhiemComponent,
    RedirectProfileComponent,
    ThongTinDoanDangComponent,
    ThongTinLuongComponent,
    ThongTinNhanSuComponent,
    ThongTinTuyenDungComponent,
    TinhTrangSucKhoeComponent,
    TraCuuNhanSuComponent,
    TrinhDoChuyenMonComponent,
    ThongTinTuyenDungCompareComponent,
    ThongTinDoanDangCompareComponent,
    ThongTinLuongCompareComponent,
    TinhTrangSucKhoeCompareComponent,
    TrinhDoChuyenMonCompareComponent,
    ThongTinNhanSuCompareComponent,
    ThongTinKhacComponent,
    ThongTinKhacCompareComponent,
    HoanCanhKinhTeCompareComponent,
    LichSuBanThanCompareComponent,
    ThongTinNhanSuChungComponent,
    // XacThucThongTinNhanSuComponent,
    PopupViewProfileComponent,
} from './views';
import {
    DaoTaoBoiDuongComponent,
    KiemNhiemComponent,
    QuaTrinhCongTacComponent,
    FormTrinhDoTinHocComponent,
    FormNhanSuQuaTrinhCongTacComponent,
    FormQuaTrinhDoanComponent,
    FormQuaTrinhDangComponent,
    FormQuaTrinhCongDoanComponent,
    FormNhanSuDaoTaoBoiDuongComponent,
    FormKiemNhiemComponent,
    FormUpdateLoaiDoiTuongDanhGiaComponent,
    QuaTrinhDoanComponent,
    QuaTrinhDangComponent,
    QuaTrinhCongDoanComponent,
    NhanSuTrinhDoNgoaiNguComponent,
    NhanSuTrinhDoTinHocComponent,
    NhanSuTrinhDoChuyenMonComponent,
    NhanSuChucDanhKhoaHocComponent,
    FormTrinhDoChuyenMonComponent,
    FormTrinhDoNgoaiNguComponent,
    FormChucDanhKhoaHocComponent,
    FormKyLuatComponent,
    KhenThuongComponent,
    KyLuatComponent,
    FormKhenThuongComponent,
    KhaiBaoTaiKhoanNhanSuComponent,
    ExportHoSoNhanSuComponent,
    QuanHeGiaDinhBanThanComponent,
    QuanHeGiaDinhHoHangComponent,
    DanhHieuThiDuaKhenThuongComponent,
    FormDanhHieuThiDuaKhenThuongComponent,
    DuyetThongTinNhanSuComponent,
    FormThongTinNhanSuChungComponent,
    PopupViewHoSoCaNhanComponent,
    TabViewThongTinChungComponent,
    TabViewThongTinTuyenDungComponent,
    TabViewQuaTrinhCongTacComponent,
    TabViewThongTinKhacComponent,
    TabViewTrinhDoChuyenMonComponent,
    TabViewChinhTriXaHoiComponent,
    TabViewKhenThuongKyLuatComponent,
    TabViewThongTinSucKhoeComponent,
    TabViewQuanHeGiaDinhComponent,
    TabViewThongTinLuongComponent,
} from './components';
import { HrmColorPipe } from './_base/hrm-color.pipe';
import { SharedDirectiveModule } from '@shared/directives';
import { NgxSpinnerModule } from 'ngx-spinner';
import { XacThucThongTinNhanSuComponent } from './views/xac-thuc-thong-tin-nhan-su/xac-thuc-thong-tin-nhan-su.component';
import { LichSuLuongComponent } from './views/thong-tin-luong/lich-su-luong/lich-su-luong.component';

const childRoutes = [
    {
        path: 'thong-tin-nhan-su',
        component: ThongTinNhanSuChungComponent,
    },
    {
        path: 'thong-tin-tuyen-dung',
        component: ThongTinTuyenDungComponent,
    },
    {
        path: 'trinh-do-chuyen-mon',
        component: TrinhDoChuyenMonComponent,
    },
    {
        path: 'doan-dang',
        component: ThongTinDoanDangComponent,
    },
    {
        path: 'thong-tin-luong',
        component: ThongTinLuongComponent,
    },
    {
        path: 'khen-thuong-ky-luat',
        component: KhenThuongKyLuatComponent,
    },
    {
        path: 'tinh-trang-suc-khoe',
        component: TinhTrangSucKhoeComponent,
    },
    {
        path: 'dao-tao-boi-duong',
        component: DaoTaoBoiDuongComponent,
    },
    {
        path: 'qua-trinh-cong-tac',
        component: QuaTrinhCongTacKiemNhiemComponent,
    },
    {
        path: 'quan-he-gia-dinh',
        component: QuanHeGiaDinhComponent,
    },
    {
        path: 'kiem-nhiem',
        component: KiemNhiemComponent,
    },
    {
        path: 'thong-tin-khac',
        component: ThongTinKhacComponent,
    },
];

const routes: Routes = [
    {
        path: '',
        component: HumanResourceComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'tra-cuu-nhan-su',
                component: TraCuuNhanSuComponent,
            },
            {
                path: 'cap-nhat-ho-so-ca-nhan',
                component: RedirectProfileComponent,
            },
            {
                path: 'ly-lich-nhan-su',
                component: HoSoCaNhanComponent,
                canActivateChild: [AuthGuard],
                children: childRoutes,
            },
            {
                path: 'ho-so-ca-nhan',
                component: HoSoCaNhanComponent,
                canActivateChild: [AuthGuard],
                children: childRoutes,
            },
            {
                path: 'duyet-ho-so-ca-nhan',
                component: HoSoCaNhanComponent,
                canActivateChild: [AuthGuard],
                children: childRoutes,
            },
            {
                path: 'ho-so-ung-vien',
                component: HoSoCaNhanComponent,
                canActivateChild: [AuthGuard],
                children: childRoutes,
            },
            {
                path: 'xac-thuc-thong-tin-nhan-su',
                component: XacThucThongTinNhanSuComponent,
            },
        ],
    },
];

const AllModules = [
    GridModule,
    ViewFileModule,
    NgxSpinnerModule,
    DialogsModule,
    TooltipModule,
    ContextMenuModule,
    NzNotificationModule,
    NzModalModule,
    NzToolTipModule,
    NzSelectModule,
    NzTabsModule,
    NzAvatarModule,
    NzButtonModule,
    NzInputNumberModule,
    NzUploadModule,
    NzAffixModule,
    NzPopconfirmModule,
    NzIconModule,
    NzDropDownModule,
    NzDatePickerModule,
    NzPopoverModule,
    NzResultModule,
    NzCollapseModule,
    NzEmptyModule,
    FieldErrorModule,
    AscSelectModule,
    AscUploadModule,
    WidgetModule,
    CustomPipeModule,
    TranslateModule,
    SharedDirectiveModule,
];
@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(routes), AllModules],
    declarations: [
        HumanResourceComponent,
        TraCuuNhanSuComponent,
        HoSoCaNhanComponent,
        ThongTinNhanSuComponent,
        FormThongTinNhanSuComponent,
        KhenThuongKyLuatComponent,
        TinhTrangSucKhoeComponent,
        QuanHeGiaDinhComponent,
        TrinhDoChuyenMonComponent,
        KhaiBaoTaiKhoanNhanSuComponent,
        ThongTinTuyenDungComponent,
        ThongTinDoanDangComponent,
        ThongTinLuongComponent,
        QuaTrinhCongTacComponent,
        DaoTaoBoiDuongComponent,
        FormThongTinTuyenDungComponent,
        FormTrinhDoChuyenMonComponent,
        FormTrinhDoNgoaiNguComponent,
        FormTrinhDoTinHocComponent,
        FormChucDanhKhoaHocComponent,
        FormNhanSuQuanHeGiaDinhComponent,
        FormNhanSuQuaTrinhCongTacComponent,
        FormThongTinLuongComponent,
        FormQuaTrinhDoanComponent,
        FormQuaTrinhDangComponent,
        FormQuaTrinhCongDoanComponent,
        FormKhenThuongComponent,
        FormKyLuatComponent,
        FormNhanSuDoanDangComponent,
        FormNhanSuDaoTaoBoiDuongComponent,
        FormTrinhDoComponent,
        FormNhanSuTinhTrangSucKhoeComponent,
        KiemNhiemComponent,
        FormKiemNhiemComponent,
        RedirectProfileComponent,
        FormUpdateLoaiDoiTuongDanhGiaComponent,
        LichSuLuongComponent,
        KhenThuongComponent,
        KyLuatComponent,
        QuaTrinhCongTacKiemNhiemComponent,
        QuaTrinhDoanComponent,
        QuaTrinhDangComponent,
        QuaTrinhCongDoanComponent,
        NhanSuTrinhDoNgoaiNguComponent,
        NhanSuTrinhDoTinHocComponent,
        NhanSuTrinhDoChuyenMonComponent,
        NhanSuChucDanhKhoaHocComponent,
        ExportHoSoNhanSuComponent,
        ThongTinTuyenDungCompareComponent,
        ThongTinDoanDangCompareComponent,
        ThongTinLuongCompareComponent,
        TinhTrangSucKhoeCompareComponent,
        TrinhDoChuyenMonCompareComponent,
        ThongTinNhanSuCompareComponent,
        ThongTinKhacCompareComponent,
        HrmColorPipe,
        QuanHeGiaDinhBanThanComponent,
        QuanHeGiaDinhHoHangComponent,
        DanhHieuThiDuaKhenThuongComponent,
        FormDanhHieuThiDuaKhenThuongComponent,
        DuyetThongTinNhanSuComponent,
        ThongTinKhacComponent,
        FormThongTinKhacComponent,
        HoanCanhKinhTeCompareComponent,
        LichSuBanThanCompareComponent,
        ThongTinNhanSuChungComponent,
        FormThongTinNhanSuChungComponent,
        XacThucThongTinNhanSuComponent,
        PopupViewProfileComponent,
        PopupViewHoSoCaNhanComponent,
        TabViewThongTinChungComponent,
        TabViewThongTinTuyenDungComponent,
        TabViewQuaTrinhCongTacComponent,
        TabViewThongTinKhacComponent,
        TabViewTrinhDoChuyenMonComponent,
        TabViewChinhTriXaHoiComponent,
        TabViewKhenThuongKyLuatComponent,
        TabViewThongTinSucKhoeComponent,
        TabViewQuanHeGiaDinhComponent,
        TabViewThongTinLuongComponent,
    ],
})
export class HumanResourceModule {}
