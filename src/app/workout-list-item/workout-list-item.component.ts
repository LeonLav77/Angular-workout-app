import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workout-list-item',
  templateUrl: './workout-list-item.component.html',
  styleUrls: ['./workout-list-item.component.css']
})
export class WorkoutListItemComponent {
  @Input() workoutPlan: any; // Replace `any` with the appropriate type for your data

  constructor(private router: Router) {}

  // Method to handle the Start Workout button click
  startWorkout(workoutPlanId: number) {
      this.router.navigate(['/active-workout', workoutPlanId]); // Navigate to Active Workout
  }
}
