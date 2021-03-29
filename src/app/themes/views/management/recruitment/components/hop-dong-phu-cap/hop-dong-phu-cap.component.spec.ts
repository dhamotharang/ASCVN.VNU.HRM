import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HopDongPhuCapComponent } from './hop-dong-phu-cap.component';

describe('HopDongPhuCapComponent', () => {
    let component: HopDongPhuCapComponent;
    let fixture: ComponentFixture<HopDongPhuCapComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HopDongPhuCapComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HopDongPhuCapComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
