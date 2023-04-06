import { Routes } from '@angular/router';
import { ProductShellComponent } from './product-shell/product-shell.component';
import { StoreModule, provideState } from '@ngrx/store';
import { productsFeature, productsReducer } from './state/product.reducer';
import { importProvidersFrom } from '@angular/core';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { ProductEffects } from './state/product.effetcs';

export const productRoutes: Routes = [
  {
    path: '',
    component: ProductShellComponent,
    providers: [
      provideState(productsFeature), // NgRx v15: register the feature, this uses the feature name defined in createFeature
      // importProvidersFrom(StoreModule.forFeature('products', productsReducer)), // NgRx pre-v15: register the reducer
      provideEffects(ProductEffects), // NgRx v15: provide feature (also used for root) effects
      // importProvidersFrom(EffectsModule.forFeature([ProductEffects])), // NgRx pre-v15: register feature effects
    ],
  },
];
