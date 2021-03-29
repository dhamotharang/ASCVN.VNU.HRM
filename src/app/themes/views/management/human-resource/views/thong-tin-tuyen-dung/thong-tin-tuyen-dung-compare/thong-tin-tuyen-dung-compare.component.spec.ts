import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongTinTuyenDungCompareComponent } from './thong-tin-tuyen-dung-compare.component';

describe('ThongTinTuyenDungCompareComponent', () => {
    let component: ThongTinTuyenDungCompareComponent;
    let fixture: ComponentFixture<ThongTinTuyenDungCompareComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ThongTinTuyenDungCompareComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThongTinTuyenDungCompareComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
