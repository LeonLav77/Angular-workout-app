import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiHandlerService } from './api-handler.service';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkLoginStatus());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(
    private apiHandlerService: ApiHandlerService
  ) {}

  private checkLoginStatus(): boolean {
    return !!localStorage.getItem('token');
  }

  login(token: string): void {
    localStorage.setItem('token', token);
    this.isLoggedInSubject.next(true);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
  }

  public getLoginToken(): string | null {
    return localStorage.getItem('token');
  }

  async getUser() {
    try {
      const token = localStorage.getItem('token');
      const userData = await this.apiHandlerService.get('users/token/' + token);
      console.log('User data:', userData);
      return {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        completedWorkouts: userData.completedWorkouts.map((workout: any) => ({
          id: workout.id,
          workoutId: workout.workoutId,
          duration: workout.duration,
          completedAt: new Date(workout.completedAt),
          workout_id: workout.workout.id,
          name: workout.workout.name,
          exercises: workout.workout.exercises.map((exercise: any) => ({
            id: exercise.exercise.id,
            name: exercise.exercise.name,
            reps: exercise.reps,
          }))
        }))
      };
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  }
}
