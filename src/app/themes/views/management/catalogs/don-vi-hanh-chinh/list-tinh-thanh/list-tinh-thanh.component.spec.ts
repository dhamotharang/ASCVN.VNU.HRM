import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTinhThanhComponent } from './list-tinh-thanh.component';

describe('ListTinhThanhComponent', () => {
    let component: ListTinhThanhComponent;
    let fixture: ComponentFixture<ListTinhThanhComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ListTinhThanhComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListTinhThanhComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
