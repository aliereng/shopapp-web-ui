export interface Stock{
    _id: String;
    product:String;
    size: String;
    color: String;
    piece: number;
    price: number;
    type: String;
    status: Boolean;
    image: String;
    images: Array<String>
}