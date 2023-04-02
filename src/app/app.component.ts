import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageNotFoundComponent } from './home/page-not-found/page-not-found.component';
import { ShellComponent } from './home/shell/shell.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { LoginComponent } from './user/login/login.component';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    PageNotFoundComponent,
    ShellComponent,
    WelcomeComponent,
    LoginComponent,
    RouterOutlet,
  ],
})
export class AppComponent {}
