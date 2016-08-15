/**
 * Created by samuel on 8/10/16.
 */
System.register(['@angular/core', '@angular/http', 'rxjs/Observable', 'rxjs/add/operator/do', 'rxjs/add/operator/catch'], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
            var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
            if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
            else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            return c > 3 && r && Object.defineProperty(target, key, r), r;
        };
    var __metadata = (this && this.__metadata) || function (k, v) {
            if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
        };
    var core_1, http_1, Observable_1;
    var ProductService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (_1) {
            },
            function (_2) {
            }],
        execute: function () {
            ProductService = (function () {
                function ProductService(_http) {
                    var _this = this;
                    this._http = _http;
                    this.productsUrl = '/API/products';
                    this.singleProductUrl = '/API/singleProduct?productId=';
                    this.postProductReviewUrl = '/API/newProductReview';
                    this.createStarsArray = function (values, index) {
                        var result = [];
                        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
                            var product = values_1[_i];
                            //this.calculateStarsArray(product,index);
                            result.push(_this.calculateStarsArray(product, index));
                        }
                        return result;
                    };
                    this.calculateStarsArray = function (product, index) {
                        var sumRewiewsRatings = 0;
                        for (var _i = 0, _a = product.Reviews; _i < _a.length; _i++) {
                            var review = _a[_i];
                            sumRewiewsRatings += +(review.Rating);
                        }
                        product.starRating = Math.floor(sumRewiewsRatings / product.Reviews.length);
                        product.starsArray = [];
                        for (var i = 0; i < product.starRating; i++) {
                            product.starsArray.push(i);
                        }
                        console.log(product);
                        return product;
                    };
                }
                ProductService.prototype.getProducts = function () {
                    return this._http.get(this.productsUrl).map(function (response) {
                        return response.json();
                    })
                        .map(this.createStarsArray)
                        .do(function (data) {
                            return console.log("All" + JSON.stringify(data));
                        })
                        .catch(this.handleError);
                };
                ProductService.prototype.getSingleProduct = function (productId) {
                    return this._http.get(this.singleProductUrl + productId)
                        .map(function (response) {
                            return response.json();
                        })
                        .map(this.calculateStarsArray)
                        .catch(this.handleError);
                };
                ProductService.prototype.postProductReview = function (updatedproduct) {
                    return this._http.post(this.postProductReviewUrl, updatedproduct).map(function (response) {
                        return response.json();
                    }).catch(this.handleError);
                };
                ProductService.prototype.handleError = function (error) {
                    console.log(error);
                    return Observable_1.Observable.throw('Server error');
                };
                ProductService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], ProductService);
                return ProductService;
            }());
            exports_1("ProductService", ProductService);
        }
    }
});
//# sourceMappingURL=product.service.js.map