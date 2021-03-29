/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BangSoHuuTriTueComponent } from './bang-so-huu-tri-tue.component';

describe('BangSoHuuTriTueComponent', () => {
    let component: BangSoHuuTriTueComponent;
    let fixture: ComponentFixture<BangSoHuuTriTueComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BangSoHuuTriTueComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BangSoHuuTriTueComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
