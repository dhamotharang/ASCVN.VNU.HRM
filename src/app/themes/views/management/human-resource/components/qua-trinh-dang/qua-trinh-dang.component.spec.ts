import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuaTrinhDangComponent } from './qua-trinh-dang.component';

describe('QuaTrinhDangComponent', () => {
    let component: QuaTrinhDangComponent;
    let fixture: ComponentFixture<QuaTrinhDangComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [QuaTrinhDangComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(QuaTrinhDangComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
