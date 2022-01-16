import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeOfPasswordComponent } from './change-of-password.component';

describe('ChangeOfPasswordComponent', () => {
  let component: ChangeOfPasswordComponent;
  let fixture: ComponentFixture<ChangeOfPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeOfPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeOfPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
