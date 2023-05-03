import { Customer } from "./Customer";

export interface Comment{
    _id:string;
    customer: Customer,
    commentRef:string,
    comment:Comment,
    totalLikeCount:number,
    score:string,
    createdAt:Date
}

