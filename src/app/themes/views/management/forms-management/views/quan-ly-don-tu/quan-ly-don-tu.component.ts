import { Component, OnInit } from '@angular/core';
import { ApiService } from '@core/data-services/api.service';
import { MenuQuery } from '@management-state/menu/menu.query';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { ActionEnum } from '@core/constants/enum.constant';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NotificationService } from '@core/services/common';
import { TaoDonXinChamDutHdComponent } from '../../components/tao-don-xin-cham-dut-hd/tao-don-xin-cham-dut-hd.component';
import { DuyetChapDutHdldComponent } from '../../components/duyet-cham-dut-hdld/duyet-cham-dut-hdld.component';
import { XinYKienComponent } from '../../components/xin-y-kien/xin-y-kien.component';
import { CacLoaiDonEnum, PhanLoaiDonEnum } from '../../_models/quan-ly-don-tu.enum';
import { IDonTu, ILocDonNhan } from '../../_models/quan-ly-don-tu.model';
import { FormQuyetDinhChamDutHdldComponent, NhapYKienComponent } from '../../components';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-quan-ly-don-tu',
    templateUrl: './quan-ly-don-tu.component.html',
    styleUrls: ['./quan-ly-don-tu.component.scss'],
})
export class QuanLyDonTuComponent implements OnInit {
    itemFilter: ILocDonNhan;
    searchAdvance = false;
    openFirstTime = true;
    tabName: string;
    myGroup = new FormGroup({
        keywordControl: new FormControl(),
    });
    keyword: string;
    formCtrlSub: Subscription;
    loaiDonSelected: number;
    cacLoaiDonEnum = CacLoaiDonEnum;
    itemDonSelected: IDonTu;
    idPhanLoaiDonSelected: PhanLoaiDonEnum;
    phanLoaiDonEnum = PhanLoaiDonEnum;
    opened = false;
    constructor(private windowService: WindowService, private translate: CustomTranslateService, protected menuQuery: MenuQuery) {}

    ngOnInit() {
        this.loaiDonSelected = this.cacLoaiDonEnum.DON_DA_NHAN;
        this.tabName = this.menuQuery.getTitleWithCurrentUrl();
        this.keyword = '';
        this.formCtrlSub = this.myGroup
            .get('keywordControl')
            .valueChanges.pipe(debounceTime(1000))
            .subscribe(newValue => (this.keyword = newValue));
    }

    ngOnDestroy(): void {
        this.formCtrlSub.unsubscribe();
    }

    taoDon() {
        this.opened = true;
        const windowRef = this.windowService.open({
            // title: this.translate.get('MANAGEMENT.TITLE.TAO_DON_CHAM_DUT_HDLD'),
            content: TaoDonXinChamDutHdComponent,
            width: 1000,
            top: 10,
            autoFocusedElement: 'body',
        });
        const param = windowRef.content.instance;
        param.action = ActionEnum.CREATE;
        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
            }
        });
    }

    duyetDonChamDutHDLD() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('MANAGEMENT.TITLE.DUYET_DON_CHAM_DUT_HDLD'),
            content: DuyetChapDutHdldComponent,
            width: 1000,
            top: 10,
            autoFocusedElement: 'body',
        });
        const param = windowRef.content.instance;
        param.action = ActionEnum.CREATE;
        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
            }
        });
    }

    xinYKien() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('MANAGEMENT.TITLE.XIN_Y_KIEN'),
            content: XinYKienComponent,
            width: 1000,
            top: 10,
            autoFocusedElement: 'body',
        });
        const param = windowRef.content.instance;
        param.action = ActionEnum.CREATE;
        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
            }
        });
    }

    nhapYKien() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('MANAGEMENT.TITLE.NHAP_Y_KIEN'),
            content: NhapYKienComponent,
            width: 1000,
            top: 10,
            autoFocusedElement: 'body',
        });
        const param = windowRef.content.instance;
        param.action = ActionEnum.CREATE;
        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
            }
        });
    }

    suaQuyetDinh() {
        this.opened = true;
        const windowRef = this.windowService.open({
            //  title: this.translate.get('MANAGEMENT.TITLE.QUYET_DINH_CHAM_DUT_HDLD'),
            content: FormQuyetDinhChamDutHdldComponent,
            width: 1000,
            top: 10,
            autoFocusedElement: 'body',
        });
        const param = windowRef.content.instance;
        param.action = ActionEnum.CREATE;
        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
            }
        });
    }

    onExportExcel() {}

    openAdvanceSearch() {
        const el = document.querySelector('.search-backdrop');
        this.searchAdvance = !this.searchAdvance;
        if (this.searchAdvance) {
            el.classList.add('search-overlay');
        } else {
            el.classList.remove('search-overlay');
        }
    }

    changeTabsGrid(event: CacLoaiDonEnum) {
        this.loaiDonSelected = event;
        this.idPhanLoaiDonSelected = null;
    }

    handlerItemFilter(event: ILocDonNhan) {
        this.itemFilter = event;
    }

    handlerItemDonTu(event: IDonTu) {
        this.itemDonSelected = event;
        this.idPhanLoaiDonSelected = event.idPhanLoaiDon;
    }
}
