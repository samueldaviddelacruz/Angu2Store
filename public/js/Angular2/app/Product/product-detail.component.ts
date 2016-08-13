/**
 * Created by samuel on 8/13/16.
 */
import {Component, Input, Output, EventEmitter} from "@angular/core";
import {IProduct} from "./Product";
import {ProductService} from "./product.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";


@Component({
    templateUrl: './js/Angular2/app/Product/product-detail.component.html'
})
export class ProductDetailComponent {

    product: IProduct;

    private sub: any;

    constructor(private _productService: ProductService, private route: ActivatedRoute) {

    }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getProduct(id);
            });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getProduct(id: number) {
        this._productService.getSingleProduct(id).subscribe(
            product => this.product = product,
            error => console.log(error));
    }


}
