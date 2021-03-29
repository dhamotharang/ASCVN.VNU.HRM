import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListKhoiCoQuanComponent } from './list-khoi-co-quan.component';

describe('ListKhoiCoQuanComponent', () => {
    let component: ListKhoiCoQuanComponent;
    let fixture: ComponentFixture<ListKhoiCoQuanComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ListKhoiCoQuanComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListKhoiCoQuanComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
