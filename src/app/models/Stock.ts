export interface Stock{
    _id: String;
    product:String;
    size: String;
    color: String;
    piece: Number;
    price: Number;
    type: String;
    status: Boolean;
    image: String;
    images: Array<String>
}