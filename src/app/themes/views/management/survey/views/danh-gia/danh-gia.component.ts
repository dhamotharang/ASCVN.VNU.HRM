import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { ApiService } from '@core/data-services/api.service';
import {
    ICauHoiViewModel,
    IKetQuaPhieuDanhGia,
    IPhieuDanhGiaSubmit,
    IPhieuDanhGiaViewModel,
} from '@themes/views/management/survey/_models/phieu-danh-gia.model';
import { DoiTuongThucHienEnum, HinhThucTraLoiEnum, TypeManagementSurveyEnum } from '@themes/views/management/survey/_models/survey.enum';
import { IMucDoHoanThanh, ITrangThaiTienDo, IXepLoaiKetQuaDanhGia } from '@themes/views/management/catalogs/_models/catalog.model';
import { ActionEnum, FileExtensionEnum } from '@core/constants/enum.constant';
import { FormBuilder } from '@angular/forms';
import { UtilService } from '@core/services/common/util.service';
import { NotificationService } from '@core/services/common/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { UrlConstant } from '@core/constants/url.constant';
import { forkJoin, Subject } from 'rxjs';
import { SelectUserSingleComponent } from '@shared/widgets/select-user-single/select-user-single.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ExportPhieuDanhGiaComponent } from '../../components/export-phieu-danh-gia/export-phieu-danh-gia.component';
import { ViewFileComponent } from '@shared/controls/view-file/view-file.component';
import { takeUntil } from 'rxjs/operators';
import { FileService } from '@core/services/common/file.service';
import { FOLDER } from '@core/constants/app.constant';
import { NgxSpinnerService } from 'ngx-spinner';
import { SecurityUtil } from '@core/utils/security';
import { ReportUtil } from '@core/utils/report';
import { CustomTranslateService } from '@core/services/common';

class KetQuaDanhGiaModal {
    isDongYKetQua: boolean;
    yKien: string;
    idKetQuaDanhGia: number;
    idsNhanSuDanhGiaChiTiet: number[];
    constructor() {
        this.isDongYKetQua = true;
        this.idKetQuaDanhGia = 0;
        this.idsNhanSuDanhGiaChiTiet = [];
    }
}

@Component({
    selector: 'app-danh-gia',
    templateUrl: './danh-gia.component.html',
    styleUrls: ['./danh-gia.component.css'],
})
export class DanhGiaComponent implements OnInit, OnDestroy {
    phieuDanhGia: IPhieuDanhGiaViewModel;

    phieuDanhGiaId: number;
    nhanSuDanhGiaChiTietId: number;
    dotDanhGiaChiTietId: number;

    hinhThucTraLoiEnum = HinhThucTraLoiEnum;
    doiTuongThucHienEnum = DoiTuongThucHienEnum;

    xepLoaiKetQuaDanhGias: IXepLoaiKetQuaDanhGia[];
    mucDoHoanThanhs: IMucDoHoanThanh[];
    trangThaiTienDos: ITrangThaiTienDo[];
    action: ActionEnum;

    isView = false;
    opened = false;
    is2Cap = false;

    isPhieu3Cap = false;
    isDuyetByDonVi = false;
    manHinh = TypeManagementSurveyEnum.TU_DANH_GIA;
    modelXepLoai: KetQuaDanhGiaModal = new KetQuaDanhGiaModal();

    folder = FOLDER;

    private destroyed$ = new Subject();

