/**
 * Created by samuel on 8/16/16.
 */
import {Component, Input, Output, EventEmitter} from "@angular/core";
import {ProductService} from "./product.service";
@Component({
    templateUrl: './js/Angular2/app/Product/Cart.component.html'
})
export class CartComponent {
    cart: any[];
    total: number = 0;

    constructor(private _productService: ProductService) {

    }

    ngOnInit(): void {
        this.getCartData();
    }

    getCartData() {
        this._productService.getUserCart().subscribe(
            result => {
                this.cart = result.Cart
                this.calculateTotal(null),
                    error => console.log(error)
            });
    }

    removeFromCart(product) {

        this._productService.removeFromCart(product).subscribe(
            result => {
                console.log(result)
                this.getCartData()
                    , error =>console.log(error)
            }
        )
    }

    calculateTotal(event) {

        this.total = 0;
        for (let item of this.cart) {
            this.total += (item.price * item.quantity);
        }

        console.log(this.total);

    }


}