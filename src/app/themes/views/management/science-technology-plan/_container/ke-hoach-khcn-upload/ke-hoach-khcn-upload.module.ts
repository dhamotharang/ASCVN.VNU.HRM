import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeHoachKhcnUploadComponent } from './ke-hoach-khcn-upload.component';
import { FormsModule } from '@angular/forms';
import { ViewFileModule } from '@shared/controls/view-file';
import { NzButtonModule, NzModalModule, NzUploadModule, NzIconModule, NzModalService } from 'ng-zorro-antd';
@NgModule({
    declarations: [KeHoachKhcnUploadComponent],
    imports: [CommonModule, FormsModule, NzButtonModule, NzModalModule, NzUploadModule, NzIconModule, ViewFileModule],
    exports: [KeHoachKhcnUploadComponent],
    providers: [NzModalService],
})
export class KeHoachKhcnUploadModule {}