    constructor(
        private apiService: ApiService,
        private formBuilder: FormBuilder,
        private util: UtilService,
        private notification: NotificationService,
        private translate: CustomTranslateService,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        private windowService: WindowService,
        private fileService: FileService,
        private modalService: NzModalService,
        private viewContainerRef: ViewContainerRef
    ) { }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            if (params.k) {
                const key = SecurityUtil.get(decodeURIComponent(params.k));
                const requestParams = key.split('_');
                this.phieuDanhGiaId = Number.parseInt(requestParams[0], 10);
                this.nhanSuDanhGiaChiTietId = Number.parseInt(requestParams[1], 10);
                this.dotDanhGiaChiTietId = Number.parseInt(requestParams[2], 10);
                this.manHinh = Number.parseInt(requestParams[3], 10);
                this.action = Number.parseInt(requestParams[4], 10);
                if (this.action === ActionEnum.VIEW) {
                    this.isView = true;
                }
            }
        });
        this.isDuyetByDonVi = window.history.state.donVi === true ? true : false;

        const mucDoHoanThanhs$ = this.apiService
            .read(UrlConstant.API.DM_MUC_DO_HOAN_THANH + '/List', {
                pageSize: 0,
                pageNumber: 0,
            })
            .pipe(takeUntil(this.destroyed$));

        const trangThaiTienDos$ = this.apiService
            .read(UrlConstant.API.DM_TRANG_THAI_TIEN_DO + '/List', {
                pageSize: 0,
                pageNumber: 0,
            })
            .pipe(takeUntil(this.destroyed$));

        const xepLoaiKetQuaDanhGia$ = this.apiService
            .read(UrlConstant.API.DM_XEP_LOAI_KET_QUA_DANH_GIA + '/List', {
                pageSize: 0,
                pageNumber: 0,
            })
            .pipe(takeUntil(this.destroyed$));

        forkJoin([mucDoHoanThanhs$, trangThaiTienDos$, xepLoaiKetQuaDanhGia$]).subscribe(
            ([mucDoHoanThanhResponse, trangThaiTienDoResponse, xepLoaiKetQuaDanhGiaResponse]) => {
                if (mucDoHoanThanhResponse.result && mucDoHoanThanhResponse.result.items) {
                    this.mucDoHoanThanhs = mucDoHoanThanhResponse.result?.items;
                }

                if (trangThaiTienDoResponse.result && trangThaiTienDoResponse.result.items) {
                    this.trangThaiTienDos = trangThaiTienDoResponse.result?.items;
                }

                if (xepLoaiKetQuaDanhGiaResponse.result && xepLoaiKetQuaDanhGiaResponse.result.items) {
                    this.xepLoaiKetQuaDanhGias = xepLoaiKetQuaDanhGiaResponse.result?.items;
                }

                this.initPhieuDanhGia();
            }
        );
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    onSubmit() {
        // Get Xếp loại kết quả đánh giá
        const cauHoiSelect = this.phieuDanhGia.nhomCauHois
            .filter(nhomCauHoi => nhomCauHoi.doiTuongThucHienId === this.phieuDanhGia.typePhieu)
            .find(nhomCauHoi => nhomCauHoi.cauHois.find(cauHoi => cauHoi.hinhThucTraLoiId === HinhThucTraLoiEnum.SELECT));

        const xepLoaiKetQuaDanhGia = cauHoiSelect
            ? cauHoiSelect.cauHois.find(x => x.hinhThucTraLoiId === this.hinhThucTraLoiEnum.SELECT)
            : null;

        // Get kết quả đánh giá
        const ketQuaPhieuDanhGias: IKetQuaPhieuDanhGia[] = [];
        this.phieuDanhGia.nhomCauHois
            .filter(nhomCauHoi => nhomCauHoi.doiTuongThucHienId === this.phieuDanhGia.typePhieu)
            .map(nhomCauHoi =>
                nhomCauHoi.cauHois.map(cauHoi => {
                    const ketQuaDanhGia: IKetQuaPhieuDanhGia = {
                        ketQuaDanhGiaId: cauHoi.ketQuaDanhGiaId ?? 0,
                        cauHoiId: cauHoi.cauHoiId,
                        xepLoaiKetQuaDanhGiaId: cauHoi.xepLoaiKetQuaDanhGiaId,
                        yKien: cauHoi.yKien,
                        tongHopNhiemVuThucHien: null,
                        congViecThucHiens: [],
                        nhiemVuThucHiens: [],
                    };

                    if (
                        cauHoi.hinhThucTraLoiId === HinhThucTraLoiEnum.LIST_GIOGIANG ||
                        cauHoi.hinhThucTraLoiId === HinhThucTraLoiEnum.LIST_NCKH
                    ) {
                        ketQuaDanhGia.tongHopNhiemVuThucHien = {
                            id: cauHoi.tongHopNhiemVu?.tongHopNhiemVuId ? cauHoi.tongHopNhiemVu?.tongHopNhiemVuId : 0,
                            stt: 0,
                            soGioChuan: cauHoi.tongHopNhiemVu?.soGioChuan,
                            soGioGiamTru: cauHoi.tongHopNhiemVu?.soGioGiamTru,
                            soGioPhaiThucHien: cauHoi.tongHopNhiemVu?.soGioPhaiThucHien,
                            soGioDaThucHien: cauHoi.tongHopNhiemVu?.soGioDaThucHien,
                            soGioThuaThieu: cauHoi.tongHopNhiemVu?.soGioThuaThieu,
                            isVisible: true,
                            hinhThucTraLoiId: cauHoi.hinhThucTraLoiId,
                            ghiChu: '',
                        };
                        ketQuaDanhGia.nhiemVuThucHiens = cauHoi.nhiemVuThucHiens
                            .filter(nhiemVuThucHien => !nhiemVuThucHien.isDelete || nhiemVuThucHien.nhiemVuThucHienId)
                            .map(nhiemVuThucHien => {
                                const files = nhiemVuThucHien.fileAttachNhiemVus.map(file => {
                                    return {
                                        id: file.fileAttachId ?? 0,
                                        fileId: file.fileDinhKemId,
                                        isDelete: file.isDelete,
                                    };
                                });
                                return {
                                    id: nhiemVuThucHien.nhiemVuThucHienId ? nhiemVuThucHien.nhiemVuThucHienId : 0,
                                    stt: nhiemVuThucHien.stt,
                                    tenNhiemVuThucHien: nhiemVuThucHien.tieuDe,
                                    soGioQuyDoi: nhiemVuThucHien.soGio,
                                    hinhThucTraLoiId: cauHoi.hinhThucTraLoiId,
                                    ghiChu: nhiemVuThucHien.ghiChu,
                                    isVisible: true,
                                    isDelete: nhiemVuThucHien.isDelete,
                                    nhiemVuThucHienFileAttachs: files,
                                };
                            });
                    } else {
                        ketQuaDanhGia.congViecThucHiens = cauHoi.congViecs
                            .filter(congViec => !congViec.isDelete || congViec.congViecId)
                            .map(congViec => {
                                const files = congViec.fileAttachCongViecs.map(file => {
                                    return {
                                        id: file.fileAttachId ?? 0,
                                        fileId: file.fileDinhKemId,
                                        isDelete: file.isDelete,
                                    };
                                });
                                return {
                                    id: congViec.congViecId ? congViec.congViecId : 0,
                                    stt: congViec.stt,
                                    tieuDe: congViec.tieuDe,
                                    moTa: '',
                                    trangThaiTienDoId: congViec.trangThaiTienDoId,
                                    mucDoHoanThanhId: congViec.mucDoHoanThanhId,
                                    isVisible: true,
                                    hinhThucTraLoiId: cauHoi.hinhThucTraLoiId,
                                    ghiChu: congViec.ghiChu,
                                    isDelete: congViec.isDelete,
                                    congViecThucHienFileAttachs: files,
                                };
                            });
                    }

                    ketQuaPhieuDanhGias.push(ketQuaDanhGia);
                })
            );

        // Value Submit
        const formValue: IPhieuDanhGiaSubmit = {
            doiTuongThucHienDanhGiaType: this.phieuDanhGia.typePhieu,
            nhanSuDanhGiaChiTietId: this.nhanSuDanhGiaChiTietId,
            nhanSuDanhGiaId: 0,
            xepLoaiKetQuaDanhGiaId: xepLoaiKetQuaDanhGia ? xepLoaiKetQuaDanhGia.xepLoaiKetQuaDanhGiaId : null,
            ketQuaDanhGias: ketQuaPhieuDanhGias,
            manHinh: this.manHinh
        };

        switch (this.phieuDanhGia.typePhieu) {
            case this.doiTuongThucHienEnum.TU_DANH_GIA:
                this.apiService.post(UrlConstant.API.PKS_DANH_GIA + '/TuDanhGiaPhieu', formValue).subscribe(res => {
                    this.notification.showSuccessMessage('Lưu lại kết quả đánh giá thành công');
                    this.initPhieuDanhGia();
                });
                break;
            case this.doiTuongThucHienEnum.THU_TRUONG_DON_VI:
                this.apiService.post(UrlConstant.API.PKS_DANH_GIA + '/QuanLyTuDanhGiaPhieu', formValue).subscribe(res => {
                    this.notification.showSuccessMessage('Lưu lại kết quả đánh giá thành công');
                    this.initPhieuDanhGia();
                });
                break;
            case this.doiTuongThucHienEnum.BAN_GIAM_DOC_DHQG:
                this.apiService.post(UrlConstant.API.PKS_DANH_GIA + '/BanQuanLyTuDanhGiaPhieu', formValue).subscribe(res => {
                    this.notification.showSuccessMessage('Lưu lại kết quả đánh giá thành công');
                    this.initPhieuDanhGia();
                });
                break;
        }
    }

    trackByFn(index, item) {
        return index;
    }

    addCongViec(nhomCauHoiIndex: number, cauHoiIndex: number) {
        const congViecModel = {
            congViecId: 0,
            stt: this.phieuDanhGia.nhomCauHois[nhomCauHoiIndex].cauHois[cauHoiIndex].congViecs.filter(x => !x.isDelete).length + 1,
            tieuDe: '',
            trangThaiTienDoId: 0,
            mucDoHoanThanhId: 0,
            fileDinhKemId: 0,
            ghiChu: '',
            isDelete: false,
            fileAttachCongViecs: [],
        };
        this.phieuDanhGia.nhomCauHois[nhomCauHoiIndex].cauHois[cauHoiIndex].congViecs.push(congViecModel);
    }

    removeCongViec(nhomCauHoiIndex: number, cauHoiIndex: number, congViecIndex: number) {
        if (this.phieuDanhGia.nhomCauHois[nhomCauHoiIndex].cauHois[cauHoiIndex].congViecs[congViecIndex].congViecId === 0) {
            this.phieuDanhGia.nhomCauHois[nhomCauHoiIndex].cauHois[cauHoiIndex].congViecs.splice(congViecIndex, 1);
        } else {
            this.phieuDanhGia.nhomCauHois[nhomCauHoiIndex].cauHois[cauHoiIndex].congViecs[congViecIndex].isDelete = true;
        }

        // recaculator
        this.phieuDanhGia.nhomCauHois[nhomCauHoiIndex].cauHois[cauHoiIndex].congViecs
            .filter(m => !m.isDelete)
            .map((item, idx) => (item.stt = idx + 1));
    }

    fileCongViecSelected(files, nhomCauHoiIndex: number, cauHoiIndex: number, congViecIndex: number) {
        if (
            files &&
            files.length > 0 &&
            files.filter(m => m === undefined).length < 1 &&
            files.filter(m => m.fileId === undefined).length < 1
        ) {
            const fileAttachCongViecs = this.phieuDanhGia.nhomCauHois[nhomCauHoiIndex].cauHois[cauHoiIndex].congViecs[congViecIndex]
                .fileAttachCongViecs;
            if (fileAttachCongViecs && files.length === fileAttachCongViecs.filter(m => !m.isDelete).length - 1) {
                if (files && files.length > 0) {
                    const ids = files.map(x => x.fileId);
                    fileAttachCongViecs.filter(m => !ids.includes(m.fileDinhKemId)).map(m => (m.isDelete = true));
                } else {
                    fileAttachCongViecs.map(m => (m.isDelete = true));
                }
            } else {
                this.phieuDanhGia.nhomCauHois[nhomCauHoiIndex].cauHois[cauHoiIndex].congViecs[
                    congViecIndex
                ].fileAttachCongViecs = files.map((item, idx) => {
                    return {
                        fileAttachId: fileAttachCongViecs && fileAttachCongViecs[idx] ? fileAttachCongViecs[idx].fileAttachId : 0,
                        fileDinhKemId: item.fileId,
                        name: item.name,
                        type: 0,
                        size: item.size,
                        path: item.path,
                        isDelete: false,
                    };
                });
            }
        } else {
            if (files && files.length < 1) {
                this.phieuDanhGia.nhomCauHois[nhomCauHoiIndex].cauHois[cauHoiIndex].congViecs[congViecIndex].fileAttachCongViecs.map(
                    m => (m.isDelete = true)
                );
            }
        }
    }

    addNhiemVu(nhomCauHoiIndex: number, cauHoiIndex: number) {
        const nhiemVuModel = {
            nhiemVuThucHienId: 0,
            stt: this.phieuDanhGia.nhomCauHois[nhomCauHoiIndex].cauHois[cauHoiIndex].nhiemVuThucHiens.filter(x => !x.isDelete).length + 1,
            tieuDe: '',
            soGio: 0,
            fileDinhKemId: 0,
            ghiChu: '',
            isDelete: false,
            fileAttachNhiemVus: [],
        };
        this.phieuDanhGia.nhomCauHois[nhomCauHoiIndex].cauHois[cauHoiIndex].nhiemVuThucHiens.push(nhiemVuModel);
    }

    removeNhiemVuThucHien(nhomCauHoiIndex: number, cauHoiIndex: number, nhiemVuIndex: number) {
        if (this.phieuDanhGia.nhomCauHois[nhomCauHoiIndex].cauHois[cauHoiIndex].nhiemVuThucHiens[nhiemVuIndex].nhiemVuThucHienId === 0) {
            this.phieuDanhGia.nhomCauHois[nhomCauHoiIndex].cauHois[cauHoiIndex].nhiemVuThucHiens.splice(nhiemVuIndex, 1);
        } else {
            this.phieuDanhGia.nhomCauHois[nhomCauHoiIndex].cauHois[cauHoiIndex].nhiemVuThucHiens[nhiemVuIndex].isDelete = true;
        }

        // recaculator
        this.phieuDanhGia.nhomCauHois[nhomCauHoiIndex].cauHois[cauHoiIndex].nhiemVuThucHiens
            .filter(m => !m.isDelete)
            .map((item, idx) => (item.stt = idx + 1));
    }

    fileNhiemVuThucHienSelected(files, nhomCauHoiIndex: number, cauHoiIndex: number, nhiemVuIndex: number) {
        if (
            files &&
            files.length > 0 &&
            files.filter(m => m === undefined).length < 1 &&
            files.filter(m => m.fileId === undefined).length < 1
        ) {
            const fileAttachNhiemVus = this.phieuDanhGia.nhomCauHois[nhomCauHoiIndex].cauHois[cauHoiIndex].nhiemVuThucHiens[nhiemVuIndex]
                .fileAttachNhiemVus;
            if (fileAttachNhiemVus && files.length === fileAttachNhiemVus.filter(m => !m.isDelete).length - 1) {
                if (files && files.length > 0) {
                    const ids = files.map(x => x.fileId);
                    fileAttachNhiemVus.filter(m => !ids.includes(m.fileDinhKemId)).map(m => (m.isDelete = true));
                } else {
                    fileAttachNhiemVus.map(m => (m.isDelete = true));
                }
            } else {
                this.phieuDanhGia.nhomCauHois[nhomCauHoiIndex].cauHois[cauHoiIndex].nhiemVuThucHiens[
                    nhiemVuIndex
                ].fileAttachNhiemVus = files.map((item, idx) => {
                    return {
                        fileAttachId: fileAttachNhiemVus && fileAttachNhiemVus[idx] ? fileAttachNhiemVus[idx].fileAttachId : 0,
                        fileDinhKemId: item.fileId,
                        name: item.name,
                        type: 0,
                        size: item.size,
                        path: item.path,
                        isDelete: false,
                    };
                });
            }
        } else {
            if (files && files.length < 1) {
                this.phieuDanhGia.nhomCauHois[nhomCauHoiIndex].cauHois[cauHoiIndex].nhiemVuThucHiens[nhiemVuIndex].fileAttachNhiemVus.map(
                    m => (m.isDelete = true)
                );
            }
        }
    }

    onChuyenDanhGia() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: 'Chọn nhân sự',
            content: SelectUserSingleComponent,
            width: 1200,
            top: 100,
            autoFocusedElement: 'body',
            state: 'maximized',
        });

        const param = windowRef.content.instance;
        param.action = this.action;
        param.model = null;
        param.message = 'Chọn nhân sự để chuyển đánh giá';
        param.manHinh = this.manHinh;
        windowRef.result.subscribe((result: any) => {
            this.opened = false;
            // chuyen danh gia
            if (result instanceof WindowCloseResult) {
            } else {
                this.modalService.confirm({
                    nzTitle: '<i>Xác nhận</i>',
                    nzContent: '<b>Bạn có chắc muốn chuyển đánh giá ?</b>',
                    nzOkText: 'Đồng ý',
                    nzCancelText: 'Không',
                    nzOnOk: () => {
                        const nhanSuDanhGiaChiTiet = {
                            nhanSuDanhGiaChiTietIds: [this.nhanSuDanhGiaChiTietId],
                            nhanSuId: result.nhanSuId,
                            manHinh: this.manHinh
                        };
                        // switch (this.phieuDanhGia.typePhieu) {
                        //     case DoiTuongThucHienEnum.THU_TRUONG_DON_VI:
                        //         const saveNhanSuCap2$ = this.apiService
                        //             .put(UrlConstant.API.PKS_NHAN_SU_DANH_GIA_CHI_TIET + '/MoveNhanSuDanhGiaCap2', nhanSuDanhGiaChiTiet)
                        //             .pipe(takeUntil(this.destroyed$));

                        //         saveNhanSuCap2$.subscribe(res => {
                        //             if (res.result === null && res.errorMessages.length > 0) {
                        //                 const messages = res.errorMessages
                        //                     .map(x => {
                        //                         return x.errorMessage + ' <b>' + x.errorValues.join(',') + '</b>';
                        //                     })
                        //                     .join('<br/>');
                        //                 this.notification.showWarningMessage(messages);
                        //             } else {
                        //                 this.notification.showSuccessMessage('Chuyển nhân sự đánh giá thành công !');
                        //             }
                        //             this.goBack();
                        //         });
                        //         break;
                        //     case DoiTuongThucHienEnum.BAN_GIAM_DOC_DHQG:
                        //         const saveNhanSuCap3$ = this.apiService
                        //             .put(UrlConstant.API.PKS_NHAN_SU_DANH_GIA_CHI_TIET + '/MoveNhanSuDanhGiaCap3', nhanSuDanhGiaChiTiet)
                        //             .pipe(takeUntil(this.destroyed$));

                        //         saveNhanSuCap3$.subscribe(res => {
                        //             if (res.result === null && res.errorMessages.length > 0) {
                        //                 const messages = res.errorMessages
                        //                     .map(x => {
                        //                         return x.errorMessage + ' <b>' + x.errorValues.join(',') + '</b>';
                        //                     })
                        //                     .join('<br/>');
                        //                 this.notification.showWarningMessage(messages);
                        //             } else {
                        //                 this.notification.showSuccessMessage('Chuyển nhân sự đánh giá thành công !');
                        //             }
                        //             this.goBack();
                        //         });
                        //         break;
                        // }

                        const danhGia$ = this.apiService
                            .put(UrlConstant.API.PKS_NHAN_SU_DANH_GIA_CHI_TIET + '/MoveNhanSuDanhGia', nhanSuDanhGiaChiTiet)
                            .pipe(takeUntil(this.destroyed$));

                        danhGia$.subscribe(res => {
                            if (res.result === null && res.errorMessages.length > 0) {
                                const messages = res.errorMessages
                                    .map(x => {
                                        return x.errorMessage + ' <b>' + x.errorValues.join(',') + '</b>';
                                    })
                                    .join('<br/>');
                                this.notification.showWarningMessage(messages);
                            } else {
                                this.notification.showSuccessMessage(this.translate.get('SURVEY.MES.01'));
                            }
                            this.goBack();
                        });
                    },
                });
            }
        });
    }

    onSendNhanSuDanhGia() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('SURVEY.TEXT.02'),
            content: SelectUserSingleComponent,
            width: 1200,
            top: 100,
            autoFocusedElement: 'body',
            state: 'maximized',
        });

        const param = windowRef.content.instance;
        param.action = this.action;
        param.model = null;
        param.message = this.translate.get('SURVEY.TEXT.03');
        param.manHinh = this.manHinh;
        windowRef.result.subscribe((result: any) => {
            this.opened = false;
            // chuyen danh gia
            if (result instanceof WindowCloseResult) {
            } else {
                this.modalService.confirm({
                    nzTitle: '<i>' + this.translate.get('LB.CONFIRM') + '</i>',
                    nzContent: '<b>Bạn có chắc muốn gửi đánh giá ?</b>',
                    nzOkText: 'Đồng ý',
                    nzCancelText: 'Không',
                    nzOnOk: () => {
                        const nhanSuDanhGiaChiTiet = {
                            nhanSuDanhGiaChiTietIds: [this.nhanSuDanhGiaChiTietId],
                            nhanSuId: result.nhanSuId,
                            manHinh: this.manHinh
                        };
                        // switch (this.phieuDanhGia.typePhieu) {
                        //     case DoiTuongThucHienEnum.TU_DANH_GIA:
                        //         this.apiService
                        //             .put(UrlConstant.API.PKS_NHAN_SU_DANH_GIA_CHI_TIET + '/SendNhanSuDanhGiaCap2', nhanSuDanhGiaChiTiet)
                        //             .pipe(takeUntil(this.destroyed$))
                        //             .subscribe(res => {
                        //                 this.notification.showSuccessMessage(this.translate.get('SURVEY.MES.03'));
                        //                 this.goBack();
                        //             });
                        //         break;
                        //     case DoiTuongThucHienEnum.THU_TRUONG_DON_VI:
                        //         this.apiService
                        //             .put(UrlConstant.API.PKS_NHAN_SU_DANH_GIA_CHI_TIET + '/SendNhanSuDanhGiaCap3', nhanSuDanhGiaChiTiet)
                        //             .pipe(takeUntil(this.destroyed$))
                        //             .subscribe(res => {
                        //                 this.notification.showSuccessMessage(this.translate.get('SURVEY.MES.03'));
                        //                 this.goBack();
                        //             });
                        //         break;
                        // }

                        this.apiService
                            .put(UrlConstant.API.PKS_NHAN_SU_DANH_GIA_CHI_TIET + '/SendNhanSuDanhGia', nhanSuDanhGiaChiTiet)
                            .pipe(takeUntil(this.destroyed$))
                            .subscribe(res => {
                                this.notification.showSuccessMessage(this.translate.get('SURVEY.MES.03'));
                                this.goBack();
                            });
                    },
                });
            }
        });
    }

    onExport() {
        this.opened = true;
        this.util.setScrollTop();
        const windowRef = this.windowService.open({
            title: 'Xuất PDF',
            content: ExportPhieuDanhGiaComponent,
            width: 1000,
            top: 0,
            autoFocusedElement: 'body',
        });

        windowRef.result.subscribe(result => {
            this.opened = false;
        });
    }

    onPrint() {
        this.fileService.exportFile(
            UrlConstant.API.HRM_NS_REPORT + '/PhieuDanhGia',
            {
                idKhoaChinh: this.nhanSuDanhGiaChiTietId,
            },
            this.phieuDanhGia.maPhieu
        );
    }

    createComponentModal(): void {
        const modal = this.modalService.create({
            nzTitle: 'Xuất PDF',
            nzContent: ExportPhieuDanhGiaComponent,
            nzWidth: 1000,
            nzGetContainer: () => document.body,
            nzComponentParams: {},
            nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
        });
    }

    showModalViewFile(): void {
        const modal = this.modalService.create({
            nzTitle: 'Xem tập tin đính kèm',
            nzContent: ViewFileComponent,
            nzViewContainerRef: this.viewContainerRef,

            nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
        });
        const instance = modal.getContentComponent();
    }

    goBack() {
        // this.router.navigate([UrlConstant.ROUTE.PKS_LIST_PHIEU_TU_DANH_GIA]);
        this.location.back();
    }

    caculatorSoGio(data: number, nhomCauHoiIndex, cauHoiIndex) {
        const cauHoi = this.phieuDanhGia.nhomCauHois[nhomCauHoiIndex].cauHois[cauHoiIndex] as ICauHoiViewModel;
        let soGioThucHien = 0;
        if (cauHoi.hinhThucTraLoiId === 5 || cauHoi.hinhThucTraLoiId === 6) {
            if (cauHoi.nhiemVuThucHiens.length > 0) {
                cauHoi.nhiemVuThucHiens.map(x => {
                    soGioThucHien = soGioThucHien + x.soGio;
                });
            }
        }
        // cap nhat lai so gio tren view
        this.phieuDanhGia.nhomCauHois[nhomCauHoiIndex].cauHois[cauHoiIndex].tongHopNhiemVu.soGioDaThucHien = soGioThucHien;
        this.phieuDanhGia.nhomCauHois[nhomCauHoiIndex].cauHois[cauHoiIndex].tongHopNhiemVu.soGioThuaThieu =
            soGioThucHien - cauHoi.tongHopNhiemVu.soGioPhaiThucHien;
    }

    xetDuyetPhieu2Cap() {
        // check
        if (!this.modelXepLoai.isDongYKetQua && this.modelXepLoai.idKetQuaDanhGia === 0) {
            this.notification.showErrorMessage('Vui lòng chọn xếp loại!');
        } else {
            this.modelXepLoai.idsNhanSuDanhGiaChiTiet = [this.nhanSuDanhGiaChiTietId];
            this.apiService
                .put(UrlConstant.API.PKS_NHAN_SU_DANH_GIA_CHI_TIET + '/DuyetNhanSuDanhGiaCap3', this.modelXepLoai)
                .pipe(takeUntil(this.destroyed$))
                .subscribe(res => {
                    if (res.result === null && res.errorMessages.length > 0) {
                        const messages = res.errorMessages
                            .map(x => {
                                return x.errorMessage + ' ' + x.errorValues.join(',');
                            })
                            .join('<br/>');
                        this.notification.showWarningMessage(messages);
                    } else {
                        this.notification.showSuccessMessage('Xét duyệt thành công !');
                    }
                });
        }
    }

    clearXetDuyet() {
        this.modelXepLoai.yKien = '';
        this.modelXepLoai.idKetQuaDanhGia = 0;
    }

    private initPhieuDanhGia() {
        const phieuDanhGia$ = this.apiService
            .read(UrlConstant.API.PKS_PHAN_LOAI_DANH_GIA + '/ByPhieuId', {
                nhanSuDanhGiaChiTietId: this.nhanSuDanhGiaChiTietId,
                dotDanhGiaChiTietId: this.dotDanhGiaChiTietId,
                phieuId: this.phieuDanhGiaId,
            })
            .pipe(takeUntil(this.destroyed$));
        phieuDanhGia$.subscribe(res => {
            this.phieuDanhGia = res.result;
            if (this.phieuDanhGia) {
                // kt loai BieuMau 2 cap
                if (this.phieuDanhGia.nhomCauHois.findIndex(x => x.doiTuongThucHienId === 3) === -1) {
                    this.is2Cap = true;
                }
                // kt loai BieuMau 2 cap
                if (this.phieuDanhGia.nhomCauHois.findIndex(x => x.doiTuongThucHienId === 3) > -1) {
                    this.isPhieu3Cap = true;
                }

                this.phieuDanhGia.nhomCauHois
                    // .filter(
                    //     nhomCauHoi =>
                    //         (nhomCauHoi.doiTuongThucHienId === DoiTuongThucHienEnum.TU_DANH_GIA &&
                    //             this.phieuDanhGia.typePhieu === DoiTuongThucHienEnum.TU_DANH_GIA) ||
                    //         (nhomCauHoi.doiTuongThucHienId !== DoiTuongThucHienEnum.BAN_GIAM_DOC_DHQG &&
                    //             this.phieuDanhGia.typePhieu === DoiTuongThucHienEnum.THU_TRUONG_DON_VI) ||
                    //         this.phieuDanhGia.typePhieu === DoiTuongThucHienEnum.BAN_GIAM_DOC_DHQG ||
                    //         this.phieuDanhGia.typePhieu === 0,
                    // )
                    .map(nhomCauHoi => {
                        switch (nhomCauHoi.doiTuongThucHienId) {
                            case DoiTuongThucHienEnum.TU_DANH_GIA:
                                // nhomCauHoi.isVisible = true;
                                break;
                            case DoiTuongThucHienEnum.THU_TRUONG_DON_VI:
                                if (
                                    this.phieuDanhGia.xepLoaiKetQuaDanhGia1Id == null ||
                                    (this.phieuDanhGia.typePhieu === 1 && this.phieuDanhGia.xepLoaiKetQuaDanhGia2Id == null)
                                ) {
                                    nhomCauHoi.isDisabled = true;
                                }
                                break;
                            case DoiTuongThucHienEnum.BAN_GIAM_DOC_DHQG:
                                if (this.phieuDanhGia.xepLoaiKetQuaDanhGia3Id || this.phieuDanhGia.typePhieu === 3) {
                                } else {
                                    nhomCauHoi.isDisabled = true;
                                }
                                break;
                            default:
                                nhomCauHoi.isDisabled = true;
                                break;
                        }
                        nhomCauHoi.cauHois.map(cauHoi => {
                            if (cauHoi.tongHopNhiemVu === null || cauHoi.tongHopNhiemVu === undefined) {
                                cauHoi.tongHopNhiemVu = {
                                    soGioChuan: 0,
                                    soGioGiamTru: 0,
                                    soGioPhaiThucHien: 0,
                                    soGioDaThucHien: 0,
                                    soGioThuaThieu: 0,
                                    stt: 0,
                                    tongHopNhiemVuId: 0,
                                };
                            }

                            if (this.isView) {
                                cauHoi.isView = true;
                            } else {
                                switch (nhomCauHoi.doiTuongThucHienId) {
                                    case DoiTuongThucHienEnum.TU_DANH_GIA:
                                        // cauHoi.isView = nhomCauHoi.doiTuongThucHienId !== DoiTuongThucHienEnum.TU_DANH_GIA;
                                        cauHoi.isView = !(
                                            this.phieuDanhGia.typePhieu === DoiTuongThucHienEnum.TU_DANH_GIA &&
                                            this.phieuDanhGia.xepLoaiKetQuaDanhGia2Id == null
                                        );

                                        break;
                                    case DoiTuongThucHienEnum.THU_TRUONG_DON_VI:
                                        // cauHoi.isView = nhomCauHoi.doiTuongThucHienId !== DoiTuongThucHienEnum.THU_TRUONG_DON_VI;
                                        cauHoi.isView = !(
                                            this.phieuDanhGia.typePhieu === DoiTuongThucHienEnum.THU_TRUONG_DON_VI &&
                                            this.phieuDanhGia.xepLoaiKetQuaDanhGia3Id == null
                                        );
                                        break;
                                    case DoiTuongThucHienEnum.BAN_GIAM_DOC_DHQG:
                                        // cauHoi.isView = nhomCauHoi.doiTuongThucHienId !== DoiTuongThucHienEnum.BAN_GIAM_DOC_DHQG;
                                        cauHoi.isView = !(this.phieuDanhGia.typePhieu === DoiTuongThucHienEnum.BAN_GIAM_DOC_DHQG);
                                        break;
                                    default:
                                        cauHoi.isView = false;
                                        break;
                                }
                            }
                        });
                    });
            }
        });
    }
}
