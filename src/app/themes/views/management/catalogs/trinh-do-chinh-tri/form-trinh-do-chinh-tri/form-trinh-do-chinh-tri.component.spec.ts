/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormTrinhDoChinhTriComponent } from './form-trinh-do-chinh-tri.component';

describe('FormTrinhDoChinhTriComponent', () => {
    let component: FormTrinhDoChinhTriComponent;
    let fixture: ComponentFixture<FormTrinhDoChinhTriComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormTrinhDoChinhTriComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormTrinhDoChinhTriComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
