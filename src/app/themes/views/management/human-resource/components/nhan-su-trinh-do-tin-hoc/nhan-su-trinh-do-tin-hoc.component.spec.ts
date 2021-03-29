import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhanSuTrinhDoTinHocComponent } from './nhan-su-trinh-do-tin-hoc.component';

describe('NhanSuTrinhDoTinHocComponent', () => {
    let component: NhanSuTrinhDoTinHocComponent;
    let fixture: ComponentFixture<NhanSuTrinhDoTinHocComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NhanSuTrinhDoTinHocComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NhanSuTrinhDoTinHocComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
