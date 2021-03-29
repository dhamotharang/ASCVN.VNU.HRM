import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CatalogsComponent} from './catalogs.component';
import {NhomMauComponent} from './nhom-mau/nhom-mau.component';
import {FormNhomMauComponent} from './nhom-mau/form-nhom-mau/form-nhom-mau.component';
import {KetQuaDanhGiaComponent} from './ket-qua-danh-gia/ket-qua-danh-gia.component';
import {FormKetQuaDanhGiaComponent} from './ket-qua-danh-gia/form-ket-qua-danh-gia/form-ket-qua-danh-gia.component';
import {DanhHieuComponent} from './danh-hieu/danh-hieu.component';
import {FormDanhHieuComponent} from './danh-hieu/form-danh-hieu/form-danh-hieu.component';
import {FormTrinhDoNgoaiNguComponent} from './trinh-do-ngoai-ngu/form-trinh-do-ngoai-ngu/form-trinh-do-ngoai-ngu.component';
import {TrinhDoNgoaiNguComponent} from './trinh-do-ngoai-ngu/trinh-do-ngoai-ngu.component';
import {FormNgoaiNguComponent} from './ngoai-ngu/form-ngoai-ngu/form-ngoai-ngu.component';
import {NgoaiNguComponent} from './ngoai-ngu/ngoai-ngu.component';
import {FormQuocGiaComponent} from './quoc-gia/form-quoc-gia/form-quoc-gia.component';
import {QuocGiaComponent} from './quoc-gia/quoc-gia.component';
import {FormDanTocComponent} from './dan-toc/form-dan-toc/form-dan-toc.component';
import {DanTocComponent} from './dan-toc/dan-toc.component';
import {FormTonGiaoComponent} from './ton-giao/form-ton-giao/form-ton-giao.component';
import {TonGiaoComponent} from './ton-giao/ton-giao.component';
import {FormTrinhDoVanHoaComponent} from './trinh-do-van-hoa/form-trinh-do-van-hoa/form-trinh-do-van-hoa.component';
import {TrinhDoVanHoaComponent} from './trinh-do-van-hoa/trinh-do-van-hoa.component';
import {FormTrinhDoNhaNuocComponent} from './trinh-do-nha-nuoc/form-trinh-do-nha-nuoc/form-trinh-do-nha-nuoc.component';
import {TrinhDoNhaNuocComponent} from './trinh-do-nha-nuoc/trinh-do-nha-nuoc.component';
import {FormTrinhDoViTinhComponent} from './trinh-do-vi-tinh/form-trinh-do-vi-tinh/form-trinh-do-vi-tinh.component';
import {TrinhDoViTinhComponent} from './trinh-do-vi-tinh/trinh-do-vi-tinh.component';
import {FormTrinhDoChinhTriComponent} from './trinh-do-chinh-tri/form-trinh-do-chinh-tri/form-trinh-do-chinh-tri.component';
import {TrinhDoChinhTriComponent} from './trinh-do-chinh-tri/trinh-do-chinh-tri.component';
import {FormQuanHeGiaDinhComponent} from './quan-he-gia-dinh/form-quan-he-gia-dinh/form-quan-he-gia-dinh.component';
import {QuanHeGiaDinhComponent} from './quan-he-gia-dinh/quan-he-gia-dinh.component';
import {FormDoiTuongChinhSachComponent} from './doi-tuong-chinh-sach/form-doi-tuong-chinh-sach/form-doi-tuong-chinh-sach.component';
import {DoiTuongChinhSachComponent} from './doi-tuong-chinh-sach/doi-tuong-chinh-sach.component';
import {LoaiHopDongComponent} from './loai-hop-dong/loai-hop-dong.component';
import {FormHocViComponent} from './hoc-vi/form-hoc-vi/form-hoc-vi.component';
import {HocViComponent} from './hoc-vi/hoc-vi.component';
import {FormKhenThuongComponent} from './khen-thuong/form-khen-thuong/form-khen-thuong.component';
import {KhenThuongComponent} from './khen-thuong/khen-thuong.component';
import {FormKyLuatComponent} from './ky-luat/form-ky-luat/form-ky-luat.component';
import {KyLuatComponent} from './ky-luat/ky-luat.component';
import {FormTinhTrangHonNhanComponent} from './tinh-trang-hon-nhan/form-tinh-trang-hon-nhan/form-tinh-trang-hon-nhan.component';
import {TinhTrangHonNhanComponent} from './tinh-trang-hon-nhan/tinh-trang-hon-nhan.component';
import {FormTrinhDoChuyenMonComponent} from './trinh-do-chuyen-mon/form-trinh-do-chuyen-mon/form-trinh-do-chuyen-mon.component';
import {TrinhDoChuyenMonComponent} from './trinh-do-chuyen-mon/trinh-do-chuyen-mon.component';
import {FormChucVuComponent} from './chuc-vu/form-chuc-vu/form-chuc-vu.component';
import {ChucVuComponent} from './chuc-vu/chuc-vu.component';
import {FormHinhThucTraLoiComponent} from './hinh-thuc-tra-loi/form-hinh-thuc-tra-loi/form-hinh-thuc-tra-loi.component';
import {HinhThucTraLoiComponent} from './hinh-thuc-tra-loi/hinh-thuc-tra-loi.component';
import {FormBacLuongComponent} from './bac-luong/form-bac-luong/form-bac-luong.component';
import {DoiTuongDanhGiaComponent} from './doi-tuong-danh-gia/doi-tuong-danh-gia.component';
import {FormDoiTuongDanhGiaComponent} from './doi-tuong-danh-gia/form-doi-tuong-danh-gia/form-doi-tuong-danh-gia.component';
import {DoiTuongThucHienComponent} from './doi-tuong-thuc-hien/doi-tuong-thuc-hien.component';
import {FormDoiTuongThucHienComponent} from './doi-tuong-thuc-hien/form-doi-tuong-thuc-hien/form-doi-tuong-thuc-hien.component';

