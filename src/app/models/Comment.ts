import { Customer } from "./Customer";
import { Product } from "./Product";
import { Stock } from "./Stock";
import { Supplier } from "./Supplier";

export interface Comment{
    _id:string;
    customer: Customer,
    product:Product,
    stock:Stock,
    supplier:Supplier,
    comment:Comment,
    totalLikeCount:number,
    score:string,
    createdAt:Date
}

