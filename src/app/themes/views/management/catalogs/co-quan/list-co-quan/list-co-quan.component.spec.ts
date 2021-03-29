import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCoQuanComponent } from './list-co-quan.component';

describe('ListCoQuanComponent', () => {
    let component: ListCoQuanComponent;
    let fixture: ComponentFixture<ListCoQuanComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ListCoQuanComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListCoQuanComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
