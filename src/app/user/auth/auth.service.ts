import { Injectable, signal } from '@angular/core';
import { User } from '../user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = signal<User | null>(null);
  redirectUrl = signal('');

  constructor() {}

  isLoggedIn(): boolean {
    return !!this.currentUser();
  }

  login(userName: string, password: string): void {
    // Code here would log into a back end service
    // and return user information
    // This is just hard-coded here.
    this.currentUser.set({
      id: 2,
      userName,
      isAdmin: false,
    });
  }

  logout(): void {
    this.currentUser.set(null);
  }
}
