import { Component, OnInit } from '@angular/core';
import { Exercise } from '../models/exercise.model';
import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrl: './exercise.component.css'
})
export class ExerciseComponent implements OnInit {
  exercises: Exercise[] = [];
  selectedExercise: Exercise = new Exercise(0, '', '', '');
  newExercise: Exercise = new Exercise(0, '', '', ''); 

  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this.fetchExercises();
  }

  fetchExercises(): void {
    this.exerciseService.fetchExercises().subscribe(
      (data: Exercise[]) => {
        this.exercises = data;
      },
      (error: any) => {
        console.error('Error fetching exercises', error);
      }
    );
  }

  setSelectedExercise(exercise: Exercise): void {
    this.selectedExercise = { ...exercise }; 
  }

  saveExercise(): void {
    const index = this.exercises.findIndex(exercise => exercise.id === this.selectedExercise.id);
    
    if (index !== -1) {
      this.exerciseService.updateExercise(this.selectedExercise).subscribe(
        (updatedExercise: Exercise) => {
          this.exercises[index] = { ...updatedExercise };
        },
        (error: any) => {
          console.error('Error updating exercise', error);
        }
      );
    }
  }

  deleteExercise(id: number): void {
    this.exerciseService.deleteExercise(id).subscribe(() => {
      this.exercises = this.exercises.filter(exercise => exercise.id !== id);
    });
  }

  createExercise(): void {
    this.exerciseService.createExercise(this.newExercise).subscribe(
      (createdExercise: Exercise) => {
        this.exercises.push(createdExercise);
        this.newExercise = new Exercise(0, '', '', '');
      },
      (error: any) => {
        console.error('Error creating exercise', error);
      }
    );
  }
}