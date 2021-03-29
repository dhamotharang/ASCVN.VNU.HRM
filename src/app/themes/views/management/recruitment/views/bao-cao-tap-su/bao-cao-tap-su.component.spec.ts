/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BaoCaoTapSuComponent } from './bao-cao-tap-su.component';

describe('BaoCaoTapSuComponent', () => {
    let component: BaoCaoTapSuComponent;
    let fixture: ComponentFixture<BaoCaoTapSuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BaoCaoTapSuComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BaoCaoTapSuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
