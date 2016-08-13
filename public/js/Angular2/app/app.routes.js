// import { provideRouter, RouterConfig } from '@angular/router';
System.register(['@angular/router', "./Product/product-list.component", "./Product/product-detail.component"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, product_list_component_1, product_detail_component_1;
    var routes, APP_ROUTER_PROVIDERS;
    return {
        setters: [
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (product_list_component_1_1) {
                product_list_component_1 = product_list_component_1_1;
            },
            function (product_detail_component_1_1) {
                product_detail_component_1 = product_detail_component_1_1;
            }],
        execute: function () {
            exports_1("routes", routes = [
                {path: '', redirectTo: '/products', pathMatch: 'full'},
                {path: 'products', component: product_list_component_1.ProductListComponent},
                {path: 'productDetail/:id', component: product_detail_component_1.ProductDetailComponent},
            ]);
            exports_1("APP_ROUTER_PROVIDERS", APP_ROUTER_PROVIDERS = router_1.RouterModule.forRoot(routes));
        }
    }
});
//# sourceMappingURL=app.routes.js.map