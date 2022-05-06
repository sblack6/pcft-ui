import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagBarChartComponent } from './tag-bar-chart.component';

describe('TagBarChartComponent', () => {
  let component: TagBarChartComponent;
  let fixture: ComponentFixture<TagBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagBarChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
