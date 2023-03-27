import { Product } from "./Product";

export interface HomepageModel{
    success:Boolean;
    totalPageCount:Number;
    total:Number;
    count:Number;
    pagination:{};
    data:Array<Product>
}