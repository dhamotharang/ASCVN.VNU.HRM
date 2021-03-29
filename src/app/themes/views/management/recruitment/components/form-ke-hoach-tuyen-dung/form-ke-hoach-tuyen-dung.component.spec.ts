/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormKeHoachTuyenDungComponent } from './form-ke-hoach-tuyen-dung.component';

describe('FormKeHoachTuyenDungComponent', () => {
    let component: FormKeHoachTuyenDungComponent;
    let fixture: ComponentFixture<FormKeHoachTuyenDungComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormKeHoachTuyenDungComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormKeHoachTuyenDungComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
