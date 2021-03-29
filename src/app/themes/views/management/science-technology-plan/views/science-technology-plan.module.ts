import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScienceTechnologyPlanComponent } from './science-technology-plan.component';
import { CurrencyMaskConfig, CurrencyMaskModule } from 'ng2-currency-mask';
import { TranslateModule } from '@ngx-translate/core';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { GridModule } from '@progress/kendo-angular-grid';
import { ContextMenuModule } from '@progress/kendo-angular-menu';
import { SchedulerModule } from '@progress/kendo-angular-scheduler';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { FieldErrorModule } from '@shared/containers/field-error';
import { ControlErrorModule } from '@shared/controls/control-error/control-error.module';
import { ViewFileModule } from '@shared/controls/view-file';
import { FormDirectiveModule } from '@shared/directives/forms';
import { CustomPipeModule } from '@shared/pipes';
import { WidgetModule } from '@shared/widgets';
import { NzNotificationModule, NzModalModule, NzToolTipModule, NzSelectModule, NzTabsModule, NzAvatarModule, NzButtonModule, NzInputNumberModule, NzUploadModule, NzAffixModule, NzIconModule, NzDropDownModule, NzDatePickerModule, NzPopoverModule, NzResultModule, NzCollapseModule, NzEmptyModule, NzTableModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SplitterModule } from '@progress/kendo-angular-layout';
import { AuthGuard } from '@core/guards/auth.guard';
import { AscSelectModule } from '@shared/containers/asc-select';
import { LapThongBaoKeHoachComponent } from './lap-thong-bao-ke-hoach/lap-thong-bao-ke-hoach.component';
import { FormLapThongBaoKeHoachComponent } from './lap-thong-bao-ke-hoach/form-lap-thong-bao-ke-hoach/form-lap-thong-bao-ke-hoach.component';
import { KeHoachKhcnUploadModule } from '../_container/ke-hoach-khcn-upload/ke-hoach-khcn-upload.module';
import { VarDirective } from '../_base/var-in-view.directive';
import { ChonPhanCongKeHoachComponent } from '../_component/chon-phan-cong-ke-hoach/chon-phan-cong-ke-hoach.component';

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
    WidgetModule,
    CustomPipeModule,
    TranslateModule,
    FormDirectiveModule,
    SchedulerModule,
    NzTableModule,
    CurrencyMaskModule,
    KeHoachKhcnUploadModule
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

const routes: Routes = [
    {
        path: '',
        component: ScienceTechnologyPlanComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'lap-thong-bao-ke-hoach',
                component: LapThongBaoKeHoachComponent,
            },
        ],
    },
];

@NgModule({
    imports: [
        CommonModule, FormsModule, ReactiveFormsModule, SplitterModule, RouterModule.forChild(routes), AllModules
    ],
    declarations: [
        VarDirective,
        ScienceTechnologyPlanComponent,
        LapThongBaoKeHoachComponent,
        FormLapThongBaoKeHoachComponent,
        ChonPhanCongKeHoachComponent
    ]
})
export class ScienceTechnologyPlanModule { }
