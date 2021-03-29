import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongTinDoanDangCompareComponent } from './thong-tin-doan-dang-compare.component';

describe('ThongTinDoanDangCompareComponent', () => {
    let component: ThongTinDoanDangCompareComponent;
    let fixture: ComponentFixture<ThongTinDoanDangCompareComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ThongTinDoanDangCompareComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThongTinDoanDangCompareComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
