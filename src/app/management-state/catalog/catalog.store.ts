import { Injectable } from '@angular/core';
import { IChucDanh, IChucVu, IDanToc, IQuocGia, ITinhThanh, ITonGiao } from '@themes/views/management/catalogs/_models/catalog.model';
import { EntityStore, Store, StoreConfig } from '@datorama/akita';

export interface CatalogState {
    quocGias: IQuocGia[];
    tinhThanhs: ITinhThanh[];
    chucVus: IChucVu[];
    chucDanhs: IChucDanh[];
    danTocs: IDanToc[];
    tonGiaos: ITonGiao[];
}

export function createInitialCatalogState(): CatalogState {
    return {
        quocGias: [],
        tinhThanhs: [],
        chucVus: [],
        chucDanhs: [],
        danTocs: [],
        tonGiaos: [],
    };
}

@Injectable({
    providedIn: 'root',
})
@StoreConfig({
    name: 'catalog',
    cache: {
        ttl: 3600000,
    },
})
export class CatalogStore extends Store<CatalogState> {
    constructor() {
        super(createInitialCatalogState());
    }
}
