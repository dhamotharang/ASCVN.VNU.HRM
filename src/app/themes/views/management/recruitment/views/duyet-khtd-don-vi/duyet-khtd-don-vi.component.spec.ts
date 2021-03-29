/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DuyetKhtdDonViComponent } from './duyet-khtd-don-vi.component';

describe('DuyetKhtdDonViComponent', () => {
    let component: DuyetKhtdDonViComponent;
    let fixture: ComponentFixture<DuyetKhtdDonViComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DuyetKhtdDonViComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DuyetKhtdDonViComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
