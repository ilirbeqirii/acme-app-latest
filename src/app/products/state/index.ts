import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState, productsFeature } from './product.reducer';

// #1. classic, pre-v15, and still existing way of creating selectors explicitly
const selectProductsState = createFeatureSelector<ProductState>('products');

export const selectShowProductCode = createSelector(
  selectProductsState,
  (state) => state.showProductCode
);

// * internal selector so we dont export
const selectCurrentProductId = createSelector(
  selectProductsState,
  (state) => state.currentProductId
);

// * composed selector
export const selectCurrentProduct = createSelector(
  selectProductsState,
  selectCurrentProductId,
  (state, currentProductId) => {
    if (currentProductId === 0) {
      return {
        id: 0,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0,
      };
    } else {
      return currentProductId
        ? state.products.find((product) => product.id === currentProductId)
        : null;
    }
  }
);

export const selectProducts = createSelector(
  selectProductsState,
  (state) => state.products
);

export const selectError = createSelector(
  selectProductsState,
  (state) => state.error
);

// #2. or we can use the already default provided selectors from createFeature Fn
// productsFeature.selectCurrentProductId;
// productsFeature.selectError;
// productsFeature.selectProducts;
// productsFeature.selectProductsState;
// productsFeature.selectShowProductCode;
