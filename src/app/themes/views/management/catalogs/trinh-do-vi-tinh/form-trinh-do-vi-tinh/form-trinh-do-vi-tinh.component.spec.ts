/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormTrinhDoViTinhComponent } from './form-trinh-do-vi-tinh.component';

describe('FormTrinhDoViTinhComponent', () => {
    let component: FormTrinhDoViTinhComponent;
    let fixture: ComponentFixture<FormTrinhDoViTinhComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormTrinhDoViTinhComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormTrinhDoViTinhComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
