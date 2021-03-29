import { Input, SimpleChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FOLDER } from '@core/constants/app.constant';
import { IFile, IFileAttach } from '@core/models/common';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { DropDownListEnum } from '@shared/containers/asc-select';
import { Observable } from 'rxjs';
import { LoaiQuyetDinhEnum } from '../../_models/quyet-dinh-enum.enum';

@Component({
  selector: 'app-quyet-dinh-cham-dut-hd-lao-dong',
  templateUrl: './quyet-dinh-cham-dut-hd-lao-dong.component.html',
  styleUrls: ['./quyet-dinh-cham-dut-hd-lao-dong.component.scss']
})
export class QuyetDinhChamDutHdLaoDongComponent implements OnInit {
  @Input() itemDonSelected: any;
  @Input() loaiDonSelected: LoaiQuyetDinhEnum;
  form: FormGroup;
  dropdownListEnum = DropDownListEnum;
  folder = FOLDER;
  itemData: any;
  cacLoaiQuyetDinhEnum: LoaiQuyetDinhEnum;
  constructor(
    private formBuilder: FormBuilder,
  ) { }
  fileInput$: Observable<IFileAttach[]>;
  ngOnInit() {
    if (this.itemDonSelected) {
      this.itemData = this.itemDonSelected
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.itemData = this.itemDonSelected;
      if (this.loaiDonSelected !== this.cacLoaiQuyetDinhEnum) {
        this.itemData = null;
        this.cacLoaiQuyetDinhEnum = this.loaiDonSelected;
      }
    }
  }
  createForm() {
    this.form = this.formBuilder.group({
      idFileDinhKem: [null],
    })
  }
  onSelectFile(files: IFile[]) {
    if (files.length > 0) {
      this.form.get('idFileDinhKem').setValue(files[0].fileId);
    } else {
      this.form.get('idFileDinhKem').setValue(null);
    }
  }
}
