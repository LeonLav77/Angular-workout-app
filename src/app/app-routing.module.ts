import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ActiveWorkoutComponent } from './active-workout/active-workout.component';
import { AuthGuard } from './auth.guard';
import { CompletedWorkoutComponent } from './completed-workout/completed-workout.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { WorkoutComponent } from './workout/workout.component';
import { WorkoutDetailsComponent } from './workout-details/workout-details.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomepageComponent, canActivate: [AuthGuard] }, 
  { path: 'completed-workouts', component: CompletedWorkoutComponent, canActivate: [AuthGuard] }, 
  { path: 'active-workout/:id', component: ActiveWorkoutComponent, canActivate: [AuthGuard] }, 
  { path: 'exercises', component: ExerciseComponent, canActivate: [AuthGuard] }, 
  { path: 'workouts', component: WorkoutComponent, canActivate: [AuthGuard] }, 
  { path: 'workout-details/:id', component: WorkoutDetailsComponent, canActivate: [AuthGuard] }, 
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
