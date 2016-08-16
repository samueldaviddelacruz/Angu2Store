import {Component} from '@angular/core';
// import { HTTP_PROVIDERS } from '@angular/http';
// import { ROUTER_DIRECTIVES } from '@angular/router';
// import {NavBarComponent} from "./shared/ss-nav-bar.component";
// import {ProductService} from "./Product/product.service";


//import { ProductService } from './products/product.service';

@Component({
    selector: 'm-app',
    template: `
    <div>
        <!--<ss-nav-bar></ss-nav-bar>-->
        <div class='container'>
            <router-outlet></router-outlet>
        </div>
     </div>
     `,
    //directives: [ROUTER_DIRECTIVES],
    // directives: [ROUTER_DIRECTIVES,NavBarComponent],
    //  providers: [HTTP_PROVIDERS,ProductService]
})

export class AppComponent {
    pageTitle: string = 'Acme Product Management';
}
