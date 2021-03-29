/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormQuanHeGiaDinhComponent } from './form-quan-he-gia-dinh.component';

describe('FormQuanHeGiaDinhComponent', () => {
    let component: FormQuanHeGiaDinhComponent;
    let fixture: ComponentFixture<FormQuanHeGiaDinhComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormQuanHeGiaDinhComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormQuanHeGiaDinhComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
