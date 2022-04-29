import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetEditTableComponent } from './budget-edit-table.component';

describe('BudgetEditTableComponent', () => {
  let component: BudgetEditTableComponent;
  let fixture: ComponentFixture<BudgetEditTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetEditTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetEditTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
