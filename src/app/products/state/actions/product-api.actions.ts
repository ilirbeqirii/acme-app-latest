import { createActionGroup, props } from '@ngrx/store';
import { Product } from '../../product';

export const ProductApiActions = createActionGroup({
  source: 'Products Page',
  events: {
    'Load Products Successful': props<{ products: Product[] }>(),
    'Load Products Failure': props<{ error: string }>(),

    // update operation
    'Update Product Successful': props<{ product: Product }>(),
    'Update Product Failure': props<{ error: string }>(),

    // add operation
    'Add Product Successful': props<{ product: Product }>(),
    'Add Product Failure': props<{ error: string }>(),

    // delete operation
    'Delete Product Successful': props<{ productId: number }>(),
    'Delete Product Failure': props<{ error: string }>(),
  },
});
