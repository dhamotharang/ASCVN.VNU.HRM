/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormNhomHopDongComponent } from './form-nhom-hop-dong.component';

describe('FormNhomHopDongComponent', () => {
    let component: FormNhomHopDongComponent;
    let fixture: ComponentFixture<FormNhomHopDongComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormNhomHopDongComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormNhomHopDongComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
