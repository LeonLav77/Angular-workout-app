import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserStateService } from '../user-state.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(
    protected router: Router,
    private UserStateService: UserStateService
  ) {}

  ngOnInit(): void {
    // Subscribe to the login status observable
    this.UserStateService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });

    // Subscribe to the admin status observable
    this.UserStateService.isAdmin$.subscribe(status => {
      this.isAdmin = status;
    });
  }

  routeToHomepage() {
    this.router.navigate(['/']);
  }

  logout() {
    this.UserStateService.logout();  // Log out and update status
    this.router.navigate(['/login']);
  }

  routeToCompletedWorkouts() {
    this.router.navigate(['/completed-workouts']);
  }

  routeToLogin() {
    this.router.navigate(['/login']);
  }

  routeToRegister() {
    this.router.navigate(['/register']);
  }

  routeToExercises() {
    this.router.navigate(['/exercises']);
  }
}
