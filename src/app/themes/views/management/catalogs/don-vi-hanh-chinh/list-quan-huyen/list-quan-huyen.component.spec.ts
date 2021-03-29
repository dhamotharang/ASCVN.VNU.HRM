import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListQuanHuyenComponent } from './list-quan-huyen.component';

describe('ListQuanHuyenComponent', () => {
    let component: ListQuanHuyenComponent;
    let fixture: ComponentFixture<ListQuanHuyenComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ListQuanHuyenComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListQuanHuyenComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
