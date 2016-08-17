/**
 * Created by samuel on 8/10/16.
 */

import {Injectable} from '@angular/core'

import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {IProduct, Review} from "./Product";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
@Injectable()
export class ProductService {

    private productsUrl = '/API/products';
    private singleProductUrl = '/API/singleProduct?productId='
    private postProductReviewUrl = '/API/newProductReview';
    private addToCartUrl = '/API/addProductToCart'
    private removeFromCartUrl = '/API/removeFromCart'
    private updateCartUrl = '/API/updateCart'
    private userCartUrl = '/API/userCart'
    private postOrderUrl = '/API/newOrder';



    constructor(private _http: Http) {

    }

    getProducts(): Observable<IProduct[]> {
        return this._http.get(this.productsUrl).map((response: Response) => <IProduct[]>response.json())
            .map(this.createStarsArray)
            .do(data => console.log("All" + JSON.stringify(data)))
            .catch(this.handleError)
    }

    getUserCart(): Observable<any> {
        return this._http.get(this.userCartUrl).map((response: Response) => <any>response.json())
            .catch(this.handleError)
    }

    getSingleProduct(productId: number): Observable<IProduct> {
        return this._http.get(this.singleProductUrl + productId)
            .map((response: Response) => <IProduct>response.json())
            .map(this.calculateStarsArray)
            .catch(this.handleError)

    }

    postProductReview(prodId: number, newReview: Review) {
        return this._http.post(this.postProductReviewUrl, {
            prodId: prodId,
            newReview: newReview
        }).map((response: Response)=><IProduct>response.json()).map(this.calculateStarsArray).catch(this.handleError);

    }

    addToCart(product: IProduct) {
        return this._http.post(this.addToCartUrl, product).map((response: Response)=><IProduct>response.json()).catch(this.handleError);
    }

    updateCart(cart: any) {
        return this._http.put(this.updateCartUrl, cart).map((response: Response)=><any>response.json()).catch(this.handleError);
    }


    placeOrder(order: any) {
        return this._http.post(this.postOrderUrl, order).map((response: Response)=><any>response.json()).catch(this.handleError);

    }





    removeFromCart(product: any) {
        return this._http.post(this.removeFromCartUrl, product).map((response: Response)=><any>response.json()).catch(this.handleError);
    }


    private createStarsArray = (values: IProduct[], index: number): any => {
        let result: IProduct[] = [];

        for (let product of values) {

            //this.calculateStarsArray(product,index);
            result.push(this.calculateStarsArray(product, index))
        }
        return result;
    }


    private calculateStarsArray = (product: IProduct, index: number): any => {
        let sumRewiewsRatings = 0;

        for (let review of product.Reviews) {
            sumRewiewsRatings += +(review.Rating);
        }


        product.starRating = Math.floor(sumRewiewsRatings / product.Reviews.length);

        product.starsArray = [];
        for (let i = 0; i < product.starRating; i++) {
            product.starsArray.push(i);
        }

        console.log(product)
        return product;

    }

    private handleError(error: Response) {

        return Observable.throw(error);
    }

}
