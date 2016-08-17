// import { provideRouter, RouterConfig } from '@angular/router';

import {Routes, RouterModule} from '@angular/router';
import {ProductListComponent} from "./Product/product-list.component";
import {ProductDetailComponent} from "./Product/product-detail.component";
import {CartComponent} from "./Product/Cart.component";
import {CheckoutComponent} from "./Product/Checkout.component";


export const routes: Routes = [
    {path: '', redirectTo: '/products', pathMatch: 'full'},
    {path: 'products', component: ProductListComponent},
    {path: 'productDetail/:id', component: ProductDetailComponent},
    {path: 'cart', component: CartComponent},
    {path: 'checkout', component: CheckoutComponent}

];

export const APP_ROUTER_PROVIDERS = RouterModule.forRoot(routes)
