import { StepComponent } from './pages/step/step.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './pages/default/default.component';
import { ManagementComponent } from './management.component';
import { AuthGuard } from '@core/guards/auth.guard';
import { DashboardV2Component } from './dashboard-v2/dashboard-v2.component';
import { ProfileComponent } from '@themes/views/management/pages/profile/profile.component';
import { ForbidenComponent } from '@themes/views/management/pages/forbiden/forbiden.component';
import { RequireLoginUserComponent } from './pages/require-login-user/require-login-user.component';
import { UserGuard } from '@core/guards/user.guard';

const routes: Routes = [
    {
        path: '',
        component: ManagementComponent,
        children: [
            {
                path: '',
                component: DefaultComponent,
                children: [
                    {
                        path: 'dashboard',
                        component: DashboardV2Component,
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'trang-ca-nhan',
                        component: ProfileComponent,
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'gioi-thieu',
                        component: StepComponent
                    },
                    {
                        path: 'system',
                        loadChildren: () => import('../management/system/system.module').then(m => m.SystemModule),
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'thiet-lap',
                        loadChildren: () => import('../management/setting/setting.module').then(m => m.SettingModule),
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'catalog',
                        loadChildren: () => import('../management/catalogs/catalogs.module').then(m => m.CatalogsModule),
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'survey',
                        loadChildren: () => import('../management/survey/survey.module').then(m => m.SurveyModule),
                        canActivate: [AuthGuard],
                        // data: { preload: true },
                    },
                    {
                        path: 'human-resource',
                        loadChildren: () => import('../management/human-resource/human-resource.module').then(m => m.HumanResourceModule),
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'llkh',
                        loadChildren: () =>
                            import('../management/scientific-background/scientific-background.module').then(
                                m => m.ScientificBackgroundModule
                            ),
                        canActivate: [AuthGuard],
                        canLoad: [UserGuard],
                    },
                    {
                        path: 'tuyen-dung',
                        loadChildren: () => import('../management/recruitment/recruitment.module').then(m => m.RecruitmentModule),
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'quan-ly-don',
                        loadChildren: () => import('../management/forms-management/forms-management.module').then(m => m.FormsManagementModule),
                        canActivate: [AuthGuard],
                    },
                    {
                        path: '403',
                        component: ForbidenComponent,
                    },
                    {
                        path: 'login-ns',
                        component: RequireLoginUserComponent,
                    },
                    {
                        path: '',
                        redirectTo: 'dashboard',
                        pathMatch: 'full',
                    },
                    {
                        path: 'phong-thi-nghiem',
                        loadChildren: () => import('../management/laboratory/laboratory.module').then(m => m.LaboratoryModule),
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'danh-muc',
                        loadChildren: () => import('../management/laboratory-catalog/laboratory-catalog.module').then(m => m.LaboratoryCatalogModule),
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'khoa-hoc-cong-nghe',
                        loadChildren: () => import('../management/science-technology/science-technology.module').then(m => m.ScienceTechnologyModule),
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'ke-hoach-khcn',
                        loadChildren: () => import('../management/science-technology-plan/views/science-technology-plan.module').then(m => m.ScienceTechnologyPlanModule),
                        canActivate: [AuthGuard],
                    },
                ],
            },
        ],
    },
    {
        path: '**',
        redirectTo: '404',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ManagementRoutingModule {}
