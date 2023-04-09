import { Order } from "./Order";

export interface Transaction{
    _id: String;
    supplier: String;
    order: Order;
    createdAt:Date;
    complete:Boolean
}