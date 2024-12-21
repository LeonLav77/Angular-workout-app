import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Workout } from '../models/workout.model';
import { WorkoutPlan } from '../models/workout-plan.model';

@Component({
  selector: 'app-active-workout',
  templateUrl: './active-workout.component.html',
  styleUrls: ['./active-workout.component.css'],
})
export class ActiveWorkoutComponent implements OnInit, OnDestroy {
  workoutPlan: WorkoutPlan | null = null; // The fetched workout plan
  activeWorkoutIndex: number = 0; // Tracks the current workout
  isResting: boolean = false; // Indicates if the user is in the rest phase
  restTime: number = 60; // Rest time in seconds
  countdown: number = this.restTime;

  workoutStarted: boolean = false; // Tracks if the workout has started
  globalTimer: number = 0; // Global timer in seconds
  globalTimerInterval: any; // Interval reference for global timer

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Get the workout plan ID from the route
    this.fetchWorkoutPlan(id);
  }

  ngOnDestroy() {
    this.stopGlobalTimer();
  }

  fetchWorkoutPlan(id: number) {
    this.workoutPlan = new WorkoutPlan(1, 'Beginner Plan', 30, 'Easy', [
      new Workout(1, 'Push-ups', 5, 'Easy', 10),
      new Workout(2, 'Sit-ups', 5, 'Easy', 10),
      new Workout(3, 'Jumping Jacks', 5, 'Easy', 15),
    ]);
  }

  startWorkout() {
    this.workoutStarted = true;
    this.startGlobalTimer();
  }

  completeWorkout() {
    if (this.workoutPlan && this.activeWorkoutIndex < this.workoutPlan.workouts.length - 1) {
      this.isResting = true;
      this.startRestCountdown(() => {
        this.isResting = false;
        this.activeWorkoutIndex++;
      });
    } else {
      this.workoutComplete();
    }
  }

  startRestCountdown(onComplete: () => void) {
    this.countdown = this.restTime;
    const interval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        clearInterval(interval);
        onComplete();
      }
    }, 1000);
  }

  skipRest() {
    this.isResting = false;
    this.activeWorkoutIndex++;
  }

  workoutComplete() {
    this.stopGlobalTimer();
    alert(`Workout Complete! Great Job! Total Time: ${this.globalTimerMinutes}:${this.globalTimerSeconds}`);
  }

  // Global Timer Logic
  startGlobalTimer() {
    this.globalTimer = 0;
    this.globalTimerInterval = setInterval(() => {
      this.globalTimer++;
    }, 1000);
  }

  stopGlobalTimer() {
    if (this.globalTimerInterval) {
      clearInterval(this.globalTimerInterval);
    }
  }

  get globalTimerMinutes(): number {
    return Math.floor(this.globalTimer / 60);
  }

  get globalTimerSeconds(): number {
    return this.globalTimer % 60;
  }
}
