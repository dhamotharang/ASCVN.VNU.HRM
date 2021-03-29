import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhanSuChucDanhKhoaHocComponent } from './nhan-su-chuc-danh-khoa-hoc.component';

describe('NhanSuChucDanhKhoaHocComponent', () => {
    let component: NhanSuChucDanhKhoaHocComponent;
    let fixture: ComponentFixture<NhanSuChucDanhKhoaHocComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NhanSuChucDanhKhoaHocComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NhanSuChucDanhKhoaHocComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
