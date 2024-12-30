import { Exercise } from "./exercise.model";

export class Workout {
    constructor(
      public id: number,
      public name: string,
      public duration: number,
      public difficulty: string,
      public exercises: Exercise[] = [],
    ) {
    }
  }
  