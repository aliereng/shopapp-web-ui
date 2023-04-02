export interface Address{
    _id: String;
    userType: String;
    userId: String;
    title:String;
    info: {
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
}
