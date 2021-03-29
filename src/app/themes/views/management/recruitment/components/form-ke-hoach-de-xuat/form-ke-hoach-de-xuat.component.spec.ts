/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormKeHoachDeXuatComponent } from './form-ke-hoach-de-xuat.component';

describe('FormKeHoachDeXuatComponent', () => {
    let component: FormKeHoachDeXuatComponent;
    let fixture: ComponentFixture<FormKeHoachDeXuatComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormKeHoachDeXuatComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormKeHoachDeXuatComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
