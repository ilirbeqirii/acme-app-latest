import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  booleanAttribute,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../product';

@Component({
  selector: 'pm-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  pageTitle = 'Products';

  @Input()
  errorMessage: string | undefined;

  @Input({ transform: booleanAttribute })
  displayCode: boolean = false;

  @Input()
  products: Product[] = [];

  @Input()
  selectedProduct: Product | undefined;

  @Output()
  displayCodeChanged: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  initializeNewProduct: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  productWasSelected: EventEmitter<Product> = new EventEmitter<Product>();

  checkChanged(): void {
    this.displayCodeChanged.emit();
  }

  newProduct(): void {
    this.initializeNewProduct.emit();
  }

  productSelected(product: Product): void {
    this.productWasSelected.emit(product);
  }
}
