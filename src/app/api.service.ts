import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './models/Category';
import { HomepageModel } from './models/HomepageModel';
import { Login } from './models/Login';
import { Product } from './models/Product';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url:String =""
  constructor(private http: HttpClient) { 
    this.url = "http://localhost:3000/api/"
  }

  login(data:Object):Observable<Login> {
    return this.http.post<Login>(this.url+"customer/login", data)
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
  getProductById(id:String):Observable<{success:Boolean, data:Product}>{
    return this.http.get<{success:Boolean, data:Product}>(this.url+`products/${id}`)
  }
}
