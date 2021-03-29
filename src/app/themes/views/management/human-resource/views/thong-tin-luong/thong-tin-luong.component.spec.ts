import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongTinLuongComponent } from './thong-tin-luong.component';

describe('ThongTinLuongComponent', () => {
    let component: ThongTinLuongComponent;
    let fixture: ComponentFixture<ThongTinLuongComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ThongTinLuongComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThongTinLuongComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
