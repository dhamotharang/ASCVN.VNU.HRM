/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormTrinhDoComponent } from './form-trinh-do.component';

describe('FormTrinhDoComponent', () => {
    let component: FormTrinhDoComponent;
    let fixture: ComponentFixture<FormTrinhDoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormTrinhDoComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormTrinhDoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
