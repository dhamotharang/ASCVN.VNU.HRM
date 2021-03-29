import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { IDoiTuongThucHien, IHinhThucTraLoi } from '@themes/views/management/catalogs/_models/catalog.model';
import { ActionCreateServeyEnum } from '@themes/views/management/survey/_models/survey.enum';
import { ICauHoi, INhomCauHoi, IPhieuDanhGia } from '@themes/views/management/survey/_models/survey.model';
import { NotificationService } from '@core/services/common/notification.service';
import { UtilService } from '@core/services/common/util.service';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { DropDownListEnum } from '@shared/containers/asc-select/asc-select.enum';
import { forkJoin } from 'rxjs';
import { FormNhomCauHoiComponent } from './form-nhom-cau-hoi/form-nhom-cau-hoi.component';

@Component({
    selector: 'app-create-phieu-danh-gia',
    templateUrl: './create-phieu-danh-gia.component.html',
    styleUrls: ['./create-phieu-danh-gia.component.scss'],
})
export class CreatePhieuDanhGiaComponent implements OnInit {
    opened = false;
    viewAssig = false;
    viewAssig1 = false;
    viewAssig2 = false;
    viewAssig3 = false;
    checkGroup1 = true;
    checkGroup2 = true;
    checkGroup3 = true;
    action: ActionCreateServeyEnum;
    phieuId: number;
    form: FormGroup;
    modelNhomCauHoi: INhomCauHoi;
    dropdownListEnum = DropDownListEnum;
    doiTuongThucHien: IDoiTuongThucHien[];
    hinhThucTraLoi: IHinhThucTraLoi[];

    constructor(
        private route: ActivatedRoute,
        private utilService: UtilService,
        private formBuilder: FormBuilder,
        private apiService: ApiService,
        private windowService: WindowService,
        private notificationService: NotificationService,
        private router: Router
    ) {}

    ngOnInit() {
        this.phieuId = Number.parseInt(this.route.snapshot.paramMap.get('phieuId'), 10);

        this.initForm();

        const doiTuongThucHiens = this.apiService.read(UrlConstant.API.DM_DOI_TUONG_THUC_HIEN + '/List', {
            pageSize: 0,
            pageNumber: 0,
        });

        const hinhThucTraLois = this.apiService.read(UrlConstant.API.DM_HINH_THUC_TRA_LOI + '/List', {
            pageSize: 0,
            pageNumber: 0,
        });

        forkJoin([doiTuongThucHiens, hinhThucTraLois]).subscribe(res => {
            if (res[0].result && res[0].result.items) {
                this.doiTuongThucHien = res[0].result?.items;
            }

            if (res[1].result && res[1].result.items) {
                this.hinhThucTraLoi = res[1].result?.items;
            }
        });

        if (this.phieuId > 0) {
            this.apiService.read(UrlConstant.API.PKS_PHIEU_DANH_GIA + '/ById', { phieuDanhGiaId: this.phieuId }).subscribe(res => {
                const phieu = res.result as IPhieuDanhGia;
                this.onCheckFlagView(phieu.nhomCauHois);
                for (let index = 0; index < phieu.nhomCauHois.length; index++) {
                    const nhomCauHoiArray = this.form.get('nhomCauHois') as FormArray;
                    nhomCauHoiArray.push(this.initFormChildNhomCauHoi());
                    // tslint:disable-next-line:prefer-for-of
                    for (let j = 0; j < phieu.nhomCauHois[index].cauHois.length; j++) {
                        const cauHoiArray = nhomCauHoiArray.at(index).get('cauHois') as FormArray;
                        cauHoiArray.push(this.initFormCauHoi());
                    }
                }
                this.form.patchValue(phieu);
            });
        }
    }

