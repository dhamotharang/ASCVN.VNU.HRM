import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuyetHopDongCaNhanComponent } from './duyet-hop-dong-ca-nhan.component';

describe('DuyetHopDongCaNhanComponent', () => {
    let component: DuyetHopDongCaNhanComponent;
    let fixture: ComponentFixture<DuyetHopDongCaNhanComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DuyetHopDongCaNhanComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DuyetHopDongCaNhanComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
