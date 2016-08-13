import {Component, OnInit} from "@angular/core";
import {ProductService} from "./product.service";
import {IProduct} from "./Product";

/**
 * Created by samuel on 8/9/16.
 */
@Component({
    //selector:'prod-list',
    templateUrl: './js/Angular2/app/Product/product-list.component.html'
})
export class ProductListComponent implements OnInit {
    products: IProduct[];

    constructor(private _productService: ProductService) {

    }

    ngOnInit(): void {
        this._productService.getProducts().subscribe((result) => this.products = result, error => console.log(error));

    }


}