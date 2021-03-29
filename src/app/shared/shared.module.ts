import { EXTERNAL_MODULE } from './modules/external.module';
import { KENDO_MODULE } from './modules/kendo.module';
import { ANT_DESIGN_MODULE } from './modules/zorro.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AscEditContentComponent } from './containers/asc-editcontent/asc-editcontent.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { WidgetModule } from './widgets';
import { SharedDirectiveModule } from './directives';
import { CustomPipeModule } from './pipes';
import { FieldErrorModule } from './containers/field-error';
import { AscSelectModule } from './containers/asc-select';
import { AscUploadModule } from './containers/asc-upload';

const CONTAINERS = [AscEditContentComponent];

const INTERNAL_MODULE = [FieldErrorModule, AscSelectModule, AscUploadModule, WidgetModule, SharedDirectiveModule];

@NgModule({
    declarations: [CONTAINERS],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ANT_DESIGN_MODULE,
        KENDO_MODULE,
        EXTERNAL_MODULE,
        INTERNAL_MODULE,
        CustomPipeModule,
    ],
    exports: [ANT_DESIGN_MODULE, KENDO_MODULE, EXTERNAL_MODULE, CONTAINERS, INTERNAL_MODULE, CustomPipeModule],
    providers: [NzMessageService, NzNotificationService],
})
export class SharedModule {}
