import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgModule, LOCALE_ID } from '@angular/core';
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
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { FieldErrorModule } from '@shared/containers/field-error/field-error.module';
import { AscSelectModule } from '@shared/containers/asc-select/asc-select.module';
import { CustomPipeModule } from '@shared/pipes/custom-pipe.module';
import { TranslateModule } from '@ngx-translate/core';
import { AscUploadModule } from '@shared/containers/asc-upload/asc-upload.module';
import { WidgetModule } from '@shared/widgets/widget.module';
import { LaboratoryComponent } from './laboratory.component';
import { LaboratoryListComponent } from './laboratory-list/laboratory-list.component';
import { DanhSachChuyenNganhComponent } from './component/danh-sach-chuyen-nganh/danh-sach-chuyen-nganh.component';
import { DanhSachThietBiComponent } from './component/danh-sach-thiet-bi/danh-sach-thiet-bi.component';
import { FormLaboratoryComponent } from './laboratory-list/form-laboratory/form-laboratory.component';
import { LaboratoryRegisterComponent } from './laboratory-register/laboratory-register.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { FormDeviceComponent } from './device-list/form-device/form-device.component';
import { DinhMucTieuHaoComponent } from './dinh-muc-tieu-hao/dinh-muc-tieu-hao.component';
import { FormDinhMucTieuHaoComponent } from './dinh-muc-tieu-hao/form-dinh-muc-tieu-hao/form-dinh-muc-tieu-hao.component';
import { FormLaboratoryRegisterComponent } from './laboratory-register/form-laboratory-register/form-laboratory-register.component';
import { DanhSachChonThietBiComponent } from './component/danh-sach-chon-thiet-bi/danh-sach-chon-thiet-bi.component';
import { FormChonThietBiComponent } from './component/danh-sach-chon-thiet-bi/form-chon-thiet-bi/form-chon-thiet-bi.component';
import { PtnUploadModule } from './_containers/ptn-upload/ptn-upload.module';
import { FormLaboratoryApproveComponent } from './laboratory-register/form-laboratory-approve/form-laboratory-approve.component';
import { LaboratoryHistoryComponent } from './laboratory-history/laboratory-history.component';
import { FormLaboratoryHistoryComponent } from './laboratory-history/form-laboratory-history/form-laboratory-history.component';
import { DanhSachChonThietBiNhatKyComponent } from './component/danh-sach-chon-thiet-bi-nhat-ky/danh-sach-chon-thiet-bi-nhat-ky.component';
import { DanhSachThietBiPhuThuocComponent } from './component/danh-sach-thiet-bi-phu-thuoc/danh-sach-thiet-bi-phu-thuoc.component';
import { FormThietBiPhuThuocComponent } from './component/danh-sach-thiet-bi-phu-thuoc/form-thiet-bi-phu-thuoc/form-thiet-bi-phu-thuoc.component';
import { HuongDanSuDungComponent } from './component/huong-dan-su-dung/huong-dan-su-dung.component';
import { FormHuongDanSuDungComponent } from './component/huong-dan-su-dung/form-huong-dan-su-dung/form-huong-dan-su-dung.component';
import { BaoHanhBaoTriComponent } from './component/bao-hanh-bao-tri/bao-hanh-bao-tri.component';
import { FormBaoHanhBaoTriComponent } from './component/bao-hanh-bao-tri/form-bao-hanh-bao-tri/form-bao-hanh-bao-tri.component';
import { MangRaNgoaiComponent } from './component/mang-ra-ngoai/mang-ra-ngoai.component';
import { FormMangRaNgoaiComponent } from './component/mang-ra-ngoai/form-mang-ra-ngoai/form-mang-ra-ngoai.component';
import { FormDuyetMangRaNgoaiComponent } from './component/mang-ra-ngoai/form-duyet-mang-ra-ngoai/form-duyet-mang-ra-ngoai.component';
import { FormDirectiveModule } from '@shared/directives/forms';
import { DinhMucVatTuTieuHaoComponent } from './component/dinh-muc-vat-tu-tieu-hao/dinh-muc-vat-tu-tieu-hao.component';
import { FormDinhMucVatTuTieuHaoComponent } from './component/dinh-muc-vat-tu-tieu-hao/form-dinh-muc-vat-tu-tieu-hao/form-dinh-muc-vat-tu-tieu-hao.component';
import { FormThemThietBiComponent } from './component/danh-sach-thiet-bi/form-them-thiet-bi/form-them-thiet-bi.component';
import { NhatKySuDungThietBiComponent } from './component/nhat-ky-su-dung-thiet-bi/nhat-ky-su-dung-thiet-bi.component';
import { FormNhatKySuDungThietBiComponent } from './component/nhat-ky-su-dung-thiet-bi/form-nhat-ky-su-dung-thiet-bi/form-nhat-ky-su-dung-thiet-bi.component';
import { LaboratoryStatusComponent } from './laboratory-status/laboratory-status.component';
import { TheoDoiTrangThaiComponent } from './component/theo-doi-trang-thai/theo-doi-trang-thai.component';
import { SchedulerModule } from '@progress/kendo-angular-scheduler';
import { SplitterModule } from '@progress/kendo-angular-layout';
import { ControlErrorModule } from '@shared/controls/control-error/control-error.module';
import { QuanLyDoiNguComponent } from './quan-ly-doi-ngu/quan-ly-doi-ngu.component';
import { DanhSachDoiNguComponent } from './component/danh-sach-doi-ngu/danh-sach-doi-ngu.component';
import { FormThemDoiNguCanBoComponent } from './component/danh-sach-doi-ngu/form-them-doi-ngu-can-bo/form-them-doi-ngu-can-bo.component';
import { SanPhamKhcnComponent } from './san-pham-khcn/san-pham-khcn.component';
import { DanhSachSanPhamKhcnComponent } from './component/danh-sach-san-pham-khcn/danh-sach-san-pham-khcn.component';
import { FormThemSanPhamKhcnComponent } from './component/danh-sach-san-pham-khcn/form-them-san-pham-khcn/form-them-san-pham-khcn.component';
import { LichSuDuyetDangKyComponent } from './component/lich-su-duyet-dang-ky/lich-su-duyet-dang-ky.component';
import { PhanQuyenPhuTrachComponent } from './phan-quyen-phu-trach/phan-quyen-phu-trach.component';
import { ListNhanSuComponent } from './phan-quyen-phu-trach/list-nhan-su/list-nhan-su.component';
import { ListPhongThiNghiemComponent } from './phan-quyen-phu-trach/list-phong-thi-nghiem/list-phong-thi-nghiem.component';
import { FormThemNhanSuComponent } from './phan-quyen-phu-trach/list-nhan-su/form-them-nhan-su/form-them-nhan-su.component';
import { FormCapNhatNhanSuComponent } from './phan-quyen-phu-trach/list-nhan-su/form-cap-nhat-nhan-su/form-cap-nhat-nhan-su.component';
import { QuanLyDangKyPhongComponent } from './quan-ly-dang-ky-phong/quan-ly-dang-ky-phong.component';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import { MangThietBiRaNgoaiComponent } from './mang-thiet-bi-ra-ngoai/mang-thiet-bi-ra-ngoai.component';
import { QuanLyMangThietBiRaNgoaiComponent } from './quan-ly-mang-thiet-bi-ra-ngoai/quan-ly-mang-thiet-bi-ra-ngoai.component';
import { CustomDatePipe } from '@shared/pipes/custom-date.pipe';
import { ScienceTechnologyModule } from '../science-technology/science-technology.module';
import { FormHopDongKhaiThacComponent } from './component/hop-dong-khai-thac/form-hop-dong-khai-thac/form-hop-dong-khai-thac.component';
import { HopDongKhaiThacComponent } from './component/hop-dong-khai-thac/hop-dong-khai-thac.component';
import { FormNhomNghienCuuComponent } from './component/nhom-nghien-cuu/form-nhom-nghien-cuu/form-nhom-nghien-cuu.component';
import { NhomNghienCuuComponent } from './component/nhom-nghien-cuu/nhom-nghien-cuu.component';
import { ThuHutNhaKhoaHocComponent } from './component/thu-hut-nha-khoa-hoc/thu-hut-nha-khoa-hoc.component';
import { QuanLyHopDongKhaiThacComponent } from './quan-ly-hop-dong-khai-thac/quan-ly-hop-dong-khai-thac.component';
import { QuanLyNhomNghienCuuComponent } from './quan-ly-nhom-nghien-cuu/quan-ly-nhom-nghien-cuu.component';
import { QuanLyThuHutNhaKhoaHocComponent } from './quan-ly-thu-hut-nha-khoa-hoc/quan-ly-thu-hut-nha-khoa-hoc.component';
import { FormThuHutNhaKhoaHocComponent } from './component/thu-hut-nha-khoa-hoc/form-thu-hut-nha-khoa-hoc/form-thu-hut-nha-khoa-hoc.component';
import { DangKySoHuuTriTueComponent } from './component/dang-ky-so-huu-tri-tue/dang-ky-so-huu-tri-tue.component';
import { FormDangKySoHuuTriTueComponent } from './component/dang-ky-so-huu-tri-tue/form-dang-ky-so-huu-tri-tue/form-dang-ky-so-huu-tri-tue.component';
import { QuanLyDangKySoHuuTriTueComponent } from './quan-ly-dang-ky-so-huu-tri-tue/quan-ly-dang-ky-so-huu-tri-tue.component';
import { ChonChuyenNganhComponent } from './component/chon-chuyen-nganh/chon-chuyen-nganh.component';
const routes: Routes = [
    {
        path: '',
        component: LaboratoryComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'danh-sach',
                component: LaboratoryListComponent,
            },
            {
                path: 'dang-ky-su-dung',
                component: LaboratoryRegisterComponent,
            },
            {
                path: 'nhat-ky-su-dung',
                component: LaboratoryHistoryComponent,
            },
            {
                path: 'danh-sach-thiet-bi',
                component: DeviceListComponent,
            },
            {
                path: 'dinh-muc-tieu-hao',
                component: DinhMucTieuHaoComponent,
            },
            {
                path: 'trang-thai-su-dung',
                component: TheoDoiTrangThaiComponent,
            },
            {
                path: 'quan-ly-doi-ngu-can-bo',
                component: QuanLyDoiNguComponent,
            },
            {
                path: 'san-pham-khcn',
                component: SanPhamKhcnComponent,
            },
            {
                path: 'phan-quyen-phu-trach',
                component: PhanQuyenPhuTrachComponent,
            },
            {
                path: 'quan-ly-dang-ky',
                component: QuanLyDangKyPhongComponent,
            },
            {
                path: 'quan-ly-mang-thiet-bi-ra-ngoai',
                component: QuanLyMangThietBiRaNgoaiComponent,
            },
            {
                path: 'mang-thiet-bi-ra-ngoai',
                component: MangThietBiRaNgoaiComponent,
            },
            {
                path: 'nhom-nghien-cuu',
                component: QuanLyNhomNghienCuuComponent,
            },
            {
                path: 'hop-dong-khai-thac',
                component: QuanLyHopDongKhaiThacComponent,
            },
            {
                path: 'thu-hut-nha-khoa-hoc',
                component: QuanLyThuHutNhaKhoaHocComponent,
            },
            {
                path: 'dang-ky-so-huu-tri-tue',
                component: QuanLyDangKySoHuuTriTueComponent,
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
    SchedulerModule,
    CurrencyMaskModule,
];

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
    align: 'right',
    allowNegative: false,
    decimal: ',',
    precision: 2,
    prefix: '',
    suffix: '',
    thousands: '.',
};

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, SplitterModule, RouterModule.forChild(routes), AllModules, ScienceTechnologyModule],
    declarations: [
        CustomDatePipe,
        LaboratoryComponent,
        LaboratoryListComponent,
        DanhSachChuyenNganhComponent,
        DanhSachThietBiComponent,
        FormLaboratoryComponent,
        LaboratoryRegisterComponent,
        DeviceListComponent,
        FormDeviceComponent,
        DinhMucTieuHaoComponent,
        FormDinhMucTieuHaoComponent,
        FormLaboratoryRegisterComponent,
        DanhSachChonThietBiComponent,
        FormChonThietBiComponent,
        FormLaboratoryApproveComponent,
        LaboratoryHistoryComponent,
        FormLaboratoryHistoryComponent,
        DanhSachChonThietBiNhatKyComponent,
        DanhSachThietBiPhuThuocComponent,
        FormThietBiPhuThuocComponent,
        HuongDanSuDungComponent,
        FormHuongDanSuDungComponent,
        BaoHanhBaoTriComponent,
        FormBaoHanhBaoTriComponent,
        MangRaNgoaiComponent,
        FormMangRaNgoaiComponent,
        FormDuyetMangRaNgoaiComponent,
        DinhMucVatTuTieuHaoComponent,
        FormDinhMucVatTuTieuHaoComponent,
        FormThemThietBiComponent,
        NhatKySuDungThietBiComponent,
        FormNhatKySuDungThietBiComponent,
        LaboratoryStatusComponent,
        TheoDoiTrangThaiComponent,
        QuanLyDoiNguComponent,
        FormThemDoiNguCanBoComponent,
        DanhSachDoiNguComponent,
        SanPhamKhcnComponent,
        DanhSachSanPhamKhcnComponent,
        FormThemSanPhamKhcnComponent,
        LichSuDuyetDangKyComponent,
        PhanQuyenPhuTrachComponent,
        ListNhanSuComponent,
        ListPhongThiNghiemComponent,
        FormThemNhanSuComponent,
        FormCapNhatNhanSuComponent,
        QuanLyDangKyPhongComponent,
        QuanLyMangThietBiRaNgoaiComponent,
        MangThietBiRaNgoaiComponent,
        NhomNghienCuuComponent,
        QuanLyNhomNghienCuuComponent,
        FormNhomNghienCuuComponent,
        HopDongKhaiThacComponent,
        FormHopDongKhaiThacComponent,
        QuanLyHopDongKhaiThacComponent,
        ThuHutNhaKhoaHocComponent,
        QuanLyThuHutNhaKhoaHocComponent,
        FormThuHutNhaKhoaHocComponent,
        DangKySoHuuTriTueComponent,
        FormDangKySoHuuTriTueComponent,
        QuanLyDangKySoHuuTriTueComponent,
        ChonChuyenNganhComponent
    ],
    providers: [{ provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }],
})
export class LaboratoryModule {}
