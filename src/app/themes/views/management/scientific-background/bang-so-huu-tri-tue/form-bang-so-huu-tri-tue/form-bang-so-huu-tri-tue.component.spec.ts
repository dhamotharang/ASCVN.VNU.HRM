/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormBangSoHuuTriTueComponent } from './form-bang-so-huu-tri-tue.component';

describe('FormBangSoHuuTriTueComponent', () => {
    let component: FormBangSoHuuTriTueComponent;
    let fixture: ComponentFixture<FormBangSoHuuTriTueComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormBangSoHuuTriTueComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormBangSoHuuTriTueComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
