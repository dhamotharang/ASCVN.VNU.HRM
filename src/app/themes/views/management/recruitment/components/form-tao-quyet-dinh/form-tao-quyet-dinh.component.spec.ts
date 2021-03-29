/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormTaoQuyetDinhComponent } from './form-tao-quyet-dinh.component';

describe('FormTaoQuyetDinhComponent', () => {
    let component: FormTaoQuyetDinhComponent;
    let fixture: ComponentFixture<FormTaoQuyetDinhComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormTaoQuyetDinhComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormTaoQuyetDinhComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
