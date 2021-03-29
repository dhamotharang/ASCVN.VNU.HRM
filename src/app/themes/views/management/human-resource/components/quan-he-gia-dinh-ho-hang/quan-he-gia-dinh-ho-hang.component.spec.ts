import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanHeGiaDinhHoHangComponent } from './quan-he-gia-dinh-ho-hang.component';

describe('QuanHeGiaDinhHoHangComponent', () => {
    let component: QuanHeGiaDinhHoHangComponent;
    let fixture: ComponentFixture<QuanHeGiaDinhHoHangComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [QuanHeGiaDinhHoHangComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(QuanHeGiaDinhHoHangComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
