import { Injectable } from '@angular/core';
import { ApiHandlerService } from './api-handler.service';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';  // <-- Add this import
import { Workout } from './models/workout.model';
import { UserStateService } from './user-state.service';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor(
    private apiHandlerService: ApiHandlerService,
    private userStateService: UserStateService
  ) { }

  fetchWorkouts(): Observable<Workout[]> {
    return from(this.apiHandlerService.get('workouts')) // Convert Promise to Observable
      .pipe(
        map((data: any) => data.map((workoutData: any) => 
          new Workout(workoutData.id, workoutData.name, workoutData.exercises)
        ))
      );
  }

  getWorkout(id: number): Observable<Workout> {
    return from(this.apiHandlerService.get(`workouts/${id}`))
      .pipe(
        map((workoutData: any) => new Workout(workoutData.id, workoutData.name, workoutData.exercises))
    );
  }

  completeWorkout(workout: Workout, duration : number): void {
    const token = this.userStateService.getLoginToken() ?? '';

    this.apiHandlerService.post('workouts/' + workout.id + '/complete', { duration }, {token});
  }
}
