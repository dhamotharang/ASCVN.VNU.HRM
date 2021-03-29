/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TrinhDoVanHoaComponent } from './trinh-do-van-hoa.component';

describe('TrinhDoVanHoaComponent', () => {
    let component: TrinhDoVanHoaComponent;
    let fixture: ComponentFixture<TrinhDoVanHoaComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TrinhDoVanHoaComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TrinhDoVanHoaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
