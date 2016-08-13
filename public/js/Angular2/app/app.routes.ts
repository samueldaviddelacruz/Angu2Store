// import { provideRouter, RouterConfig } from '@angular/router';

import {Routes, RouterModule} from '@angular/router';
import {ProductListComponent} from "./Product/product-list.component";


export const routes: Routes = [
    {path: '', redirectTo: '/products', pathMatch: 'full'},
    {path: 'products', component: ProductListComponent},
];

export const APP_ROUTER_PROVIDERS = RouterModule.forRoot(routes)
