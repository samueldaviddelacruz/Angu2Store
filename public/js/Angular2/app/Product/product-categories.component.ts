import {Component, Input, Output, EventEmitter} from "@angular/core";
import {IProduct} from "./Product";
/**
 * Created by samuel on 8/9/16.
 */

@Component({
    selector: 'p-categories',
    templateUrl: './js/Angular2/app/Product/product-categories.component.html'
})
export class ProductCategoriesComponent {
    _ProductList: IProduct[];
    ProductCategories: string[] = [];

    @Input()
    set ProductList(products: IProduct[]) {

        this._ProductList = products;
        if (products)
            this.SetProductCategories(products);

    }

    private SetProductCategories(products: IProduct[]) {
        this.ProductCategories.push('All');
        products.forEach((item, index) => {

            if (this.CategoryIsNotOnCategoriesList(item.Category)) {
                this.ProductCategories.push(item.Category);
            }
        });
    }

    private CategoryIsNotOnCategoriesList(category: string): boolean {

        return this.ProductCategories.indexOf(category) == -1;

    }

    @Output()
    categoryClicked: EventEmitter<IProduct[]> = new EventEmitter<IProduct[]>();

    onClick(Category: string) {
        //console.log(Category);
        if (Category === 'All') {
            return this.categoryClicked.emit(this._ProductList);
        }

        let filteredList: IProduct[] = this._ProductList.filter((item)=>item.Category == Category);
        this.categoryClicked.emit(filteredList);
    }

}