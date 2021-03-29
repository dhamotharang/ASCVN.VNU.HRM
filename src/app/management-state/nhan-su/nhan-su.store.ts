import { Injectable } from '@angular/core';
import { INhanSuCoQuanChucVu } from '@themes/views/management/human-resource/_models/human-resource.model';
import { Store, StoreConfig } from '@datorama/akita';

export interface NhanSuState {
    nhanSus: INhanSuCoQuanChucVu[];
}

export function createInitialNhanSuState(): NhanSuState {
    return {
        nhanSus: [],
    };
}

@Injectable({
    providedIn: 'root',
})
@StoreConfig({
    name: 'nhanSu',
})
export class NhanSuStore extends Store<NhanSuState> {
    constructor() {
        super(createInitialNhanSuState());
    }
}
