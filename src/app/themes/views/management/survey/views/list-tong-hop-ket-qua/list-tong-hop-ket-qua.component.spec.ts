/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListTongHopKetQuaComponent } from './list-tong-hop-ket-qua.component';

describe('ListTongHopKetQuaComponent', () => {
    let component: ListTongHopKetQuaComponent;
    let fixture: ComponentFixture<ListTongHopKetQuaComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ListTongHopKetQuaComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListTongHopKetQuaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
