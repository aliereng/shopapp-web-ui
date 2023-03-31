import { Product } from "./Product";
import { Stock } from "./Stock";

export interface Cart{
    customer: String;
    amount:Number;
    status:Boolean;
    items:[
        {
            product:Product,
            stock:Stock,
            count:Number,
            price:Number
        }
    ]

}