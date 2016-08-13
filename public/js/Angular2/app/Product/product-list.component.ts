import {Component, OnInit} from "@angular/core";
import {ProductService} from "./product.service";
import {IProduct} from "./Product";
import {ProductCategoriesComponent} from "./product-categories.component";

/**
 * Created by samuel on 8/9/16.
 */
@Component({
    //selector:'prod-list',
    templateUrl: './js/Angular2/app/Product/product-list.component.html',
    directives: [ProductCategoriesComponent]

})
export class ProductListComponent implements OnInit {
    products: IProduct[];
    productsCache: IProduct[];

    constructor(private _productService: ProductService) {

    }

    ngOnInit(): void {
        this._productService.getProducts().subscribe((result) => {
            this.products = result;
            this.productsCache = result , error => console.log(error)
        });

    }

    onCategoryClicked(filteredproducts: IProduct[]) {
        this.products = filteredproducts;
    }


}