import { Customer } from "./Customer";
import { Product } from "./Product";
import { Supplier } from "./Supplier";

export interface Question{
    _id: string,
    title: string,
    createdAt: Date,
    customer: Customer,
    supplier: Supplier,
    product: Product,
    answer: string
}
