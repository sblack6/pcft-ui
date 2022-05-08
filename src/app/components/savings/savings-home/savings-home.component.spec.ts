import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsHomeComponent } from './savings-home.component';

describe('SavingsHomeComponent', () => {
  let component: SavingsHomeComponent;
  let fixture: ComponentFixture<SavingsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavingsHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavingsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
