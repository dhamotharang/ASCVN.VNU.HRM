import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XacNhanHopDongComponent } from './xac-nhan-hop-dong.component';

describe('XacNhanHopDongComponent', () => {
    let component: XacNhanHopDongComponent;
    let fixture: ComponentFixture<XacNhanHopDongComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [XacNhanHopDongComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(XacNhanHopDongComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
