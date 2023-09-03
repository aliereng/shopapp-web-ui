export interface Customer{
    identifyNumber: String,
    name:String;
    surname: String;
    email: String,
    password: String,
    phone: String,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    ip: String,
    lastLoginDate: Date,
    registeredDate: Date

}