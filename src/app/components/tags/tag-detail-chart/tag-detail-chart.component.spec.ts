import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagDetailChartComponent } from './tag-detail-chart.component';

describe('TagDetailChartComponent', () => {
  let component: TagDetailChartComponent;
  let fixture: ComponentFixture<TagDetailChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagDetailChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagDetailChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
