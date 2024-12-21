import { Component } from '@angular/core';
import { WorkoutPlan } from '../models/workout-plan.model';
import { Workout } from '../models/workout.model';

@Component({
  selector: 'app-home',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent {
  workoutPlans: WorkoutPlan[] = [
    new WorkoutPlan(1, 'Push', 15, 'Medium'),
    new WorkoutPlan(2, 'Legs', 20, 'Hard'),
    new WorkoutPlan(3, 'Cardio', 30, 'Easy')
  ];

  constructor() {
    let workout1 = new Workout(1, 'Push-ups', 15, 'Medium', 10);
    let workout2 = new Workout(2, 'Squats', 20, 'Hard', 15);
    let workout3 = new Workout(3, 'Running', 30, 'Easy', 20);

    this.workoutPlans[0].workouts = [workout1, workout2];
    this.workoutPlans[2].workouts = [workout3];
  }
}
