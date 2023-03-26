export interface Category{
    _id:String;
    parentId: String;
    properties: [];
    name: String;
    children:Array<Category>;
    slug:String;
}