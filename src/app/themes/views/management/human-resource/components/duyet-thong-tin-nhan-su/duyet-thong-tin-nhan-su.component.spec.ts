import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuyetThongTinNhanSuComponent } from './duyet-thong-tin-nhan-su.component';

describe('DuyetThongTinNhanSuComponent', () => {
  let component: DuyetThongTinNhanSuComponent;
  let fixture: ComponentFixture<DuyetThongTinNhanSuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuyetThongTinNhanSuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuyetThongTinNhanSuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
