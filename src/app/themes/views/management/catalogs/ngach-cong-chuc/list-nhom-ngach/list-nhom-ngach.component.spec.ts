import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNhomNgachComponent } from './list-nhom-ngach.component';

describe('ListNhomNgachComponent', () => {
    let component: ListNhomNgachComponent;
    let fixture: ComponentFixture<ListNhomNgachComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ListNhomNgachComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListNhomNgachComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
