/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TrinhDoChinhTriComponent } from './trinh-do-chinh-tri.component';

describe('TrinhDoChinhTriComponent', () => {
    let component: TrinhDoChinhTriComponent;
    let fixture: ComponentFixture<TrinhDoChinhTriComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TrinhDoChinhTriComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TrinhDoChinhTriComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
