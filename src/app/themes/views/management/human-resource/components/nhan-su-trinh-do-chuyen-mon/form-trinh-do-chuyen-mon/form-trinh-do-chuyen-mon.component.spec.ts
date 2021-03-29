/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormTrinhDoChuyenMonComponent } from './form-trinh-do-chuyen-mon.component';

describe('FormTrinhDoChuyenMonComponent', () => {
    let component: FormTrinhDoChuyenMonComponent;
    let fixture: ComponentFixture<FormTrinhDoChuyenMonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormTrinhDoChuyenMonComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormTrinhDoChuyenMonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
