/**
 * Created by samuel on 8/16/16.
 */
import {Component} from "@angular/core";
import {ProductService} from "./product.service";
import {Router} from "@angular/router";
@Component({
    templateUrl: './js/Angular2/app/Product/Checkout.component.html'
})
export class CheckoutComponent {
    cart: any[];
    total: number = 0;

    order: any = {
        shippingDetails: {},
        CreditCardDetail: {},
        orderTotal: 0,
        orderedItems: []

    };

    constructor(private _productService: ProductService, private router: Router) {

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

    calculateTotal(event) {

        this.total = 0;
        for (let item of this.cart) {
            this.total += (item.price * item.quantity);
        }

        console.log(this.total);

    }

    placeOrder() {
        this.order.orderTotal = this.total;
        this.order.orderedItems = this.cart;

        this._productService.placeOrder(this.order).subscribe(result => {
            this.showOrderPlacedMessage();
            console.log(result)
            this.router.navigate(['/products'])
            error=>console.log(error);
        });
        console.log(this.order);
    }

    showOrderPlacedMessage() {

        alert("your order has been placed succesfully, you will receive an email shortly with the order's details :)");

    }


}
