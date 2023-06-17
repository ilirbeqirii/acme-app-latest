import { CommonModule } from '@angular/common';
import { Component, Signal, WritableSignal, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../product';
import { ProductEditComponent } from '../product-edit/product-edit.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { Store } from '@ngrx/store';
import { ProductPageActions } from '../state/actions/product-page.actions';
import { productsFeature } from '../state/product.reducer';

@Component({
  selector: 'pm-product-shell',
  standalone: true,
  imports: [CommonModule, ProductListComponent, ProductEditComponent],
  templateUrl: './product-shell.component.html',
  styleUrls: ['./product-shell.component.css'],
})
export class ProductShellComponent {

  store = inject(Store);

  products: Signal<Product[]> = this.store.selectSignal(productsFeature.selectProducts);
  selectedProduct: Signal<Product> = this.store.selectSignal(
    productsFeature.selectCurrentProduct
  ) as Signal<Product>;
  displayCode: Signal<boolean> = this.store.selectSignal(
    productsFeature.selectShowProductCode
  );
  errorMessage: Signal<string> = this.store.selectSignal(productsFeature.selectError);


  ngOnInit(): void {
    this.store.dispatch(ProductPageActions.loadProducts());

    // this.store.select(getShowProductCode)
    //   .subscribe((showProductCode: boolean) => this.displayCode = showProductCode);

    // this.store.select(getCurrentProduct).subscribe(
    //   currentProduct => this.selectedProduct = currentProduct
    // );
  }

  checkChanged(): void {
    this.store.dispatch(ProductPageActions.toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch(ProductPageActions.initializeCurrentProduct());
  }

  productSelected(product: Product): void {
    if (product.id) {
      this.store.dispatch(
        ProductPageActions.setCurrentProduct({
          currentProductId: product.id,
        })
      );
    }
  }

  deleteProduct(product: Product): void {
    if (product.id) {
      this.store.dispatch(
        ProductPageActions.deleteProduct({ productId: product.id })
      );
    }
  }

  clearProduct(): void {
    this.store.dispatch(ProductPageActions.cleanCurrentProduct());
  }

  createProduct(product: Product): void {
    this.store.dispatch(ProductPageActions.createProduct({ product }));
  }

  updateProduct(product: Product): void {
    this.store.dispatch(ProductPageActions.updateProduct({ product }));
  }
}
