/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormBaoCaoTapSuComponent } from './form-bao-cao-tap-su.component';

describe('FormBaoCaoTapSuComponent', () => {
    let component: FormBaoCaoTapSuComponent;
    let fixture: ComponentFixture<FormBaoCaoTapSuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormBaoCaoTapSuComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormBaoCaoTapSuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
