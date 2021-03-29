import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HopDongCaNhanComponent } from './hop-dong-ca-nhan.component';

describe('HopDongCaNhanComponent', () => {
    let component: HopDongCaNhanComponent;
    let fixture: ComponentFixture<HopDongCaNhanComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HopDongCaNhanComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HopDongCaNhanComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
