/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { TrinhDoViTinhComponent } from './trinh-do-vi-tinh.component';

describe('TrinhDoViTinhComponent', () => {
    let component: TrinhDoViTinhComponent;
    let fixture: ComponentFixture<TrinhDoViTinhComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TrinhDoViTinhComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TrinhDoViTinhComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
