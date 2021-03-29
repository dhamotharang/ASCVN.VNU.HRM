/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormTaoHopDongComponent } from './form-tao-hop-dong.component';

describe('FormTaoHopDongComponent', () => {
    let component: FormTaoHopDongComponent;
    let fixture: ComponentFixture<FormTaoHopDongComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormTaoHopDongComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormTaoHopDongComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
