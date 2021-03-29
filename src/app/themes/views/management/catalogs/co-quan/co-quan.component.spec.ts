/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CoQuanComponent } from './co-quan.component';

describe('CoQuanComponent', () => {
    let component: CoQuanComponent;
    let fixture: ComponentFixture<CoQuanComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CoQuanComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CoQuanComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
