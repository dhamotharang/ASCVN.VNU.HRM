import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhanSuTrinhDoChuyenMonComponent } from './nhan-su-trinh-do-chuyen-mon.component';

describe('NhanSuTrinhDoChuyenMonComponent', () => {
    let component: NhanSuTrinhDoChuyenMonComponent;
    let fixture: ComponentFixture<NhanSuTrinhDoChuyenMonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NhanSuTrinhDoChuyenMonComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NhanSuTrinhDoChuyenMonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
