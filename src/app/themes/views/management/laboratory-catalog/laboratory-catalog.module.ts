import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "@core/guards/auth.guard";
import { TranslateModule } from "@ngx-translate/core";
import { DialogsModule } from "@progress/kendo-angular-dialog";
import { GridModule } from "@progress/kendo-angular-grid";
import { SplitterModule } from "@progress/kendo-angular-layout";
import { ContextMenuModule } from "@progress/kendo-angular-menu";
import { SchedulerModule } from "@progress/kendo-angular-scheduler";
import { TooltipModule } from "@progress/kendo-angular-tooltip";
import { AscSelectModule } from "@shared/containers/asc-select";
import { AscUploadModule } from "@shared/containers/asc-upload";
import { FieldErrorModule } from "@shared/containers/field-error";
import { ControlErrorModule } from "@shared/controls/control-error/control-error.module";
import { ViewFileModule } from "@shared/controls/view-file";
import { FormDirectiveModule } from "@shared/directives/forms";
import { CustomPipeModule } from "@shared/pipes";
import { WidgetModule } from "@shared/widgets";
import { NzNotificationModule, NzToolTipModule, NzSelectModule, NzTabsModule, NzAvatarModule, NzButtonModule, NzInputNumberModule, NzUploadModule, NzAffixModule, NzIconModule, NzDropDownModule, NzDatePickerModule, NzPopoverModule, NzResultModule, NzCollapseModule, NzEmptyModule, NzModalModule } from "ng-zorro-antd";
import { PtnUploadModule } from "../laboratory/_containers/ptn-upload";
import { CapDoComponent } from "./cap-do/cap-do.component";
import { FormCapDoComponent } from "./cap-do/form-cap-do/form-cap-do.component";
import { CapQuanLyComponent } from "./cap-quan-ly/cap-quan-ly.component";
import { FormCapQuanLyComponent } from "./cap-quan-ly/form-cap-quan-ly/form-cap-quan-ly.component";
import { DonViTinhComponent } from "./don-vi-tinh/don-vi-tinh.component";
import { FormDonViTinhComponent } from "./don-vi-tinh/form-don-vi-tinh/form-don-vi-tinh.component";
import { FormHinhThucComponent } from "./hinh-thuc/form-hinh-thuc/form-hinh-thuc.component";
import { HinhThucComponent } from "./hinh-thuc/hinh-thuc.component";
import { FormKyNangVanHanhComponent } from "./ky-nang-van-hanh/form-ky-nang-van-hanh/form-ky-nang-van-hanh.component";
import { KyNangVanHanhComponent } from "./ky-nang-van-hanh/ky-nang-van-hanh.component";
import { LaboratoryCatalogComponent } from "./laboratory-catalog.component";
import { FormLoaiBaoCaoKhoaHocComponent } from "./loai-bao-cao-khoa-hoc/form-loai-bao-cao-khoa-hoc/form-loai-bao-cao-khoa-hoc.component";
import { LoaiBaoCaoKhoaHocComponent } from "./loai-bao-cao-khoa-hoc/loai-bao-cao-khoa-hoc.component";
import { FormLoaiDuAnComponent } from "./loai-du-an/form-loai-du-an/form-loai-du-an.component";
import { LoaiDuAnComponent } from "./loai-du-an/loai-du-an.component";
import { FormLoaiGiaiThuongComponent } from "./loai-giai-thuong/form-loai-giai-thuong/form-loai-giai-thuong.component";
import { LoaiGiaiThuongComponent } from "./loai-giai-thuong/loai-giai-thuong.component";
import { FormLoaiHinhPhongComponent } from "./loai-hinh-phong/form-loai-hinh-phong/form-loai-hinh-phong.component";
import { LoaiHinhPhongComponent } from "./loai-hinh-phong/loai-hinh-phong.component";
import { FormLoaiHoiThaoHoiNghiComponent } from "./loai-hoi-thao-hoi-nghi/form-loai-hoi-thao-hoi-nghi/form-loai-hoi-thao-hoi-nghi.component";
import { LoaiHoiThaoHoiNghiComponent } from "./loai-hoi-thao-hoi-nghi/loai-hoi-thao-hoi-nghi.component";
import { FormLoaiKeHoachKhcnComponent } from "./loai-ke-hoach-khcn/form-loai-ke-hoach-khcn/form-loai-ke-hoach-khcn.component";
import { LoaiKeHoachKhcnComponent } from "./loai-ke-hoach-khcn/loai-ke-hoach-khcn.component";
import { FormCongCuComponent } from "./nhom-cong-cu/form-cong-cu/form-cong-cu.component";
import { FormNhomCongCuComponent } from "./nhom-cong-cu/form-nhom-cong-cu/form-nhom-cong-cu.component";
import { ListCongCuComponent } from "./nhom-cong-cu/list-cong-cu/list-cong-cu.component";
import { ListNhomCongCuComponent } from "./nhom-cong-cu/list-nhom-cong-cu/list-nhom-cong-cu.component";
import { NhomCongCuComponent } from "./nhom-cong-cu/nhom-cong-cu.component";
import { FormKetQuaDuKienComponent } from "./nhom-ket-qua-du-kien/form-ket-qua-du-kien/form-ket-qua-du-kien.component";
import { FormNhomKetQuaDuKienComponent } from "./nhom-ket-qua-du-kien/form-nhom-ket-qua-du-kien/form-nhom-ket-qua-du-kien.component";
import { ListKetQuaDuKienComponent } from "./nhom-ket-qua-du-kien/list-ket-qua-du-kien/list-ket-qua-du-kien.component";
import { ListNhomKetQuaDuKienComponent } from "./nhom-ket-qua-du-kien/list-nhom-ket-qua-du-kien/list-nhom-ket-qua-du-kien.component";
import { NhomKetQuaDuKienComponent } from "./nhom-ket-qua-du-kien/nhom-ket-qua-du-kien.component";
import { FormTapChiKhcnComponent } from "./tap-chi-khcn/form-tap-chi-khcn/form-tap-chi-khcn.component";
import { TapChiKhcnComponent } from "./tap-chi-khcn/tap-chi-khcn.component";
import { FormThanhVienNgoaiKhcnComponent } from "./thanh-vien-ngoai-khcn/form-thanh-vien-ngoai-khcn/form-thanh-vien-ngoai-khcn.component";
import { ThanhVienNgoaiKhcnComponent } from "./thanh-vien-ngoai-khcn/thanh-vien-ngoai-khcn.component";
import { FormThuHangGiaiThuongComponent } from "./thu-hang-giai-thuong/form-thu-hang-giai-thuong/form-thu-hang-giai-thuong.component";
import { ThuHangGiaiThuongComponent } from "./thu-hang-giai-thuong/thu-hang-giai-thuong.component";
import { FormTinhTrangDangKyComponent } from "./tinh-trang-dang-ky/form-tinh-trang-dang-ky/form-tinh-trang-dang-ky.component";
import { TinhTrangDangKyComponent } from "./tinh-trang-dang-ky/tinh-trang-dang-ky.component";
import { FormTinhTrangSanPhamComponent } from "./tinh-trang-san-pham/form-tinh-trang-san-pham/form-tinh-trang-san-pham.component";
import { TinhTrangSanPhamComponent } from "./tinh-trang-san-pham/tinh-trang-san-pham.component";
import { FormTinhTrangThietBiComponent } from "./tinh-trang-thiet-bi/form-tinh-trang-thiet-bi/form-tinh-trang-thiet-bi.component";
import { TinhTrangThietBiComponent } from "./tinh-trang-thiet-bi/tinh-trang-thiet-bi.component";
import { FormTrangThaiDangKyPhongComponent } from "./trang-thai-dang-ky-phong/form-trang-thai-dang-ky-phong/form-trang-thai-dang-ky-phong.component";
import { TrangThaiDangKyPhongComponent } from "./trang-thai-dang-ky-phong/trang-thai-dang-ky-phong.component";
import { FormTrangThaiKhcnComponent } from "./trang-thai-khcn/form-trang-thai-khcn/form-trang-thai-khcn.component";
import { TrangThaiKhcnComponent } from "./trang-thai-khcn/trang-thai-khcn.component";
import { FormVaiTroKhcnComponent } from "./vai-tro-khcn/form-vai-tro-khcn/form-vai-tro-khcn.component";
import { VaiTroKhcnComponent } from "./vai-tro-khcn/vai-tro-khcn.component";
import { FormVaiTroComponent } from "./vai-tro/form-vai-tro/form-vai-tro.component";
import { VaiTroComponent } from "./vai-tro/vai-tro.component";

