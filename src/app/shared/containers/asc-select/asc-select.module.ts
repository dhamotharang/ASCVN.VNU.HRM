import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { AscSelectComponent } from '@shared/containers/asc-select/asc-select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@NgModule({
    declarations: [AscSelectComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NzSelectModule, NgxSpinnerModule],
    exports: [AscSelectComponent],
    providers: [NgxSpinnerService],
})
export class AscSelectModule {}
