import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportHoSoNhanSuComponent } from './export-ho-so-nhan-su.component';

describe('ExportHoSoNhanSuComponent', () => {
    let component: ExportHoSoNhanSuComponent;
    let fixture: ComponentFixture<ExportHoSoNhanSuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ExportHoSoNhanSuComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ExportHoSoNhanSuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