const routes: Routes = [
    {
        path: '',
        component: LaboratoryCatalogComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'nhom-cong-cu',
                component: NhomCongCuComponent,
            },
            {
                path: 'cap-do',
                component: CapDoComponent,
            },
            {
                path: 'cap-quan-ly',
                component: CapQuanLyComponent,
            },
            {
                path: 'don-vi-tinh',
                component: DonViTinhComponent,
            },
            {
                path: 'ky-nang-van-hanh',
                component: KyNangVanHanhComponent,
            },
            {
                path: 'loai-hinh-phong',
                component: LoaiHinhPhongComponent,
            },
            {
                path: 'tinh-trang-thiet-bi',
                component: TinhTrangThietBiComponent,
            },
            {
                path: 'trang-thai-dang-ky-phong',
                component: TrangThaiDangKyPhongComponent,
            },
            {
                path: 'vai-tro',
                component: VaiTroComponent,
            },
            {
                path: 'loai-bao-cao-khoa-hoc',
                component: LoaiBaoCaoKhoaHocComponent,
            },
            {
                path: 'loai-hoi-nghi-hoi-thao',
                component: LoaiHoiThaoHoiNghiComponent,
            },
            {
                path: 'nhom-ket-qua-du-kien',
                component: NhomKetQuaDuKienComponent,
            },
            {
                path: 'hinh-thuc',
                component: HinhThucComponent,
            },
            {
                path: 'tinh-trang-dang-ky',
                component: TinhTrangDangKyComponent,
            },
            {
                path: 'tinh-trang-san-pham',
                component: TinhTrangSanPhamComponent,
            },
            {
                path: 'loai-giai-thuong',
                component: LoaiGiaiThuongComponent,
            },
            {
                path: 'thu-hang-giai-thuong',
                component: ThuHangGiaiThuongComponent,
            },
            {
                path: 'loai-du-an',
                component: LoaiDuAnComponent,
            },
            {
                path: 'vai-tro-khcn',
                component: VaiTroKhcnComponent,
            },
            {
                path: 'tap-chi-khcn',
                component: TapChiKhcnComponent,
            },
            {
                path: 'thanh-vien-ngoai-khcn',
                component: ThanhVienNgoaiKhcnComponent,
            },
            {
                path: 'trang-thai-khcn',
                component: TrangThaiKhcnComponent,
            },
            {
                path: 'loai-ke-hoach-khcn',
                component: LoaiKeHoachKhcnComponent,
            },
        ],
    },
];