    onSubmit() {
        if (this.form.invalid) {
            // trigger validate all field
            this.utilService.validateAllFormFields(this.form);
            return;
        }
        if (this.form.valid) {
            let soCauXepLoai1 = 0;
            let soCauXepLoai2 = 0;
            let soCauXepLoai3 = 0;
            // xu ly
            const item = this.form.value as IPhieuDanhGia;
            if (item.nhomCauHois.length > 0) {
                item.nhomCauHois.map(x => {
                    if (x.cauHois.length > 0) {
                        x.cauHois.map(y => {
                            if (y.hinhThucTraLoiId === 3) {
                                if (x.doiTuongThucHienId === 1) {
                                    soCauXepLoai1++;
                                }
                                if (x.doiTuongThucHienId === 2) {
                                    soCauXepLoai2++;
                                }
                                if (x.doiTuongThucHienId === 3) {
                                    soCauXepLoai3++;
                                }
                            }
                        });
                    }
                });

                this.checkGroup1 = soCauXepLoai1 <= 1;
                this.checkGroup2 = soCauXepLoai2 <= 1;
                this.checkGroup3 = soCauXepLoai3 <= 1;
            }

            if (this.checkGroup1 && this.checkGroup2 && this.checkGroup3) {
                if (this.phieuId > 0) {
                    this.apiService.put(UrlConstant.API.PKS_PHIEU_DANH_GIA, this.form.value).subscribe(res => {
                        this.notificationService.showSuccessMessage('Cập nhật phiếu đánh giá thành công !');
                        this.router.navigate(['/management/survey/list-phieu-danh-gia']);
                    });
                } else {
                    this.apiService.post(UrlConstant.API.PKS_PHIEU_DANH_GIA, this.form.value).subscribe(res => {
                        this.notificationService.showSuccessMessage('Tạo phiếu đánh giá thành công !');
                        // resset form
                        this.childNhomCauHoiFormGroup.clear();
                        this.initForm();
                        this.router.navigate(['/management/survey/list-phieu-danh-gia']);
                    });
                }
            } else {
                this.notificationService.showErrorMessage('Cấu trúc phiếu không hợp lệ!');
            }
        }
    }

    initForm() {
        this.form = this.formBuilder.group({
            phieuDanhGiaId: [0],
            maPhieu: ['', Validators.required],
            tenPhieu: ['', Validators.required],
            stt: [null],
            ghiChuDauTrang: [''],
            ghiChuCuoiTrang: [''],
            isVisible: [true],
            ghiChu: [''],
            nhomCauHois: this.formBuilder.array([]),
            quyenHanNguoiKy1: ['NGƯỜI TỰ NHẬN XÉT'],
            quyenHanNguoiKy2: ['NGƯỜI NHẬN XÉT, ĐÁNH GIÁ'],
            quyenHanNguoiKy3: ['NGƯỜI CÓ THẨM QUYỀN ĐÁNH GIÁ'],
        });
    }

    initFormChildNhomCauHoi() {
        return this.formBuilder.group({
            cauHoiId: [0],
            noiDung: [''],
            doiTuongThucHienId: [null],
            hinhThucTraLoiId: [null],
            stt: [0, Validators.required],
            ghiChu: [''],
            isDeleted: [false],
            tieuChiDanhGia: [''],
            cauHois: this.formBuilder.array([]),
        });
    }

    initFormCauHoi() {
        return this.formBuilder.group({
            cauHoiId: [0],
            noiDung: [''],
            hinhThucTraLoiId: [null],
            stt: [0],
            isDeleted: [false],
            ghiChu: [''],
            tieuChiDanhGia: [''],
        });
    }

    get childNhomCauHoiFormGroup() {
        return this.form.get('nhomCauHois') as FormArray;
    }

    get childCauHoiFormGroup() {
        return this.childNhomCauHoiFormGroup.get('cauHois') as FormArray;
    }

    removeChildNhomCauHoi(index: number) {
        if (this.childNhomCauHoiFormGroup.length > 1) {
            if (this.childNhomCauHoiFormGroup.at(index).get('cauHoiId').value > 0) {
                this.childNhomCauHoiFormGroup.at(index).get('isDeleted').setValue(true);
            } else {
                this.childNhomCauHoiFormGroup.removeAt(index);
            }
        }
    }

    removeCauHoi(nhomCauHoiIndex: number, cauHoiIndex: number) {
        const controls = this.childNhomCauHoiFormGroup.at(nhomCauHoiIndex).get('cauHois') as FormArray;
        if (controls.length > 1) {
            if (controls.at(cauHoiIndex).get('cauHoiId').value > 0) {
                controls.at(cauHoiIndex).get('isDeleted').setValue(true);
            } else {
                controls.removeAt(cauHoiIndex);
            }
        }
    }

