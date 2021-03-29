import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ViewFileModule } from '@shared/controls/view-file';
import { NzButtonModule, NzModalModule, NzUploadModule, NzIconModule, NzModalService } from 'ng-zorro-antd';
import { KhcnUploadComponent } from './khcn-upload.component';

@NgModule({
    declarations: [KhcnUploadComponent],
    imports: [CommonModule, FormsModule, NzButtonModule, NzModalModule, NzUploadModule, NzIconModule, ViewFileModule],
    exports: [KhcnUploadComponent],
    providers: [NzModalService],
})
export class KhcnUploadModule {}
