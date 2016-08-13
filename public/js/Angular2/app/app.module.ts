/**
 * Created by samuel on 8/10/16.
 */
import {NgModule}       from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent}   from './app.component';
import {ProductService} from "./Product/product.service";
import {HTTP_PROVIDERS} from '@angular/http';
import {NavBarComponent} from "./shared/ss-nav-bar.component";
import {APP_ROUTER_PROVIDERS} from "./app.routes";
import {ProductListComponent} from "./Product/product-list.component";
import {ProductDetailComponent} from "./Product/product-detail.component";

@NgModule({
    declarations: [AppComponent, NavBarComponent, ProductListComponent, ProductDetailComponent],

    imports: [BrowserModule, APP_ROUTER_PROVIDERS],
    bootstrap: [AppComponent],
    providers: [HTTP_PROVIDERS, ProductService]
})
export class AppModule {
}

