import { FormArray } from '@angular/forms';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { PageConfig } from '@core/constants/app.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { CustomTranslateService, NotificationService } from '@core/services/common';
import { MenuQuery } from '@management-state/menu/menu.query';
import { WindowService } from '@progress/kendo-angular-dialog';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { BaseScienceTechnologyComponent } from '../../_base/base-science-technology.component';
import { IKetQuaDuKien } from '../../_models/science-technology.model';
import { AuthenticateService } from '@core/auth';

@Component({
    selector: 'app-ket-qua-du-kien',
    templateUrl: './ket-qua-du-kien.component.html',
    styleUrls: ['./ket-qua-du-kien.component.scss'],
})
export class KetQuaDuKienComponent extends BaseScienceTechnologyComponent<IKetQuaDuKien> implements OnInit, OnDestroy {
    @Input() idNhiemVuKhoaHoc: number;
    @Input() ketQuaDuKien: [];
    @Output() changedData = new EventEmitter<any>();
    constructor(
        protected menuQuery: MenuQuery,
        protected windowService: WindowService,
        protected auth: AuthenticateService,
    ) {
        super(menuQuery, windowService,auth);
    }
    ngOnInit() {
        super.ngOnInit();
        this.roles.isCreate = true;
        this.roles.isDelete = true;
        this.roles.isUpdate = true;
        const body = this.ketQuaDuKien;
        this.changedData.emit(body);
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }
    showFormCreateOrUpdate() {}

    loadItems(){}

    onChange(event) {
        const body = this.ketQuaDuKien;
        this.changedData.emit(body);
    }
}
