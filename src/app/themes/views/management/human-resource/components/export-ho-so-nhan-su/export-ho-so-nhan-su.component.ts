import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UrlConstant } from '@core/constants/url.constant';
import { FileService } from '@core/services/common';
import { Subject } from 'rxjs';

export enum ReportNhanSuEnum {
    MAU_1,
    MAU_2,
    MAU_3,
    MAU_4,
    MAU_LLKH,
}

@Component({
    selector: 'app-export-ho-so-nhan-su',
    templateUrl: './export-ho-so-nhan-su.component.html',
    styleUrls: ['./export-ho-so-nhan-su.component.scss'],
})
export class ExportHoSoNhanSuComponent implements OnInit, OnDestroy {
    @Input() nhanSuId: number;

    report = ReportNhanSuEnum;

    private destroyed$ = new Subject();

    constructor(private fileService: FileService) {}

    ngOnInit(): void {}

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    onExport(type: ReportNhanSuEnum) {
        switch (type) {
            case ReportNhanSuEnum.MAU_1:
                this.fileService.exportFile(
                    UrlConstant.API.HRM_NS_REPORT + '/ThongTinLyLichNhanSu',
                    {
                        idKhoaChinh: this.nhanSuId,
                    },
                    'ThongTinLyLichNhanSu'
                );
                break;
            case ReportNhanSuEnum.MAU_2:
                this.fileService.exportFile(
                    UrlConstant.API.HRM_NS_REPORT + '/PhieuBoSungLyLichNhanSu',
                    {
                        idKhoaChinh: this.nhanSuId,
                    },
                    'PhieuBoSungLyLichNhanSu'
                );
                break;
            case ReportNhanSuEnum.MAU_3:
                this.fileService.exportFile(
                    UrlConstant.API.HRM_NS_REPORT + '/PhieuSoYeuLyLichLaoDongHopDong',
                    {
                        idKhoaChinh: this.nhanSuId,
                    },
                    'PhieuSoYeuLyLichLaoDongHopDong'
                );
                break;
            case ReportNhanSuEnum.MAU_4:
                this.fileService.exportFile(
                    UrlConstant.API.HRM_NS_REPORT + '/PhieuSoYeuLyLich2C',
                    {
                        idKhoaChinh: this.nhanSuId,
                    },
                    'PhieuSoYeuLyLich2C'
                );
                break;
            case ReportNhanSuEnum.MAU_LLKH:
                this.fileService.exportFile(
                    UrlConstant.API.LLKH_REPORT + '/ThongTinLyLichKhoaHoc',
                    {
                        idKhoaChinh: this.nhanSuId,
                    },
                    'LyLichKhoaHoc'
                );

                break;
        }
    }
}
