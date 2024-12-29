import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(
    private authService : AuthService,
    private router: Router
  ) { }

  name: string = '';
  email: string = '';
  password: string = '';

  onSubmit() {
    const user = this.authService.register(this.name, this.email, this.password);
  
    user.then((data) => {
      this.router.navigate(['/home']);
    }).catch((error) => {
      console.error(error);
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
