import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionEnum } from '@core/constants/enum.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService } from '@core/services/common/notification.service';
import { WindowRef, WindowService } from '@progress/kendo-angular-dialog';
import { takeUntil } from 'rxjs/operators';
import { DateUtil } from '@core/utils/date';
import { FormUtil } from '@core/utils/form';
import { Subject } from 'rxjs';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import { DropDownListEnum } from '@shared/containers/asc-select/asc-select.enum';
import { map } from 'rxjs/operators';
import { State } from '@progress/kendo-data-query';
import { PagerSettings } from '@progress/kendo-angular-grid';
import { IChiTietQuyetDinh, IItemQuyetDinhTuyenDung, IKeHoachTuyenDung, INhanSuQuyetDinhTuyenDung, TrangThaiKeHoachEnum } from '../../_models';
import { DuLieuNhanSuEnum } from '@themes/views/management/human-resource/_models';
import { BaseCheckPermission } from '@core/auth/base-check-permission';
import { MenuQuery } from '@management-state/menu/menu.query';
import { IFile, IFileAttach } from '@core/models/common';
import { FOLDER } from '@core/constants/app.constant';
import { PopupViewProfileComponent } from '@themes/views/management/human-resource/views/popup-view-profile/popup-view-profile.component';
@Component({
    selector: 'app-form-tao-quyet-dinh',
    templateUrl: './form-tao-quyet-dinh.component.html',
    styleUrls: ['./form-tao-quyet-dinh.component.scss'],
})
export class FormTaoQuyetDinhComponent extends BaseCheckPermission implements OnInit, OnDestroy {
    @Input() action: ActionEnum;
    @Input() model: IItemQuyetDinhTuyenDung;

    folder = FOLDER;
    opened = false;
    isLoadingHoSo = false;
    form: FormGroup;
    pageHSConfig: PagerSettings | boolean = false;
    dropdownListEnum = DropDownListEnum;
    actionEnum = ActionEnum;
    idKeHoachTuyenDung = 0;
    idCoQuan: number;

    listNhanSuSelected: INhanSuQuyetDinhTuyenDung[] = [];
    listNhanSuQDTD: INhanSuQuyetDinhTuyenDung[] = [];
    listTempNhanSuQDTD: INhanSuQuyetDinhTuyenDung[] = [];
    listBangNhanSu: INhanSuQuyetDinhTuyenDung[] = [];
    listQDSubmit: INhanSuQuyetDinhTuyenDung[] = [];

    fileInput: IFileAttach[] = [];
    selectionNhanSuIds: number[] = [];
    userSelected: number[] = [];

    gridStateHoSo: State = {
        sort: [
            {
                field: 'id',
                dir: 'desc',
            },
        ],
        skip: 0,
        take: 20,
    };

    modelFilter = {
        keyword: '',
        maNhanSu: null,
        hoTen: null,
        soDienThoai: null,
        loaiNhanSuId: null,
        loaiHopDongId: null,
        trangThaiNhanSuId: null,
        chucVuId: null,
        chucDanhId: null,
        ngachId: null,
        quocTichId: null,
        danTocId: null,
        tonGiaoId: null,
        coQuanId: [],
        ngayBatDau: null,
        ngayKetThuc: null,
        idKeHoach: null,
        trangThaiDuyet: 1,
        idGioiTinh: null,
        ngaySinh: null,
        trichYeu: null,
        noiNhan: null,
    };

    lstDanhMucKeHoach: IKeHoachTuyenDung[] = [];

    protected destroyed$ = new Subject();
    constructor(
        private apiService: ApiService,
        private formBuilder: FormBuilder,
        private notification: NotificationService,
        private translate: CustomTranslateService,
        protected windowRef: WindowRef,
        protected menuQuery: MenuQuery,
        private windowService: WindowService,
    ) {
        super(menuQuery);
    }

    ngOnInit() {
        super.ngOnInit();
        this.createForm();
        this.loadKeHoachItems();

        if (this.model && this.model.quyetDinh) {
            this.form.setValue(this.model.quyetDinh);

            this.mapFile(this.model.quyetDinh)

            if (this.model.quyetDinh.idNguoiKy) {
                this.userSelected = [this.model.quyetDinh.idNguoiKy];
            }

            this.idKeHoachTuyenDung = this.model.quyetDinh.idKeHoachTuyenDung;
        }
    }

