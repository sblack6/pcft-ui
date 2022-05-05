import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagDetailTableComponent } from './tag-detail-table.component';

describe('TagDetailTableComponent', () => {
  let component: TagDetailTableComponent;
  let fixture: ComponentFixture<TagDetailTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagDetailTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagDetailTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