const AllModules = [
    ControlErrorModule,
    GridModule,
    ViewFileModule,
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
    PtnUploadModule,
    FormDirectiveModule,
    SchedulerModule
];
@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, SplitterModule, RouterModule.forChild(routes), AllModules],
    declarations: [
        LaboratoryCatalogComponent,
        NhomCongCuComponent,
        FormNhomCongCuComponent,
        ListNhomCongCuComponent,
        ListCongCuComponent,
        FormCongCuComponent,
        CapDoComponent,
        FormCapDoComponent,
        FormCapQuanLyComponent,
        CapQuanLyComponent,
        DonViTinhComponent,
        FormDonViTinhComponent,
        KyNangVanHanhComponent,
        FormKyNangVanHanhComponent,
        LoaiHinhPhongComponent,
        FormLoaiHinhPhongComponent,
        TinhTrangThietBiComponent,
        FormTinhTrangThietBiComponent,
        TrangThaiDangKyPhongComponent,
        FormTrangThaiDangKyPhongComponent,
        VaiTroComponent,
        FormVaiTroComponent,
        LoaiBaoCaoKhoaHocComponent,
        FormLoaiBaoCaoKhoaHocComponent,
        LoaiHoiThaoHoiNghiComponent,
        FormLoaiHoiThaoHoiNghiComponent,
        NhomKetQuaDuKienComponent,
        FormNhomKetQuaDuKienComponent,
        HinhThucComponent,
        FormHinhThucComponent,
        TinhTrangDangKyComponent,
        FormTinhTrangDangKyComponent,
        TinhTrangSanPhamComponent,
        FormTinhTrangSanPhamComponent,
        LoaiGiaiThuongComponent,
        FormLoaiGiaiThuongComponent,
        ThuHangGiaiThuongComponent,
        FormThuHangGiaiThuongComponent,
        LoaiDuAnComponent,
        FormLoaiDuAnComponent,
        VaiTroKhcnComponent,
        FormVaiTroKhcnComponent,
        TapChiKhcnComponent,
        FormTapChiKhcnComponent,
        NhomKetQuaDuKienComponent,
        FormNhomKetQuaDuKienComponent,
        FormKetQuaDuKienComponent,
        ListKetQuaDuKienComponent,
        ListNhomKetQuaDuKienComponent,
        ThanhVienNgoaiKhcnComponent,
        FormThanhVienNgoaiKhcnComponent,
        TrangThaiKhcnComponent,
        FormTrangThaiKhcnComponent,
        LoaiKeHoachKhcnComponent,
        FormLoaiKeHoachKhcnComponent
    ],
})

export class LaboratoryCatalogModule { }
