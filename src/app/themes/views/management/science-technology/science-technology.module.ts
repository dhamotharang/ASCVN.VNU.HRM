import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScienceTechnologyComponent } from './science-technology.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SplitterModule } from '@progress/kendo-angular-layout';
import { TranslateModule } from '@ngx-translate/core';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { GridModule } from '@progress/kendo-angular-grid';
import { ContextMenuModule } from '@progress/kendo-angular-menu';
import { SchedulerModule } from '@progress/kendo-angular-scheduler';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { AscSelectModule } from '@shared/containers/asc-select';
import { AscUploadModule } from '@shared/containers/asc-upload';
import { FieldErrorModule } from '@shared/containers/field-error';
import { ControlErrorModule } from '@shared/controls/control-error/control-error.module';
import { ViewFileModule } from '@shared/controls/view-file';
import { FormDirectiveModule } from '@shared/directives/forms';
import { CustomPipeModule } from '@shared/pipes';
import { WidgetModule } from '@shared/widgets';
import {
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
    NzTableModule,
} from 'ng-zorro-antd';
import { AuthGuard } from '@core/guards/auth.guard';
import { KhcnUploadModule } from './_containers/khcn-upload/khcn-upload.module';
import { SachChuyenKhaoComponent } from './sach-chuyen-khao/sach-chuyen-khao.component';
import { FormSachChuyenKhaoComponent } from './sach-chuyen-khao/form-sach-chuyen-khao/form-sach-chuyen-khao.component';
import { BaoCaoKhoaHocComponent } from './bao-cao-khoa-hoc/bao-cao-khoa-hoc.component';
import { FormBaoCaoKhoaHocComponent } from './bao-cao-khoa-hoc/form-bao-cao-khoa-hoc/form-bao-cao-khoa-hoc.component';
import { SanPhamDaoTaoComponent } from './san-pham-dao-tao/san-pham-dao-tao.component';
import { FormSanPhamDaoTaoComponent } from './san-pham-dao-tao/form-san-pham-dao-tao/form-san-pham-dao-tao.component';
import { PhatMinhSangCheComponent } from './phat-minh-sang-che/phat-minh-sang-che.component';
import { FormBaiBaoKhoaHocComponent } from './bai-bao-khoa-hoc/form-bai-bao-khoa-hoc/form-bai-bao-khoa-hoc.component';
import { QuanLyNhiemVuKhcnComponent } from './quan-ly-nhiem-vu-khcn/quan-ly-nhiem-vu-khcn.component';
import { FormNhiemVuKhcnComponent } from './quan-ly-nhiem-vu-khcn/form-nhiem-vu-khcn/form-nhiem-vu-khcn.component';
import { ChonThanhVienComponent } from './_component/chon-thanh-vien/chon-thanh-vien.component';
import { KetQuaDuKienComponent } from './_component/ket-qua-du-kien/ket-qua-du-kien.component';
import { BaiBaoKhoaHocComponent } from './bai-bao-khoa-hoc/bai-bao-khoa-hoc.component';
import { FormPhatMinhSangCheComponent } from './phat-minh-sang-che/form-phat-minh-sang-che/form-phat-minh-sang-che.component';
import { GiaiThuongKhoaHocCongNgheComponent } from './giai-thuong-khoa-hoc-cong-nghe/giai-thuong-khoa-hoc-cong-nghe.component';
import { FormGiaiThuongKhoaHocCongNgheComponent } from './giai-thuong-khoa-hoc-cong-nghe/form-giai-thuong-khoa-hoc-cong-nghe/form-giai-thuong-khoa-hoc-cong-nghe.component';
import { HoiNghiHoiThaoComponent } from './hoi-nghi-hoi-thao/hoi-nghi-hoi-thao.component';
import { FormHoiNghiHoiThaoComponent } from './hoi-nghi-hoi-thao/form-hoi-nghi-hoi-thao/form-hoi-nghi-hoi-thao.component';
import { DuAnDauTuComponent } from './du-an-dau-tu/du-an-dau-tu.component';
import { FormDuAnDauTuComponent } from './du-an-dau-tu/form-du-an-dau-tu/form-du-an-dau-tu.component';
import { ChonThanhVienNgoaiComponent } from './_component/chon-thanh-vien-ngoai/chon-thanh-vien-ngoai.component';
import { FormDuyetComponent } from './_component/form-duyet/form-duyet.component';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import { ChonPhongThiNghiemComponent } from './_component/chon-phong-thi-nghiem/chon-phong-thi-nghiem.component';
import { QuanLySanPhamDaoTaoComponent } from './views/quan-ly-san-pham-dao-tao/quan-ly-san-pham-dao-tao.component';
import { QuanLySachChuyenKhaoComponent } from './views/quan-ly-sach-chuyen-khao/quan-ly-sach-chuyen-khao.component';
import { QuanLyBaiBaoKhoaHocComponent } from './views/quan-ly-bai-bao-khoa-hoc/quan-ly-bai-bao-khoa-hoc.component';
import { QuanLyBaoCaoKhoaHocComponent } from './views/quan-ly-bao-cao-khoa-hoc/quan-ly-bao-cao-khoa-hoc.component';
import { QuanLyNhiemVuComponent } from './views/quan-ly-nhiem-vu/quan-ly-nhiem-vu.component';
import { QuanLyDuAnDauTuComponent } from './views/quan-ly-du-an-dau-tu/quan-ly-du-an-dau-tu.component';
import { QuanLyPhatMinhSangCheComponent } from './views/quan-ly-phat-minh-sang-che/quan-ly-phat-minh-sang-che.component';
import { QuanLyHoiNghiHoiThaoComponent } from './views/quan-ly-hoi-nghi-hoi-thao/quan-ly-hoi-nghi-hoi-thao.component';
import { QuanLyGiaiThuongComponent } from './views/quan-ly-giai-thuong/quan-ly-giai-thuong.component';
const routes: Routes = [
    {
        path: '',
        component: ScienceTechnologyComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'nhiem-vu',
                component: QuanLyNhiemVuKhcnComponent,
            },
            {
                path: 'sach-chuyen-khao',
                component: SachChuyenKhaoComponent,
            },
            {
                path: 'bao-cao-khoa-hoc',
                component: BaoCaoKhoaHocComponent,
            },
            {
                path: 'san-pham-dao-tao',
                component: SanPhamDaoTaoComponent,
            },
            {
                path: 'phat-minh-sang-che',
                component: PhatMinhSangCheComponent,
            },
            {
                path: 'bai-bao-khoa-hoc',
                component: BaiBaoKhoaHocComponent,
            },
            {
                path: 'giai-thuong',
                component: GiaiThuongKhoaHocCongNgheComponent,
            },
            {
                path: 'hoi-nghi-hoi-thao',
                component: HoiNghiHoiThaoComponent,
            },
            {
                path: 'du-an-dau-tu',
                component: DuAnDauTuComponent,
            },
            {
                path: 'quan-ly-san-pham-dao-tao',
                component: QuanLySanPhamDaoTaoComponent,
            },
            {
                path: 'quan-ly-sach-chuyen-khao',
                component: QuanLySachChuyenKhaoComponent,
            },
            {
                path: 'quan-ly-bai-bao-khoa-hoc',
                component: QuanLyBaiBaoKhoaHocComponent,
            },
            {
                path: 'quan-ly-bao-cao-khoa-hoc',
                component: QuanLyBaoCaoKhoaHocComponent,
            },
            {
                path: 'quan-ly-nhiem-vu',
                component: QuanLyNhiemVuComponent,
            },
            {
                path: 'quan-ly-du-an-dau-tu',
                component: QuanLyDuAnDauTuComponent,
            },
            {
                path: 'quan-ly-phat-minh-sang-che',
                component: QuanLyPhatMinhSangCheComponent,
            },
            {
                path: 'quan-ly-hoi-nghi-hoi-thao',
                component: QuanLyHoiNghiHoiThaoComponent,
            },
            {
                path: 'quan-ly-giai-thuong',
                component: QuanLyGiaiThuongComponent,
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
    KhcnUploadModule,
    FormDirectiveModule,
    SchedulerModule,
    NzTableModule,
    CurrencyMaskModule

];

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
    align: 'right',
    allowNegative: false,
    decimal: ',',
    precision: 2,
    prefix: '',
    suffix: '',
    thousands: '.'
};


