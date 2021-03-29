/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormTrinhDoNhaNuocComponent } from './form-trinh-do-nha-nuoc.component';

describe('FormTrinhDoNhaNuocComponent', () => {
    let component: FormTrinhDoNhaNuocComponent;
    let fixture: ComponentFixture<FormTrinhDoNhaNuocComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormTrinhDoNhaNuocComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormTrinhDoNhaNuocComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
