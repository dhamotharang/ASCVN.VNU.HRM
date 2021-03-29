/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HinhThucTraLoiComponent } from './hinh-thuc-tra-loi.component';

describe('HinhThucTraLoiComponent', () => {
    let component: HinhThucTraLoiComponent;
    let fixture: ComponentFixture<HinhThucTraLoiComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HinhThucTraLoiComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HinhThucTraLoiComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
