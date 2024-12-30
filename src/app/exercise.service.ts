import { Injectable } from '@angular/core';
import { ApiHandlerService } from './api-handler.service';
import { Observable, from } from 'rxjs';
import { Exercise } from './models/exercise.model';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(
    private apiHandlerService: ApiHandlerService,
  ) { }

  fetchExercises(): Observable<Exercise[]> {
    return from(this.apiHandlerService.get('exercises'))
      .pipe(
        map((data: any) => data.map((workoutData: any) => 
          new Exercise(workoutData.id, workoutData.name, workoutData.description, workoutData.image)
        ))
      );
  }

   getWorkout(id: number): Observable<Exercise> {
      return from(this.apiHandlerService.get(`exercises/${id}`))
        .pipe(
          map((workoutData: any) => new Exercise(workoutData.id, workoutData.name, workoutData.description, workoutData.image))
      );
    }

    updateExercise(exercise: Exercise): Observable<Exercise> {
      return from(this.apiHandlerService.put(`exercises/${exercise.id}`, exercise))
        .pipe(
          map((workoutData: any) => new Exercise(workoutData.id, workoutData.name, workoutData.description, workoutData.image))
      );
    }

    deleteExercise(id: number): Observable<void> {
      return from(this.apiHandlerService.delete(`exercises/${id}`))
        .pipe(
          map(() => {})
      );
    }

    createExercise(exercise: Exercise): Observable<Exercise> {
      return from(this.apiHandlerService.post('exercises', exercise))
        .pipe(
          map((workoutData: any) => new Exercise(workoutData.id, workoutData.name, workoutData.description, workoutData.image))
      );
    }
}
