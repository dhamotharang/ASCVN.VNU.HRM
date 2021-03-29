/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormPhuongXaComponent } from './form-phuong-xa.component';

describe('FormPhuongXaComponent', () => {
    let component: FormPhuongXaComponent;
    let fixture: ComponentFixture<FormPhuongXaComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormPhuongXaComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormPhuongXaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
