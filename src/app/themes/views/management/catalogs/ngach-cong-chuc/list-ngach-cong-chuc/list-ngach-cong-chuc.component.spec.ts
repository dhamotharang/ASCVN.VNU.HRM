import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNgachCongChucComponent } from './list-ngach-cong-chuc.component';

describe('ListNgachCongChucComponent', () => {
    let component: ListNgachCongChucComponent;
    let fixture: ComponentFixture<ListNgachCongChucComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ListNgachCongChucComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListNgachCongChucComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
