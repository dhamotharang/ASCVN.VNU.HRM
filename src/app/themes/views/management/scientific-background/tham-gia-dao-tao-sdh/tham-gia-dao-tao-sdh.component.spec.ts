/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ThamGiaDaoTaoSdhComponent } from './tham-gia-dao-tao-sdh.component';

describe('ThamGiaDaoTaoSdhComponent', () => {
    let component: ThamGiaDaoTaoSdhComponent;
    let fixture: ComponentFixture<ThamGiaDaoTaoSdhComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ThamGiaDaoTaoSdhComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThamGiaDaoTaoSdhComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
