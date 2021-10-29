/* step 1 * create a reducer */
import { createAction, createReducer, on } from '@ngrx/store';

export const productReducer = createReducer(
  { showProductCode: true },
  on(
    // we dispatch line 9 to product-list.component.ts
    // inside of the function checkChanged()
    createAction('[Produce] Toggle Product'),
    state => {
      console.log('original state: ' + JSON.stringify(state));
      return {
        ...state,
        showProductCode: !state.showProductCode
      };
    }
  )

);
