/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TrinhDoNgoaiNguComponent } from './trinh-do-ngoai-ngu.component';

describe('TrinhDoNgoaiNguComponent', () => {
    let component: TrinhDoNgoaiNguComponent;
    let fixture: ComponentFixture<TrinhDoNgoaiNguComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TrinhDoNgoaiNguComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TrinhDoNgoaiNguComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