    changeKeHoach(idKeHoach: number) {
        if (idKeHoach && idKeHoach > 0) {
            // lay danh sach Ung vien theo ke hoach
            this.loadNsKeHoachTuyenDung(idKeHoach);
            // lay IdCoQuan => loc lai ns
            const itemKeHoachSelect = this.lstDanhMucKeHoach.find(x => x.id === idKeHoach);
            if (itemKeHoachSelect) {
                this.idCoQuan = itemKeHoachSelect.idCoQuan
            } else {
                this.idCoQuan = null;
            }
        } else {
            this.listTempNhanSuQDTD = [];
            this.listNhanSuSelected = [];
            this.listBangNhanSu = [];
        }
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    onSubmit() {
        this.form.addControl('tuyenDungChiTiets', new FormControl([]));
        if (this.form.invalid) {
            FormUtil.validateAllFormFields(this.form);
            return;
        }
        if (this.form.get('ngayKy').value) {
            this.form.get('ngayKy').setValue(DateUtil.getFullDate(this.form.get('ngayKy').value));
        }
        switch (this.action) {
            case ActionEnum.CREATE:
                if (this.listBangNhanSu.length > 0) {
                    this.form.get('tuyenDungChiTiets').setValue(this.listBangNhanSu.map(x => ({ id: x.id, idNhanSu: x.idNhanSu, ghiChu: '' })));
                }
                this.apiService.post(UrlConstant.API.TD_QUYET_DINH + '/TuyenDung', this.form.value)
                    .pipe(takeUntil(this.destroyed$))
                    .subscribe(() => {
                        this.notification.showSuccessMessage(this.translate.get('MES.CREATE_DONE'));
                        this.closeForm(true);
                    });
                break;
            case ActionEnum.UPDATE:
                this.caculateDeletedList();
                if (this.listBangNhanSu.length > 0) {
                    this.form.get('tuyenDungChiTiets').setValue(
                        this.listQDSubmit.map(x => ({
                            id: x.id,
                            idNhanSu: x.idNhanSu,
                            ghiChu: '',
                            isDeleted: x.isDeleted ? x.isDeleted : false,
                        }))
                    );
                }
                this.apiService.put(UrlConstant.API.TD_QUYET_DINH + '/TuyenDung', this.form.value)
                    .pipe(takeUntil(this.destroyed$))
                    .subscribe(() => {
                        this.notification.showSuccessMessage(this.translate.get('MES.UPDATE_DONE'));
                        this.closeForm(true);
                    });
                break;
        }
    }

    caculateDeletedList() {
        let listDeleted = this.model.items;
        this.listQDSubmit = [...this.listBangNhanSu];
        this.listBangNhanSu.forEach(moi => {
            listDeleted = listDeleted.filter(cu => cu.idNhanSu !== moi.idNhanSu);
        });
        listDeleted.forEach(element => {
            element.isDeleted = true;
            this.listQDSubmit.push(element);
        });
    }

    closeForm(flag?: boolean) {
        this.windowRef.close(flag);
    }

    onSelectFile(files: IFile[]) {
        if (files.length > 0) {
            this.form.get('idFileDinhKem').setValue(files[0].fileId);
        } else {
            this.form.get('idFileDinhKem').setValue(null);
        }
    }

    loadNsKeHoachTuyenDung(idKeHoach: number) {
        this.apiService
            .read(UrlConstant.API.TD_QUYET_DINH + '/NhanSuByKeHoachTuyenDung', {
                pageSize: 0,
                pageNumber: 0,
                isFilterCoQuan: true,
                idKeHoachTuyenDung: idKeHoach,
            })
            .pipe(
                map(res => res.result.items),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {

                this.listNhanSuQDTD = res.map(x => ({
                    id: 0,
                    idNhanSu: x.id,
                    ngaySinh: x.ngaySinh,
                    maNhanSu: x.maNhanSu,
                    hoDem: x.hoDem,
                    ten: x.ten,
                    idGioiTinh: x.idGioiTinh,
                    tenGioiTinh: x.tenGioiTinh,
                    idLoaiNhanSu: x.idLoaiNhanSu,
                    tenLoaiNhanSu: x.tenLoaiNhanSu,
                    idNgach: x.idNgach,
                    tenNgachCongChuc: x.tenNgachCongChuc,
                    idTrinhDoChuyenMon: x.idTrinhDoChuyenMon,
                    tenTrinhDoChuyenMon: x.tenTrinhDoChuyenMon,
                    idViTriViecLam: x.idViTriViecLam,
                    tenViTriViecLam: x.tenViTriViecLam,
                    soQuyetDinh: x.soQuyetDinh,
                }));

                this.listTempNhanSuQDTD = this.listNhanSuQDTD;
                if (this.model?.items && this.model.items.length > 0) {
                    this.listBangNhanSu = this.model.items;
                    if (this.listBangNhanSu.length > 0) {
                        let list = this.listTempNhanSuQDTD;
                        this.listNhanSuQDTD.forEach(x => {
                            this.listBangNhanSu.forEach(y => {
                                if (x.idNhanSu === y.idNhanSu) {
                                    list = list.filter(z => z.idNhanSu !== x.idNhanSu);
                                }
                            });
                        });
                        this.listTempNhanSuQDTD = list;
                        this.listNhanSuSelected = [];
                    }
                }
            });
    }

    addMemberToTable() {
        if (this.listNhanSuSelected.length > 0) {
            let list = this.listTempNhanSuQDTD;
            this.listTempNhanSuQDTD.forEach(x => {
                this.listNhanSuSelected.forEach(y => {
                    if (x.idNhanSu === y.idNhanSu) {
                        this.listBangNhanSu.push(y);
                        list = list.filter(z => z.idNhanSu !== x.idNhanSu);
                    }
                });
            });
            this.listTempNhanSuQDTD = list;
            this.listNhanSuSelected = [];
        }
    }

    deleteMemberToTable() {
        let list = this.listBangNhanSu;
        this.selectionNhanSuIds.map(x => {
            const itemFinded = this.listBangNhanSu.find(y => x === y.idNhanSu);
            if (itemFinded) {
                list = list.filter(z => z.idNhanSu !== itemFinded.idNhanSu);
                this.listTempNhanSuQDTD.push(itemFinded);
            }
        });
        this.listBangNhanSu = list;
    }

    showLinkDuyetHoSoNhanSu(nhanSuId: number) {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: 'Xem hồ sơ',
            content: PopupViewProfileComponent,
            width: 1150,
            top: 10,
            autoFocusedElement: 'body',
            state: 'maximized'
        });

