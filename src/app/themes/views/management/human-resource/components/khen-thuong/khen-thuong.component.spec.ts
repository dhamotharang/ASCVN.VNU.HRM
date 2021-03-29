import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KhenThuongComponent } from './khen-thuong.component';

describe('KhenThuongComponent', () => {
    let component: KhenThuongComponent;
    let fixture: ComponentFixture<KhenThuongComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [KhenThuongComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(KhenThuongComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
