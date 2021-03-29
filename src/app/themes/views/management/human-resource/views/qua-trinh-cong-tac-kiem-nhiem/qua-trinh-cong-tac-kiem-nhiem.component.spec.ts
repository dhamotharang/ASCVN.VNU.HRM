import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuaTrinhCongTacKiemNhiemComponent } from './qua-trinh-cong-tac-kiem-nhiem.component';

describe('QuaTrinhCongTacKiemNhiemComponent', () => {
    let component: QuaTrinhCongTacKiemNhiemComponent;
    let fixture: ComponentFixture<QuaTrinhCongTacKiemNhiemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [QuaTrinhCongTacKiemNhiemComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(QuaTrinhCongTacKiemNhiemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
