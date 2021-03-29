import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongTinNhanSuCompareComponent } from './thong-tin-nhan-su-compare.component';

describe('ThongTinNhanSuCompareComponent', () => {
    let component: ThongTinNhanSuCompareComponent;
    let fixture: ComponentFixture<ThongTinNhanSuCompareComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ThongTinNhanSuCompareComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThongTinNhanSuCompareComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
