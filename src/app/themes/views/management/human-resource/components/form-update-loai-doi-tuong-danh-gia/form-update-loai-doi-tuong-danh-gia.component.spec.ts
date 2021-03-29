import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateLoaiDoiTuongDanhGiaComponent } from './form-update-loai-doi-tuong-danh-gia.component';

describe('FormUpdateLoaiDoiTuongDanhGiaComponent', () => {
    let component: FormUpdateLoaiDoiTuongDanhGiaComponent;
    let fixture: ComponentFixture<FormUpdateLoaiDoiTuongDanhGiaComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormUpdateLoaiDoiTuongDanhGiaComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormUpdateLoaiDoiTuongDanhGiaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
