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

  constructor(
    protected router: Router,
    private UserStateService: UserStateService
  ) {}

  ngOnInit(): void {
    // Subscribe to the login status observable
    this.UserStateService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  routeToHomepage() {
    this.router.navigate(['/']);
  }

  logout() {
    this.UserStateService.logout();  // Log out and update status
    this.router.navigate(['/login']);
  }
}
