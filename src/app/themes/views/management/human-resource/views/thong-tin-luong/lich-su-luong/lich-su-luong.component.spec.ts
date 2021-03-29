import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LichSuLuongComponent } from './lich-su-luong.component';

describe('LichSuLuongComponent', () => {
    let component: LichSuLuongComponent;
    let fixture: ComponentFixture<LichSuLuongComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LichSuLuongComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LichSuLuongComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
