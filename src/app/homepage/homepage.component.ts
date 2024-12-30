import { Component } from '@angular/core';
import { Workout } from '../models/workout.model';
import { WorkoutService } from '../workout.service';

@Component({
  selector: 'app-home',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent {
  workouts: Workout[] = [];

  constructor(
    private WorkoutService: WorkoutService
  ) {
    this.fetchWorkouts();
  }

  fetchWorkouts() {
    this.WorkoutService.fetchWorkouts().subscribe((workouts: Workout[]) => {
      this.workouts = workouts;
    });
  }
}
