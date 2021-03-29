import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuaTrinhCongDoanComponent } from './qua-trinh-cong-doan.component';

describe('QuaTrinhCongDoanComponent', () => {
    let component: QuaTrinhCongDoanComponent;
    let fixture: ComponentFixture<QuaTrinhCongDoanComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [QuaTrinhCongDoanComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(QuaTrinhCongDoanComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
