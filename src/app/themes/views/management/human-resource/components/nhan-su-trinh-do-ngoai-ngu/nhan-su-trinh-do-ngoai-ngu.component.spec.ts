import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhanSuTrinhDoNgoaiNguComponent } from './nhan-su-trinh-do-ngoai-ngu.component';

describe('NhanSuTrinhDoNgoaiNguComponent', () => {
    let component: NhanSuTrinhDoNgoaiNguComponent;
    let fixture: ComponentFixture<NhanSuTrinhDoNgoaiNguComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NhanSuTrinhDoNgoaiNguComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NhanSuTrinhDoNgoaiNguComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
