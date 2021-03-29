import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLoaiHopDongComponent } from './list-loai-hop-dong.component';

describe('ListLoaiHopDongComponent', () => {
  let component: ListLoaiHopDongComponent;
  let fixture: ComponentFixture<ListLoaiHopDongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLoaiHopDongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLoaiHopDongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
