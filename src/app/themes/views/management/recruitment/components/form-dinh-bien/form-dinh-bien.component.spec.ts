/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormDinhBienComponent } from './form-dinh-bien.component';

describe('FormDinhBienComponent', () => {
    let component: FormDinhBienComponent;
    let fixture: ComponentFixture<FormDinhBienComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormDinhBienComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormDinhBienComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
