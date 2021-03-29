import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AscUploadComponent } from '@shared/containers/asc-upload/asc-upload.component';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ViewFileModule } from '@shared/controls/view-file/view-file.module';
import { NzIconModule } from 'ng-zorro-antd';

@NgModule({
    declarations: [AscUploadComponent],
    imports: [CommonModule, FormsModule, NzButtonModule, NzModalModule, NzUploadModule, NzIconModule, ViewFileModule],
    exports: [AscUploadComponent],
    providers: [NzModalService],
})
export class AscUploadModule {}
