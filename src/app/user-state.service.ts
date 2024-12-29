import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkLoginStatus());

  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() {}

  private checkLoginStatus(): boolean {
    return !!localStorage.getItem('token');
  }

  login(token: string): void {
    localStorage.setItem('token', token);
    this.isLoggedInSubject.next(true);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
  }
}
