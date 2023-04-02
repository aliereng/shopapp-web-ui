import { Product } from "./Product";
import { Stock } from "./Stock";

export interface Cart{
    _id:String;
    customer: String;
    amount:number;
    status:Boolean;
    items:[
        {
            product:Product,
            stock:Stock,
            count:number,
            price:number
        }
    ]

}