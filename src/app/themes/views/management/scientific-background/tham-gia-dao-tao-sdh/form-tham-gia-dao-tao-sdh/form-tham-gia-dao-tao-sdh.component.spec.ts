/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormThamGiaDaoTaoSdhComponent } from './form-tham-gia-dao-tao-sdh.component';

describe('FormThamGiaDaoTaoSdhComponent', () => {
    let component: FormThamGiaDaoTaoSdhComponent;
    let fixture: ComponentFixture<FormThamGiaDaoTaoSdhComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormThamGiaDaoTaoSdhComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormThamGiaDaoTaoSdhComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
