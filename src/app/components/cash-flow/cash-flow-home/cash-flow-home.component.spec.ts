import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashFlowHomeComponent } from './cash-flow-home.component';

describe('CashFlowHomeComponent', () => {
  let component: CashFlowHomeComponent;
  let fixture: ComponentFixture<CashFlowHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashFlowHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashFlowHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
