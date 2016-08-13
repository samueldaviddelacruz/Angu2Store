/**
 * Created by samuel on 8/10/16.
 */

import {Injectable} from '@angular/core'

import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {IProduct} from "./Product";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
@Injectable()
export class ProductService {

    private productsUrl = '/API/products';
    private singleProductUrl = '/API/singleProduct?productId='
    constructor(private _http: Http) {

    }

    getProducts(): Observable<IProduct[]> {
        return this._http.get(this.productsUrl).map((response: Response) => <IProduct[]>response.json())
            .map(this.createStarsArray)
            .do(data => console.log("All" + JSON.stringify(data)))
            .catch(this.handleError)

    }

    getSingleProduct(productId: number): Observable<IProduct> {
        return this._http.get(this.singleProductUrl + productId).map((response: Response) => <IProduct>response.json()
        ).catch(this.handleError)

    }

    private createStarsArray(values: IProduct[], index: number): any {
        let result: IProduct[] = [];
        for (let product of values) {
            product.starsArray = [];
            for (let i = 0; i < product.starRating; i++) {
                product.starsArray.push(i);
            }
            result.push(product)
        }
        return result;
    }

    private handleError(error: Response) {
        console.log(error);
        return Observable.throw('Server error');
    }

}
