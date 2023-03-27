import { Category } from "./Category";
import { Stock } from "./Stock";
import { Supplier } from "./Supplier";

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
    supplier:Supplier;
    categories:[Category];
    comments:[];
    stocks:Array<Stock>;
    visible:Boolean;
    createdAt: Date;
    slug:String;
}