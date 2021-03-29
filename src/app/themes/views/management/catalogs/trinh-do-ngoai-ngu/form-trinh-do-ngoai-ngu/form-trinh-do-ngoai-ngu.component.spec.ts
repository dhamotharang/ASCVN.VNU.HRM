/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormTrinhDoNgoaiNguComponent } from './form-trinh-do-ngoai-ngu.component';

describe('FormTrinhDoNgoaiNguComponent', () => {
    let component: FormTrinhDoNgoaiNguComponent;
    let fixture: ComponentFixture<FormTrinhDoNgoaiNguComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormTrinhDoNgoaiNguComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormTrinhDoNgoaiNguComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
