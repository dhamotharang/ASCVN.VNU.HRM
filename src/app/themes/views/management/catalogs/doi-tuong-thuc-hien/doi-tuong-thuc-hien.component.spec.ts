/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DoiTuongThucHienComponent } from './doi-tuong-thuc-hien.component';

describe('DoiTuongThucHienComponent', () => {
    let component: DoiTuongThucHienComponent;
    let fixture: ComponentFixture<DoiTuongThucHienComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DoiTuongThucHienComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DoiTuongThucHienComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
