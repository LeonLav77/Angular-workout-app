import { Component, Input } from '@angular/core';
import { Workout } from '../models/workout.model';

@Component({
  selector: 'app-completed-workout-list-item',
  templateUrl: './completed-workout-list-item.component.html',
  styleUrls: ['./completed-workout-list-item.component.css']
})
export class CompletedWorkoutListItemComponent {
  @Input() workout: Workout = new Workout(0, '');
  activeWorkoutId: number | null = null;
  toggleCollapse(workoutId: number): void {
    this.activeWorkoutId = this.activeWorkoutId === workoutId ? null : workoutId;
  }

  isCollapsed(workoutId: number): boolean {
    return this.activeWorkoutId === workoutId;
  }
}