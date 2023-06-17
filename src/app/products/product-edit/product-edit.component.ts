import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GenericValidator, NumberValidators } from 'src/app/shared';
import { Product } from '../product';

@Component({
  selector: 'pm-product-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductEditComponent implements OnInit, OnChanges {
  pageTitle = signal('Product Edit');
  fb = inject(FormBuilder);

  productForm: FormGroup = this.fb.group({
    productName: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ],
    ],
    productCode: ['', Validators.required],
    starRating: ['', NumberValidators.range(1, 5)],
    description: '',
  });

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages:
    | { [key: string]: { [key: string]: string } }
    | undefined;

  private genericValidator!: GenericValidator;

  @Input()
  errorMessage: string = '';

  @Input()
  selectedProduct: Product | undefined;

  @Output()
  create = new EventEmitter<Product>();

  @Output()
  update = new EventEmitter<Product>();

  @Output()
  delete = new EventEmitter<Product>();

  @Output()
  clearCurrent = new EventEmitter<void>();

  constructor() {
    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      productName: {
        required: 'Product name is required.',
        minlength: 'Product name must be at least three characters.',
        maxlength: 'Product name cannot exceed 50 characters.',
      },
      productCode: {
        required: 'Product code is required.',
      },
      starRating: {
        range: 'Rate the product between 1 (lowest) and 5 (highest).',
      },
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    // Define the form group

    // Watch for value changes for validation
    this.productForm.valueChanges.subscribe(
      () =>
        (this.displayMessage = this.genericValidator.processMessages(
          this.productForm
        ))
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    // patch form with value from the store
    if (changes['selectedProduct']) {
      const product = changes['selectedProduct'].currentValue as Product;
      this.displayProduct(product);
    }
  }

  // Also validate on blur
  // Helpful if the user tabs through required fields
  blur(): void {
    this.displayMessage = this.genericValidator.processMessages(
      this.productForm
    );
  }

  displayProduct(product: Product | null): void {
    if (product) {
      // Reset the form back to pristine
      this.productForm.reset();

      // Display the appropriate page title
      if (product.id === 0) {
        this.pageTitle.set('Add Product');
      } else {
        this.pageTitle.set('`Edit Product: ${product.productName}`');
      }

      // Update the data on the form
      this.productForm.patchValue({
        productName: product.productName,
        productCode: product.productCode,
        starRating: product.starRating,
        description: product.description,
      });
    }
  }

  cancelEdit(product: Product): void {
    // Redisplay the currently selected product
    // replacing any edits made
    this.displayProduct(product);
  }

  deleteProduct(product: Product): void {
    if (product && product.id) {
      if (confirm(`Really delete the product: ${product.productName}?`)) {
        this.delete.emit(product);
      }
    } else {
      // No need to delete, it was never saved
      this.clearCurrent.emit();
    }
  }

  saveProduct(originalProduct: Product): void {
    if (this.productForm.valid) {
      if (this.productForm.dirty) {
        // Copy over all of the original product properties
        // Then copy over the values from the form
        // This ensures values not on the form, such as the Id, are retained
        const product = { ...originalProduct, ...this.productForm.value };

        if (product.id === 0) {
          this.create.emit(product);
        } else {
          this.update.emit(product);
        }
      }
    }
  }
}
