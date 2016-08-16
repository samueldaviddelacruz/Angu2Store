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
            product =>
                this.product = product,
                    error => console.log(error)
        );
    }

    InitReview() {
        this.newReview = {
            PostedBy: "",
            Rating: 1,
            Comment: ""

        }
    }

    postReview() {


        //this.product.Reviews.push(this.newReview);


        this._productService.postProductReview(this.product.productId, this.newReview).subscribe(
            product =>
                this.updateProductWithReview(product),
            error => this.HandleErrorResponse(error)
        );

        //this.InitReview();
    }

    addToCart() {
        this._productService.addToCart(this.product).subscribe(
            product =>
                this.updateProductWithReview(product),
            error => this.HandleErrorResponse(error)
        );
    }

    private updateProductWithReview(product: IProduct) {
        this.product = product;
        this.InitReview();
    }

    private HandleErrorResponse(errorResponse: any) {
        console.log(errorResponse)
        if (errorResponse.status === 401) {
            alert('Please Log In, thanks :)')
        }
    }


}
