import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../service/product.service';
import { ProductPageActions } from './actions/product-page.actions';
import { catchError, concatMap, map, mergeMap, of } from 'rxjs';
import { Product } from '../product';
import { ProductApiActions } from './actions/product-api.actions';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductPageActions.loadProducts),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          map((products: Product[]) =>
            ProductApiActions.loadProductsSuccessful({ products })
          ),
          catchError((err) =>
            of(ProductApiActions.loadProductsFailure({ error: err }))
          )
        )
      )
    );
  });

  updateProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductPageActions.updateProduct),
      concatMap((action) =>
        this.productService.updateProduct(action.product).pipe(
          map((updatedProduct: Product) =>
            ProductApiActions.updateProductSuccessful({
              product: updatedProduct,
            })
          ),
          catchError((err) =>
            of(ProductApiActions.updateProductFailure({ error: err }))
          )
        )
      )
    );
  });

  addProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductPageActions.createProduct),
      concatMap((action) =>
        this.productService.createProduct(action.product).pipe(
          map((addedProduct) =>
            ProductApiActions.addProductSuccessful({ product: addedProduct })
          ),
          catchError((err) =>
            of(ProductApiActions.addProductFailure({ error: err }))
          )
        )
      )
    );
  });

  deleteProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductPageActions.deleteProduct),
      concatMap((action) =>
        this.productService.deleteProduct(action.productId).pipe(
          map(() =>
            ProductApiActions.deleteProductSuccessful({
              productId: action.productId,
            })
          ),
          catchError((err) =>
            of(ProductApiActions.deleteProductFailure({ error: err }))
          )
        )
      )
    );
  });
}
