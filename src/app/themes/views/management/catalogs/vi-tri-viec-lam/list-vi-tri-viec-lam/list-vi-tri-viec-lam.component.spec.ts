/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListViTriViecLamComponent } from './list-vi-tri-viec-lam.component';

describe('ListViTriViecLamComponent', () => {
    let component: ListViTriViecLamComponent;
    let fixture: ComponentFixture<ListViTriViecLamComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ListViTriViecLamComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListViTriViecLamComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
