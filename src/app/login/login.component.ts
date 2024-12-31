import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { AuthService } from '../auth.service';
import { UserStateService } from '../user-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  invalidLogin: boolean = false;

  constructor(
    private authService : AuthService,
    private router: Router,
    private UserStateService: UserStateService,

  ) {} 

  onSubmit() {
    this.authService.login(this.email, this.password).then((data) => {
      this.UserStateService.login(data.token);
  
      this.UserStateService.isAdmin$.subscribe((isAdmin) => {
        if (isAdmin) {
          this.router.navigate(['/exercises']);
        } else {
          this.router.navigate(['/home']);
        }
      });
    }).catch((error) => {
      this.invalidLogin = true;
    });
  }

  goToRegister() {
    this.router.navigate(['/register']); 
  }
}
