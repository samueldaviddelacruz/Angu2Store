/**
 * Created by samuel on 8/13/16.
 */
import {Component, Input, Output, EventEmitter} from "@angular/core";
import {IProduct, Review} from "./Product";
import {ProductService} from "./product.service";
import {ActivatedRoute} from "@angular/router";



@Component({
    templateUrl: './js/Angular2/app/Product/product-detail.component.html'
})
export class ProductDetailComponent {

    product: IProduct;
    newReview: Review;
    private sub: any;

    constructor(private _productService: ProductService, private route: ActivatedRoute) {
        this.InitReview();
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
            product => {
                this.product = product;
                console.log(product),
                    error => console.log(error)
            });
    }

    InitReview() {
        this.newReview = {
            PostedBy: "",
            Email: "",
            Rating: 0,
            Comment: ""

        }
    }

    postReview() {

        this.product.Reviews.push(this.newReview);

        this._productService.postProductReview(this.product).subscribe(
            product => {
                this.product = product;
                this.InitReview(),
                    error => console.log(error)
            });

        //this.InitReview();
    }


}
