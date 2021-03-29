import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TinhTrangSucKhoeCompareComponent } from './tinh-trang-suc-khoe-compare.component';

describe('TinhTrangSucKhoeCompareComponent', () => {
    let component: TinhTrangSucKhoeCompareComponent;
    let fixture: ComponentFixture<TinhTrangSucKhoeCompareComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TinhTrangSucKhoeCompareComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TinhTrangSucKhoeCompareComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
