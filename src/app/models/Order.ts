export interface Order{
    _id: String;
    customer:String;
    product:String;
    stock:String;
    count:number;
    orderStatus:Boolean;
    shippedStatus:Boolean;
    supplier:String;
    shipper: String;
    deliveredAddress: String;
    invoiceAddress: String;
    createdAdd: Date;
    amount: number;
}