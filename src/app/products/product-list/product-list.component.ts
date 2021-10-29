import { Component, OnInit, OnDestroy } from '@angular/core';
import {  Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';


@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;

  constructor(
    private store : Store <any>,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    // use variable to unsubscribe to the observable  this.sub
    // and use that variable in ngOnDestroy() method
    // this.sub.unsubscribe();
    this.sub = this.productService.selectedProductChanges$.subscribe(
      currentProduct => this.selectedProduct = currentProduct
    );

    this.productService.getProducts().subscribe({
      next: (products: Product[]) => this.products = products,
      error: err => this.errorMessage = err
    });

  /*
    lecture notes from section 4 - video 10
    to access a vlue in the store, we selecte an appropirate slice of state
    this.store.select('products');
    we select from the store using the store's select method,
    check the name of the desire state slice products : {} in the json object

    if the store is an observable we can use its piple method
    and ngrx select operator
    this.store.pipe (select('products'))


    ng select method and select operator both return
    a slice of state as an observable

    if we want to notify of the changes on the state we need ot use .subscribe() method
    we are subscrbing to an entire slice of the state

    the first argument to the subscribe method is a next function
    that function is executed each time it receives the next change notiricaiton
    from the store
  */

    this.store.select('products').subscribe(
      products => {
        if (products) {
          this.displayCode = products.showProductCode;
        }
      }
    )

    // this.displayCode = products.showProduceCode;
    // our template binding [checked]="displayCode"
    // binds to the local property and uses it in an ngIf statement

    // display on and off is based on state change
    // <ng-container *ngIf = "displayCode"></ng-container>

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  // Step 5 - replacing this block of code to dispatch an action
  // checkChanged(): void {
  //   this.displayCode = !this.displayCode;
  // }

  checkChanged(): void {
    this.store.dispatch(
      { type: '[Produce] Toggle Product' }
    )
  }

  newProduct(): void {
    this.productService.changeSelectedProduct(this.productService.newProduct());
  }

  productSelected(product: Product): void {
    this.productService.changeSelectedProduct(product);
  }

}
