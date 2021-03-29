/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormQuaTrinhCongDoanComponent } from './form-qua-trinh-cong-doan.component';

describe('FormQuaTrinhCongDoanComponent', () => {
    let component: FormQuaTrinhCongDoanComponent;
    let fixture: ComponentFixture<FormQuaTrinhCongDoanComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormQuaTrinhCongDoanComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormQuaTrinhCongDoanComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
