import { Component, OnInit } from '@angular/core';
import { Workout } from '../models/workout.model';
import { WorkoutService } from '../workout.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Exercise } from '../models/exercise.model';
import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'app-workout-details',
  templateUrl: './workout-details.component.html',
  styleUrl: './workout-details.component.css'
})
export class WorkoutDetailsComponent implements OnInit {
  workout: Workout = new Workout(0, '');
  availableExercises: Exercise[] = []; 
  selectedExercises: Exercise[] = []; 
  
  constructor(
    private workoutService: WorkoutService,
    private route: ActivatedRoute,
    private router: Router,
    private exerciseService: ExerciseService
  ) {}

  ngOnInit(): void {
    const workoutId = this.route.snapshot.paramMap.get('id');
    if (workoutId) {
      this.fetchWorkoutDetails(+workoutId);
    } else {
      this.workout = new Workout(0, '', '', '', []);
    }
    this.loadAvailableExercises();
  }

  fetchWorkoutDetails(id: number): void {
    this.workoutService.getWorkout(id).subscribe(
      (workout: Workout) => {
        this.workout = workout;
        this.selectedExercises = Array.isArray(workout.exercises) ? workout.exercises : [];
      },
      (error: any) => {
        console.error('Error fetching workout details', error);
      }
    );
  }

  loadAvailableExercises(): void {
    this.exerciseService.fetchExercises().subscribe(
      (exercises: Exercise[]) => {
        if (this.workout) {
          this.availableExercises = exercises;
        }
      },
      (error: any) => {
        console.error('Error loading available exercises', error);
      }
    );
  }

  drop(event: CdkDragDrop<Exercise[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      const exercise = event.item.data;
      if (event.container.id === 'selected') {
        this.selectedExercises.push(exercise as Exercise);
      }

      if (event.container.id === 'available') {
        const index = this.selectedExercises.indexOf(exercise as Exercise);
        if (index > -1) {
          this.selectedExercises.splice(index, 1);
        }
      }
    }
  }

  submitWorkout(): void {
    if (this.workout) {
      this.saveWorkout();
    }
  }

  saveWorkout(): void {
    this.workoutService.updateWorkout(this.workout).subscribe(
      (updatedWorkout: Workout) => {
  
        this.workoutService.removeAllExercisesFromWorkout(this.workout.id).subscribe(
          () => {
  
            this.selectedExercises.forEach((exercise: Exercise, index: number) => {
              const reps = exercise.reps || 10;
              const order = index + 1;
  
              this.workoutService.addExerciseToWorkout(this.workout.id, exercise.id, reps, order).subscribe(
                () => {
                  console.log('Exercise added to workout');
                },
                (error: any) => {
                  console.error('Error adding exercise to workout', error);
                }
              );
            });
  
            this.router.navigate(['/workouts']);
          },
          (error: any) => {
            console.error('Error removing exercises from workout', error);
          }
        );
      },
      (error: any) => {
        console.error('Error saving workout', error);
      }
    );
  }

  cancel(): void {
    this.router.navigate(['/workouts']);
  }
}