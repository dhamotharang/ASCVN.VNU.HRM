import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionEnum } from '@core/constants/enum.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import { NotificationService } from '@core/services/common/notification.service';
import { UtilService } from '@core/services/common/util.service';
import { WindowCloseResult, WindowRef, WindowService } from '@progress/kendo-angular-dialog';
import { State } from '@progress/kendo-data-query';
import { DropDownListEnum } from '@shared/containers/asc-select/asc-select.enum';
import { IDotDanhGia } from '../../../_models/survey.model';
import { FormChonNhanSuComponent } from '../form-chon-nhan-su/form-chon-nhan-su.component';
import { FormChonPhieuDanhGiaComponent } from '../form-chon-phieu-danh-gia/form-chon-phieu-danh-gia.component';
import { DateUtil } from '@core/utils/date';
import { FormUtil } from '@core/utils/form';
import { map, switchMap, tap } from 'rxjs/operators';

@Component({
    selector: 'app-form-dot-danh-gia',
    templateUrl: './form-dot-danh-gia.component.html',
    styleUrls: ['./form-dot-danh-gia.component.scss'],
})
export class FormDotDanhGiaComponent implements OnInit, AfterViewInit {
    @Input() action: ActionEnum;
    @Input() model: IDotDanhGia;
    form: FormGroup;

    public openedDotDanhGia = false;
    public gridViewDoiTuong = [];
    public gridState: State = {
        sort: [{field: 'id', dir: 'desc'}],
        skip: 0,
        take: 20,
    };

    dropdownListEnum = DropDownListEnum;
    actionEnum = ActionEnum;
    updateAfterCreate = 0;

    overlay: HTMLElement;
    dotDanhGia: IDotDanhGia;

    constructor(
        public apiService: ApiService,
        private formBuilder: FormBuilder,
        private util: UtilService,
        private notification: NotificationService,
        private window: WindowRef,
        private windowService: WindowService,
        private translate: CustomTranslateService
    ) {
    }

    ngOnInit() {
        this.initFormDotDanhGia();
        if (this.action === ActionEnum.UPDATE && this.model) {
            this.getById(this.model.dotDanhGiaId);
        } else {
            this.loadDoiTuongDanhGia();
        }
    }

    ngAfterViewInit() {
        this.overlay = document.querySelector('.k-overlay');
    }

    getById(idDotDanhGia: number) {
        this.apiService
            .read(UrlConstant.API.PKS_DOT_DANH_GIA + '/ById', {
                dotDanhGiaId: idDotDanhGia,
            }).pipe(
                map(res => res.result),
                tap(res => {
                    this.dotDanhGia = res;
                    this.form.patchValue(this.dotDanhGia);

                    // Set năm
                    const setNewDate = new Date();
                    setNewDate.setFullYear(this.dotDanhGia.nam);
                    this.form.get('namDanhGia').setValue(setNewDate);
                }),
                switchMap(_ => this.apiService
                    .read(UrlConstant.API.DM_DOI_TUONG_DANH_GIA + '/List', {
                        pageSize: 0,
                        pageNumber: 0,
                    }))
            )
            .subscribe(response => {
                const doiTuongDanhGias = response.result?.items;
                // set list đối tượng đánh giá
                this.gridViewDoiTuong = this.dotDanhGia.dotDanhGiaChiTiets.map(x => {
                    const itemDoiTuong = doiTuongDanhGias.find(m => m.doiTuongDanhGiaId === x.doiTuongDanhGiaId);
                    if (itemDoiTuong) {
                        return {
                            dotDanhGiaChiTietId: x.dotDanhGiaChiTietId,
                            ten: itemDoiTuong.ten,
                            phieuDanhGiaId: x.phieuDanhGiaId,
                            doiTuongDanhGiaId: x.doiTuongDanhGiaId,
                            stt: x.stt,
                            maPhieu: x.maPhieu,
                            tenPhieu: x.tenPhieu,
                            ghiChu: x.ghiChu,
                        };
                    } else {
                        return {
                            dotDanhGiaChiTietId: x.dotDanhGiaChiTietId,
                            phieuDanhGiaId: x.phieuDanhGiaId,
                            doiTuongDanhGiaId: x.doiTuongDanhGiaId,
                            stt: x.stt,
                            maPhieu: x.maPhieu,
                            tenPhieu: x.tenPhieu,
                            ghiChu: x.ghiChu,
                        };
                    }
                });
            });
    }

    /**
     * Inits form dot danh gia
     */
    initFormDotDanhGia() {
        this.form = this.formBuilder.group({
            dotDanhGiaId: [0],
            namDanhGia: [new Date(), Validators.required],
            nam: [null],
            quy: [null, Validators.required],
            tenDotDanhGia: ['', Validators.required],
            tuNgay: [null, Validators.required],
            denNgay: [null, Validators.required],
            stt: [null],
            isKichHoat: [true],
            isVisible: [true],
            ghiChu: [''],
            dotDanhGiaChiTiets: [],
        });
    }

