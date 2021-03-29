import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IDuyetThongTinNhanSuModel} from '@themes/views/management/human-resource/_models/duyet-thong-tin-nhan-su.model';
import {FormControl} from '@angular/forms';
import {UrlConstant} from '@core/constants/url.constant';
import {takeUntil} from 'rxjs/operators';
import {ApiService} from '@core/data-services/api.service';
import {Subject} from 'rxjs';
import {CustomTranslateService, EmitEvent, EventBus, EventBusService, NotificationService} from '@core/services/common';
import {WindowRef} from '@progress/kendo-angular-dialog';

@Component({
    selector: 'app-duyet-thong-tin-nhan-su',
    templateUrl: './duyet-thong-tin-nhan-su.component.html',
    styleUrls: ['./duyet-thong-tin-nhan-su.component.scss']
})
export class DuyetThongTinNhanSuComponent implements OnInit, OnDestroy {
    @Input() body: IDuyetThongTinNhanSuModel;

    lyDoDuyetControl = new FormControl();

    private destroyed$ = new Subject();
    constructor(
        private apiService: ApiService,
        private notification: NotificationService,
        private translate: CustomTranslateService,
        private eventBus: EventBusService,
        private windowRef: WindowRef
    ) {
    }

    ngOnInit(): void {

    }

    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    onSubmit() {
        const model = {
            ...this.body,
            lyDoDuyet: this.lyDoDuyetControl.value
        };

        this.apiService
            .put(UrlConstant.API.HRM_NHAN_SU + '/DuyetThongTin', model)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(() => {
                this.notification.showSuccessMessage(this.translate.get('MES.UPDATE_DONE'));
                this.closeForm();
                this.eventBus.emit(new EmitEvent(EventBus.DuyetTabThongTinNhanSu, true));
            });
    }

    closeForm() {
        this.windowRef.close();
    }
}
