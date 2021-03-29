import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingComponent } from './setting.component';
import { Routes, RouterModule } from '@angular/router';
import { ReportSampleComponent } from './report-sample/report-sample.component';
import { FormReportSampleComponent } from './report-sample/form-report-sample/form-report-sample.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconProjectComponent } from './icon-project/icon-project.component';
import { NzListModule } from 'ng-zorro-antd';
const routes: Routes = [
    {
        path: '',
        component: SettingComponent,
        children: [
            {
                path: 'bieu-mau',
                component: ReportSampleComponent,
            },
            {
                path: 'icon',
                component: IconProjectComponent,
            },
            {
                path: '',
                redirectTo: 'bieu-mau',
                pathMatch: 'full',
            },
        ],
    },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), FormsModule, ReactiveFormsModule, SharedModule, NzListModule],
    declarations: [SettingComponent, ReportSampleComponent, FormReportSampleComponent, IconProjectComponent],
})
export class SettingModule {}
