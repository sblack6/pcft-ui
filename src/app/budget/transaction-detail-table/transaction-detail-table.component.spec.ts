import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionDetailTableComponent } from './transaction-detail-table.component';

describe('TransactionDetailTableComponent', () => {
  let component: TransactionDetailTableComponent;
  let fixture: ComponentFixture<TransactionDetailTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionDetailTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionDetailTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
