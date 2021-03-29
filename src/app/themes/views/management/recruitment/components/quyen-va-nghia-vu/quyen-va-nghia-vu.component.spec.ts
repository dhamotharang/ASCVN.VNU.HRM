import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuyenVaNghiaVuComponent } from './quyen-va-nghia-vu.component';

describe('QuyenVaNghiaVuComponent', () => {
    let component: QuyenVaNghiaVuComponent;
    let fixture: ComponentFixture<QuyenVaNghiaVuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [QuyenVaNghiaVuComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(QuyenVaNghiaVuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
