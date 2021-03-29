/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DanTocComponent } from './dan-toc.component';

describe('DanTocComponent', () => {
    let component: DanTocComponent;
    let fixture: ComponentFixture<DanTocComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DanTocComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DanTocComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
