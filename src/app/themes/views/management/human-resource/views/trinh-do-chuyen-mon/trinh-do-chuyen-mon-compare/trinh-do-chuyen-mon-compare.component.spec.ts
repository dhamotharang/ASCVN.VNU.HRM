import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrinhDoChuyenMonCompareComponent } from './trinh-do-chuyen-mon-compare.component';

describe('TrinhDoChuyenMonCompareComponent', () => {
    let component: TrinhDoChuyenMonCompareComponent;
    let fixture: ComponentFixture<TrinhDoChuyenMonCompareComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TrinhDoChuyenMonCompareComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TrinhDoChuyenMonCompareComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
