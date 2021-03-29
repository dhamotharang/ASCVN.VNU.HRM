import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhHieuThiDuaKhenThuongComponent } from './danh-hieu-thi-dua-khen-thuong.component';

describe('DanhHieuThiDuaKhenThuongComponent', () => {
    let component: DanhHieuThiDuaKhenThuongComponent;
    let fixture: ComponentFixture<DanhHieuThiDuaKhenThuongComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DanhHieuThiDuaKhenThuongComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DanhHieuThiDuaKhenThuongComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
