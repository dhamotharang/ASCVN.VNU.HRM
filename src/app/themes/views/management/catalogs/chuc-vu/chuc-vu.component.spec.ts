/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ChucVuComponent } from './chuc-vu.component';

describe('ChucVuComponent', () => {
    let component: ChucVuComponent;
    let fixture: ComponentFixture<ChucVuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ChucVuComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChucVuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