import {FormChucDanhKhoaHocComponent} from './chuc-danh-khoa-hoc/form-chuc-danh-khoa-hoc/form-chuc-danh-khoa-hoc.component';
import {ChucDanhKhoaHocComponent} from './chuc-danh-khoa-hoc/chuc-danh-khoa-hoc.component';
import {BacLuongComponent} from './bac-luong/bac-luong.component';
import {AuthGuard} from '@core/guards/auth.guard';
import {BaseCatalogActionComponent} from './_base/base-catalog-action/base-catalog-action.component';
import {LoaiNhanSuComponent} from './loai-nhan-su/loai-nhan-su.component';
import {FormLoaiNhanSuComponent} from './loai-nhan-su/form-loai-nhan-su/form-loai-nhan-su.component';
import {CapQuyetDinhComponent} from './cap-quyet-dinh/cap-quyet-dinh.component';
import {FormCapQuyetDinhComponent} from './cap-quyet-dinh/form-cap-quyet-dinh/form-cap-quyet-dinh.component';
import {ChucDanhComponent} from './chuc-danh/chuc-danh.component';
import {FormChucDanhComponent} from './chuc-danh/form-chuc-danh/form-chuc-danh.component';
import {ChucVuCongDoanComponent} from './chuc-vu-cong-doan/chuc-vu-cong-doan.component';
import {FormChucVuCongDoanComponent} from './chuc-vu-cong-doan/form-chuc-vu-cong-doan/form-chuc-vu-cong-doan.component';
import {ChucVuCuuChienBinhComponent} from './chuc-vu-cuu-chien-binh/chuc-vu-cuu-chien-binh.component';
import {FormChucVuCuuChienBinhComponent} from './chuc-vu-cuu-chien-binh/form-chuc-vu-cuu-chien-binh/form-chuc-vu-cuu-chien-binh.component';
import {ChucVuDangComponent} from './chuc-vu-dang/chuc-vu-dang.component';
import {FormChucVuDangComponent} from './chuc-vu-dang/form-chuc-vu-dang/form-chuc-vu-dang.component';
import {ChucVuDoanComponent} from './chuc-vu-doan/chuc-vu-doan.component';
import {FormChucVuDoanComponent} from './chuc-vu-doan/form-chuc-vu-doan/form-chuc-vu-doan.component';
import {HinhThucDaoTaoComponent} from './hinh-thuc-dao-tao/hinh-thuc-dao-tao.component';
import {FormHinhThucDaoTaoComponent} from './hinh-thuc-dao-tao/form-hinh-thuc-dao-tao/form-hinh-thuc-dao-tao.component';
import {HoiNghiComponent} from './hoi-nghi/hoi-nghi.component';
import {FormHoiNghiComponent} from './hoi-nghi/form-hoi-nghi/form-hoi-nghi.component';
import {LinhVucComponent} from './linh-vuc/linh-vuc.component';
import {FormLinhVucComponent} from './linh-vuc/form-linh-vuc/form-linh-vuc.component';
import {LoaiThuongBinhComponent} from './loai-thuong-binh/loai-thuong-binh.component';
import {FormLoaiThuongBinhComponent} from './loai-thuong-binh/form-loai-thuong-binh/form-loai-thuong-binh.component';
import {QuanHamComponent} from './quan-ham/quan-ham.component';
import {FormQuanHamComponent} from './quan-ham/form-quan-ham/form-quan-ham.component';
import {TapChiComponent} from './tap-chi/tap-chi.component';
import {FormTapChiComponent} from './tap-chi/form-tap-chi/form-tap-chi.component';
import {FormTinhTrangSucKhoeComponent} from './tinh-trang-suc-khoe/form-tinh-trang-suc-khoe/form-tinh-trang-suc-khoe.component';
import {TinhTrangSucKhoeComponent} from './tinh-trang-suc-khoe/tinh-trang-suc-khoe.component';

