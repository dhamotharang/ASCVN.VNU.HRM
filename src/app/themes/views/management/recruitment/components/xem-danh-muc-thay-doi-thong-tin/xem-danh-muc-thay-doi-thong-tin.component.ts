import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { CustomTranslateService } from '@core/services/common';
import { SecurityUtil } from '@core/utils/security';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';
import { DataResult } from '@progress/kendo-data-query';
import { DuyetThongTinNhanSuComponent } from '@themes/views/management/human-resource/components';
import { DuLieuNhanSuEnum, IDataSearch, TrangThaiDuLieuEnum } from '@themes/views/management/human-resource/_models';
import { IDuyetThongTinNhanSuModel } from '@themes/views/management/human-resource/_models/duyet-thong-tin-nhan-su.model';
import { Observable, Subject } from 'rxjs';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';

@Component({
    selector: 'app-xem-danh-muc-thay-doi-thong-tin',
    templateUrl: './xem-danh-muc-thay-doi-thong-tin.component.html',
    styleUrls: ['./xem-danh-muc-thay-doi-thong-tin.component.scss'],
})
export class XemDanhMucThayDoiThongTinComponent implements OnInit {
    @ViewChild(TooltipDirective) public tooltipDir: TooltipDirective;

    @Input() nhanSuId: number;
    @Input() isTuyenDung: boolean;

    gridView: DataResult;
    isLoading = false;
    isDuyetAll = false;
    private destroyed$ = new Subject();
    stringKey = '';
    listTabUrl = [
        {
            tab: 1,
            url: '/thong-tin-nhan-su',
        },
        {
            tab: 2,
            url: '/thong-tin-tuyen-dung',
        },
        {
            tab: 3,
            url: '/qua-trinh-cong-tac',
        },
        {
            tab: 4,
            url: '/trinh-do-chuyen-mon',
        },
        {
            tab: 5,
            url: '/doan-dang',
        },
        {
            tab: 6,
            url: '/thong-tin-luong',
        },
        {
            tab: 7,
            url: '/khen-thuong-ky-luat',
        },
        {
            tab: 8,
            url: '/tinh-trang-suc-khoe',
        },
        {
            tab: 9,
            url: '/quan-he-gia-dinh',
        },
        {
            tab: 10,
            url: '/thong-tin-khac',
        },
    ];

    constructor(
        private apiService: ApiService,
        private router: Router,
        private windowService: WindowService,
        private translate: CustomTranslateService
    ) {}

    ngOnInit() {
        this.loadItems();
    }

    showTooltip(e: MouseEvent): void {
        const element = e.target as HTMLElement;
        if ((element.nodeName === 'TD' || element.nodeName === 'TH') && element.offsetWidth < element.scrollWidth) {
            this.tooltipDir.toggle(element);
        } else {
            this.tooltipDir.hide();
        }
    }

    onMoveTab(data) {
        const index = this.listTabUrl.findIndex(x => x.tab === data.viTriTab);
        if (index > -1) {
            const dataSearch = {
                idNhanSu: this.nhanSuId,
                manHinh: DuLieuNhanSuEnum.DE_XUAT,
            } as IDataSearch;
            const url =
                '/management/human-resource' +
                (this.isTuyenDung ? '/ho-so-ung-vien' : '/duyet-ho-so-ca-nhan') +
                this.listTabUrl[index].url +
                '?k=' +
                encodeURIComponent(SecurityUtil.set(JSON.stringify(dataSearch))) +
                '&query=' +
                encodeURIComponent(SecurityUtil.set(this.stringKey));
            window.open(url, '_blank');
            // this.router.navigate(['/management/human-resource' + (this.isTuyenDung ? '/ho-so-ung-vien' : '/duyet-ho-so-ca-nhan') + this.listTabUrl[index].url], {
            //     queryParams: {
            //         k: encodeURIComponent(SecurityUtil.set(this.nhanSuId.toString())),
            //         query: encodeURIComponent(SecurityUtil.set(this.stringKey)),
            //     },
            // });
        }
    }

    onApprove(flag: boolean) {
        const body: IDuyetThongTinNhanSuModel = {
            duyetToanBo: true,
            idNhanSu: this.nhanSuId,
            idTrangThaiDuLieu: flag ? TrangThaiDuLieuEnum.SU_DUNG_CHINH : TrangThaiDuLieuEnum.KHONG_DUYET,
        };

        // this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('LB.CONFIRM'),
            content: DuyetThongTinNhanSuComponent,
            width: 600,
            top: 10,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.body = body;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                // this.opened = false;
                this.loadItems();
            }
        });
    }

    private loadItems() {
        this.isLoading = true;
        this.isDuyetAll = false;
        this.apiService
            .read(UrlConstant.API.HRM_NS_THONG_TIN_TAB_DE_XUAT, {
                idNhanSu: this.nhanSuId,
            })
            .pipe(
                map(res => {
                    if (res.result) {
                        return {
                            data: res.result,
                            total: res.result.length,
                        };
                    } else {
                        return {
                            data: [],
                            total: 0,
                        };
                    }
                }),
                takeUntil(this.destroyed$),
                finalize(() => {
                    this.isLoading = false;
                })
            )
            .subscribe(res => {
                this.gridView = res;
                const listKeyChange = res.data.filter(x => x.viTriTab !== 111);
                this.stringKey = listKeyChange.map(m => m.thongTinTabHienThi).join(',');
                const isAll = res.data.findIndex(x => x.viTriTab !== 111);
                if (isAll > -1) {
                    this.isDuyetAll = true;
                }
            });
    }
}
