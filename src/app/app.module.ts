import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HomepageComponent } from './homepage/homepage.component';
import { WorkoutListItemComponent } from './workout-list-item/workout-list-item.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WorkoutComponent } from './workout/workout.component';
import { ActiveWorkoutComponent } from './active-workout/active-workout.component';
import { SortByOrderPipe } from './sort-by-order.pipe';
import { CompletedWorkoutComponent } from './completed-workout/completed-workout.component';
import { CompletedWorkoutListItemComponent } from './completed-workout-list-item/completed-workout-list-item.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { WorkoutDetailsComponent } from './workout-details/workout-details.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomepageComponent,
    WorkoutListItemComponent,
    NavbarComponent,
    WorkoutComponent,
    ActiveWorkoutComponent,
    SortByOrderPipe,
    CompletedWorkoutComponent,
    CompletedWorkoutListItemComponent,
    ExerciseComponent,
    WorkoutDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    DragDropModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
