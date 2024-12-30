import { Pipe, PipeTransform } from '@angular/core';
import { Exercise } from './models/exercise.model';

@Pipe({
  name: 'sortByOrder'
})
export class SortByOrderPipe implements PipeTransform {

  transform(exercises: Exercise[]): Exercise[] {
    if (!exercises) return [];
    return exercises.sort((a, b) => a.order - b.order); // Sort by 'order'
  }
}
