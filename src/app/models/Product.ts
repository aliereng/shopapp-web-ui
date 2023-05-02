import { Category } from "./Category";
import { Stock } from "./Stock";
import { Supplier } from "./Supplier";
import { Comment } from "./Comment";
export interface Product{
    _id:string;
    name: String;
    description: String;
    properties: [string];
    image: String,
    images:Array<String>;
    size:String;
    color:String;
    price:Number;
    supplier:Supplier;
    categories:Array<Category>;
    comments:Array<Comment>;
    stocks:Array<Stock>;
    visible:Boolean;
    createdAt: Date;
    slug:String;
}