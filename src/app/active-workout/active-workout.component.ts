import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Exercise } from '../models/exercise.model';
import { Workout } from '../models/workout.model';
import { WorkoutService } from '../workout.service';

@Component({
  selector: 'app-active-workout',
  templateUrl: './active-workout.component.html',
  styleUrls: ['./active-workout.component.css'],
})
export class ActiveWorkoutComponent implements OnInit, OnDestroy {
  workout: Workout = new Workout(0, '');
  activeWorkoutIndex: number = 0;
  isResting: boolean = false;
  restTime: number = 60;
  countdown: number = this.restTime;

  workoutStarted: boolean = false;
  globalTimer: number = 0;
  globalTimerInterval: any;

  constructor(
    private route: ActivatedRoute,
    private workoutService: WorkoutService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchWorkout(id);
  }

  ngOnDestroy() {
    this.stopGlobalTimer();
  }

  fetchWorkout(id: number) {
    this.workoutService.getWorkout(id).subscribe((workout: Workout) => {
      this.workout = workout;
      console.log(this.workout);
    });
  }

  startWorkout() {
    this.workoutStarted = true;
    this.startGlobalTimer();
  }

  completeWorkout() {
    if (this.workout && this.activeWorkoutIndex < this.workout.exercises.length - 1) {
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
