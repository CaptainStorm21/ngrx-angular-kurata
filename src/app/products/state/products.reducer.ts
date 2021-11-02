/* step 1 * create a reducer */
import { createAction, createReducer, on } from '@ngrx/store';
import { Product } from '../product';
import * as AppState from '../../state/app.state';


export interface State extends AppState.State {
  product: ProductState;
}

export interface ProductState{
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
}

export const productReducer = createReducer(
  { showProductCode: true },
  on(
    // we dispatch line 9 to product-list.component.ts
    // inside of the function checkChanged()
    createAction('[Produce] Toggle Product'),
    state => {
      // console.log('original state: ' + JSON.stringify(state));
      return {
        ...state,
        showProductCode: !state.showProductCode
      };
    }
  )

);
