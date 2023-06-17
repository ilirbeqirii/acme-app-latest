import { CommonModule } from '@angular/common';
import { Component, OnInit, Signal, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import * as UserActions from '../state/user.actions';
import { usersFeature } from '../state/user.reducer';

@Component({
  selector: 'pm-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  pageTitle = 'Log In';
  authService = inject(AuthService);
  router = inject(Router);
  store = inject(Store);

  maskUserName: Signal<boolean> = this.store.selectSignal(usersFeature.selectMaskUserName);

  constructor() {}

  ngOnInit(): void {}

  cancel(): void {
    this.router.navigate(['welcome']);
  }

  checkChanged(): void {
    this.store.dispatch(UserActions.maskUserName());
  }

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password);

      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl());
      } else {
        this.router.navigate(['/products']);
      }
    }
  }
}
