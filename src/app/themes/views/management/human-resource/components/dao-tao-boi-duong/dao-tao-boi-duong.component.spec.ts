import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaoTaoBoiDuongComponent } from './dao-tao-boi-duong.component';

describe('DaoTaoBoiDuongComponent', () => {
    let component: DaoTaoBoiDuongComponent;
    let fixture: ComponentFixture<DaoTaoBoiDuongComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DaoTaoBoiDuongComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DaoTaoBoiDuongComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
