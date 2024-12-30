import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedWorkoutListItemComponent } from './completed-workout-list-item.component';

describe('CompletedWorkoutListItemComponent', () => {
  let component: CompletedWorkoutListItemComponent;
  let fixture: ComponentFixture<CompletedWorkoutListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompletedWorkoutListItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletedWorkoutListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
