import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  error = "";

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    const { name, email, password } = this.registerForm.value;
    this.authService
      .register(name, email, password)
      .then((data) => {
        console.log(data);
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        if (error.status === 418) {
          this.error = "Email already exists";
        }
      });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}