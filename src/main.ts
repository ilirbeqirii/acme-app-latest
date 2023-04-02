import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppComponent } from './app/app.component';
import { PageNotFoundComponent } from './app/home/page-not-found/page-not-found.component';
import { ShellComponent } from './app/home/shell/shell.component';
import { WelcomeComponent } from './app/home/welcome/welcome.component';
import { ProductData } from './app/products/product-data';
import { authGuard } from './app/user/auth/auth.guard';
import { LoginComponent } from './app/user/login/login.component';

const appRoutes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: 'welcome', component: WelcomeComponent },
      {
        path: 'products',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./app/products').then((m) => m.productRoutes),
      },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(),
    importProvidersFrom(HttpClientInMemoryWebApiModule.forRoot(ProductData))
  ],
}).catch((err) => console.error(err));
