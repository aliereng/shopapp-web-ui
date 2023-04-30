export interface Stock{
    _id: String;
    product:String;
    size: String;
    color: String;
    piece: number;
    price: number;
    base: Boolean;
    status: Boolean;
    image: String;
    images: Array<String>
}