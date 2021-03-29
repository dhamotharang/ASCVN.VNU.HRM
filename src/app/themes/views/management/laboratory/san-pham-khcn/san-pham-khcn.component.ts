import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseCheckPermission } from '@core/auth';
import { MenuQuery } from '@management-state/menu/menu.query';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-san-pham-khcn',
  templateUrl: './san-pham-khcn.component.html',
  styleUrls: ['./san-pham-khcn.component.scss']
})
export class SanPhamKhcnComponent extends BaseCheckPermission implements OnInit, OnDestroy {

  private destroyed$ = new Subject();
  opened = false;
  constructor(
      protected menuQuery: MenuQuery,

  ) {
      super(menuQuery);
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
      this.destroyed$.next();
      this.destroyed$.complete();
  }

}
