/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { KeHoachTuyenDungComponent } from './ke-hoach-tuyen-dung.component';

describe('KeHoachTuyenDungComponent', () => {
    let component: KeHoachTuyenDungComponent;
    let fixture: ComponentFixture<KeHoachTuyenDungComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [KeHoachTuyenDungComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(KeHoachTuyenDungComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
