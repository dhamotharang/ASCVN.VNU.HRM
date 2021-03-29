/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormHocViComponent } from './form-hoc-vi.component';

describe('FormHocViComponent', () => {
    let component: FormHocViComponent;
    let fixture: ComponentFixture<FormHocViComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormHocViComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormHocViComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
