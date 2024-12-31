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
          new Workout(workoutData.id, workoutData.name, workoutData.description, workoutData.image, workoutData.exercises)
        ))
      );
  }

  getWorkout(id: number): Observable<Workout> {
    return from(this.apiHandlerService.get(`workouts/${id}`))
      .pipe(
        map((workoutData: any) => new Workout(workoutData.id, workoutData.name, workoutData.description, workoutData.image, workoutData.exercises))
    );
  }

  completeWorkout(workout: Workout, duration: number): Promise<void> {
    const token = this.userStateService.getLoginToken() ?? '';
  
    return this.apiHandlerService.post(`workouts/${workout.id}/complete`, { duration }, { token });
  }

  createWorkout(workout: Workout): Observable<Workout> {
    return from(this.apiHandlerService.post('workouts', workout))
      .pipe(
        map((workoutData: any) => new Workout(workoutData.id, workoutData.name, workoutData.description, workoutData.image, workoutData.exercises))
      );
  }

  updateWorkout(workout: Workout): Observable<Workout> {
    return from(this.apiHandlerService.put(`workouts/${workout.id}`, workout))
      .pipe(
        map((workoutData: any) => new Workout(workoutData.id, workoutData.name, workoutData.description, workoutData.image, workoutData.exercises))
      );
  }

  addExerciseToWorkout(workoutId: number, exerciseId: number, reps: number, order: number): Observable<Workout> {
    return from(this.apiHandlerService.post(`workouts/${workoutId}/exercises`, { exerciseId, reps, order }))
      .pipe(
        map((workoutData: any) => new Workout(workoutData.id, workoutData.name, workoutData.description, workoutData.image, workoutData.exercises))
      );
  }

  removeAllExercisesFromWorkout(workoutId: number): Observable<Workout> {
    return from(this.apiHandlerService.delete(`workouts/${workoutId}/exercises`))
      .pipe(
        map((workoutData: any) => new Workout(workoutData.id, workoutData.name, workoutData.description, workoutData.image, workoutData.exercises))
      );
  }
}
