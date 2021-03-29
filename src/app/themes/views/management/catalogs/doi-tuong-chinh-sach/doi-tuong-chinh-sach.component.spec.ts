/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DoiTuongChinhSachComponent } from './doi-tuong-chinh-sach.component';

describe('DoiTuongChinhSachComponent', () => {
    let component: DoiTuongChinhSachComponent;
    let fixture: ComponentFixture<DoiTuongChinhSachComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DoiTuongChinhSachComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DoiTuongChinhSachComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
