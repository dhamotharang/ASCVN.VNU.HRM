import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FOLDER } from '@core/constants/app.constant';
import { IFile, IFileAttach } from '@core/models/common';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { DropDownListEnum } from '@shared/containers/asc-select';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-quyet-dinh-cham-dut-hdld',
  templateUrl: './form-quyet-dinh-cham-dut-hdld.component.html',
  styleUrls: ['./form-quyet-dinh-cham-dut-hdld.component.scss']
})
export class FormQuyetDinhChamDutHdldComponent implements OnInit {
  form: FormGroup;
  dropdownListEnum = DropDownListEnum;
  folder = FOLDER;
  constructor(
    public windowRef: WindowRef,
    private formBuilder: FormBuilder,
  ) { }
  fileInput$: Observable<IFileAttach[]>;
  ngOnInit() {
  }
  closeForm() {
    this.windowRef.close();
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
