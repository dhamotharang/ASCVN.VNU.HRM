/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormDoiTuongChinhSachComponent } from './form-doi-tuong-chinh-sach.component';

describe('FormDoiTuongChinhSachComponent', () => {
    let component: FormDoiTuongChinhSachComponent;
    let fixture: ComponentFixture<FormDoiTuongChinhSachComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormDoiTuongChinhSachComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormDoiTuongChinhSachComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
