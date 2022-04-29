import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagHomeComponent } from './tag-home.component';

describe('TagHomeComponent', () => {
  let component: TagHomeComponent;
  let fixture: ComponentFixture<TagHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
