import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../../product';

export const ProductPageActions = createActionGroup({
  source: 'Products Page',
  events: {
    'Toggle Product Code': emptyProps(),
    'Set Current Product': props<{ currentProductId: number }>(),
    'Clean Current Product': emptyProps(),
    'Initialize Current Product': emptyProps(),
    // load operation
    'Load Products': emptyProps(),
    // update operation
    'Update product': props<{ product: Product }>(),
    // add operation
    'Create Product': props<{ product: Product }>(),
    // delete operation
    'Delete Product': props<{ productId: number }>(),
  },
});
