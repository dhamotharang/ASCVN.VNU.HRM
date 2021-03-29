import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScientificBackgroundComponent } from './scientific-background.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DeTaiKhcnComponent } from './de-tai-khcn/de-tai-khcn.component';
import { CongTrinhKhoaHocComponent } from './cong-trinh-khoa-hoc/cong-trinh-khoa-hoc.component';
import { BangSoHuuTriTueComponent } from './bang-so-huu-tri-tue/bang-so-huu-tri-tue.component';
import { SanPhamUngDungComponent } from './san-pham-ung-dung/san-pham-ung-dung.component';
import { GiaiThuongKhcnComponent } from './giai-thuong-khcn/giai-thuong-khcn.component';
import { ThamGiaDaoTaoSdhComponent } from './tham-gia-dao-tao-sdh/tham-gia-dao-tao-sdh.component';
import { SharedModule } from '@shared/shared.module';
import { FormSachGiaoTrinhComponent } from './cong-trinh-khoa-hoc/form-sach-giao-trinh/form-sach-giao-trinh.component';
import { FormCongTrinhKhoaHocComponent } from './cong-trinh-khoa-hoc/form-cong-trinh-khoa-hoc/form-cong-trinh-khoa-hoc.component';
import { FormBangSoHuuTriTueComponent } from './bang-so-huu-tri-tue/form-bang-so-huu-tri-tue/form-bang-so-huu-tri-tue.component';
import { FormSanPhamUngDungComponent } from './san-pham-ung-dung/form-san-pham-ung-dung/form-san-pham-ung-dung.component';
import { FormGiaiThuongKhcnComponent } from './giai-thuong-khcn/form-giai-thuong-khcn/form-giai-thuong-khcn.component';
import { FormThamGiaDaoTaoSdhComponent } from './tham-gia-dao-tao-sdh/form-tham-gia-dao-tao-sdh/form-tham-gia-dao-tao-sdh.component';
import { FormDeTaiKhcnComponent } from './de-tai-khcn/form-de-tai-khcn/form-de-tai-khcn.component';
import { ListCongTrinhKhoaHocComponent } from './cong-trinh-khoa-hoc/list-cong-trinh-khoa-hoc/list-cong-trinh-khoa-hoc.component';
import { ListSachGiaoTrinhComponent } from './cong-trinh-khoa-hoc/list-sach-giao-trinh/list-sach-giao-trinh.component';
import { ListDeTaiChuTriComponent } from './de-tai-khcn/list-de-tai-chu-tri/list-de-tai-chu-tri.component';
import { ListDeTaiThamGiaComponent } from './de-tai-khcn/list-de-tai-tham-gia/list-de-tai-tham-gia.component';
import { ListDaoTaoSdhThsComponent } from './tham-gia-dao-tao-sdh/list-dao-tao-sdh-ths/list-dao-tao-sdh-ths.component';
import { ListDaoTaoSdhNcsComponent } from './tham-gia-dao-tao-sdh/list-dao-tao-sdh-ncs/list-dao-tao-sdh-ncs.component';
import { UserGuard } from '@core/guards/user.guard';

const routes: Routes = [
    {
        path: '',
        component: ScientificBackgroundComponent,
        children: [
            {
                path: 'de-tai-khcn',
                component: DeTaiKhcnComponent,
            },
            {
                path: 'cong-trinh-khoa-hoc',
                component: CongTrinhKhoaHocComponent,
            },
            {
                path: 'bang-so-huu-tri-tue',
                component: BangSoHuuTriTueComponent,
            },
            {
                path: 'san-pham-ung-dung',
                component: SanPhamUngDungComponent,
            },
            {
                path: 'giai-thuong-khcn',
                component: GiaiThuongKhcnComponent,
            },
            {
                path: 'tham-gia-dao-tao-sdh',
                component: ThamGiaDaoTaoSdhComponent,
            },
        ],
    },
];

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(routes), SharedModule],
    declarations: [
        ScientificBackgroundComponent,
        DeTaiKhcnComponent,
        FormDeTaiKhcnComponent,
        FormSachGiaoTrinhComponent,
        CongTrinhKhoaHocComponent,
        FormCongTrinhKhoaHocComponent,
        BangSoHuuTriTueComponent,
        FormBangSoHuuTriTueComponent,
        SanPhamUngDungComponent,
        FormSanPhamUngDungComponent,
        GiaiThuongKhcnComponent,
        FormGiaiThuongKhcnComponent,
        ThamGiaDaoTaoSdhComponent,
        FormThamGiaDaoTaoSdhComponent,
        ListCongTrinhKhoaHocComponent,
        ListSachGiaoTrinhComponent,
        ListDeTaiChuTriComponent,
        ListDeTaiThamGiaComponent,
        ListDaoTaoSdhThsComponent,
        ListDaoTaoSdhNcsComponent,
    ],
})
export class ScientificBackgroundModule {}
