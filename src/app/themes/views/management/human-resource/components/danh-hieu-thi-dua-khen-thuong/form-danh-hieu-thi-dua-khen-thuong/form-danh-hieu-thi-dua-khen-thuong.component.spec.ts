import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDanhHieuThiDuaKhenThuongComponent } from './form-danh-hieu-thi-dua-khen-thuong.component';

describe('FormDanhHieuThiDuaKhenThuongComponent', () => {
    let component: FormDanhHieuThiDuaKhenThuongComponent;
    let fixture: ComponentFixture<FormDanhHieuThiDuaKhenThuongComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormDanhHieuThiDuaKhenThuongComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormDanhHieuThiDuaKhenThuongComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