import {GridModule} from '@progress/kendo-angular-grid';
import {DialogsModule} from '@progress/kendo-angular-dialog';
import {LayoutModule} from '@progress/kendo-angular-layout';
import {TranslateModule} from '@ngx-translate/core';
import {AscSelectModule} from '@shared/containers/asc-select/asc-select.module';
import {CustomPipeModule} from '@shared/pipes/custom-pipe.module';
import {FieldErrorModule} from '@shared/containers/field-error/field-error.module';
import {NzInputNumberModule} from 'ng-zorro-antd/input-number';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {ChuyenNganhComponent} from './chuyen-nganh/chuyen-nganh.component';
import {FormChuyenNganhComponent} from './chuyen-nganh/form-chuyen-nganh/form-chuyen-nganh.component';
import {FormNganhComponent} from './chuyen-nganh/form-nganh/form-nganh.component';
import {FormNhomViecLamComponent, FormViTriViecLamComponent, ListNhomViecLamComponent, ListViTriViecLamComponent, ViTriViecLamComponent,} from './vi-tri-viec-lam';
import {FormNgachCongChucComponent, FormNhomNgachComponent, ListNgachCongChucComponent, ListNhomNgachComponent, NgachCongChucComponent,} from './ngach-cong-chuc';

import {CoQuanComponent, FormCoQuanComponent, FormKhoiCoQuanComponent, ListCoQuanComponent, ListKhoiCoQuanComponent} from './co-quan';
import {
    DonViHanhChinhComponent,
    FormPhuongXaComponent,
    FormQuanHuyenComponent,
    FormTinhThanhComponent,
    ListPhuongXaComponent,
    ListQuanHuyenComponent,
    ListTinhThanhComponent,
} from './don-vi-hanh-chinh';
import {FormLoaiHopDongComponent, FormNhomHopDongComponent, ListLoaiHopDongComponent, ListNhomHopDongComponent} from './loai-hop-dong';
import {ControlErrorModule} from '@shared/controls/control-error/control-error.module';
import {FormDirectiveModule} from '@shared/directives/forms';
import { NzSelectModule } from 'ng-zorro-antd';

