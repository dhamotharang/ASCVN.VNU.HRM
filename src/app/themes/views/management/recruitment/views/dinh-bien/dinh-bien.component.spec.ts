/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DinhBienComponent } from './dinh-bien.component';

describe('DinhBienComponent', () => {
    let component: DinhBienComponent;
    let fixture: ComponentFixture<DinhBienComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DinhBienComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DinhBienComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
