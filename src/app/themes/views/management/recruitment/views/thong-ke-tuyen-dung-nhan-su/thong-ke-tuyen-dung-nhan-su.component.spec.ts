/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ThongKeTuyenDungNhanSuComponent } from './thong-ke-tuyen-dung-nhan-su.component';

describe('ThongKeTuyenDungNhanSuComponent', () => {
    let component: ThongKeTuyenDungNhanSuComponent;
    let fixture: ComponentFixture<ThongKeTuyenDungNhanSuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ThongKeTuyenDungNhanSuComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThongKeTuyenDungNhanSuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
