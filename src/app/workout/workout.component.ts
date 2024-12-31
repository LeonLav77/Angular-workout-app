import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../workout.service';
import { Workout } from '../models/workout.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {
  workouts: Workout[] = [];
  selectedWorkout: Workout = new Workout(0, '', '', '');

  constructor(
    private workoutService: WorkoutService,
    private router: Router) {}

  ngOnInit(): void {
    this.fetchWorkouts();
  }

  fetchWorkouts(): void {
    this.workoutService.fetchWorkouts().subscribe(
      (data: Workout[]) => {
        this.workouts = data;
      },
      (error: any) => {
        console.error('Error fetching workouts', error);
      }
    );
  }

  setSelectedWorkout(workout: Workout): void {
    this.selectedWorkout = { ...workout }; 
  }

  createNewWorkout(): void {
    this.selectedWorkout = new Workout(0, '', '', '');
  }

  openWorkoutDetails(workoutId: number): void {
    this.router.navigate(['/workout-details', workoutId]);
  }

  saveWorkout(): void {
    if (this.selectedWorkout.id === 0) {
      this.workoutService.createWorkout(this.selectedWorkout).subscribe(
        (newWorkout: Workout) => {
          this.workouts.push(newWorkout);
        },
        (error: any) => {
          console.error('Error creating workout', error);
        }
      );
    } else {
      this.workoutService.updateWorkout(this.selectedWorkout).subscribe(
        (updatedWorkout: Workout) => {
          const index = this.workouts.findIndex(workout => workout.id === updatedWorkout.id);
          if (index !== -1) {
            this.workouts[index] = updatedWorkout;
          }
        },
        (error: any) => {
          console.error('Error updating workout', error);
        }
      );
    }
  }
}