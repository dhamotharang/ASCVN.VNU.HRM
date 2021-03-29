import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongTinDoanDangComponent } from './thong-tin-doan-dang.component';

describe('ThongTinDoanDangComponent', () => {
    let component: ThongTinDoanDangComponent;
    let fixture: ComponentFixture<ThongTinDoanDangComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ThongTinDoanDangComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThongTinDoanDangComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
