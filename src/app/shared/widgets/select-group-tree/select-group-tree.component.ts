import { Component, forwardRef, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ITreeGroupPermission } from '@core/models/permissions/permission.model';
import { PermissionService } from '@core/services/business/permission.service';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

export interface ITreeSelectPermission {
    title: string;
    value: string;
    key: string;
    capDonVi?: number;
    coQuanTrucThuocId?: number;
    children?: ITreeSelectPermission[];
    isLeaf?: boolean;
}
@Component({
    selector: 'app-select-group-tree',
    templateUrl: './select-group-tree.component.html',
    styleUrls: ['./select-group-tree.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => SelectGroupTreeComponent),
        },
        PermissionService
    ],
    encapsulation: ViewEncapsulation.None,
})
export class SelectGroupTreeComponent implements OnInit, OnDestroy, OnChanges, ControlValueAccessor {
    @Input() userSelectedIds?: number[] = [];
    @Input() placeholder = 'Chọn';
    @Input() isMultiple = true;
    @Input() isDisabled = false;
    @Input() isDisabledParentNode = false;

    @Output() selected: string;
    value: Array<string> | string;

    treeGroupPermission: any[] = [];

    expandKeys = [];
    isLoading = false;

    private destroyed$ = new Subject();

    constructor(private permissionService: PermissionService) {}

    onChange: (value: any) => void;

    onTouched: () => void;

    ngOnChanges(changes: SimpleChanges) {
        if (this.userSelectedIds.length === 0) {
            this.value = [];
            this.writeValue(this.value);
        }
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    writeValue(obj) {
        if (typeof obj === 'number') {
            this.value = obj.toString();
        } else {
            this.value = obj || [];
        }

        this.userSelectedIds = obj || [];
    }

    ngOnInit(): void {
        this.loadTreeGroupPermission();
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    private loadTreeGroupPermission() {
        this.permissionService
            .getGroupForTree(null, null)
            .pipe(takeUntil(this.destroyed$))
            .pipe(
                map(res => this.setTreeValue(res))
            )
            .subscribe();
    }

    private setTreeValue(res) {
        const firstValue = res[0];
        if (firstValue) {
            this.treeGroupPermission = this.toTree(res, 0, -1);
            this.expandKeys = this.treeGroupPermission.map(m => m.idGroupPermission);
        }
    }

    private toTree(arr: ITreeGroupPermission[], level, parentId): ITreeGroupPermission[] {
        const users = arr.filter(m => (level < 1 && m.level < 1) || (level > 0 && m.idParent > 0 && m.idParent === parentId))
            .map(m => {
                return {
                    ...m,
                    expanded: false,
                    children: [],
                    isLeaf: false,
                    title: m.groupName,
                    value: m.idGroupPermission.toString(),
                }
            });
        if (users.length > 0) {
            users.map(item => {
                item.key = item.idGroupPermission;
                const childs = arr.filter(m => m.idParent === item.idGroupPermission);
                if (childs.length > 0) {
                    item.children = this.toTree(arr, item.level + 1, item.idGroupPermission);
                    if (this.isDisabledParentNode) {
                        item.disabled = true;
                    }
                } else {
                    item.isLeaf = true;
                }
            });
        }

        return users;
    }

}
