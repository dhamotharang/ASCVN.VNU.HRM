/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormNhanSuQuanHeGiaDinhComponent } from './form-nhan-su-quan-he-gia-dinh.component';

describe('FormNhanSuQuanHeGiaDinhComponent', () => {
    let component: FormNhanSuQuanHeGiaDinhComponent;
    let fixture: ComponentFixture<FormNhanSuQuanHeGiaDinhComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormNhanSuQuanHeGiaDinhComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormNhanSuQuanHeGiaDinhComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
