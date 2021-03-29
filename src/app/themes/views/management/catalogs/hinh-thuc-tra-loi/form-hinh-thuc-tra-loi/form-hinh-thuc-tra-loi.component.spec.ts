/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormHinhThucTraLoiComponent } from './form-hinh-thuc-tra-loi.component';

describe('FormHinhThucTraLoiComponent', () => {
    let component: FormHinhThucTraLoiComponent;
    let fixture: ComponentFixture<FormHinhThucTraLoiComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormHinhThucTraLoiComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormHinhThucTraLoiComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
