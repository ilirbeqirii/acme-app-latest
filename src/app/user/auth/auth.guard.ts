import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  return checkLoggedIn(state.url);
};

function checkLoggedIn(url: string): boolean {
  let authService = inject(AuthService);
  let router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  // Retain the attempted URL for redirection
  authService.redirectUrl.set(url);
  router.navigate(['/login']);
  return false;
}
