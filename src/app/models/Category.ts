import { Property } from "./Property";

export interface Category{
    _id:String;
    parentId: String;
    properties: Array<Property>;
    name: String;
    children:Array<Category>;
    slug:String;
}