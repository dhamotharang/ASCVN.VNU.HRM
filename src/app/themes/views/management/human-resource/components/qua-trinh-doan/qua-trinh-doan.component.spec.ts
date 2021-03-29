import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuaTrinhDoanComponent } from './qua-trinh-doan.component';

describe('QuaTrinhDoanComponent', () => {
    let component: QuaTrinhDoanComponent;
    let fixture: ComponentFixture<QuaTrinhDoanComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [QuaTrinhDoanComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(QuaTrinhDoanComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