@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, SplitterModule, RouterModule.forChild(routes), AllModules],
    declarations: [
        ScienceTechnologyComponent,
        SachChuyenKhaoComponent,
        FormSachChuyenKhaoComponent,
        BaoCaoKhoaHocComponent,
        FormBaoCaoKhoaHocComponent,
        SanPhamDaoTaoComponent,
        FormSanPhamDaoTaoComponent,
        PhatMinhSangCheComponent,
        FormPhatMinhSangCheComponent,
        BaiBaoKhoaHocComponent,
        FormBaiBaoKhoaHocComponent,
        QuanLyNhiemVuKhcnComponent,
        FormNhiemVuKhcnComponent,
        ChonThanhVienComponent,
        KetQuaDuKienComponent,
        GiaiThuongKhoaHocCongNgheComponent,
        FormGiaiThuongKhoaHocCongNgheComponent,
        HoiNghiHoiThaoComponent,
        FormHoiNghiHoiThaoComponent,
        DuAnDauTuComponent,
        FormDuAnDauTuComponent,
        ChonThanhVienNgoaiComponent,
        ChonPhongThiNghiemComponent,
        FormDuyetComponent,
        QuanLySanPhamDaoTaoComponent,
        QuanLySachChuyenKhaoComponent,
        QuanLyBaiBaoKhoaHocComponent,
        QuanLyBaoCaoKhoaHocComponent,
        QuanLyNhiemVuComponent,
        QuanLyDuAnDauTuComponent,
        QuanLyPhatMinhSangCheComponent,
        QuanLyHoiNghiHoiThaoComponent,
        QuanLyGiaiThuongComponent
    ],
    providers: [
        { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
    ],
    exports: [
        BaiBaoKhoaHocComponent,
        SachChuyenKhaoComponent,
        BaoCaoKhoaHocComponent,
        PhatMinhSangCheComponent,
        DuAnDauTuComponent,
        HoiNghiHoiThaoComponent
    ]
})
export class ScienceTechnologyModule {}
