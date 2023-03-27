import { Product } from "./Product";
import { Shipper } from "./Shipper";

export interface Supplier{
    _id: String;
    name: String;
    surname: String;
    shopName: String;
    email: String;
    password:String;
    phone: String;
    taxNumber: String;
    products:Array<Product>;
    shipper: Array<Shipper>
}