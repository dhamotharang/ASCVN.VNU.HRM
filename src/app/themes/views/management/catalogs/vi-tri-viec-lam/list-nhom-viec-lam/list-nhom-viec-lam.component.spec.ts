/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListNhomViecLamComponent } from './list-nhom-viec-lam.component';

describe('ListNhomViecLamComponent', () => {
    let component: ListNhomViecLamComponent;
    let fixture: ComponentFixture<ListNhomViecLamComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ListNhomViecLamComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListNhomViecLamComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
