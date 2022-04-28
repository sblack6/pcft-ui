import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsTimeSeriesChartComponent } from './transactions-time-series-chart.component';

describe('TransactionsTimeSeriesChartComponent', () => {
  let component: TransactionsTimeSeriesChartComponent;
  let fixture: ComponentFixture<TransactionsTimeSeriesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionsTimeSeriesChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsTimeSeriesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
