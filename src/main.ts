import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom, isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { Routes, provideRouter } from '@angular/router';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppComponent } from './app/app.component';
import { PageNotFoundComponent } from './app/home/page-not-found/page-not-found.component';
import { ShellComponent } from './app/home/shell/shell.component';
import { WelcomeComponent } from './app/home/welcome/welcome.component';
import { ProductData } from './app/products/product-data';
import { authGuard } from './app/user/auth/auth.guard';
import { LoginComponent } from './app/user/login/login.component';
import { StoreModule, provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { usersFeature, usersReducer } from './app/user/state/user.reducer';

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
    importProvidersFrom(HttpClientInMemoryWebApiModule.forRoot(ProductData)),
    provideStore(), // in NgRx 15 it isn't required to provide a state object
    provideStoreDevtools({
      name: 'APM Demo App Devtools',
      maxAge: 25,
      logOnly: !isDevMode(),
      connectInZone: true,
    }),
    provideEffects(),
    provideState(usersFeature), // NgRx v15: register the feature, this uses the feature name defined in createFeature
    // importProvidersFrom(StoreModule.forFeature('products', usersReducer)), // NgRx pre-v15: register the reducer
  ],
}).catch((err) => console.error(err));
