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
import { IDonTu } from '../../_models/quan-ly-don-tu.model';
import { FormQuyetDinhChamDutHdldComponent, NhapYKienComponent } from '../../components';
import { LoaiQuyetDinhEnum } from '../../_models/quyet-dinh-enum.enum';
import { IQuyetDinh } from '../../_models/quan-ly-quyet-dinh.model';

@Component({
  selector: 'app-quyet-dinh',
  templateUrl: './quyet-dinh.component.html',
  styleUrls: ['./quyet-dinh.component.scss']
})
export class QuyetDinhComponent implements OnInit {
  searchAdvance = false;
  openFirstTime = false;
  tabName: string;
  keyword: string;
  loaiDonSelected: number;
  cacLoaiQuyetDinhEnum = LoaiQuyetDinhEnum;
  itemDonSelected: IQuyetDinh;
  idPhanLoaiDonSelected: PhanLoaiDonEnum;
  phanLoaiDonEnum = PhanLoaiDonEnum;
  opened = false;
  itemFilter: any;
  constructor(
      private apiService: ApiService,
      private windowService: WindowService,
      private translate: CustomTranslateService,
      private notification: NotificationService,
      private modal: NzModalService,
      protected menuQuery: MenuQuery
  ) {}

  ngOnInit() {
      this.loaiDonSelected = this.cacLoaiQuyetDinhEnum.CHUA_CO_QD; 
      
      this.tabName = this.menuQuery.getTitleWithCurrentUrl();
  }

  handlerItemDonTu(event: IQuyetDinh) {  
      this.itemDonSelected = event;
      this.idPhanLoaiDonSelected = event.idPhanLoaiDon;
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
      this.openFirstTime = true;
      const el = document.querySelector('.search-backdrop');
      this.searchAdvance = !this.searchAdvance;
      if (this.searchAdvance) {
          el.classList.add('search-overlay');
      } else {
          el.classList.remove('search-overlay');
      }
  }
  onSearchChange() {
      //   this.gridState.skip = 0;
      //   this.loadItems();
  }
  filterHandler() {
      //   this.gridState.skip = 0;
      //   this.loadItems();
  }

  changeTabsGrid(event: LoaiQuyetDinhEnum) { 
      this.loaiDonSelected = event; 
      this.idPhanLoaiDonSelected = null;
  }

  handlerItemFilter(event) {
      this.itemFilter = event;
  }

}
