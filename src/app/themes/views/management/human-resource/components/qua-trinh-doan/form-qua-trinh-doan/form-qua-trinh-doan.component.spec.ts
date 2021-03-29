/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormQuaTrinhDoanComponent } from './form-qua-trinh-doan.component';

describe('FormQuaTrinhDoanComponent', () => {
    let component: FormQuaTrinhDoanComponent;
    let fixture: ComponentFixture<FormQuaTrinhDoanComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormQuaTrinhDoanComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormQuaTrinhDoanComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
