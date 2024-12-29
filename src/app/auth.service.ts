import { Injectable } from '@angular/core';
import { ApiHandlerService } from './api-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private ApiHandlerService : ApiHandlerService) { }

  register(name: string, email: string, password: string) {
    const user = this.ApiHandlerService.post('users/register', {name, email, password});

    return user;
  }

  login(email: string, password: string) {
    const loginToken = this.ApiHandlerService.post('users/login', {email, password});

    return loginToken;
  }
}
