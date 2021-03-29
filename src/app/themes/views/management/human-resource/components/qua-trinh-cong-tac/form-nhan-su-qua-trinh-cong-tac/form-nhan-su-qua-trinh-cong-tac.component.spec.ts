/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormNhanSuQuaTrinhCongTacComponent } from './form-nhan-su-qua-trinh-cong-tac.component';

describe('FormNhanSuQuaTrinhCongTacComponent', () => {
    let component: FormNhanSuQuaTrinhCongTacComponent;
    let fixture: ComponentFixture<FormNhanSuQuaTrinhCongTacComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormNhanSuQuaTrinhCongTacComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormNhanSuQuaTrinhCongTacComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
