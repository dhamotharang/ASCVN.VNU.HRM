import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPhuongXaComponent } from './list-phuong-xa.component';

describe('ListPhuongXaComponent', () => {
    let component: ListPhuongXaComponent;
    let fixture: ComponentFixture<ListPhuongXaComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ListPhuongXaComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListPhuongXaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
