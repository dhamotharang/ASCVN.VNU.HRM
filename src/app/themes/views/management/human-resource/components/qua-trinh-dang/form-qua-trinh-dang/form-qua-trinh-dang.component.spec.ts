/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormQuaTrinhDangComponent } from './form-qua-trinh-dang.component';

describe('FormQuaTrinhDangComponent', () => {
    let component: FormQuaTrinhDangComponent;
    let fixture: ComponentFixture<FormQuaTrinhDangComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormQuaTrinhDangComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormQuaTrinhDangComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
