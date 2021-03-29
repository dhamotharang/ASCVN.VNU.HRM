import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KhaiBaoTaiKhoanNhanSuComponent } from './khai-bao-tai-khoan-nhan-su.component';

describe('KhaiBaoTaiKhoanNhanSuComponent', () => {
    let component: KhaiBaoTaiKhoanNhanSuComponent;
    let fixture: ComponentFixture<KhaiBaoTaiKhoanNhanSuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [KhaiBaoTaiKhoanNhanSuComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(KhaiBaoTaiKhoanNhanSuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
