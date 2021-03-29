/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TinhTrangHonNhanComponent } from './tinh-trang-hon-nhan.component';

describe('TinhTrangHonNhanComponent', () => {
    let component: TinhTrangHonNhanComponent;
    let fixture: ComponentFixture<TinhTrangHonNhanComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TinhTrangHonNhanComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TinhTrangHonNhanComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
