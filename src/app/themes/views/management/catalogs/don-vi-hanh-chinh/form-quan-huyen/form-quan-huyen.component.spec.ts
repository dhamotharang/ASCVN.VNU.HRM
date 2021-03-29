/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormQuanHuyenComponent } from './form-quan-huyen.component';

describe('FormQuanHuyenComponent', () => {
    let component: FormQuanHuyenComponent;
    let fixture: ComponentFixture<FormQuanHuyenComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormQuanHuyenComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormQuanHuyenComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
