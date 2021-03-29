/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TrinhDoChuyenMonComponent } from './trinh-do-chuyen-mon.component';

describe('TrinhDoChuyenMonComponent', () => {
    let component: TrinhDoChuyenMonComponent;
    let fixture: ComponentFixture<TrinhDoChuyenMonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TrinhDoChuyenMonComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TrinhDoChuyenMonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
