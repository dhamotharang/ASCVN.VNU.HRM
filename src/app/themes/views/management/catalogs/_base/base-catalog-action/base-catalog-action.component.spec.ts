import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseCatalogActionComponent } from './base-catalog-action.component';

describe('BaseCatalogActionComponent', () => {
    let component: BaseCatalogActionComponent;
    let fixture: ComponentFixture<BaseCatalogActionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BaseCatalogActionComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BaseCatalogActionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
