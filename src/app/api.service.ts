import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Category } from './models/Category';
import { HomepageModel } from './models/HomepageModel';
import { Login } from './models/Login';
import { Product } from './models/Product';
import { Stock } from './models/Stock';
import { Cart } from './models/Cart';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url:String ="";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `Bearer: ${localStorage.getItem("access_token")}`
    })
  };
  constructor(private http: HttpClient) { 
    this.url = "http://localhost:3000/api/"
  }

  login(data:Object):Observable<Login> {
    return this.http.post<Login>(this.url+"auth/login", data)
  }

  

  forgotPassword(send: {model:String, email:String}):Observable<{success: Boolean, message: String}>{
    return this.http.post<{success: Boolean, message: String}>(this.url+"auth/forgotpassword",send)
  }
  resetPassword(send: {model:String, password:String}, token:String):Observable<{success: Boolean, message: String}>{
    return this.http.post<{success: Boolean, message: String}>(this.url+`auth/resetpassword?resetPasswordToken=${token}`,send)
  }
  getAllCategory():Observable<{success:Boolean, data:[Category]}>{
    return this.http.get<{success:Boolean, data:[Category]}>(this.url+"categories");
  }
  getAllProductsByCategory(slug:String, query:String= ""):Observable<HomepageModel>{
    return this.http.get<HomepageModel>(this.url+ `products/${slug}${query}`)
  }
  
  getAllProducts():Observable<HomepageModel>{
    return this.http.get<HomepageModel>(this.url+"products")
  }
  getProductById(slug: String,id:String):Observable<{success:Boolean, data:Product}>{
    return this.http.get<{success:Boolean, data:Product}>(this.url+`products/${slug}/${id}`)
  }
  getStockFromProductByColor(productId: String, color: String):Observable<{success:Boolean, data:Array<Stock>}>{
    return this.http.get<{success:Boolean, data:Array<Stock>}>(this.url+ `stocks/${productId}?color=${color}`)
  }
  addToCart(send:{product: String, stock: String, count: String}):Observable<{success: Boolean, message:String}>{
    return this.http.post<{success: Boolean, message:String}>(this.url+"cart/addtocart", send,this.httpOptions)
  }
  getCart():Observable<{success: Boolean,message:String, data:Cart}>{
    return this.http.get<{success: Boolean,message:String, data:Cart}>(this.url+"cart/get",this.httpOptions)
  }

}