const AllModules = [
    GridModule,
    DialogsModule,
    LayoutModule,
    TranslateModule,
    AscSelectModule,
    FieldErrorModule,
    CustomPipeModule,
    NzInputNumberModule,
    NzButtonModule,
    NzDatePickerModule,
    NzDropDownModule,
    ControlErrorModule,
    FormDirectiveModule,
    NzSelectModule,
];
const routes: Routes = [
    {
        path: '',
        component: CatalogsComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'quoc-gia',
                component: QuocGiaComponent,
            },
            {
                path: 'ngoai-ngu',
                component: NgoaiNguComponent,
            },
            {
                path: 'trinh-do-ngoai-ngu',
                component: TrinhDoNgoaiNguComponent,
            },
            {
                path: 'don-vi-hanh-chinh',
                component: DonViHanhChinhComponent,
            },
            {
                path: 'dan-toc',
                component: DanTocComponent,
            },
            {
                path: 'ton-giao',
                component: TonGiaoComponent,
            },
            {
                path: 'trinh-do-van-hoa',
                component: TrinhDoVanHoaComponent,
            },
            {
                path: 'trinh-do-nha-nuoc',
                component: TrinhDoNhaNuocComponent,
            },
            {
                path: 'trinh-do-vi-tinh',
                component: TrinhDoViTinhComponent,
            },
            {
                path: 'trinh-do-chinh-tri',
                component: TrinhDoChinhTriComponent,
            },
            {
                path: 'quan-he-gia-dinh',
                component: QuanHeGiaDinhComponent,
            },
            {
                path: 'doi-tuong-chinh-sach',
                component: DoiTuongChinhSachComponent,
            },
            {
                path: 'doi-tuong-danh-gia',
                component: DoiTuongDanhGiaComponent,
            },
            {
                path: 'doi-tuong-thuc-hien',
                component: DoiTuongThucHienComponent,
            },
            {
                path: 'quan-ly-hop-dong',
                component: LoaiHopDongComponent,
            },
            {
                path: 'quan-ly-co-quan',
                component: CoQuanComponent,
            },
            {
                path: 'quan-ly-vi-tri-viec-lam',
                component: ViTriViecLamComponent,
            },
            {
                path: 'quan-ly-ngach-cong-chuc',
                component: NgachCongChucComponent,
            },
            // {
            //     path: 'hoc-vi',
            //     component: HocViComponent,
            // },
            {
                path: 'khen-thuong',
                component: KhenThuongComponent,
            },
            {
                path: 'ket-qua-danh-gia',
                component: KetQuaDanhGiaComponent,
            },
            {
                path: 'ky-luat',
                component: KyLuatComponent,
            },
            {
                path: 'tinh-trang-hon-nhan',
                component: TinhTrangHonNhanComponent,
            },
            {
                path: 'trinh-do-chuyen-mon',
                component: TrinhDoChuyenMonComponent,
            },
            {
                path: 'nhom-mau',
                component: NhomMauComponent,
            },
            {
                path: 'chuc-vu',
                component: ChucVuComponent,
            },
            {
                path: 'hinh-thuc-tra-loi',
                component: HinhThucTraLoiComponent,
            },
            {
                path: 'danh-hieu',
                component: DanhHieuComponent,
            },
            {
                path: 'bac-luong',
                component: BacLuongComponent,
            },
            {
                path: 'trinh-do-chuyen-mon',
                component: TrinhDoChuyenMonComponent,
            },
            {
                path: 'chuc-danh-khoa-hoc',
                component: ChucDanhKhoaHocComponent,
            },
            {
                path: 'loai-nhan-su',
                component: LoaiNhanSuComponent,
            },
            {
                path: 'cap-quyet-dinh',
                component: CapQuyetDinhComponent,
            },
            {
                path: 'chuc-danh',
                component: ChucDanhComponent,
            },
            {
                path: 'chuc-vu-cong-doan',
                component: ChucVuCongDoanComponent,
            },
            {
                path: 'chuc-vu-cuu-chien-binh',
                component: ChucVuCuuChienBinhComponent,
            },
            {
                path: 'chuc-vu-dang',
                component: ChucVuDangComponent,
            },
            {
                path: 'chuc-vu-doan',
                component: ChucVuDoanComponent,
            },
            {
                path: 'hinh-thuc-dao-tao',
                component: HinhThucDaoTaoComponent,
            },
            {
                path: 'hoi-nghi',
                component: HoiNghiComponent,
            },
            {
                path: 'linh-vuc',
                component: LinhVucComponent,
            },
            {
                path: 'loai-thuong-binh',
                component: LoaiThuongBinhComponent,
            },
            {
                path: 'quan-ham',
                component: QuanHamComponent,
            },
            {
                path: 'tap-chi',
                component: TapChiComponent,
            },
            {
                path: 'tinh-trang-suc-khoe',
                component: TinhTrangSucKhoeComponent,
            },
            {
                path: 'chuyen-nganh',
                component: ChuyenNganhComponent,
            },
        ],
    },
];

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(routes), AllModules],
    declarations: [
        CatalogsComponent,
        QuocGiaComponent,
        FormQuocGiaComponent,
        NgoaiNguComponent,
        FormNgoaiNguComponent,
        TrinhDoNgoaiNguComponent,
        FormTrinhDoNgoaiNguComponent,
        DonViHanhChinhComponent,
        FormTinhThanhComponent,
        FormQuanHuyenComponent,
        FormPhuongXaComponent,
        DanTocComponent,
        FormDanTocComponent,
        TonGiaoComponent,
        FormTonGiaoComponent,
        TrinhDoVanHoaComponent,
        FormTrinhDoVanHoaComponent,
        TrinhDoNhaNuocComponent,
        FormTrinhDoNhaNuocComponent,
        TrinhDoViTinhComponent,
        FormTrinhDoViTinhComponent,
        TrinhDoChinhTriComponent,
        FormTrinhDoChinhTriComponent,
        QuanHeGiaDinhComponent,
        FormQuanHeGiaDinhComponent,
        DoiTuongChinhSachComponent,
        FormDoiTuongChinhSachComponent,
        LoaiHopDongComponent,
        FormNhomHopDongComponent,
        FormLoaiHopDongComponent,
        CoQuanComponent,
        FormKhoiCoQuanComponent,
        FormCoQuanComponent,
        HocViComponent,
        FormHocViComponent,
        KhenThuongComponent,
        FormKhenThuongComponent,
        KyLuatComponent,
        FormKyLuatComponent,
        TinhTrangHonNhanComponent,
        FormTinhTrangHonNhanComponent,
        TrinhDoChuyenMonComponent,
        FormTrinhDoChuyenMonComponent,
        KetQuaDanhGiaComponent,
        FormKetQuaDanhGiaComponent,
        ViTriViecLamComponent,
        FormViTriViecLamComponent,
        FormNhomViecLamComponent,
        NhomMauComponent,
        FormNhomMauComponent,
        ChucVuComponent,
        FormChucVuComponent,
        FormHinhThucTraLoiComponent,
        HinhThucTraLoiComponent,
        FormDanhHieuComponent,
        DanhHieuComponent,
        NgachCongChucComponent,
        FormNgachCongChucComponent,
        FormNhomNgachComponent,
        BacLuongComponent,
        FormBacLuongComponent,
        DoiTuongDanhGiaComponent,
        FormDoiTuongDanhGiaComponent,
        DoiTuongThucHienComponent,
        FormDoiTuongThucHienComponent,
        ChucDanhKhoaHocComponent,
        FormChucDanhKhoaHocComponent,
        BaseCatalogActionComponent,
        LoaiNhanSuComponent,
        FormLoaiNhanSuComponent,
        CapQuyetDinhComponent,
        FormCapQuyetDinhComponent,
        ChucDanhComponent,
        FormChucDanhComponent,
        ChucVuCongDoanComponent,
        FormChucVuCongDoanComponent,
        ChucVuCuuChienBinhComponent,
        FormChucVuCuuChienBinhComponent,
        ChucVuDangComponent,
        FormChucVuDangComponent,
        ChucVuDoanComponent,
        FormChucVuDoanComponent,
        HinhThucDaoTaoComponent,
        FormHinhThucDaoTaoComponent,
        HoiNghiComponent,
        FormHoiNghiComponent,
        LinhVucComponent,
        FormLinhVucComponent,
        LoaiThuongBinhComponent,
        FormLoaiThuongBinhComponent,
        QuanHamComponent,
        FormQuanHamComponent,
        TapChiComponent,
        FormTapChiComponent,
        TinhTrangSucKhoeComponent,
        FormTinhTrangSucKhoeComponent,
        ChuyenNganhComponent,
        FormChuyenNganhComponent,
        FormNganhComponent,
        ListNhomViecLamComponent,
        ListViTriViecLamComponent,
        ListNhomNgachComponent,
        ListNgachCongChucComponent,
        ListKhoiCoQuanComponent,
        ListCoQuanComponent,
        ListTinhThanhComponent,
        ListQuanHuyenComponent,
        ListPhuongXaComponent,
        ListLoaiHopDongComponent,
        ListNhomHopDongComponent,
    ],
})
export class CatalogsModule {
}
