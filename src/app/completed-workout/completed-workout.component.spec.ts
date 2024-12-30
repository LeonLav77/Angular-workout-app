import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedWorkoutComponent } from './completed-workout.component';

describe('CompletedWorkoutComponent', () => {
  let component: CompletedWorkoutComponent;
  let fixture: ComponentFixture<CompletedWorkoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompletedWorkoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletedWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
