import { Component } from '@angular/core';
import { Workout } from '../models/workout.model';
import { Exercise } from '../models/exercise.model';

@Component({
  selector: 'app-home',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent {
  workouts: Workout[] = [
    new Workout(1, 'Push', 15, 'Medium'),
    new Workout(2, 'Legs', 20, 'Hard'),
    new Workout(3, 'Cardio', 30, 'Easy')
  ];

  constructor() {
    let exercise1 = new Exercise(1, 'Push-ups', 15, 'Medium', 10);
    let exercise2 = new Exercise(2, 'Squats', 20, 'Hard', 15);
    let exercise3 = new Exercise(3, 'Running', 30, 'Easy', 20);

    this.workouts[0].exercises = [exercise1, exercise2];
    this.workouts[2].exercises = [exercise3];
  }
}
