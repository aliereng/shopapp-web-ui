export interface Order{
    _id: String;
    customer:String;
    product:{
        _id:String,
        name:String,
        slug:String
    };
    stock:{
        _id:String,
        size:String,
        color:String,
        image:String,
        price:number
    };
    count:number;
    orderStatus:Boolean;
    shippedStatus:Boolean;
    supplier:{
        _id:String,
        shopName:String,
        slug:String,
    };
    shipper: {
        name:String
    };
    followCode:String,
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
    createdAt: Date;
    amount: number;
    complete:Boolean,
    paymentId: String,
    paymentTransactionId: String,
    cancel: Boolean
}