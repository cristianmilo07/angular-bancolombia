import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SdbPopupComponent } from './sdb-popup.component';

describe('SdbPopupComponent', () => {
  let component: SdbPopupComponent;
  let fixture: ComponentFixture<SdbPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SdbPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SdbPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
