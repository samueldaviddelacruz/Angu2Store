/**
 * Created by samuel on 8/10/16.
 */
export interface IProduct {
    productId: number,
    productName: string,
    productCode: string,
    releaseDate: string,
    description: string,
    price: number,
    starRating: number,
    imageUrl: string,
    starsArray: number[],
    Reviews: Review[]
    Category: string
}


export interface Review {
    PostedBy: string
    Rating: number,
    Comment: string

}


