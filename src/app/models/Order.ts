export interface Order{
    _id: String;
    customer:String;
    product:{
        _id:String,
        name:String,
        slug:String
    };
    stock:{
        size:String,
        color:String,
        image:String,
        price:number
    };
    count:number;
    orderStatus:Boolean;
    shippedStatus:Boolean;
    supplier:{
        shopName:String,
        slug:String,
    };
    shipper: {
        name:String
    };
    deliveredAddress: {
        title:String,
        info:{
            name: String,
            surname: String,
            phone: String,
            city: String,
            district: String,
            neighbourhood: String,
            street: String,
            postalCode: String,
            addressDesc: String
        }
    };
    invoiceAddress: {
        title:String,
        info:{
            name: String,
            surname: String,
            phone: String,
            city: String,
            district: String,
            neighbourhood: String,
            street: String,
            postalCode: String,
            addressDesc: String
        }
    };
    createdAdd: Date;
    amount: number;
}