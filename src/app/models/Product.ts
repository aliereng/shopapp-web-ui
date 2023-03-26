import { Category } from "./Category";

export interface Product{
    _id:String;
    name: String;
    description: String;
    properties: [[String]];
    image: String,
    images:[String];
    size:String;
    color:String;
    price:Number;
    supplier:String;
    categories:[Category];
    comments:[];
    stocks:[];
    visible:Boolean;
    createdAt: Date;
    slug:String;
}