import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../product';
import { ProductEditComponent } from '../product-edit/product-edit.component';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'pm-product-shell',
  standalone: true,
  imports: [CommonModule, ProductListComponent, ProductEditComponent],
  templateUrl: './product-shell.component.html',
  styleUrls: ['./product-shell.component.css'],
})
export class ProductShellComponent {
  products$!: Observable<Product[]>;
  selectedProduct$!: Observable<Product>;
  displayCode$!: Observable<boolean>;
  errorMessage$!: Observable<string>;

  // store = inject(Store<State>);

  ngOnInit(): void {
    // this.store.dispatch(ProductPageAction.loadProducts());
    // this.products$ = this.store.select(getProducts);
    // this.selectedProduct$ = this.store.select(getCurrentProduct);
    // this.displayCode$ = this.store.select(getShowProductCode);
    // this.errorMessage$ = this.store.select(getError);
    // this.store.select(getShowProductCode)
    //   .subscribe((showProductCode: boolean) => this.displayCode = showProductCode);
    // this.store.select(getCurrentProduct).subscribe(
    //   currentProduct => this.selectedProduct = currentProduct
    // );
  }

  checkChanged(): void {
    // this.store.dispatch(ProductPageAction.toggleProductCode());
  }

  newProduct(): void {
    // this.store.dispatch(ProductPageAction.initializeCurrentProduct());
  }

  productSelected(product: Product): void {
    // this.store.dispatch(ProductPageAction.setCurrentProduct({ currentProductId: product.id }));
  }

  deleteProduct(product: Product): void {
    // this.store.dispatch(ProductPageAction.deleteProduct({ productId: product.id }));
  }

  clearProduct(): void {
    // this.store.dispatch(ProductPageAction.cleanCurrentProdut());
  }

  createProduct(product: Product): void {
    // this.store.dispatch(ProductPageAction.addProduct({ product }));
  }

  updateProduct(product: Product): void {
    // this.store.dispatch(ProductPageAction.updateProduct({ product }));
  }
}
