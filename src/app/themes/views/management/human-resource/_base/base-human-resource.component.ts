import { OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BaseCheckPermission } from '@core/auth/base-check-permission';
import { MenuQuery } from '@management-state/menu/menu.query';
import { GridDataResult, PagerSettings, SelectAllCheckboxState } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { ActionEnum } from '@core/constants/enum.constant';
import { ActivatedRoute } from '@angular/router';
import { ViewFileComponent } from '@shared/controls/view-file/view-file.component';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { SecurityUtil } from '@core/utils/security';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';
import { DuLieuNhanSuEnum, HRM_KEY, HRM_URL, TrangThaiDuLieuDescription, TrangThaiDuLieuEnum } from '@themes/views/management/human-resource/_models';

export abstract class BaseHumanResourceComponent<T> extends BaseCheckPermission implements OnInit, OnDestroy {
    @ViewChild(TooltipDirective) public tooltipDir: TooltipDirective;
    opened = false;
    gridView$: Observable<GridDataResult>;
    gridState: State = {
        sort: [{ field: 'id', dir: 'desc' }],
        skip: 0,
        take: 10,
    };

    pageConfig: PagerSettings | boolean = false;
    loading = false;
    selectionIds: number[] = [];

    keyTabHRMs: string[] = [];

    hrmkey = HRM_KEY;

    nhanSuId: number;

    trangThaiDuLieus = TrangThaiDuLieuDescription;
    trangThaiDuLieuEnum = TrangThaiDuLieuEnum;

    // Nếu là trang lý lịch nhân sự
    isPersonal = false;

    // Nếu là trang duyệt lý lịch nhân sự
    isDuyetLyLichNhanSu = false;

    // visible popover
    visible = false;

    selectAllState: SelectAllCheckboxState = 'unchecked';
    duLieuNhanSuEnum: DuLieuNhanSuEnum;
    protected action: ActionEnum;
    protected model: T;
    protected destroyed$ = new Subject();

    constructor(protected menuQuery: MenuQuery, protected route: ActivatedRoute, protected windowService: WindowService) {
        super(menuQuery);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.route.queryParams.subscribe(params => {
            if (params.k) {
                const data = JSON.parse(SecurityUtil.get(decodeURIComponent(params.k)));
                this.nhanSuId = Number.parseInt(data.idNhanSu, 10);
                this.duLieuNhanSuEnum =  Number.parseInt(data.manHinh, 10) as DuLieuNhanSuEnum;

                if (this.nhanSuId) {
                    this.loadItems();
                }
            }

            // if (params.query) {
            //     this.keyTabHRMs = SecurityUtil.get(decodeURIComponent(params.query)).split(',');
            // }
        });

        const pathName = location.pathname;
        const urlArray = pathName.split('/');
        this.isPersonal = urlArray.includes('ho-so-ca-nhan');

        Object.values(HRM_URL).forEach(key => {
            if (urlArray.includes(key)) {
                switch (key) {
                    case HRM_URL.HO_SO_CA_NHAN:
                        this.isPersonal = false;
                        this.isDuyetLyLichNhanSu = false;
                        break;
                    case HRM_URL.LY_LICH_NHAN_SU:
                        this.isPersonal = true;
                        this.isDuyetLyLichNhanSu = false;
                        break;
                    case HRM_URL.HO_SO_UNG_VIEN:
                    case HRM_URL.DUYET_HO_SO_CA_NHAN:
                        this.isPersonal = false;
                        this.isDuyetLyLichNhanSu = true;
                        break;
                }
            }
        });

        // set role
        this.roles.isUpdate = true;
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    isShowTabHRM(key: string) {
        const menuChange = localStorage.getItem('_keyMenuChange');
        if (!menuChange) {
            return;
        }
        this.keyTabHRMs =  menuChange.split(',');
        return this.keyTabHRMs.includes(key);
    }

    showModalViewFile(guidId, name) {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: 'Xem tập tin Đính kèm',
            content: ViewFileComponent,
            width: 1200,
            height: 800,
            top: 10,
            autoFocusedElement: 'body',
            state: 'maximized',
        });

        const param = windowRef.content.instance;
        param.key = guidId;
        param.fileName = name;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
            }
        });
    }

    addHandler() {
        this.model = undefined;
        this.action = ActionEnum.CREATE;
        this.showFormCreateOrUpdate();
    }

    editHandler(dataItem) {
        this.model = dataItem;
        this.action = ActionEnum.UPDATE;
        this.showFormCreateOrUpdate();
    }

    onStateChange(state: State) {
        this.gridState = state;
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

    onSelectAllChange(checkedState: SelectAllCheckboxState) {
        if (checkedState === 'checked') {
            this.selectAllState = 'checked';
        } else {
            this.selectAllState = 'unchecked';
        }
    }

    protected abstract showFormCreateOrUpdate();

    protected abstract loadItems();
}
