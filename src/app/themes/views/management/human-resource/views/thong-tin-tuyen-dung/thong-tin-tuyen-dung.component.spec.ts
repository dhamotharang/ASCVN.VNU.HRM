import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongTinTuyenDungComponent } from './thong-tin-tuyen-dung.component';

describe('ThongTinTuyenDungComponent', () => {
    let component: ThongTinTuyenDungComponent;
    let fixture: ComponentFixture<ThongTinTuyenDungComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ThongTinTuyenDungComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThongTinTuyenDungComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
