import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyNhiemVuKhcnComponent } from './quan-ly-nhiem-vu-khcn.component';

describe('QuanLyNhiemVuKhcnComponent', () => {
  let component: QuanLyNhiemVuKhcnComponent;
  let fixture: ComponentFixture<QuanLyNhiemVuKhcnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanLyNhiemVuKhcnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanLyNhiemVuKhcnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
