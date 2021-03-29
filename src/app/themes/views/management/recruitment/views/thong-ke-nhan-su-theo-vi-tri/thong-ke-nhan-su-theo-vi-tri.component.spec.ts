/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ThongKeNhanSuTheoViTriComponent } from './thong-ke-nhan-su-theo-vi-tri.component';

describe('ThongKeNhanSuTheoViTriComponent', () => {
    let component: ThongKeNhanSuTheoViTriComponent;
    let fixture: ComponentFixture<ThongKeNhanSuTheoViTriComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ThongKeNhanSuTheoViTriComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThongKeNhanSuTheoViTriComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
