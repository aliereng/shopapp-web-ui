import { Customer } from "./Customer";

export interface Comment{
    _id:string;
    customer: Customer,
    commentRef:string,
    comment:Comment,
    totalLikeCount:number,
    point:string,
    createdAt:Date
}

