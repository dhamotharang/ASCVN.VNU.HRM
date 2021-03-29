/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NgoaiNguComponent } from './ngoai-ngu.component';

describe('NgoaiNguComponent', () => {
    let component: NgoaiNguComponent;
    let fixture: ComponentFixture<NgoaiNguComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NgoaiNguComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NgoaiNguComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
