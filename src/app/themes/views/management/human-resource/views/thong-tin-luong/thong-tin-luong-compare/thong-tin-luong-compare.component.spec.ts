import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongTinLuongCompareComponent } from './thong-tin-luong-compare.component';

describe('ThongTinLuongCompareComponent', () => {
    let component: ThongTinLuongCompareComponent;
    let fixture: ComponentFixture<ThongTinLuongCompareComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ThongTinLuongCompareComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThongTinLuongCompareComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
