import { Exercise } from "./exercise.model";

export class Workout {
    constructor(
      public id: number,
      public name: string,
      public exercises: Exercise[] = [],
      public duration: number = 0,
      public completedAt: Date = new Date(),
    ) {
    }
  }
  