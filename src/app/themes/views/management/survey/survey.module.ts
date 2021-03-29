import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyComponent } from './survey.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ListPhieuTuDanhGiaComponent } from './views/list-phieu-tu-danh-gia/list-phieu-tu-danh-gia.component';
import { ListDotDanhGiaComponent } from './views/list-dot-danh-gia/list-dot-danh-gia.component';
import { FormDotDanhGiaComponent } from './views/list-dot-danh-gia/form-dot-danh-gia/form-dot-danh-gia.component';
import { QuanLyDanhGiaComponent } from './views/quan-ly-danh-gia/quan-ly-danh-gia.component';
import { ListTongHopKetQuaComponent } from './views/list-tong-hop-ket-qua/list-tong-hop-ket-qua.component';
import { ListPhieuDanhGiaComponent } from './views/list-phieu-danh-gia/list-phieu-danh-gia.component';
import { CreatePhieuDanhGiaComponent } from './views/create-phieu-danh-gia/create-phieu-danh-gia.component';
import { FormChonPhieuDanhGiaComponent } from './views/list-dot-danh-gia/form-chon-phieu-danh-gia/form-chon-phieu-danh-gia.component';
import { FormChonNhanSuComponent } from './views/list-dot-danh-gia/form-chon-nhan-su/form-chon-nhan-su.component';
import { FormNhomCauHoiComponent } from './views/create-phieu-danh-gia/form-nhom-cau-hoi/form-nhom-cau-hoi.component';
import { ListBanQuanLyDanhGiaComponent } from './views/list-ban-quan-ly-danh-gia/list-ban-quan-ly-danh-gia.component';
import { FormNhatKyPhieuDanhGiaComponent } from './views/list-phieu-tu-danh-gia/form-nhat-ky-phieu-danh-gia/form-nhat-ky-phieu-danh-gia.component';
import { AuthGuard } from '@core/guards/auth.guard';
import { DanhGiaComponent } from './views/danh-gia/danh-gia.component';
import { ExportPhieuDanhGiaComponent } from './components/export-phieu-danh-gia/export-phieu-danh-gia.component';
import { ViewFileModule } from '@shared/controls/view-file/view-file.module';
import { FormXetDuyetXepLoaiComponent } from './components/form-xet-duyet-xep-loai/form-xet-duyet-xep-loai.component';
import { ListDonViDanhGiaComponent } from './views/list-don-vi-danh-gia/list-don-vi-danh-gia.component';
import { PaginatedViewModule } from '@shared/controls/paginated-view/paginated-view.module';
import { FormChuyenDanhGiaComponent } from './components/form-chuyen-danh-gia/form-chuyen-danh-gia.component';
const routes: Routes = [
    {
        path: '',
        component: SurveyComponent,
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'list-dot-danh-gia',
                component: ListDotDanhGiaComponent,
            },
            {
                path: 'list-phieu-danh-gia',
                component: ListPhieuDanhGiaComponent,
            },
            {
                path: 'tong-hop-ket-qua',
                component: ListTongHopKetQuaComponent,
            },
            {
                path: 'list-phieu-danh-gia',
                component: ListPhieuDanhGiaComponent,
            },
            {
                path: 'create-phieu-danh-gia/:phieuId',
                component: CreatePhieuDanhGiaComponent,
            },
            {
                path: 'tu-danh-gia',
                component: ListPhieuTuDanhGiaComponent, // 1
            },
            {
                path: 'quan-ly-danh-gia',
                component: QuanLyDanhGiaComponent, // 2
            },
            {
                path: 'don-vi-danh-gia',
                component: ListDonViDanhGiaComponent, // 3
            },
            {
                path: 'ban-quan-ly-danh-gia',
                component: ListBanQuanLyDanhGiaComponent, // 9
            },
            {
                path: 'danh-gia',
                component: DanhGiaComponent,
            },
        ],
    },
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        SharedModule,
        ViewFileModule,
        PaginatedViewModule,
    ],
    declarations: [
        SurveyComponent,
        ListPhieuTuDanhGiaComponent,
        ListDotDanhGiaComponent,
        FormDotDanhGiaComponent,
        ListPhieuDanhGiaComponent,
        QuanLyDanhGiaComponent,
        ListTongHopKetQuaComponent,
        ListPhieuDanhGiaComponent,
        CreatePhieuDanhGiaComponent,
        FormChonPhieuDanhGiaComponent,
        FormChonNhanSuComponent,
        FormNhomCauHoiComponent,
        FormNhatKyPhieuDanhGiaComponent,
        ListBanQuanLyDanhGiaComponent,
        DanhGiaComponent,
        ExportPhieuDanhGiaComponent,
        FormXetDuyetXepLoaiComponent,
        ListDonViDanhGiaComponent,
        FormChuyenDanhGiaComponent,
    ],
})
export class SurveyModule {}
