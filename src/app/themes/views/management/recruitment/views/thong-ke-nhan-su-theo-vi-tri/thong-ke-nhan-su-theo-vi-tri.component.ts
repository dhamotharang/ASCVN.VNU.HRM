import { Component, OnDestroy, OnInit } from '@angular/core';
import { GroupDescriptor, process } from '@progress/kendo-data-query';
import { PageConfig } from '@core/constants/app.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { MenuQuery } from '@management-state/menu/menu.query';
import { FileService } from '@core/services/common/file.service';
import { finalize, map, tap } from 'rxjs/operators';
import { BaseRecruitmentComponent } from '../../_base/base-recruitment.component';
import { NotificationService } from '@core/services/common/notification.service';
import { DateUtil } from '@core/utils/date';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';

export enum ExportThongKeTheoViTriEnum {
    ExportExcelTongHop = 0,
    ExportExcelNhomDonVi = 1,
}
@Component({
    selector: 'app-thong-ke-nhan-su-theo-vi-tri',
    templateUrl: './thong-ke-nhan-su-theo-vi-tri.component.html',
    styleUrls: ['./thong-ke-nhan-su-theo-vi-tri.component.scss'],
})
export class ThongKeNhanSuTheoViTriComponent extends BaseRecruitmentComponent<any> implements OnInit, OnDestroy {
    groups: GroupDescriptor[] = [{ field: 'tenNhomViTriViecLam', dir: null }];
    exportEnum = ExportThongKeTheoViTriEnum;
    chonDonVi: number[] = [];
    modelSearch = {
        keyword: '',
        // nam: null,
        coQuanId: null,
        tuNgay: null,
        denNgay: null,
    };

    constructor(
        private apiService: ApiService,
        private fileService: FileService,
        private notification: NotificationService,
        protected menuQuery: MenuQuery
    ) {
        super(menuQuery);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    disabledNgayKetThuc = (current: Date): boolean => {
        if (!this.modelSearch.tuNgay) {
            return;
        }
        // Can not select days before today and today
        return differenceInCalendarDays(current, new Date(this.modelSearch.tuNgay)) < 0;
    };

    disabledNgayBatDau = (current: Date): boolean => {
        if (!this.modelSearch.denNgay) {
            return;
        }
        // Can not select days before today and today
        return differenceInCalendarDays(current, new Date(this.modelSearch.denNgay)) > 0;
    };

    searchHandler() {
        this.gridState.skip = 0;
        this.chonDonVi.length > 0 ? (this.modelSearch.coQuanId = this.chonDonVi.toString()) : (this.modelSearch.coQuanId = null);
        this.loadItems();
    }

    refreshHandler() {
        this.chonDonVi = [];
        this.modelSearch = {
            keyword: '',
            // nam: null,
            coQuanId: null,
            tuNgay: null,
            denNgay: null,
        };
    }

    onExportExcel(type: ExportThongKeTheoViTriEnum) {
        switch (type) {
            case this.exportEnum.ExportExcelTongHop:
                this.fileService.exportFile(
                    UrlConstant.API.HRM_NS_REPORT + '/ReportThongKeNhanLucTheoViTriViecLam',
                    this.queryOptions,
                    'ThongKeNhanLucTheoViTriViecLam'
                );
                break;
            case this.exportEnum.ExportExcelNhomDonVi:
                this.fileService.exportFile(
                    UrlConstant.API.HRM_NS_REPORT + '/ReportThongKeNhanLucTheoViTriViecLamGroupCoQuan',
                    this.queryOptions,
                    'ThongKeNhanLucTheoViTriViecLam'
                );
                break;
        }
    }

    protected loadItems() {
        this.loading = true;
        this.gridView$ = this.apiService.read(UrlConstant.API.HRM_NS_REPORT + '/ThongKeNhanLucTheoViTriViecLam', this.queryOptions).pipe(
            map(res => {
                if (res.result && res.result.nhomViTriViecLams) {
                    const listData = res.result.nhomViTriViecLams;
                    const data = [];
                    listData.map(x => {
                        if (x.idNhomViTriViecLam && x.viTriViecLams && x.viTriViecLams.length > 0) {
                            x.viTriViecLams.map(y => {
                                data.push({
                                    ...y,
                                    idNhomViTriViecLam: x.idNhomViTriViecLam,
                                    tenNhomViTriViecLam: x.tenNhomViTriViecLam,
                                });
                            });
                        }
                    });
                    data.sort(this.compare);
                    process(data, {
                        group: this.groups,
                    });
                    return process(data, {
                        group: this.groups,
                    });
                } else {
                    return {
                        data: [],
                        total: 0,
                    };
                }
            }),
            tap(res => {
                if (res.total <= this.gridState.take) {
                    this.pageConfig = false;
                } else {
                    this.pageConfig = PageConfig;
                }
            }),
            finalize(() => {
                this.loading = false;
            })
        );
    }

    private get queryOptions() {
        return {
            pageSize: 0,
            pageNumber: 0,
            sortName: this.gridState.sort[0].field,
            sortASC: true,
            keySearch: this.modelSearch.keyword,
            idsCoQuan: this.modelSearch.coQuanId,
            tuNgay: DateUtil.getFullDate(this.modelSearch.tuNgay),
            denNgay: DateUtil.getFullDate(this.modelSearch.denNgay),
        };
    }

    compare(a, b) {
        const itemA = a.idViTriViecLam;
        const itemB = b.idViTriViecLam;
        let comparison = 0;
        if (itemA > itemB) {
            comparison = 1;
        } else if (itemA < itemB) {
            comparison = -1;
        }
        return comparison;
    }
}
