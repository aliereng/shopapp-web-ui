import { HttpClient, HttpClientModule, HttpContext, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, observable } from 'rxjs';
import { Category } from './models/Category';
import { HomepageModel } from './models/HomepageModel';
import { Login } from './models/Login';
import { Product } from './models/Product';
import { Stock } from './models/Stock';
import { Cart } from './models/Cart';
import { Customer } from './models/Customer';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url:String ="";
  httpOptions = {
    headers:{ 
      'Content-Type':  'application/json',
      'Authorization': `Bearer: ${localStorage.getItem("access_token")}`
    },
    observe:'response'
  };
  constructor(private http: HttpClient) { 
    this.url = "http://localhost:3000/api/"
  }

  login(data:Object) {
    return this.http.post(this.url+"auth/login", data,{observe:'response'})
  }
  register(data:Object) {
    return this.http.post(this.url+"auth/register", data,{observe:"response"})
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
  // addToCart(send:{product: String, stock: String, count: String}):Observable<{success: Boolean, message:String}>{
  //   return this.http.post<{success: Boolean, message:String}>(this.url+"cart/addtocart", send,this.httpOptions)
  // }
  addToCart(send:{product: String, stock: String, count: String}){
    return this.http.post(this.url+"cart/addtocart", send,{
      headers:{ 
        'Content-Type':  'application/json',
        'Authorization': `Bearer: ${localStorage.getItem("access_token")}`
      },
      observe:'response'
    })
  }
  getCart(){
    return this.http.get(this.url+"cart/get",{
      headers:{ 
        'Content-Type':  'application/json',
        'Authorization': `Bearer: ${localStorage.getItem("access_token")}`
      },
      observe:'response'
    })
  }
  applyCart(id: String, data:{}){
    return this.http.put(this.url+`cart/apply/${id}`,data,{
      headers:{ 
        'Content-Type':  'application/json',
        'Authorization': `Bearer: ${localStorage.getItem("access_token")}`
      },
      observe:'response'
    })
  }
  getCustomer(){
    return this.http.get(this.url+"customer",{
      headers:{ 
        'Content-Type':  'application/json',
        'Authorization': `Bearer: ${localStorage.getItem("access_token")}`
      },
      observe:'response'
    })
  }
  updateCustomer(data:Customer){
    return this.http.put(this.url+"customer/update",data,{
      headers:{ 
        'Content-Type':  'application/json',
        'Authorization': `Bearer: ${localStorage.getItem("access_token")}`
      },
      observe:'response'
    })
  }

}
