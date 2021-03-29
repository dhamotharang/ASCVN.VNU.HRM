import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanHeGiaDinhBanThanComponent } from './quan-he-gia-dinh-ban-than.component';

describe('QuanHeGiaDinhBanThanComponent', () => {
    let component: QuanHeGiaDinhBanThanComponent;
    let fixture: ComponentFixture<QuanHeGiaDinhBanThanComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [QuanHeGiaDinhBanThanComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(QuanHeGiaDinhBanThanComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
