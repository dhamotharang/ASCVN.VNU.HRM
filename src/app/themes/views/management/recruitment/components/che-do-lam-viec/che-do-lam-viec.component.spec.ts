import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheDoLamViecComponent } from './che-do-lam-viec.component';

describe('CheDoLamViecComponent', () => {
    let component: CheDoLamViecComponent;
    let fixture: ComponentFixture<CheDoLamViecComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CheDoLamViecComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CheDoLamViecComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
