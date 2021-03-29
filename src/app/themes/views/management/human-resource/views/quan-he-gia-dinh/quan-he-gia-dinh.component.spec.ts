/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuanHeGiaDinhComponent } from './quan-he-gia-dinh.component';

describe('QuanHeGiaDinhComponent', () => {
    let component: QuanHeGiaDinhComponent;
    let fixture: ComponentFixture<QuanHeGiaDinhComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [QuanHeGiaDinhComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(QuanHeGiaDinhComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
