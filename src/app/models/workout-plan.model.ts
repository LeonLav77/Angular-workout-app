import { Workout } from './workout.model';

export class WorkoutPlan {
    constructor(
      public id: number,
      public name: string,
      public duration: number,
      public difficulty: string,
      public workouts: Workout[] = [],
    ) {
    }
  }
  