        const param = windowRef.content.instance;
        param.nhanSuId = nhanSuId;
        param.duLieuNhanSuEnum = DuLieuNhanSuEnum.DE_XUAT;

        windowRef.result.subscribe(() => {
            this.opened = false;
        });
    }

    private createForm() {
        this.form = this.formBuilder.group({
            id: [0],
            soQuyetDinh: ['', Validators.required],
            idKeHoachTuyenDung: [null, Validators.required],
            idNguoiKy: [null],
            tenNguoiKy: [null],
            ngayKy: [null],
            chucVuNguoiKy: [null],
            trichYeu: [null],
            noiDungCanCu: [null],
            noiDung: [null],
            noiNhan: [null],
            ghiChu: [null],
            idFileDinhKem: [null],
            guidIdFileDinhKem: [null],
            tenFile: [null],
            type: [null],
            size: [null],
            path: [null],
            forWeb: [null],
            checkSum: [null],
        });
    }

    private loadKeHoachItems() {
        this.apiService
            .read(UrlConstant.API.HRM_TD_KE_HOACH_TUYEN_DUNG + '/DanhMuc', {
                pageSize: 0,
                pageNumber: 0,
                nam: null,
                idTrangThaiDuyet: TrangThaiKeHoachEnum.BAN_DUYET,
                isFilterCoQuan: true,
            })
            .pipe(
                map(res => res.result),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                this.lstDanhMucKeHoach = res.items;
                if (this.action !== ActionEnum.CREATE) {
                    this.changeKeHoach(this.model.quyetDinh.idKeHoachTuyenDung);
                }
            });
    }

    private mapFile(item: IChiTietQuyetDinh) {
        if (item.idFileDinhKem && item.idFileDinhKem > 0) {
            this.fileInput.push({
                fileDinhKemId: item.idFileDinhKem,
                name: item.tenFile,
                size: item.size,
                path: item.path,
                guidId: item.guidIdFileDinhKem,
                fileAttachId: null,
                type: item.type,
            });
        }
    }

}
