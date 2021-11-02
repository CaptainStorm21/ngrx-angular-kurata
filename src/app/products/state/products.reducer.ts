/* step 1 * create a reducer */
import { createAction, createReducer, on } from '@ngrx/store';
import { Product } from '../product';
import * as AppState from '../../state/app.state';
import { OnInit } from '@angular/core';


export interface State extends AppState.State {
  products: ProductState;
}

export interface ProductState{
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
}

const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: []
}

export const productReducer = createReducer < ProductState >(
  // { showProductCode: true } as ProductState,
 initialState,
  on(
    createAction('[Product] Toggle Product Code'),
    (state): ProductState => {
      // console.log('original state: ' + JSON.stringify(state));
      return {
        ...state,
        showProductCode: !state.showProductCode,
      };
    }
  )

);
