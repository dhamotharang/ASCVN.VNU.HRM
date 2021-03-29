import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AscEditcontentComponent } from './asc-editcontent.component';

describe('AscEditcontentComponent', () => {
    let component: AscEditcontentComponent;
    let fixture: ComponentFixture<AscEditcontentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AscEditcontentComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AscEditcontentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
