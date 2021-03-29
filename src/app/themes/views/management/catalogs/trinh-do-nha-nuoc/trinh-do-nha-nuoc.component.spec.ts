/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TrinhDoNhaNuocComponent } from './trinh-do-nha-nuoc.component';

describe('TrinhDoNhaNuocComponent', () => {
    let component: TrinhDoNhaNuocComponent;
    let fixture: ComponentFixture<TrinhDoNhaNuocComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TrinhDoNhaNuocComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TrinhDoNhaNuocComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
