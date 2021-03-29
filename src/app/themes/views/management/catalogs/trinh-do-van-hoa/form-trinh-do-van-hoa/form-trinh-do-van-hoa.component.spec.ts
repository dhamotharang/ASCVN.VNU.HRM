/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormTrinhDoVanHoaComponent } from './form-trinh-do-van-hoa.component';

describe('FormTrinhDoVanHoaComponent', () => {
    let component: FormTrinhDoVanHoaComponent;
    let fixture: ComponentFixture<FormTrinhDoVanHoaComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormTrinhDoVanHoaComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormTrinhDoVanHoaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
