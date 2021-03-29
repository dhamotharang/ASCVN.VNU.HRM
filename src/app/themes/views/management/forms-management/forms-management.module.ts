import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzCardModule } from 'ng-zorro-antd/card';
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
    NzRateModule,
    NzEmptyModule,
    NzCheckboxModule,
} from 'ng-zorro-antd';
import { FormDirectiveModule } from '@shared/directives/forms';
import { SharedDirectiveModule } from '@shared/directives/shared-directive.module';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { FormsManagementComponent } from './forms-management.component';
import {
    QuanLyDonTuComponent,
    QuyetDinhComponent
} from './views';
import {
    ThongTinDonComponent,
    DanhSachDonComponent,
    NhapYKienComponent,
    NhatKyComponent,
    QuyetDinhChamDutHdLaoDongComponent,
    TaoDonXinChamDutHdComponent,
    DuyetChapDutHdldComponent,
    XinYKienComponent,
    FormQuyetDinhChamDutHdldComponent,
    BoLocDonComponent,
    DanhSachQuyetDinhComponent

} from './components'; 


const routes: Routes = [
    {
        path: '',
        component: FormsManagementComponent,
        canActivateChild: [AuthGuard],
        children: [],
    },
    {
        path: 'quan-ly-don-tu',
        component: QuanLyDonTuComponent,
        canActivateChild: [AuthGuard],
    },
    {
        path: 'quyet-dinh',
        component: QuyetDinhComponent,
        canActivateChild: [AuthGuard],
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
    NzTimelineModule,
    NzCardModule,
    NzRateModule,
    NzEmptyModule,
    NzCheckboxModule
];

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(routes), AllModules],
    declarations: [
        QuanLyDonTuComponent,
        ThongTinDonComponent,
        NhatKyComponent,
        DanhSachDonComponent,
        TaoDonXinChamDutHdComponent,
        DuyetChapDutHdldComponent,
        XinYKienComponent,
        QuyetDinhChamDutHdLaoDongComponent,
        NhapYKienComponent,
        FormQuyetDinhChamDutHdldComponent,
        BoLocDonComponent,
        QuyetDinhComponent,
        DanhSachQuyetDinhComponent
    ],
})
export class FormsManagementModule { }
