// import { provideRouter, RouterConfig } from '@angular/router';

import {Routes, RouterModule} from '@angular/router';
import {ProductListComponent} from "./Product/product-list.component";
import {ProductDetailComponent} from "./Product/product-detail.component";


export const routes: Routes = [
    {path: '', redirectTo: '/products', pathMatch: 'full'},
    {path: 'products', component: ProductListComponent},
    {path: 'productDetail/:id', component: ProductDetailComponent},
];

export const APP_ROUTER_PROVIDERS = RouterModule.forRoot(routes)
