import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNhomHopDongComponent } from './list-nhom-hop-dong.component';

describe('ListNhomHopDongComponent', () => {
  let component: ListNhomHopDongComponent;
  let fixture: ComponentFixture<ListNhomHopDongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListNhomHopDongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNhomHopDongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
