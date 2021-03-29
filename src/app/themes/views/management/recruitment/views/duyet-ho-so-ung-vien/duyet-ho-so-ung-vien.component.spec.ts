/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DuyetHoSoUngVienComponent } from './duyet-ho-so-ung-vien.component';

describe('DuyetHoSoUngVienComponent', () => {
    let component: DuyetHoSoUngVienComponent;
    let fixture: ComponentFixture<DuyetHoSoUngVienComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DuyetHoSoUngVienComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DuyetHoSoUngVienComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