    /**
     * Determines whether submit on
     * @returns
     */
    onSubmit() {
        // set Đối tượng Đánh giá
        const dotDanhGiaChiTiets = this.gridViewDoiTuong.map(m => {
            return {
                dotDanhGiaChiTietId: m.dotDanhGiaChiTietId ?? 0,
                phieuDanhGiaId: m.phieuDanhGiaId ? m.phieuDanhGiaId : null,
                doiTuongDanhGiaId: m.doiTuongDanhGiaId,
                stt: m.stt,
                isVisible: true,
                ghiChu: '',
                isDelete: false,
            };
        });
        this.form.get('dotDanhGiaChiTiets').setValue(dotDanhGiaChiTiets);

        if (this.form.invalid) {
            // trigger validate all field
            FormUtil.validateAllFormFields(this.form);
            return;
        }
        if (this.form.valid) {
            if (!this.util.checkDateFromDateTo(this.form.get('tuNgay').value, this.form.get('denNgay').value)) {
                this.notification.showErrorMessage('Ngày bắt đầu và ngày kết thúc không hợp lệ!');
                return;
            }
            // set năm
            const nam = new Date(this.form.get('namDanhGia').value).getFullYear();
            this.form.get('nam').setValue(Number.parseInt(nam.toString(), 10));
            this.form.get('tuNgay').setValue(DateUtil.getFullDate(this.form.get('tuNgay').value));
            this.form.get('denNgay').setValue(DateUtil.getFullDate(this.form.get('denNgay').value));

            switch (this.action) {
                case ActionEnum.CREATE:
                    this.apiService.post(UrlConstant.API.PKS_DOT_DANH_GIA, this.form.value).subscribe(res => {
                        // show notification
                        this.notification.showSuccessMessage(this.translate.get('MES.CREATE_DONE'));
                        // close form
                        // this.closeForm();
                        if (res.result) {
                            this.action = ActionEnum.UPDATE;
                            this.getById(res.result.dotDanhGiaId);
                            this.updateAfterCreate = 1;
                        }
                    });
                    break;
                case ActionEnum.UPDATE:
                    this.apiService.put(UrlConstant.API.PKS_DOT_DANH_GIA, this.form.value).subscribe(() => {
                        // show notification
                        this.notification.showSuccessMessage(this.translate.get('MES.UPDATE_DONE'));
                        // close form
                        this.closeForm();
                    });
                    break;
            }
        }
    }

    /**
     * Closes form
     */
    closeForm() {
        this.window.close();
    }

    /**
     * Chọn phiếu đánh giá
     * @param item
     * @param index
     */
    selectSurvey(item: any, index: number) {
        const windowRef = this.windowService.open({
            title: 'Chọn phiếu đánh giá',
            content: FormChonPhieuDanhGiaComponent,
            width: 1000,
            top: 100,
        });

        const param = windowRef.content.instance;
        param.action = ActionEnum.UPDATE;
        param.model = item;

        // create a new instance
        windowRef.window.instance.ngAfterViewInit();
        const element = document.querySelector('kendo-window:last-child') as HTMLElement;
        this.overlay.style.zIndex = element.style.zIndex;

        windowRef.result.subscribe((result: any) => {
            if (result instanceof WindowCloseResult) {
            } else {
                this.gridViewDoiTuong[index].maPhieu = result.maPhieu;
                this.gridViewDoiTuong[index].tenPhieu = result.tenPhieu;
                this.gridViewDoiTuong[index].phieuDanhGiaId = result.phieuDanhGiaId;
            }
            this.overlay.style.zIndex = '10001';
        });
    }

    removeSurvey(dataItem, index: number) {
        this.gridViewDoiTuong[index].maPhieu = null;
        this.gridViewDoiTuong[index].tenPhieu = null;
        this.gridViewDoiTuong[index].phieuDanhGiaId = null;
    }

    /**
     * Selects user
     * @param dataItem
     */
    selectUser(dataItem) {
        const windowRef = this.windowService.open({
            title: 'Chọn nhân sự đánh giá',
            content: FormChonNhanSuComponent,
            width: 1200,
            top: 100,
            autoFocusedElement: 'body',
            state: 'maximized',
        });

        const param = windowRef.content.instance;
        param.action = ActionEnum.UPDATE;
        param.model = dataItem;

        // create a new instance
        windowRef.window.instance.ngAfterViewInit();
        const element = document.querySelector('kendo-window:last-child') as HTMLElement;
        this.overlay.style.zIndex = element.style.zIndex;

        windowRef.result.subscribe((result: any) => {
            if (result instanceof WindowCloseResult) {
                this.overlay.style.zIndex = '10001';
            }
        });
    }

    /**
     * Loads doi tuong danh gia
     */
    private loadDoiTuongDanhGia() {
        this.apiService
            .read(UrlConstant.API.DM_DOI_TUONG_DANH_GIA + '/List', {
                pageSize: 0,
                pageNumber: 0,
            })
            .subscribe(res => {
                this.gridViewDoiTuong = res.result?.items;
            });
    }
}