    createCauHoi(itemNhomCauHoi: INhomCauHoi, index) {
        const control = this.childNhomCauHoiFormGroup.at(index).get('cauHois') as FormArray;
        const item = this.initFormCauHoi();
        const itemNhom = this.formBuilder.group({
            nhomNoiDung: [''],
            doiTuongThucHienId: [null],
        });
        // tslint:disable-next-line:no-string-literal
        itemNhom.controls['doiTuongThucHienId'].setValue(itemNhomCauHoi.doiTuongThucHienId);
        // tslint:disable-next-line:no-string-literal
        itemNhom.controls['nhomNoiDung'].setValue(itemNhomCauHoi.noiDung);

        this.opened = true;
        const windowRef = this.windowService.open({
            title: 'Tạo câu hỏi',
            content: FormNhomCauHoiComponent,
            width: 550,
            top: 100,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.action = ActionCreateServeyEnum.CREATE_ITEM;
        param.model = itemNhom.value;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
            } else {
                item.patchValue(result);
                control.push(item);
            }
            this.opened = false;
        });
    }

    createCauHoiTrucTiep(itemNhomCauHoi: INhomCauHoi, index) {
        const control = this.childNhomCauHoiFormGroup.at(index).get('cauHois') as FormArray;
        control.push(this.initFormCauHoi());
    }

    editCauHoi(item: ICauHoi, itemNhomCauHoi: INhomCauHoi, indexNhom: number, index: number) {
        const control = this.childNhomCauHoiFormGroup.at(indexNhom).get('cauHois') as FormArray;
        const itemNhom = this.formBuilder.group({
            cauHoiId: [0],
            noiDung: [''],
            nhomNoiDung: [''],
            hinhThucTraLoiId: [null],
            doiTuongThucHienId: [null],
            stt: [null],
            ghiChu: [''],
            isDeleted: [false],
            tieuChiDanhGia: [''],
        });

        itemNhom.patchValue(item);
        // tslint:disable-next-line:no-string-literal
        itemNhom.controls['doiTuongThucHienId'].setValue(itemNhomCauHoi.doiTuongThucHienId);
        // tslint:disable-next-line:no-string-literal
        itemNhom.controls['nhomNoiDung'].setValue(itemNhomCauHoi.noiDung);

        this.opened = true;
        const windowRef = this.windowService.open({
            title: 'Chỉnh sửa câu hỏi',
            content: FormNhomCauHoiComponent,
            width: 550,
            top: 100,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.action = ActionCreateServeyEnum.UPDATE_ITEM;
        param.model = itemNhom.value;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
            } else {
                control.at(index).patchValue(result);
            }
            this.opened = false;
        });
    }

    // dropNhomCauHoi(event: CdkDragDrop<string[]>) {
    //     moveItemInArray(this.childNhomCauHoiFormGroup.value, event.previousIndex, event.currentIndex);
    //     // tslint:disable-next-line:no-string-literal
    //     this.form.controls['nhomCauHois'].setValue(this.childNhomCauHoiFormGroup.value);
    // }

    // dropCauHoi(event: CdkDragDrop<string[]>) {
    //     if (event.previousContainer === event.container) {
    //         moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    //     } else {
    //         transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    //     }
    // }

    /// start create nhom cau hoi
    createChildNhomCauHoi() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: 'Tạo nhóm câu hỏi',
            content: FormNhomCauHoiComponent,
            width: 550,
            top: 100,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.action = ActionCreateServeyEnum.CREATE_GROUP;
        param.model = undefined;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
            } else {
                const newNhom = this.initFormChildNhomCauHoi();
                newNhom.patchValue(result);
                this.childNhomCauHoiFormGroup.push(newNhom);
            }
            this.opened = false;
        });
    }

    createChildNhomCauHoiTrucTiep() {
        const itemNhomCauHoi = this.initFormChildNhomCauHoi();
        // tslint:disable-next-line:no-string-literal
        itemNhomCauHoi.controls['hinhThucTraLoiId'].setValue(1);
        this.childNhomCauHoiFormGroup.push(itemNhomCauHoi);
    }

    editHandler(dataItem: INhomCauHoi, index: number) {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: 'Chỉnh sửa nhóm câu hỏi',
            content: FormNhomCauHoiComponent,
            width: 550,
            top: 100,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.action = ActionCreateServeyEnum.UPDATE_GROUP;
        param.model = dataItem;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
            } else {
                this.childNhomCauHoiFormGroup.at(index).patchValue(result);
            }
            this.opened = false;
        });
    }
    /// end create nhom cau hoi

    checkLoaiDoiTuong(data) {
        const listCauHoi = [...this.childNhomCauHoiFormGroup.value];
        this.onCheckFlagView(listCauHoi);
    }

    onCheckFlagView(listData: any[]) {
        // if (listData.length > 0) {
        //     // check loai 1 co ton tai
        //     if (listData.findIndex(x => x.doiTuongThucHienId === 1) > -1) {
        //         this.viewAssig1 = true;
        //     } else {
        //         this.viewAssig1 = false;
        //     }
        //     // check loai 2 co ton tai
        //     if (listData.findIndex(x => x.doiTuongThucHienId === 2) > -1) {
        //         this.viewAssig2 = true;
        //     } else {
        //         this.viewAssig2 = false;
        //     }
        //     // check loai 3 co ton tai
        //     if (listData.findIndex(x => x.doiTuongThucHienId === 3) > -1) {
        //         this.viewAssig3 = true;
        //     } else {
        //         this.viewAssig3 = false;
        //     }
        //     // check view all
        //     if (this.viewAssig1 || this.viewAssig2 || this.viewAssig3) {
        //         this.viewAssig = true;
        //     } else {
        //         this.viewAssig = false;
        //     }
        // }
    }
}
