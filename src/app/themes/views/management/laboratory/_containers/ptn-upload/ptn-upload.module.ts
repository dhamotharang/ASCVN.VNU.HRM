import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ViewFileModule } from '@shared/controls/view-file/view-file.module';
import { NzIconModule } from 'ng-zorro-antd';
import { PtnUploadComponent } from './ptn-upload.component';

@NgModule({
    declarations: [PtnUploadComponent],
    imports: [CommonModule, FormsModule, NzButtonModule, NzModalModule, NzUploadModule, NzIconModule, ViewFileModule],
    exports: [PtnUploadComponent],
    providers: [NzModalService],
})
export class PtnUploadModule {}
