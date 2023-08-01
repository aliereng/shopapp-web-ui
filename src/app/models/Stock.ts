export interface Stock{
    _id: String;
    product:String;
    size: String;
    color: string;
    piece: number;
    price: number;
    base: Boolean;
    status: Boolean;
    image: String;
    images: Array<String>
}