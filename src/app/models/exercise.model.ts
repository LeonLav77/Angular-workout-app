export class Exercise {
    constructor(
      public id: number,
      public name: string,
      public description: string | null,
      public image: string | null,
      public reps: number = 10,
      public order: number = 0,
    ) {}
  }
  