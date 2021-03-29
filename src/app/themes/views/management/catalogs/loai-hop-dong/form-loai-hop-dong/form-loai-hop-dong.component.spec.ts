/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormLoaiHopDongComponent } from './form-loai-hop-dong.component';

describe('FormLoaiHopDongComponent', () => {
    let component: FormLoaiHopDongComponent;
    let fixture: ComponentFixture<FormLoaiHopDongComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormLoaiHopDongComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormLoaiHopDongComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
