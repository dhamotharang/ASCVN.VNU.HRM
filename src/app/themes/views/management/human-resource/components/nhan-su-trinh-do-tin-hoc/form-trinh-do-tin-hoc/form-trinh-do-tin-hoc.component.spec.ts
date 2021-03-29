/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormTrinhDoTinHocComponent } from './form-trinh-do-tin-hoc.component';

describe('FormTrinhDoTinHocComponent', () => {
    let component: FormTrinhDoTinHocComponent;
    let fixture: ComponentFixture<FormTrinhDoTinHocComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormTrinhDoTinHocComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormTrinhDoTinHocComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
