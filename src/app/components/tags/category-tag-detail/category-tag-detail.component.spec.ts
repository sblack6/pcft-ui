import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryTagDetailComponent } from './category-tag-detail.component';

describe('CategoryTagDetailComponent', () => {
  let component: CategoryTagDetailComponent;
  let fixture: ComponentFixture<CategoryTagDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryTagDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryTagDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
