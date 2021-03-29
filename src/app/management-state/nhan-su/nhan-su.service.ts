import { Injectable } from '@angular/core';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { INhanSuCoQuanChucVu } from '@themes/views/management/human-resource/_models/human-resource.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { NhanSuStore } from './nhan-su.store';

@Injectable({
    providedIn: 'root',
})
export class NhanSuService {
    constructor(private store: NhanSuStore, private apiService: ApiService) {}

    getNhanSuByCoQuan(pageNumber: number, pageSize: number, manHinh?: number, coQuanId?: number): Observable<INhanSuCoQuanChucVu[]> {
        const values = this.store.getValue();
        if (values && values.nhanSus.length > 0 && !manHinh) {
            return of(values.nhanSus);
        } else {
            return this.apiService
                .read(UrlConstant.API.HRM_NHAN_SU + '/ByCoQuan', {
                    pageNumber: pageNumber,
                    pageSize: pageSize,
                    manHinh: manHinh ?? null,
                    coQuanId: coQuanId ?? null,
                })
                .pipe(
                    map(res => {
                        const nhanSus = res.result?.items;
                        if (nhanSus) {
                            if (!manHinh) {
                                this.setState(nhanSus);
                                return nhanSus;
                            }
                        }
                        return nhanSus ?? [];
                    })
                );
        }
    }

    setState(nhanSus) {
        this.store.update(state => ({
            ...state,
            ...{
                nhanSus: nhanSus,
            },
        }));
    }

    reset() {
        this.store.update(state => ({
            ...state,
            ...{
                nhanSus: [],
            },
        }));
    }
}
