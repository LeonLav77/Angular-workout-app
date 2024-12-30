import { Component } from '@angular/core';
import { Workout } from '../models/workout.model';
import { UserStateService } from '../user-state.service';

@Component({
  selector: 'app-completed-workout',
  templateUrl: './completed-workout.component.html',
  styleUrl: './completed-workout.component.css'
})
export class CompletedWorkoutComponent {
  workouts: Workout[] = [];

    constructor(
      private UserStateService: UserStateService
    ) {
      this.fetchUserCompletedWorkouts();
    }
  
    fetchUserCompletedWorkouts() {
      this.UserStateService.getUser().then((user) => {
        this.workouts = user.completedWorkouts;
        
        console.log('Completed workouts:', this.workouts);
      });
    }
}
