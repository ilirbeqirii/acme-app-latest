import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { Product } from '../product';
import { ProductPageActions } from './actions/product-page.actions';
import { ProductApiActions } from './actions/product-api.actions';

export interface ProductState {
  showProductCode: boolean;
  currentProductId: number | null;
  products: Product[];
  error: string;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: [],
  error: '',
};

// #1. using createReducer Fn
export const productsReducer = createReducer(
  initialState,
  on(ProductPageActions.toggleProductCode, (state): ProductState => {
    return {
      ...state,
      showProductCode: !state.showProductCode,
    };
  }),
  on(ProductPageActions.setCurrentProduct, (state, action) => {
    return {
      ...state,
      currentProductId: action.currentProductId,
    };
  }),
  on(ProductPageActions.cleanCurrentProduct, (state) => {
    return {
      ...state,
      currentProductId: null,
    };
  }),
  on(ProductPageActions.initializeCurrentProduct, (state) => {
    return {
      ...state,
      currentProductId: 0,
    };
  }),
  // * product load
  on(ProductApiActions.loadProductsSuccessful, (state, action) => {
    return {
      ...state,
      products: action.products,
      error: '',
    };
  }),

  on(ProductApiActions.loadProductsFailure, (state, action) => {
    return {
      ...state,
      products: [],
      error: action.error,
    };
  }),
  // * product update
  on(ProductApiActions.updateProductSuccessful, (state, action) => {
    const updatedProducts = state.products.map((product: Product) =>
      product.id === action.product.id ? action.product : product
    );

    return {
      ...state,
      products: updatedProducts,
      error: '',
      currentProductId: action.product.id,
    };
  }),

  on(ProductApiActions.updateProductFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  // * product add
  on(ProductApiActions.addProductSuccessful, (state, action) => {
    const allProducts = [...state.products, action.product];

    return {
      ...state,
      products: allProducts,
      error: '',
      currentProductId: action.product.id,
    };
  }),

  on(ProductApiActions.addProductFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  // * delete product
  on(ProductApiActions.deleteProductSuccessful, (state, action) => {
    const products = state.products.filter(
      (product) => product.id !== action.productId
    );

    return {
      ...state,
      products,
      error: '',
      currentProductId: null,
    };
  }),

  on(ProductApiActions.deleteProductFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  })
);

// #2. using createFeature Fn
export const productsFeature = createFeature({
  name: 'products',
  reducer: productsReducer,
  extraSelectors: ({ selectProductsState, selectCurrentProductId }) => ({
    selectCurrentProduct: createSelector(
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
    ),
  }),
});

// a default set of selectors are generated based on the state properties:
// productsFeature.selectProductsState;
// productsFeature.selectCurrentProductId;
// productsFeature.selectError;
// productsFeature.selectProducts;
// productsFeature.selectShowProductCode;
// productsFeature.selectCurrentProduct;