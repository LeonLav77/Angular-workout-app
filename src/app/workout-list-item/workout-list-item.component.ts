import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Workout } from '../models/workout.model';

@Component({
  selector: 'app-workout-list-item',
  templateUrl: './workout-list-item.component.html',
  styleUrls: ['./workout-list-item.component.css']
})
export class WorkoutListItemComponent {
  @Input() workout: Workout = new Workout(0, '', 0, '');

  constructor(private router: Router) {}

  startWorkout(workoutId: number) {
      this.router.navigate(['/active-workout', workoutId]);
  }
}
